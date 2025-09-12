import os
from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

# Instancia global
mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configuración desde .env
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    print("MONGO_URI desde .env:", os.getenv("MONGO_URI"))

    # Inicializa mongo con la app
    mongo.init_app(app)

    # Importa rutas después de inicializar mongo
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    return app
