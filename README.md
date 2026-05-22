# 🌦️ Weather App (Django + React)

A full-stack weather application built using Django REST Framework (backend) and React (frontend). It fetches real-time weather data from OpenWeather API based on city input.

## 🚀 Features
- Search weather by city name
- Real-time weather data
- Temperature in Celsius
- Humidity and weather description
- REST API using Django REST Framework
- React frontend interface
- Secure API key management using .env

## 🛠️ Tech Stack
Backend: Django, Django REST Framework, Requests, python-decouple  
Frontend: React.js, Fetch/Axios, HTML, CSS  
API: OpenWeather API

## 📁 Project Structure
weather-app/
├── backend/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── .env
│   ├── requirements.txt
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── app/
│       ├── views.py
│       ├── urls.py
│       ├── models.py
│       └── serializers.py
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── components/
└── README.md

## ⚙️ Backend Setup (Django)

git clone https://github.com/your-username/weather-app.git  
cd weather-app/backend  

python -m venv venv  

# activate environment  
# Windows  
venv\Scripts\activate  
# Mac/Linux  
source venv/bin/activate  

pip install -r requirements.txt  

Create .env file:  
API_KEY=your_openweather_api_key  

python manage.py migrate  
python manage.py runserver  

Backend runs at: http://127.0.0.1:8000/

## 🎨 Frontend Setup (React)

cd ../frontend  
npm install  
npm start  

Frontend runs at: http://localhost:3000/

## 🔗 API Endpoint

POST /weather/

Request:
{
  "city": "Kathmandu"
}

Response:
{
  "city": "Kathmandu",
  "temperature": 24,
  "weather": "clear sky",
  "humidity": 60
}

## 🔐 Environment Variables
API_KEY=your_openweather_api_key

## 📌 Notes
- Do not upload .env file to GitHub
- Enable CORS for frontend-backend connection
- Keep API keys secret

## 🚀 Future Improvements
- 7-day forecast
- Location-based weather
- Search history
- UI improvements
- Deployment (Render + Vercel)

## 👨‍💻 Author
Your Name  
Computer Engineering Student | Backend Developer

## ⭐ Support
If you like this project, give it a star
