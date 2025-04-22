from django.contrib import admin
from .models import Product, Order, OrderItem

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price')  # Affiche ces colonnes dans la liste
    search_fields = ('name',)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0  # Pas de ligne vide en plus

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'phone', 'confirmed', 'created_at')
    list_filter = ('confirmed', 'created_at')
    search_fields = ('phone',)
    inlines = [OrderItemInline]  # Permet d’éditer les items dans la commande directement

# Pas besoin d’un admin séparé pour OrderItem, géré en inline
