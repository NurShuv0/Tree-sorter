from django.contrib.auth.models import User
from django.db import models


class PlantCategory(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Plant Categories"

    def __str__(self) -> str:
        return self.name


class Plant(models.Model):
    category = models.ForeignKey(
        PlantCategory, on_delete=models.SET_NULL, null=True, related_name="plants"
    )
    name = models.CharField(max_length=150)
    scientific_name = models.CharField(max_length=150)
    image_url = models.URLField(max_length=500)
    description = models.TextField()

    # Requirements
    WATER_REQUIREMENTS = [
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High"),
    ]
    water_requirement = models.CharField(max_length=20, choices=WATER_REQUIREMENTS)

    SUNLIGHT_CHOICES = [
        ("Full Sun", "Full Sun"),
        ("Partial Sun", "Partial Sun"),
        ("Shade", "Shade"),
    ]
    sunlight = models.CharField(max_length=30, choices=SUNLIGHT_CHOICES)

    SOIL_CHOICES = [
        ("Loamy", "Loamy"),
        ("Sandy", "Sandy"),
        ("Clay", "Clay"),
        ("Well-drained", "Well-drained"),
    ]
    soil_type = models.CharField(max_length=30, choices=SOIL_CHOICES)

    DIFFICULTY_CHOICES = [
        ("Easy", "Easy"),
        ("Medium", "Medium"),
        ("Advanced", "Advanced"),
    ]
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)

    growth_duration = models.CharField(max_length=100)
    best_season = models.CharField(max_length=100)

    # Instructions & Tips
    care_instructions = models.TextField()
    fertilizer_tips = models.TextField()
    harvesting_tips = models.TextField(blank=True)
    prevention_tips = models.TextField(blank=True)

    # Boolean flags
    is_featured = models.BooleanField(default=False)
    is_beginner = models.BooleanField(default=False)
    is_low_maintenance = models.BooleanField(default=False)

    # Weather Preferences (JSON)
    weather_preference = models.JSONField(default=dict)
    
    # Simple list for common diseases
    common_diseases = models.JSONField(default=list)

    def __str__(self) -> str:
        return self.name


class PlantCompanion(models.Model):
    RELATIONSHIP_CHOICES = [
        ("GOOD", "Good Companion"),
        ("BAD", "Avoid Nearby"),
    ]
    primary_plant = models.ForeignKey(
        Plant, on_delete=models.CASCADE, related_name="relationships"
    )
    companion_plant = models.ForeignKey(
        Plant, on_delete=models.CASCADE, related_name="reverse_relationships"
    )
    relationship_type = models.CharField(max_length=10, choices=RELATIONSHIP_CHOICES)

    class Meta:
        unique_together = ("primary_plant", "companion_plant")

    def __str__(self) -> str:
        return f"{self.primary_plant} -> {self.companion_plant} ({self.relationship_type})"


class UserGarden(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="garden_plants")
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE, related_name="favorited_by")
    added_at = models.DateTimeField(auto_now_add=True)
    custom_notes = models.TextField(blank=True)

    class Meta:
        unique_together = ("user", "plant")
        verbose_name = "User Garden Entry"
        verbose_name_plural = "User Garden Entries"

    def __str__(self) -> str:
        return f"{self.user.username}'s {self.plant.name}"


class DiseaseScanLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="disease_scans")
    image_url = models.URLField(max_length=500)
    ai_diagnosis = models.TextField()
    scanned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Scan by {self.user.username} on {self.scanned_at.strftime('%Y-%m-%d')}"
