from app import mongo
from bson import ObjectId
from app.models.product import Producto

def crear_producto(data):
    prod = Producto(**data)
    mongo.db.productos.insert_one(prod.to_dict())
    return prod

def obtener_productos():
    productos = list(mongo.db.productos.find())
    for p in productos:
        p["_id"] = str(p["_id"])
    return productos

def actualizar_precio(product_id, nuevo_precio):
    mongo.db.productos.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": {"precio": nuevo_precio}}
    )
