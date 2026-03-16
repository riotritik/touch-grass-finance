from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.models import User
from stakes.models import Stake
from proofs.models import Proof
from services.starkzap_service import StarkzapService

from decimal import Decimal, InvalidOperation
from django.db.models import Sum
from datetime import date, timedelta


@api_view(["GET"])
def dashboard(request):

    wallet = request.GET.get("wallet_address")

    if not wallet:
        return Response({"error": "wallet_address required"}, status=400)

    try:
        user = User.objects.get(wallet_address=wallet)
    except User.DoesNotExist:
        return Response({"error": "user not found"}, status=404)

    # -----------------------------
    # TOTAL STAKED AMOUNT
    # -----------------------------
    total = Stake.objects.filter(
        user=user,
        status="confirmed"
    ).aggregate(total=Sum("amount"))

    stake_amount = Decimal("0")

    if total["total"]:
        try:
            stake_amount = Decimal(str(total["total"]))
        except (InvalidOperation, TypeError):
            stake_amount = Decimal("0")

    # -----------------------------
    # STREAK CALCULATION
    # -----------------------------
    proofs = Proof.objects.filter(user=user).order_by("-proof_date")

    streak = 0
    current_day = date.today()

    for proof in proofs:

        if proof.proof_date == current_day:
            streak += 1
            current_day -= timedelta(days=1)

        elif proof.proof_date == current_day - timedelta(days=1):
            streak += 1
            current_day -= timedelta(days=1)

        else:
            break

    # -----------------------------
    # CHECK IF TODAY PROOF EXISTS
    # -----------------------------
    today_proof = Proof.objects.filter(
        user=user,
        proof_date=date.today()
    ).first()

    today_verified = False

    if today_proof and today_proof.verified:
        today_verified = True

    # -----------------------------
    # DAILY YIELD
    # -----------------------------
    daily_yield = StarkzapService.estimate_daily_yield(stake_amount)

    # -----------------------------
    # YIELD LOCK SYSTEM
    # -----------------------------
    yield_unlocked = today_verified

    if not yield_unlocked:
        daily_yield = Decimal("0")

    # -----------------------------
    # RESPONSE
    # -----------------------------
    data = {
        "stake_amount": str(stake_amount),
        "daily_yield": str(daily_yield),
        "streak": streak,
        "today_proof_status": today_verified,
        "yield_unlocked": yield_unlocked
    }

    return Response(data)