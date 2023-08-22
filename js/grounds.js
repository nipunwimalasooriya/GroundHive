fetch('https://se-group-12.uc.r.appspot.com/location/list')
  .then(response => response.json())
  .then(data => {
    console.log("Printing");
    const gridData = data;
    const gridContainer = document.getElementById('grid-container');
    const searchInput = document.getElementById('search-input');

    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    gridContainer.style.marginLeft = '150px';
    gridContainer.style.marginRight = '150px';
    gridContainer.style.marginTop = '50px';
    gridContainer.style.marginBottom = '50px';

    function updateGrid() {
      gridContainer.innerHTML = '';

      const searchValue = searchInput.value.toLowerCase();

      gridData.forEach(location => {
        if (location.name.toLowerCase().includes(searchValue)) {
          const gridItem = document.createElement('div');
          gridItem.classList.add('grid-item');
          gridItem.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${location.imageUrls[0]})`;
          gridItem.style.backgroundSize = 'cover';
          const nameElement = document.createElement('h3');
          nameElement.textContent = location.name;

          const descriptionElement = document.createElement('p');
          descriptionElement.textContent = location.location;

          const link = document.createElement('a')
          link.href = "bookAGround.html?locationId=" + location.id;

          // Add click event listener to each grid item
          gridItem.addEventListener('click', () => {
            link.click()
          });

          gridItem.appendChild(nameElement);
          gridItem.appendChild(descriptionElement);

          gridContainer.appendChild(gridItem);
        }
      });
    }

    searchInput.addEventListener('input', updateGrid);
    updateGrid();
  })
  .catch(error => {
    console.error('API Error:', error);
  });
