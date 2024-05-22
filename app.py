from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

DATABASE = 'food_ordering.db'

# Create the "orders" table if it doesn't exist
def create_orders_table():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            food TEXT,
            drink TEXT,
            phone TEXT,
            address TEXT,
            notes TEXT
        )
    ''')
    conn.commit()
    conn.close()

def get_item_price(item):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT price FROM items WHERE item = ?', (item,))
    price = cursor.fetchone()
    conn.close()
    return price[0] if price else 0.0


