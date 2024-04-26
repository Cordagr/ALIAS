// Function to display trail information on the page
function displayTrails(trails) {
  const trailsHtml = trails.map(trail => {
    return `
      <div class="trail">
        <h2>${trail.name}</h2>
        <p><strong>Rating:</strong> ${trail.avgRating} (${trail.numReviews} reviews)</p>
        <p><strong>Description:</strong> ${trail.description}</p>
        <p><strong>Location:</strong> ${trail.city}, ${trail.region}, ${trail.country}</p>
        <p><strong>Length:</strong> ${trail.length} miles</p>
      </div>
    `;
  }).join('');

  document.getElementById('trails').innerHTML = trailsHtml;
}


document.getElementById('saveTrailForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const length = document.getElementById('length').value;

  try {
    // Make a POST request to save the trail
    const response = await axios.post('/api/trails/save', { name, location, length });
    console.log(response.data.message);

    // Optionally, display a success message or redirect to another page
  } catch (error) {
    console.error('Error saving trail:', error);
    // Display error message to the user
  }
});



// Fetch all trails from the server and display them
async function fetchAndDisplayTrails() {
  try {
    const response = await axios.get('/api/trails'); // Assuming endpoint for fetching trails is /api/trails
    const trails = response.data;
    displayTrails(trails);
  } catch (error) {
    console.error('Error fetching trails:', error);
    document.getElementById('trails').textContent = 'Error: Unable to fetch trails';
  }
}

// Call fetchAndDisplayTrails when the page is loaded
fetchAndDisplayTrails();
