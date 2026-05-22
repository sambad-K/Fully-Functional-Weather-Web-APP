from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from decouple import config
# Create your views here.
API_KEY=config("API_KEY")
@api_view(["POST"])
def weather(request):
    city=request.data.get("city")
    link=f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={API_KEY}"
    info=requests.get(link).json()
    if not info:
        return Response({"error":"City not found"},status=404)
    lat=info[0]["lat"]
    lon=info[0]["lon"]
    country=info[0]["country"]
    link2=f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    info2=requests.get(link2).json()
    return Response({"weather_response":info2,"country":country})