import { useState, useEffect } from 'react';
import { WeatherData } from './recommendations';

export interface WeatherState {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

// Derive season from month adjusted for South Asian (Bangladesh) climate
function getSeason(month: number): WeatherData['season'] {
  if (month >= 2 && month <= 4) return 'summer';
  if (month >= 5 && month <= 9) return 'monsoon';
  if (month >= 10 && month <= 11) return 'winter';
  return 'winter'; // Dec-Jan
}

// Derive condition from WMO weather interpretation codes
function getCondition(wmoCode: number): WeatherData['condition'] {
  if (wmoCode === 0 || wmoCode === 1) return 'sunny';
  if (wmoCode === 2 || wmoCode === 3) return 'cloudy';
  if (wmoCode >= 51 && wmoCode <= 67) return 'rainy';
  if (wmoCode >= 71 && wmoCode <= 77) return 'stormy';
  if (wmoCode >= 80 && wmoCode <= 82) return 'rainy';
  if (wmoCode >= 95 && wmoCode <= 99) return 'stormy';
  return 'cloudy';
}

// Reverse geocode lat/lon to city name using Open-Meteo geocoding (no key)
async function getCityName(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      data.address?.state ||
      'Your Location';
    const country = data.address?.country_code?.toUpperCase() || '';
    return country ? `${city}, ${country}` : city;
  } catch {
    return 'Your Location';
  }
}

export function useWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>({
    weather: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ weather: null, loading: false, error: 'Geolocation is not supported by your browser.' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Fetch real weather from Open-Meteo (completely free, no API key needed)
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,weather_code` +
            `&timezone=auto`
          );
          if (!weatherRes.ok) throw new Error('Weather fetch failed');
          const weatherJson = await weatherRes.json();

          const current = weatherJson.current;
          const temperature = Math.round(current.temperature_2m);
          const humidity = Math.round(current.relative_humidity_2m);
          const wmoCode: number = current.weather_code;
          const condition = getCondition(wmoCode);
          const month = new Date().getMonth();
          const season = getSeason(month);
          const location = await getCityName(latitude, longitude);

          setState({
            weather: { temperature, humidity, condition, location, season },
            loading: false,
            error: null,
          });
        } catch (err: any) {
          setState({ weather: null, loading: false, error: 'Could not fetch live weather data. Please try again.' });
        }
      },
      (err) => {
        let message = 'Location access denied.';
        if (err.code === err.TIMEOUT) message = 'Location request timed out.';
        if (err.code === err.POSITION_UNAVAILABLE) message = 'Location unavailable.';
        setState({ weather: null, loading: false, error: message });
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  return state;
}
