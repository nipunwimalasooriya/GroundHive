document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".addAGround-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://se-group-12.uc.r.appspot.com/location", true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Successful response from the server
          console.log("Form submitted successfully!");
          // You can perform additional actions here if needed
        } else {
          // Error handling
          console.error("Form submission failed:", xhr.statusText);
        }
      }
    };
    xhr.send(formData);
  });
});
