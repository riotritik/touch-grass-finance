from django.contrib import admin
from django.urls import path
from users.views import connect_wallet
from stakes.views import create_stake
from rewards.views import dashboard
from proofs.views import upload_proof

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/auth/connect-wallet", connect_wallet),
    path("api/stake/create", create_stake),
    path("api/dashboard", dashboard),
    path("api/proofs/upload", upload_proof),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)