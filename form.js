function initAutocomplete() {
    const addressInput = document.getElementById('address');
    const autocomplete = new google.maps.places.Autocomplete(addressInput);

    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        
        if (!place.geometry) {
            alert("No details available for input: '" + place.name + "'");
            return;
        }

        // Capture address, latitude, and longitude
        const address = place.formatted_address;
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();

        // Set hidden input values
        document.getElementById('latitude').value = latitude;
        document.getElementById('longitude').value = longitude;
    });
}

// Initialize autocomplete when the window loads
window.onload = function() {
    initAutocomplete();
};

document.getElementById('nowgo-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const address = document.getElementById('address').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    // Define the API endpoint and payload
    const apiEndpoint = 'https://api.nowgo.com/endpoint'; // Replace with actual endpoint
    const payload = {
        name: name,
        email: email,
        message: message,
        address: address,
        latitude: latitude,
        longitude: longitude
    };

    // Make the API call
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_TOKEN' // Replace with actual token if required
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Data successfully submitted to NowGo!');
        } else {
            alert('Failed to submit data: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting data.');
    });
});
