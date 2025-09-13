from app import create_app
from flask_cors import CORS

app = create_app()
CORS(app)  # Esto debe ir aquí, antes de app.run()

if __name__ == "__main__":
    app.run(debug=True)
