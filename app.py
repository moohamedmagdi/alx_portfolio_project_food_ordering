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

@app.route('/submit-order', methods=['POST'])
def submit_order():
    data = request.get_json()
    food = data.get('food')
    drink = data.get('drink')
    phone = data.get('phone')
    address = data.get('address')
    notes = data.get('notes')

    food_price = get_item_price(food)
    drink_price = get_item_price(drink)
    total_price = food_price + drink_price

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Insert the order into the database
    cursor.execute('''
        INSERT INTO orders (food, drink, phone, address, notes)
        VALUES (?, ?, ?, ?, ?)
    ''', (food, drink, phone, address, notes))
    conn.commit()

    # Fetch the ID of the last inserted order
    cursor.execute('SELECT id FROM orders ORDER BY id DESC LIMIT 1')
    order_id = cursor.fetchone()[0]

    conn.close()

    # Return the order ID and success message as JSON response
    return jsonify({
        'message': 'Order submitted successfully!, call 19191 to check your order delivery status.', 
        'order_id': order_id,
        'food_price': food_price,
        'drink_price': drink_price,
        'total_price': total_price
        })



if __name__ == '__main__':
    create_orders_table()
    app.run(port=8080)

