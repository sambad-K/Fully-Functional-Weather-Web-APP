from rest_framework import serializers

class WeatherSerializer(serializers.ModelSerializer):
    city = serializers.CharField(max_length=100)