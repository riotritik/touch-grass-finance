from django.db import models


class User(models.Model):
    wallet_address = models.CharField(max_length=120, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.wallet_address