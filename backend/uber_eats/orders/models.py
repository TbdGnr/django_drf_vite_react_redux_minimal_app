from django.db import models

# Create your models here.
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)   # Nom du produit
    price = models.DecimalField(max_digits=6, decimal_places=2)  # Prix en euros (ex: 5.50)

    def __str__(self):
        return self.name

class Order(models.Model):
    phone = models.CharField(max_length=20)   # Numéro de téléphone du client
    created_at = models.DateTimeField(auto_now_add=True)  # Date de création
    confirmed = models.BooleanField(default=False)        # Indique si la commande est confirmée (validée)
    # On pourrait ajouter d'autres champs comme un total ou un code promo appliqué, mais on peut les calculer au besoin.

    def __str__(self):
        return f"Commande {self.id} - {self.phone}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)  # Quantité du produit dans cette commande

    def __str__(self):
        return f"{self.quantity} x{self.product.name} (Commande {self.order.id})"
