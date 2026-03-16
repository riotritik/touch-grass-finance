"""
Starkzap Service Layer
----------------------

This service acts as a safe abstraction layer between
the backend and Starknet blockchain operations.

IMPORTANT

Starkzap SDK is TypeScript based.
Real blockchain transactions are executed in the frontend.

Backend responsibilities:

• Validate transaction metadata
• Store stake records
• Provide pool parameters
• Verify tx hashes
"""

from decimal import Decimal
import re


class StarkzapService:

    """
    Wrapper class for Starkzap related operations.
    """

    TX_HASH_REGEX = r"^0x[a-fA-F0-9]{3,}$"

    @staticmethod
    def validate_tx_hash(tx_hash: str) -> bool:
        """
        Basic validation for Starknet transaction hash.
        """
        if not tx_hash:
            return False

        return re.match(StarkzapService.TX_HASH_REGEX, tx_hash) is not None


    @staticmethod
    def deposit_asset(wallet_address: str, amount: Decimal):
        """
        Prepare deposit parameters for Starkzap.

        Real deposit occurs in frontend via Starkzap SDK.

        Returns payload used by frontend.
        """

        if amount <= 0:
            raise ValueError("Invalid deposit amount")

        payload = {
            "wallet": wallet_address,
            "amount": str(amount),
            "network": "starknet",
            "action": "deposit"
        }

        return payload


    @staticmethod
    def enter_yield_pool(wallet_address: str, amount: Decimal):
        """
        Prepare parameters for entering yield pool.

        TODO:
        Replace with actual Starkzap pool integration
        when SDK pool APIs are confirmed.
        """

        payload = {
            "wallet": wallet_address,
            "amount": str(amount),
            "pool": "default_starkzap_pool",
            "action": "enter_pool"
        }

        return payload


    @staticmethod
    def withdraw_asset(wallet_address: str, amount: Decimal):
        """
        Prepare withdraw request.

        Actual transaction handled in frontend.
        """

        payload = {
            "wallet": wallet_address,
            "amount": str(amount),
            "action": "withdraw"
        }

        return payload


    @staticmethod
    def estimate_daily_yield(amount: Decimal):
        """
        Simple APR estimation.

        TODO:
        Replace with Starkzap pool APR query
        when pool APIs are available.
        """

        apr = Decimal("0.08")  # 8% example APR

        daily_yield = (amount * apr) / Decimal("365")

        return round(daily_yield, 6)