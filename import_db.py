import os
import sys
import django
import json

sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from garden.models import PlantCategory, Plant, PlantCompanion

def load_plants():
    with open('plants_dump.json', 'r', encoding='utf-8') as f:
        plants_data = json.load(f)

    print(f"Loading {len(plants_data)} plants into the database...")
    
    # Pass 1: Create Categories and Plants
    for p_data in plants_data:
        category, _ = PlantCategory.objects.get_or_create(
            name=p_data['category']
        )
        
        # Create or update plant
        plant, created = Plant.objects.update_or_create(
            name=p_data['name'],
            defaults={
                'category': category,
                'scientific_name': p_data['scientificName'],
                'image_url': p_data['image'],
                'description': p_data['description'],
                'water_requirement': p_data['waterRequirement'],
                'sunlight': p_data['sunlight'],
                'soil_type': p_data['soilType'],
                'difficulty': p_data['difficulty'],
                'growth_duration': p_data['growthDuration'],
                'best_season': p_data['bestSeason'],
                'care_instructions': p_data['careInstructions'],
                'fertilizer_tips': p_data['fertilizerTips'],
                'harvesting_tips': p_data['harvestingTips'],
                'prevention_tips': p_data['preventionTips'],
                'is_featured': p_data['isFeatured'],
                'is_beginner': p_data['isBeginner'],
                'is_low_maintenance': p_data['isLowMaintenance'],
                'weather_preference': p_data['weatherPreference'],
                'common_diseases': p_data['commonDiseases'],
            }
        )
        if created:
            print(f"Created Plant: {plant.name}")
            
    # Pass 2: Create Companion Relationships
    for p_data in plants_data:
        primary_plant = Plant.objects.get(name=p_data['name'])
        
        # Companions
        for companion_name in p_data.get('companionPlants', []):
            try:
                companion = Plant.objects.get(name=companion_name)
                PlantCompanion.objects.update_or_create(
                    primary_plant=primary_plant,
                    companion_plant=companion,
                    defaults={'relationship_type': 'GOOD'}
                )
            except Plant.DoesNotExist:
                print(f"Warning: Companion {companion_name} not found for {primary_plant.name}")
                
        # Avoid Nearby
        for bad_companion_name in p_data.get('avoidNearby', []):
            try:
                bad_companion = Plant.objects.get(name=bad_companion_name)
                PlantCompanion.objects.update_or_create(
                    primary_plant=primary_plant,
                    companion_plant=bad_companion,
                    defaults={'relationship_type': 'BAD'}
                )
            except Plant.DoesNotExist:
                print(f"Warning: Bad Companion {bad_companion_name} not found for {primary_plant.name}")

if __name__ == '__main__':
    load_plants()
    print("Import complete!")
