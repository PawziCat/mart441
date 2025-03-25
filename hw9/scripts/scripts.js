$(document).ready(function() {
    // button click event to display the main container
    $('#display-button').click(function() {
        $('.button-container').hide(); // Hide the button container
        $('.main-container').show(); // Show the main container
        fetchAsteroidData(); // Fetch and display the asteroid data
    });

    // defines asteroid object
    let asteroid = {
        "designation": "4149880 (2011 AH37)",
        "Discovery Date": "January 7, 2011",
        "magnitude": "19.7H",
        "Distance": {
            "MOID (Minimum Orbit Intersection Distance)": "0.035 AU",
            "Perihelion Distance (q_au_1)": "0.84 AU",
            "Aphelion Distance (q_au_2)": "4.26 AU"
        },
        "Orbital Period (period-yr)": "4.06 years",
        "Inclination (i_deg)": "9.65 degrees",
        "PHA (Potentially Hazardous Asteroid)": "Yes",
        "Orbit Class": "Apollo"
    };

    // function displays the asteroid object
    function displayAsteroidObject() {
        var asteroidContainer = $('#asteroid-data'); // Get the container element
        asteroidContainer.empty(); // Clear any existing content

        var asteroidElement = $('<div class="asteroid"></div>'); // Create a new div for the asteroid
        asteroidElement.append('<h2>' + asteroid.designation + '</h2>'); // Add the designation
        asteroidElement.append('<p><strong>Discovery Date:</strong> ' + asteroid["Discovery Date"] + '</p>'); // Add the discovery date
        asteroidElement.append('<p><strong>Magnitude:</strong> ' + asteroid.magnitude + '</p>'); // Add the magnitude
        asteroidElement.append('<p><strong>MOID (Minimum Orbit Intersection Distance):</strong> ' + asteroid.Distance["MOID (Minimum Orbit Intersection Distance)"] + '</p>'); // Add the MOID
        asteroidElement.append('<p><strong>Perihelion Distance (q_au_1):</strong> ' + asteroid.Distance["Perihelion Distance (q_au_1)"] + '</p>'); // Add the perihelion distance
        asteroidElement.append('<p><strong>Aphelion Distance (q_au_2):</strong> ' + asteroid.Distance["Aphelion Distance (q_au_2)"] + '</p>'); // Add the aphelion distance
        asteroidElement.append('<p><strong>Orbital Period (period-yr):</strong> ' + asteroid["Orbital Period (period-yr)"] + '</p>'); // Add the orbital period
        asteroidElement.append('<p><strong>Inclination (i_deg):</strong> ' + asteroid["Inclination (i_deg)"] + '</p>'); // Add the inclination
        asteroidElement.append('<p><strong>PHA (Potentially Hazardous Asteroid):</strong> ' + asteroid["PHA (Potentially Hazardous Asteroid)"] + '</p>'); // Add the PHA status
        asteroidElement.append('<p><strong>Orbit Class:</strong> ' + asteroid["Orbit Class"] + '</p>'); // Add the orbit class
        asteroidContainer.append(asteroidElement); // Append the asteroid element to the container

        // applys jQuery plugin to the asteroid container
        asteroidContainer.asteroidPlugin();
    }

    // jQuery plugin definition
    $.fn.asteroidPlugin = function() {
        // loop through each asteroid element
        this.find('.asteroid').each(function() {
            var magnitude = parseFloat($(this).find('p:contains("Magnitude")').text().split(': ')[1]); // Get the magnitude value
            if (magnitude < 20) {
                // sets background color to blue for magnitude less than 20
                $(this).css('background-color', '#5677967e');
            } else {
                // sets background color to red for magnitude 20 or greater
                $(this).css('background-color', '#7c294e7c');
            }
        });
        return this; // returns the jQuery object for chaining
    };
});