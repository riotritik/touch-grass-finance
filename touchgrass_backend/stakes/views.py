from rest_framework.decorators import api_view
from rest_framework.response import Response
from decimal import Decimal, InvalidOperation

from .models import Stake
from users.models import User
from services.starkzap_service import StarkzapService


@api_view(["POST"])
def create_stake(request):

    wallet = request.data.get("wallet_address")
    amount = request.data.get("amount")
    tx_hash = request.data.get("tx_hash")

    if not wallet:
        return Response({"error": "wallet_address required"}, status=400)

    if not amount:
        return Response({"error": "amount required"}, status=400)

    try:
        amount = Decimal(amount)
    except (InvalidOperation, TypeError):
        return Response({"error": "invalid amount"}, status=400)

    if not StarkzapService.validate_tx_hash(tx_hash):
        return Response({"error": "invalid transaction hash"}, status=400)

    user, _ = User.objects.get_or_create(wallet_address=wallet)

    stake = Stake.objects.create(
        user=user,
        amount=amount,
        tx_hash=tx_hash,
        status="confirmed"
    )

    return Response({
        "stake_id": stake.id,
        "amount": str(stake.amount)
    })