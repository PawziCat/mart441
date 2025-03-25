// AJAX request to fetch the JSON data from the external link
function fetchAsteroidData() {
    $.ajax({
        url: 'https://data.nasa.gov/resource/2vr3-k9wn.json', // URL for the external JSON file
        dataType: 'json', // data type expected from the server
        success: function(data) {
            // call the function to display the data on success
            displayAsteroidData(data);
        },
        error: function() {
            // displays an error message if the request fails
            $('#asteroid-data').html('<p>Error loading data.</p>');
        }
    });
}