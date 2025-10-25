# app/__init__.py
from flask import Flask, send_from_directory
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from dotenv import load_dotenv

mongo = PyMongo()
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Config
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    
    # Inicializa CORS
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # Inicializa Mongo
    mongo.init_app(app)

    # Importa y registra blueprints
    from app.routes.auth import auth_bp
    from app.routes.main import main_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(main_bp, url_prefix="/main")

    # Importa y registrar productos
    from app.routes.productos import productos_bp
    app.register_blueprint(productos_bp, url_prefix="/productos")

    @app.route('/robots.txt')
    def robots_txt():
    # Busca robots.txt en la raíz del proyecto
        return send_from_directory(os.path.dirname(os.path.dirname(__file__)), 'robots.txt', mimetype='text/plain')

    return app
