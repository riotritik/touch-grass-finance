from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from users.models import User
from proofs.models import Proof


@api_view(["POST"])
def upload_proof(request):

    wallet_address = request.data.get("wallet_address")
    latitude = request.data.get("latitude")
    longitude = request.data.get("longitude")
    photo = request.FILES.get("photo")

    # ---- validation ----

    if not wallet_address:
        return Response({"error": "wallet_address required"}, status=400)

    if not photo:
        return Response({"error": "photo required"}, status=400)

    if not latitude or not longitude:
        return Response({"error": "gps required"}, status=400)

    # ---- get user ----

    user, _ = User.objects.get_or_create(wallet_address=wallet_address)

    # ---- create proof ----

    proof = Proof.objects.create(
        user=user,
        photo=photo,            # ✅ correct field
        latitude=float(latitude),
        longitude=float(longitude),
        verified=True
    )

    return Response({
        "message": "proof uploaded",
        "proof_id": proof.id
    })