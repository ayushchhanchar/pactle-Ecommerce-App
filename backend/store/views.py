# from rest_framework import generics
# from rest_framework.permissions import AllowAny
# from .models import Product
# from .serializers import ProductSerializer

from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search')
        category = self.request.query_params.get('category')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search))

        if category:
            queryset = queryset.filter(category__iexact=category)

        if min_price:
            queryset = queryset.filter(price__gte=min_price)

        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset


# class ProductListView(generics.ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     permission_classes = [AllowAny]  # ✅ Public access

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]  # ✅ Public access