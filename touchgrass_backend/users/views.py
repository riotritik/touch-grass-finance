from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User


@api_view(["POST"])
def connect_wallet(request):

    wallet_address = request.data.get("wallet_address")

    if not wallet_address:
        return Response({"error": "wallet_address required"}, status=400)

    user, created = User.objects.get_or_create(
        wallet_address=wallet_address
    )

    return Response({
        "wallet_address": user.wallet_address,
        "created": created
    })