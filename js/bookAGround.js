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

document.getElementsByClassName('addAGround-form flex').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  // Get the selected date value
  const selectedDate = document.getElementById('selectedDate').value;

  // You can perform further processing with the selected date, such as validation or sending it to a server
  console.log('Selected date:', selectedDate);
});

document.getElementsByClassName('addAGround-form flex').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  // Get the selected start and end times
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  // You can perform further processing with the selected times, such as validation or calculations
  console.log('Start Time:', startTime);
  console.log('End Time:', endTime);
});
