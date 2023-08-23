$(document).ready(function () {

  const userId = localStorage.getItem("userId")
  if(!userId) {
    document.getElementById("login-link").click();
  }



  $.ajax({
    url: 'https://se-group-12.uc.r.appspot.com/user/get?id=' + userId,
    method: 'GET',
    success: function (data) {
      document.getElementById('username').textContent = data.username
      document.getElementById('email').textContent = data.email
      document.getElementById('phone-num').textContent = data.mobileNo
    },
    error: function (error) {
      console.log(error)
    }
  })

  $.ajax({
    url: 'https://se-group-12.uc.r.appspot.com/booking?userId=' + userId,
    method: 'GET',
    success: function (data) {
      const grid = document.getElementById('booking-list')
      let i = 1;
      data.forEach(booking => {
        const gridItem = document.createElement('div')
        gridItem.setAttribute("id", "booking")

        const bookingNo = document.createElement('h2')
        bookingNo.setAttribute('id','booking-no')
        bookingNo.textContent = i++;


        const bookingItem = document.createElement('div')
        bookingItem.setAttribute('id', 'booking-itm')
        bookingItem.appendChild(bookingNo)
        gridItem.appendChild(bookingItem)

        const bookingGround = document.createElement('div')
        bookingGround.setAttribute('id', 'booking-ground')

        const bookingName = document.createElement('h2')
        bookingName.setAttribute('id', 'locationName')
        console.log(bookingName)
        const bookingLocation = document.createElement('h3')
        bookingLocation.setAttribute('id', 'location')
        $.ajax({
          url: 'https://se-group-12.uc.r.appspot.com/location?id=' + booking.location,
          method: 'GET',
          success: function (data) {
            bookingName.textContent = data.name
            bookingLocation.textContent = data.location
            console.log("name" + data.name)
          },
          error: function (error) {
            console.log(error)
          }
        })

        bookingGround.appendChild(bookingName)
        bookingGround.appendChild(bookingLocation)

        gridItem.appendChild(bookingGround)

        const bookingTime = document.createElement('div')
        bookingTime.setAttribute('id', 'booking-time')

        const date = document.createElement('p')
        date.setAttribute('id', 'date')
        let startTimeSplit = booking.startTime.split("T");
        date.textContent = startTimeSplit[0]
        bookingTime.appendChild(date)


        const startTime = document.createElement('p');
        startTime.setAttribute('id','start-time')
        startTime.textContent = startTimeSplit[1].split(".")[0]
        bookingTime.appendChild(startTime)

        const endTime = document.createElement('p');
        endTime.setAttribute('id','end-time')
        endTime.textContent = booking.endTime.split("T")[1].split(".")[0]
        bookingTime.appendChild(endTime)

        gridItem.appendChild(bookingTime)




        grid.appendChild(gridItem)

      //   <div id="booking-itm">
      //     <h2 id="booking-no">1</h2>
      // </div>
      //   <div id="booking-ground">
      //     <h2 id="name">Matta</h2>
      //     <h3 id="location">gfjdkdykdtyktkdt</h3>
      //   </div>
      //   <div id="booking-time">
      //     <p id="date">2023/06/04</p>
      //     <p id="start-time">07.25</p>
      //     <p id="end-time">9.25</p>
      //   </div>
      //

      })
      console.log( "Bookings:" + data[0].id)
    },
    error: function (error) {
      console.log(error)
    }
  })


// Function to perform logout by clearing local storage
  function logout() {
    // Clear local storage
    localStorage.clear();

    // Redirect the user to the login page or any other desired page
    // window.location.href = "login.html"; // Replace with the appropriate URL
    document.getElementById("login-link").click()
  }

// Example: Attach the logout function to a logout button or link
  const logoutButton = document.getElementById("logoutButton"); // Replace with the appropriate element ID
  logoutButton.addEventListener("click", logout);
})
