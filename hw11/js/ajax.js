// Use jQuery to perform an AJAX request to load data from the JSON file
$.ajax({
    url: 'data.json', // URL of the JSON file
    dataType: 'json', // Expected data type
    success: function(data) {
        // On successful data retrieval, set the background music from JSON data
        $('#backgroundMusic').attr('src', data.backgroundMusic);
    },
    error: function() {
        // Handle errors if the AJAX request fails
        console.error('Failed to load data from JSON file.');
    }
});
