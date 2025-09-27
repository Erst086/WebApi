from pymongo import MongoClient

client = MongoClient("mongodb+srv://nesgerxt:312908@apiwebcbr.aplhrsp.mongodb.net/apiwebCbr?retryWrites=true&w=majority")
db = client.get_database()
print(db.list_collection_names())
