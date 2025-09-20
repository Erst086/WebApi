from pymongo import MongoClient
import os
from dotenv import load_dotenv
import random

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.get_default_database()
productos_col = db.productos

categorias = ["Resistor", "LED", "Capacitor", "Transistor", "Microcontrolador", "Potenciómetro", "Sensor", "Diodo", "Conector", "Relé"]
valores = ["10Ω", "100Ω", "1kΩ", "10kΩ", "5V", "3.3V", "100μF", "10μF", "BC547", "ATmega328P", "220Ω", "330Ω", "12V"]
descripciones = [
    "Paquete de 50 piezas",
    "Paquete de 20 piezas",
    "Paquete de 10 piezas",
    "Chip para Arduino",
    "Sensor de temperatura",
    "Componente electrónico",
    "Ideal para proyectos DIY",
    "Versión SMD",
    "Alta calidad",
    "Uso profesional",
]

productos = []
for i in range(500):
    categoria = random.choice(categorias)
    valor = random.choice(valores)
    descripcion = random.choice(descripciones)
    precio = random.randint(10, 300)
    nombre = f"{categoria} {valor}"
    productos.append({
        "nombre": nombre,
        "precio": precio,
        "descripcion": descripcion
    })


result = productos_col.insert_many(productos)
print(f"Se insertaron {len(result.inserted_ids)} productos.")
