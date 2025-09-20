from app import mongo
from app.models.user import User
from bson import ObjectId

def create_user(data):
    """Crea un usuario en la BD si no existe"""
    user = User(**data)
    if mongo.db.users.find_one({"username": user.username}):
        return None, "Usuario ya existe"
    if mongo.db.users.find_one({"correo": user.correo}):
        return None, "Correo ya registrado"
    
    mongo.db.users.insert_one(user.to_dict())
    return user, None

def get_user_by_username(username):
    """Obtiene un usuario de la BD por username"""
    return mongo.db.users.find_one({"username": username})

def get_user_by_id(user_id):
    """Obtiene un usuario de la BD por su ID"""
    try:
        return mongo.db.users.find_one({"_id": ObjectId(user_id)})
    except Exception:
        return None
def delete_user_by_id(user_id):
    """Elimina un usuario de la BD por su ID"""
    try:
        result = mongo.db.users.delete_one({"_id": ObjectId(user_id)})
        return result.deleted_count > 0
    except Exception:
        return False
