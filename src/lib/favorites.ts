const FAVORITES_KEY = 'smart-garden-favorites';

export function getFavorites(): number[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addFavorite(plantId: number): void {
  if (typeof window === 'undefined') return;
  const favorites = getFavorites();
  if (!favorites.includes(plantId)) {
    favorites.push(plantId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(plantId: number): void {
  if (typeof window === 'undefined') return;
  const favorites = getFavorites();
  const updated = favorites.filter(id => id !== plantId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function isFavorite(plantId: number): boolean {
  return getFavorites().includes(plantId);
}

export function toggleFavorite(plantId: number): boolean {
  const favorites = getFavorites();
  const isCurrentlyFavorite = favorites.includes(plantId);
  
  if (isCurrentlyFavorite) {
    removeFavorite(plantId);
    return false;
  } else {
    addFavorite(plantId);
    return true;
  }
}
