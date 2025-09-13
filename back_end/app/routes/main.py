from flask import Blueprint, jsonify
from app.utils.security import token_required

main_bp = Blueprint("main", __name__)

# Dashboard para cualquier usuario autenticado
@main_bp.route("/dashboard")
@token_required()  
def dashboard(user):
    return jsonify({
        "msg": f"Bienvenido {user['username']}!",
        "role": user["role"]
    }), 200

# Panel exclusivo para admin
@main_bp.route("/admin")
@token_required(role="admin")
def admin_panel(user):
    return jsonify({
        "msg": f"Panel de administración para {user['username']}",
        "role": user["role"]
    }), 200
