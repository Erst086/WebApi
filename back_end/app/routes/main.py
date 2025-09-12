from flask import Blueprint, jsonify

main_bp = Blueprint("main", __name__)

@main_bp.route("/public")
def public():
    return jsonify({"msg": "Bienvenido a la API pública"})
