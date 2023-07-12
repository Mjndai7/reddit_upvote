from django.contrib import admin

from .models import CustomUser, userProfile

admin.site.register(CustomUser)

class userProfileAdmin(admin.ModelAdmin):
    list_display = ('email', 'user', 'phone_no','public_id')
    list_display_links = ('user', 'public_id')
    search_fields = ('user', 'phone_no', 'email', 'is_active', 'is_staff')
    list_per_page = 25

admin.site.register(userProfile, userProfileAdmin)