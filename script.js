document.addEventListener('DOMContentLoaded', function() {
  // Check if there is saved phone and address in localStorage
  if (localStorage.getItem('phone')) {
      document.getElementById('phone').value = localStorage.getItem('phone');
  }
  if (localStorage.getItem('address')) {
      document.getElementById('address').value = localStorage.getItem('address');
  }
});



document.getElementById('order-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  var food = document.getElementById('food').value;
  var drink = document.getElementById('drink').value;

  var food_quantity = Number(document.getElementById('food-quantity').value);
  var drink_quantity = Number(document.getElementById('drink-quantity').value);

  var phone = document.getElementById('phone').value;
  var address = document.getElementById('address').value;
  var notes = document.getElementById('notes').value;

  // Store phone and address in localStorage
  localStorage.setItem('phone', phone);
  localStorage.setItem('address', address);

  // Send data to server
  fetch('/submit-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ food: food, drink: drink, food_quantity: food_quantity, drink_quantity: drink_quantity, phone: phone, address: address, notes: notes })
  })

  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the response from the server
      // Generate order summary and show it in an alert box
      showOrderSummaryAlert(data.message, data.order_id, data.food_price, data.drink_price, data.total_price);
  })

  .catch(error => {
    console.error(error); // Log any errors that occur
    alert('An error occurred while submitting your order.');
  });
});

function showOrderSummaryAlert(message, orderId, foodPrice, drinkPrice, totalPrice) {
  const summary = `
    ${message}
    Your order ID is: ${orderId}
    Food price: $${foodPrice.toFixed(2)}
    Drink price: $${drinkPrice.toFixed(2)}
    Total price: $${totalPrice.toFixed(2)}
  `;
  alert(summary);
}

// Update the food and drink order input fields based on the user's selection
document.getElementById('food').addEventListener('change', function() {
  var foodOrderInput = document.getElementById('food-order');
  foodOrderInput.value = this.value;
});

document.getElementById('drink').addEventListener('change', function() {
  var drinkOrderInput = document.getElementById('drink-order');
  drinkOrderInput.value = this.value;
});



