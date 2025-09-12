import os
from dotenv import load_dotenv

load_dotenv()  # carga variables del .env

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "clave_default")
    MONGO_URI = os.environ.get("MONGO_URI", "")
