from django.db import models
from users.models import User


class Reward(models.Model):

    STATUS_CHOICES = [
        ("locked", "Locked"),
        ("unlocked", "Unlocked"),
        ("claimed", "Claimed"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="rewards"
    )

    amount = models.DecimalField(
        max_digits=20,
        decimal_places=8
    )

    date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="locked"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.wallet_address} - {self.amount}"