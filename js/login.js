$(document).ready(function() {
  const indexLink = document.getElementById('user-link');
  console.log(localStorage.getItem("userId"))
  if(localStorage.getItem("userId")) {
    // indexLink.click()
  }
  $('#loginForm').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const userName = $('input[name="username"]').val();
    const password = $('input[name="password"]').val();
    const url = `http://localhost:8080/user/login?userName=${userName}&password=${password}`;

    $.ajax({
      url: url,
      method: 'GET',
      success: function(data) {
        console.log(data); // You can handle the response data here
        localStorage.setItem("userId", data);
        showSnackbar('Login successful'); // Show success message
        indexLink.click();
      },
      error: function(error) {
        console.error('Error:', error);
        showSnackbar(error.responseText); // Show error message
      }
    });
  });
  function showSnackbar(message) {
    var x = document.getElementById("snackbar")
    snackbar.innerText = message;
    snackbar.className = 'show';
    setTimeout(function() {snackbar.className = snackbar.className.replace('show', '');}, 3000); // Display for 3 seconds
  }
});
