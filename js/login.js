$(document).ready(function() {
  const indexLink = document.getElementById('index');
  console.log(localStorage.getItem("userId"))
  if(localStorage.getItem("userId")) {
    indexLink.click()
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
        localStorage.setItem("userId", data)
        indexLink.click()
      },
      error: function(error) {
        console.error('Error:', error);
      }
    });
  });
});
