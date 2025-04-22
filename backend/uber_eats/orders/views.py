from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrderSerializer, OrderItemSerializer

@api_view(['GET'])
def product_list(request):
    """
    Vue API qui renvoie la liste de tous les produits disponibles.
    """
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def start_order(request):
    """
    Démarre une nouvelle commande ou récupère une commande en cours pour un téléphone donné.
    Attend un JSON {"phone": "..."}.
    """
    phone = request.data.get('phone')
    if not phone:
        return Response({"error": "Phone number is required"}, status=status.HTTP_400_BAD_REQUEST)
    # Cherche une commande non confirmée pour ce numéro
    try:
        order = Order.objects.get(phone=phone, confirmed=False)
        created = False
    except Order.DoesNotExist:
        # Si aucune commande en attente, en créer une nouvelle
        order = Order.objects.create(phone=phone, confirmed=False)
        created = True
    # Sérialiser la commande (y compris les items existants le cas échéant)
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

@api_view(['POST'])
def add_item(request):
    """
    Ajoute un produit à la commande (ou augmente la quantité si ce produit est déjà dans la commande).
    Attend un JSON {"order_id": X, "product_id": Y}.
    """
    order_id = request.data.get('order_id')
    product_id = request.data.get('product_id')
    if not order_id or not product_id:
        return Response({"error": "Order ID and Product ID are required"}, status=status.HTTP_400_BAD_REQUEST)
    # Récupérer la commande (on suppose qu'elle existe)
    try:
        order = Order.objects.get(id=order_id, confirmed=False)
    except Order.DoesNotExist:
        return Response({"error": "Order not found or already confirmed"}, status=status.HTTP_404_NOT_FOUND)
    # Récupérer le produit
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    # Vérifier si un item pour ce produit existe déjà dans la commande
    item, created = OrderItem.objects.get_or_create(order=order, product=product)
    if not created:
        # Si l'item existe déjà, augmenter la quantité
        item.quantity += 1
        item.save()
    # Préparer les données à retourner (toute la commande mise à jour)
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def remove_item(request):
    """
    Supprime un produit de la commande (ou diminue la quantité).
    Attend un JSON {"order_id": X, "product_id": Y}.
    Si la quantité > 1, on la diminue de 1. Si elle est 1, on supprime l'item.
    """
    order_id = request.data.get('order_id')
    product_id = request.data.get('product_id')
    if not order_id or not product_id:
        return Response({"error": "Order ID and Product ID are required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        order = Order.objects.get(id=order_id, confirmed=False)
    except Order.DoesNotExist:
        return Response({"error": "Order not found or already confirmed"}, status=status.HTTP_404_NOT_FOUND)
    try:
        item = OrderItem.objects.get(order=order, product_id=product_id)
    except OrderItem.DoesNotExist:
        return Response({"error": "Item not found in order"}, status=status.HTTP_404_NOT_FOUND)
    # Réduire la quantité ou supprimer l'item
    if item.quantity > 1:
        item.quantity -= 1
        item.save()
    else:
        item.delete()
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def confirm_order(request):
    """
    Confirme la commande: applique le code promo si valide et marque la commande comme confirmée.
    Attend un JSON {"order_id": X, "promo_code": "OPTIONAL_CODE"}.
    """
    order_id = request.data.get('order_id')
    promo_code = request.data.get('promo_code', "")
    if not order_id:
        return Response({"error": "Order ID is required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        order = Order.objects.get(id=order_id, confirmed=False)
    except Order.DoesNotExist:
        return Response({"error": "Order not found or already confirmed"}, status=status.HTTP_404_NOT_FOUND)
    # Calculer le total actuel
    total = sum(item.product.price * item.quantity for item in order.items.all())
    discount = 0
    if total > 30 and promo_code == "PROMO10":
        discount = 10
    final_total = float(total) - discount
    # Marquer la commande comme confirmée
    order.confirmed = True
    order.save()
    return Response({
        "order_id": order.id,
        "phone": order.phone,
        "total": float(total),
        "discount": discount,
        "final_total": final_total,
        "message": "Commande confirmée"
    }, status=status.HTTP_200_OK)
