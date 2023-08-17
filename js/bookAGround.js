function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener("DOMContentLoaded",
  function () {
    var locationId = getParameterByName('locationId');
    var locationDetails = document.getElementById('location-details');
    var locationName = document.getElementById('location-name');
    var locationLocation = document.getElementById('location-location');
    var imageContainer = document.getElementById('image-container');
    var locationDescription = document.getElementById('location-description');

// Fetch location details based on locationId using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/location?id=' + locationId, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          console.log(data)
          locationName.textContent = data.name;
          locationLocation.textContent = data.location;
          locationDescription.textContent = data.description;
          imageContainer.style.backgroundImage = `url(${data.imageUrls[0]})`;
          imageContainer.style.backgroundSize = 'cover';
        } else {
          console.error('API Error:', xhr.status, xhr.statusText);
          locationDetails.innerHTML = '<p>Error fetching location details.</p>';
        }
      }
    };
    xhr.send();
  });
$(document).ready(function() {
  $('#bookingForm').submit(function(event) {
    event.preventDefault();
    // Prevent the default form submission behavior

    const name = $('#name').val();
    const selectedDate = $('#selectedDate').val();
    const startTime = selectedDate + "T" + $('#startTime').val();
    const endTime = selectedDate + "T" + $('#endTime').val();
    const user = localStorage.getItem("userId");
    const location = getParameterByName("locationId");

    const bookingData = {
      name: name,
      startTime: startTime,
      endTime: endTime,
      user: user,
      location: location
    };


    $.ajax({
      url: 'http://localhost:8080/booking',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(bookingData),
      success: function(data) {
        console.log(data);// You can handle the response data here

      },
      error: function(error) {
        console.error('Error:', error);
      }
    });
  });
});
