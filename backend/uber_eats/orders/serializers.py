from rest_framework import serializers
from .models import Product, Order, OrderItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price']  # on expose l'identifiant, le nom et le prix

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)  
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product', write_only=True)
    # Le serializer inclut les détails du produit en lecture seule, 
    # et accepte un product_id en écriture (pour ajouter des items via l'API).

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)  
    # on intègre les items dans la commande (en lecture seule via l'API)
    total = serializers.SerializerMethodField(read_only=True)  
    # champ calculé pour le total de la commande

    class Meta:
        model = Order
        fields = ['id', 'phone', 'created_at', 'confirmed', 'items', 'total']

    def get_total(self, obj):
        # Calcule le total en sommant (prix * quantité) pour chaque item
        return sum(item.product.price * item.quantity for item in obj.items.all())
