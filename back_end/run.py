from app import create_app
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = create_app()
CORS(app)  
print("MONGO_URI =", os.environ.get("MONGO_URI"))

if __name__ == "__main__":
    app.run(debug=True)
