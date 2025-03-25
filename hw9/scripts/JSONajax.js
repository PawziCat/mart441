// function to display the asteroid data
function displayAsteroidData(data) {
    var asteroidContainer = $('#asteroid-data'); // get the container element
    asteroidContainer.empty(); // clear any existing content

    // loop through each asteroid in the data
    data.forEach(function(asteroid) {
        var asteroidElement = $('<div class="asteroid"></div>'); // create a new div for each asteroid
        asteroidElement.append('<h2>' + asteroid.designation + '</h2>'); // add the designation
        asteroidElement.append('<p><strong>Discovery Date:</strong> ' + asteroid.discovery_date + '</p>'); // add the discovery date
        asteroidElement.append('<p><strong>Magnitude:</strong> ' + asteroid.h_mag + '</p>'); // add the magnitude
        asteroidElement.append('<p><strong>MOID Minimum Orbit Intersection Distance (AU):</strong> ' + asteroid.moid_au + '</p>'); // add the MOID
        asteroidElement.append('<p><strong>Perihelion Distance (AU):</strong> ' + asteroid.q_au_1 + '</p>'); // add the q_au_1
        asteroidElement.append('<p><strong>Aphelion Distance (AU):</strong> ' + asteroid.q_au_2 + '</p>'); // add the q_au_2
        asteroidElement.append('<p><strong>Orbital Period (yr):</strong> ' + asteroid.period_yr + '</p>'); // add the period_yr
        asteroidElement.append('<p><strong>Inclination:</strong> ' + asteroid.i_deg + '</p>'); // add the i_deg
        asteroidElement.append('<p><strong>PHA (potentially hazardous asteroid):</strong> ' + asteroid.pha + '</p>'); //add the PHA (potentially hazardous asteroid)
        asteroidElement.append('<p><strong>Orbit Class:</strong> ' + asteroid.orbit_class + '</p>'); // add the orbit class
        asteroidContainer.append(asteroidElement); // append the asteroid element to the container
    });

    // applies the jQuery plugin to the asteroid container
    asteroidContainer.asteroidPlugin();
}