from django.db import models
from users.models import User


class Stake(models.Model):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("failed", "Failed"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="stakes"
    )

    amount = models.DecimalField(
        max_digits=20,
        decimal_places=8
    )

    tx_hash = models.CharField(max_length=255)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.wallet_address} - {self.amount}"