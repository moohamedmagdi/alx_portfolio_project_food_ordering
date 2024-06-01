from flask import Flask, request, jsonify
import sqlite3
import hashlib


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
            notes TEXT,
            food_quantity INTEGER,
            drink_quantity INTEGER
            food_price REAL,
            drink_price REAL,
            total_price REAL
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


@app.route('/sign-up', methods=['POST'])
def sign_up():
    data = request.get_json()
    name = data.get('name')
    mobile = data.get('mobile')
    address = data.get('address')
    password = data.get('password')

    # Hash the password
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (name, mobile, address, password) VALUES (?, ?, ?, ?)',
                       (name, mobile, address, hashed_password))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except sqlite3.IntegrityError:
        return jsonify({'success': False, 'message': 'User already exists'})

@app.route('/sign-in', methods=['POST'])
def sign_in():
    data = request.get_json()
    mobile = data.get('mobile')
    password = data.get('password')

    # Hash the password
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE mobile = ? AND password = ?',
                   (mobile, hashed_password))
    user = cursor.fetchone()
    conn.close()

    if user:
        user_data = {
            'name': user[0],
            'mobile': user[1],
            'address': user[2] if len(user) > 2 else '',  # Check if address exists in tuple
            'password': user[3] if len(user) > 3 else ''  # Check if password exists in tuple
        }
        return jsonify({'success': True, 'user': user_data})
    else:
        return jsonify({'success': False, 'message': 'Invalid mobile or password'})


@app.route('/submit-order', methods=['POST'])
def submit_order():
    data = request.get_json()
    food = data.get('food')
    drink = data.get('drink')
    phone = data.get('phone')
    address = data.get('address')
    notes = data.get('notes')
    food_quantity = data.get('food_quantity')
    drink_quantity = data.get('drink_quantity')
    

    food_price = get_item_price(food) * food_quantity
    drink_price = get_item_price(drink) * drink_quantity
    total_price = food_price + drink_price

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Insert the order into the database
    cursor.execute('''
        INSERT INTO orders (food, drink, phone, address, notes, food_quantity, drink_quantity, food_price, drink_price, total_price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (food, drink, phone, address, notes, food_quantity, drink_quantity, food_price, drink_price, total_price))
    conn.commit()

    # Fetch the ID of the last inserted order
    cursor.execute('SELECT id FROM orders ORDER BY id DESC LIMIT 1')
    order_id = cursor.fetchone()[0]

    conn.close()

    # Return the order ID and success message as JSON response
    return jsonify({
        'message': 'Order submitted successfully!, call 19191 to check your order delivery status.', 
        
        'order_id': order_id,
        'food': food,
        'drink': drink,
        'food_quantity': food_quantity,
        'drink_quantity': drink_quantity,
        'food_price': food_price,
        'drink_price': drink_price,
        'total_price': total_price,
        'notes': notes
        
        })



@app.route('/order-history', methods=['GET'])
def order_history():
    mobile = request.args.get('mobile')
    
    if not mobile:
        return jsonify({'status': 'error', 'message': 'User not signed in.'})

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM orders WHERE phone = ? ORDER BY id DESC', (mobile,))
    orders = cursor.fetchall()
    conn.close()

    orders_list = [
        {
            'id': order[0],
            'food': order[1],
            'drink': order[2],
            'food_quantity': order[6],
            'drink_quantity': order[7],
            'notes': order[5],
            'food_price': order[8],
            'drink_price': order[9],
            'total_price': order[10],
            'payment_method':order[11]
        } for order in orders
    ]

    return jsonify({'status': 'success', 'orders': orders_list})



@app.route('/submit-payment', methods=['POST'])
def submit_payment():
    data = request.get_json()
    order_id = data.get('order_id')
    payment_method = data.get('payment_method')

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE orders
        SET payment_method = ?
        WHERE id = ?
    ''', (payment_method, order_id))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'Payment method submitted successfully.'})



if __name__ == '__main__':
    create_orders_table()
    app.run(port=8080)

