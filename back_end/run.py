from app import create_app
from flask_cors import CORS

app = create_app()
CORS(app)  # Hola BUenas tarde o noches, esto debe de ir aqui :3

if __name__ == "__main__":
    app.run(debug=True)
