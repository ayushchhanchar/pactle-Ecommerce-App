# store/models.py

from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('fashion', 'Fashion'),
        ('electronics', 'Electronics'),
        ('books', 'Books'),
        ('home', 'Home & Living'),
        ('beauty', 'Beauty'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    inventory_count = models.PositiveIntegerField()
    image_url = models.URLField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='fashion')
    sizes = models.JSONField(blank=True, null=True)  # ✅ For fashion products (optional)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# ✅ New model for ratings & reviews
class Review(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()  # 1 to 5
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.product.name} ({self.rating}★)"
