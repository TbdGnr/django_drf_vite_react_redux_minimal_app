from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list, name='product_list'),       # GET tous les produits
    path('order/start/', views.start_order, name='start_order'),      # POST pour démarrer/récupérer une commande
    path('order/add-item/', views.add_item, name='add_item'),         # POST pour ajouter un produit
    path('order/remove-item/', views.remove_item, name='remove_item'),# POST pour supprimer/un produit
    path('order/confirm/', views.confirm_order, name='confirm_order'),# POST pour confirmer la commande
]
