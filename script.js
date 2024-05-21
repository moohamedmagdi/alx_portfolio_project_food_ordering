document.addEventListener('DOMContentLoaded', function() {
  // Check if there is saved phone and address in localStorage
  if (localStorage.getItem('phone')) {
      document.getElementById('phone').value = localStorage.getItem('phone');
  }
  if (localStorage.getItem('address')) {
      document.getElementById('address').value = localStorage.getItem('address');
  }
});
