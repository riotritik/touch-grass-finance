from rest_framework import serializers
from .models import Proof


class ProofSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proof
        fields = [
            "id",
            "user",
            "photo",
            "latitude",
            "longitude",
            "verified",
            "proof_date",
            "created_at",
        ]
        read_only_fields = ["verified"]