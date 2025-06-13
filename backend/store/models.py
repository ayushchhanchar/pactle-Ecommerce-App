from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('fashion', 'Fashion'),
        ('electronics', 'Electronics'),
        ('books', 'Books'),
        ('home', 'Home & Living'),
        ('beauty', 'Beauty'),
        # Add more categories as needed
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    inventory_count = models.PositiveIntegerField()
    image_url = models.URLField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='fashion')  # ✅ Added this line
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
