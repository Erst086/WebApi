import bcrypt

class User:
    def __init__(self, nombre, correo, telefono, username, password, role="user"):
        self.nombre = nombre
        self.correo = correo
        self.telefono = telefono
        self.username = username
        self.password = self.hash_password(password)
        self.role = role

    def hash_password(self, password):
        """Hashea la contraseña para almacenar en la base de datos"""
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    def check_password(self, password):
        """Verifica que la contraseña ingresada coincida con la almacenada"""
        return bcrypt.checkpw(password.encode("utf-8"), self.password)

    def to_dict(self):
        """Convierte el objeto en diccionario para MongoDB"""
        return {
            "nombre": self.nombre,
            "correo": self.correo,
            "telefono": self.telefono,
            "username": self.username,
            "password": self.password,
            "role": self.role
        }
