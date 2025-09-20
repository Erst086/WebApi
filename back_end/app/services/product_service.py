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

def eliminar_producto(product_id):
    mongo.db.productos.delete_one({"_id": ObjectId(product_id)})

def buscar_producto_por_id(product_id):
    prod = mongo.db.productos.find_one({"_id": ObjectId(product_id)})
    if prod:
        prod["_id"] = str(prod["_id"])
        return prod
    return None