from django.contrib import admin
from .models import PlantCategory, Plant, PlantCompanion, UserGarden, DiseaseScanLog


@admin.register(PlantCategory)
class PlantCategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


class PlantCompanionInline(admin.TabularInline):
    model = PlantCompanion
    fk_name = "primary_plant"
    extra = 1


@admin.register(Plant)
class PlantAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "difficulty", "is_featured", "is_beginner")
    list_filter = ("category", "difficulty", "is_featured", "is_beginner")
    search_fields = ("name", "scientific_name")
    inlines = [PlantCompanionInline]


@admin.register(UserGarden)
class UserGardenAdmin(admin.ModelAdmin):
    list_display = ("user", "plant", "added_at")
    list_filter = ("added_at",)
    search_fields = ("user__username", "plant__name")


@admin.register(DiseaseScanLog)
class DiseaseScanLogAdmin(admin.ModelAdmin):
    list_display = ("user", "scanned_at")
    list_filter = ("scanned_at",)
    search_fields = ("user__username", "ai_diagnosis")
