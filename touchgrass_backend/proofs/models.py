from django.db import models
from users.models import User


class Proof(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="proofs"
    )

    photo = models.ImageField(upload_to="proofs/")

    latitude = models.FloatField()
    longitude = models.FloatField()

    verified = models.BooleanField(default=False)

    proof_date = models.DateField(auto_now_add=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["user", "proof_date"]),
        ]

    def __str__(self):
        return f"Proof {self.user.wallet_address} {self.proof_date}"