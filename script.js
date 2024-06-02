document.addEventListener('DOMContentLoaded', function() {
  // Check if the user is logged in
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    showOrderSection(user);
  }

  document.getElementById('home-btn').addEventListener('click', function() {
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('sign-up-form').style.display = 'none';
    document.getElementById('sign-in-form').style.display = 'none';
    document.getElementById('order-section').style.display = 'none';
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('aboutUs').style.display = 'none';
    document.getElementById('contactUs').style.display = 'none';
    document.getElementById('order-history-section').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';
  });

  document.getElementById('sidebar-btn').addEventListener('click', function() {
    document.getElementById('sidebar').style.display = 'block';

    
  });

  document.getElementById('contact-us-btn').addEventListener('click', function() {
    document.getElementById('contactUs').style.display = 'block';
    document.getElementById('sign-up-form').style.display = 'none';
    document.getElementById('sign-in-form').style.display = 'none';
    document.getElementById('order-section').style.display = 'none';
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('aboutUs').style.display = 'none';
    document.getElementById('order-history-section').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';
  });

  document.getElementById('about-us-btn').addEventListener('click', function() {
    document.getElementById('aboutUs').style.display = 'block';
    document.getElementById('sign-up-form').style.display = 'none';
    document.getElementById('sign-in-form').style.display = 'none';
    document.getElementById('order-section').style.display = 'none';
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('contactUs').style.display = 'none';
    document.getElementById('order-history-section').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';
  });

  document.getElementById('sign-in-btn').addEventListener('click', function() {
    document.getElementById('sign-in-form').style.display = 'block';
    document.getElementById('sign-up-form').style.display = 'none';
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('contactUs').style.display = 'none';
    document.getElementById('aboutUs').style.display = 'none';
  });

  document.getElementById('order-now-btn').addEventListener('click', function() {
    document.getElementById('order-section').style.display = 'block';
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('contactUs').style.display = 'none';
    document.getElementById('aboutUs').style.display = 'none';
    document.getElementById('order-history-section').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';
  });


  document.getElementById('history-btn').addEventListener('click', function() {
    document.getElementById('sign-in-form').style.display = 'none';
    document.getElementById('order-section').style.display = 'none';
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('contactUs').style.display = 'none';
    document.getElementById('aboutUs').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';

  });


  document.getElementById('sign-up-btn').addEventListener('click', function() {
    document.getElementById('sign-in-form').style.display = 'none';
    document.getElementById('sign-up-form').style.display = 'block';
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('contactUs').style.display = 'none';
    document.getElementById('aboutUs').style.display = 'none';
  });

  document.getElementById('place-order-button').addEventListener('click', function() {
    document.getElementById('order-section').style.display = 'none';
    document.getElementById('sign-up-form').style.display = 'none';
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('contactUs').style.display = 'none';
    document.getElementById('aboutUs').style.display = 'none';
  });

  document.getElementById('sign-in').addEventListener('submit', function(event) {
    event.preventDefault();
    const mobile = document.getElementById('sign-in-mobile').value;
    const password = document.getElementById('sign-in-password').value;

    fetch('/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mobile, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        showOrderSection(data.user);
        
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  });


  function getCurrentUserMobile() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.mobile : null;
  }


  document.getElementById('sign-up').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;

    fetch('/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, mobile, address, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Sign-up successful! You can now sign in.');
        document.getElementById('sign-up-form').style.display = 'none';
        document.getElementById('sign-in-form').style.display = 'block';
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error:', error));
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

        displayPaymentSection(data.order_id, data.food, data.drink, data.food_quantity, data.drink_quantity, data.food_price, data.drink_price, data.total_price, data.notes); // Show payment options after placing order
        localStorage.setItem('order', JSON.stringify(data));
        // Generate order summary and show it in an alert box
        // showOrderSummaryAlert(data.message, data.order_id, data.food, data.drink, data.food_quantity, data.drink_quantity, data.food_price, data.drink_price, data.total_price, data.notes);
    })
  
    .catch(error => {
      console.error(error); // Log any errors that occur
      alert('An error occurred while submitting your order.');
    });
  });
  

  function displayPaymentSection(orderId, food, drink, food_quantity, drink_quantity, food_price, drink_price, total_price, notes) {
    const paymentSection = document.getElementById('payment-section');
    const orderSummary = document.getElementById('order-summary');
    
    orderSummary.innerHTML = `
        <h3>Order ID: ${orderId}</h3>
        <p>Food: ${food} (Quantity: ${food_quantity}) - $${food_price.toFixed(2)}</p>
        <p>Drink: ${drink} (Quantity: ${drink_quantity}) - $${drink_price.toFixed(2)}</p>
        <p>Notes: ${notes}</p>
        <p>Total Price: $${total_price.toFixed(2)}</p>
    `;
  
    paymentSection.style.display = 'block';
  }
  

  //document.getElementById('pay-with-card').addEventListener('click', function() {
    //document.getElementById('card-details').style.display = 'block';
    //document.getElementById('submit-card-payment').style.display = 'block';
  //});
  
  document.getElementById('submit-card-payment').addEventListener('click', function() {
    // Process card payment here (e.g., integrate with a payment gateway)
    alert(`Payment failed, please choose pay on delivery`);
    
  });


  function getOrderDataFromLocalStorage() {
    const orderData = localStorage.getItem('order');
    return orderData ? JSON.parse(orderData) : null;
  }
  
  document.getElementById('pay-on-delivery').addEventListener('click', function() {
    const orderData = getOrderDataFromLocalStorage();
  
    if (orderData) {
      submitPaymentMethod(orderData.order_id, 'Pay on Delivery');
      showOrderSummaryAlert(
        orderData.message,
        orderData.order_id,
        orderData.food,
        orderData.drink,
        orderData.food_quantity,
        orderData.drink_quantity,
        orderData.food_price,
        orderData.drink_price,
        orderData.total_price,
        orderData.notes
      );
    } else {
      alert('Order submited');
    }
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('payment-section').style.display = 'none';
  });


  function showOrderSummaryAlert(message, orderId, food, drink, foodQuantity, drinkQuantity, foodPrice, drinkPrice, totalPrice, notes) {
    const summary = `
      ${message}
      Your order ID is: ${orderId}
      Food: ${food}
      Drink: ${drink}
      Food quantity: ${foodQuantity}
      Drink quantity: ${drinkQuantity}
      Food price: $${foodPrice.toFixed(2)}
      Drink price: $${drinkPrice.toFixed(2)}
      Total price: $${totalPrice.toFixed(2)}
      Notes: ${notes}

    `;
    alert(summary);
  }


  // Function to submit the payment method
function submitPaymentMethod(orderId, paymentMethod) {
  fetch('/submit-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ order_id: orderId, payment_method: paymentMethod })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      alert(data.message);
      
      
    } else {
      alert('Failed to submit payment method.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while submitting the payment method.');
  });
}

});



  function showOrderSection(user) {
    document.getElementById('sign-in-btn').style.display = 'none';
    document.getElementById('sign-up-btn').style.display = 'none';
    document.getElementById('sign-in-form').style.display = 'none';
    document.getElementById('sign-up-form').style.display = 'none';
    document.getElementById('sign-out-btn').style.display = 'block';
    document.getElementById('order-section').style.display = 'block';
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('sidebar-btn').style.display = 'block';
    document.getElementById('order-now-btn').style.display = 'block';
    
    document.getElementById('welcome-message').innerText = `Welcome, ${user.name}`;
    
    
    document.getElementById('phone').value = user.mobile;
    document.getElementById('address').value = user.address;
  }

  window.signOut = function() {
    localStorage.removeItem('user');
    alert("Signed out successfully!");
    document.getElementById('sign-in-btn').style.display = 'block';
    document.getElementById('sign-up-btn').style.display = 'block';
    document.getElementById('sign-out-btn').style.display = 'none';
    document.getElementById('order-section').style.display = 'none';
    document.getElementById('sidebar-btn').style.display = 'none';
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('order-section').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('order-now-btn').style.display = 'none';
    document.getElementById('contactUs').style.display = 'none';
    document.getElementById('aboutUs').style.display = 'none';
    document.getElementById('order-history-section').style.display = 'none';
    document.getElementById('payment-section').style.display = 'none';
  };



function signIn() {
  localStorage.setItem('signedIn', 'true');
  document.getElementById('sidebar-btn').style.display = 'inline-block';
  document.getElementById('sign-out-btn').style.display = 'inline-block';
}


function showSignedInState() {
  document.getElementById('sidebar-btn').style.display = 'inline-block';
  document.getElementById('sign-out-btn').style.display = 'inline-block';
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


function getCurrentUserMobile() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.mobile : null;
}


function fetchOrderHistory() {
  const mobile = getCurrentUserMobile(); // Get the current user's mobile number from local storage

  if (!mobile) {
    alert('User not signed in.');
    return;
  }

  fetch(`/order-history?mobile=${mobile}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      displayOrderHistory(data.orders);
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while fetching your order history.');
  });
}

function displayOrderHistory(orders) {
  const orderHistorySection = document.getElementById('order-history-section');
  const orderHistory = document.getElementById('order-history');
  orderHistory.innerHTML = ''; // Clear previous orders

  orders.forEach(order => {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';

    orderItem.innerHTML = `
      <h4>Order ID: ${order.id}</h4>
      <p>Food: ${order.food} (Quantity: ${order.food_quantity})</p>
      <p>Drink: ${order.drink} (Quantity: ${order.drink_quantity})</p>
      <p>Notes: ${order.notes}</p>
      <p>Food Price: $${order.food_price}</p>
      <p>Drink Price: $${order.drink_price}</p>
      <p>Total Price: $${order.total_price}</p>
      <p>Payment Method: $${order.payment_method}</p>
    `;

    orderHistory.appendChild(orderItem);
  });

  orderHistorySection.style.display = 'block'; // Show the order history section


}



function showSignedInState() {
  document.getElementById('sidebar-btn').style.display = 'inline-block';
  document.getElementById('sign-out-btn').style.display = 'inline-block';
  
}








