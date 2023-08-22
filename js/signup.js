$(document).ready(function() {
  $('#signupForm').submit(function(event) {
    event.preventDefault();
    // Prevent the default form submission behavior

    const username = $('#username').val();
    const password = $('#password').val();
    const email = $('#email').val();
    const mobileNo = $('#mobileNo').val();

    const user = {
      username: username,
      password: password,
      email: email,
      mobileNo: mobileNo
    };

    $.ajax({
      url: 'https://se-group-12.uc.r.appspot.com/user',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(user),
      success: function(data) {
        console.log(data);// You can handle the response data here
        localStorage.setItem("userId", data)
        document.getElementById('index').click();
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
