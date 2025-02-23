document.addEventListener("DOMContentLoaded", function () {
    const introForm = document.getElementById("introForm");
    if (introForm) {
        // event listener for the form submission
        introForm.addEventListener("submit", function (event) {
            event.preventDefault(); // prevents empty or partially filled form from submitting
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const age = document.getElementById("age").value;
            // creates a JSON object to store player data
            const playerData = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                attempts: 0 // initialize attempts set to zero
            };
            // stores player data in local storage
            localStorage.setItem("playerData", JSON.stringify(playerData));
            // redirect to the memory matching game page
            window.location.href = "memory.html";
        });
    }

    // Memory Matching Game Page
    const gameBoard = document.getElementById("gameBoard");
    if (gameBoard) {
        // image paths for the blank and actual images
        const blankImage = './images/logo-concept-pink.jpg'; // blank images - shows the back of the cards
        const actualImages = [
            './images/what-lies-between.jpg', './images/placeholder-blue.jpg',
            './images/placeholder-green.jpg', './images/placeholder-white.jpg',
            './images/self-portrait.jpg', './images/ban-frog.jpg' // actual images - shows the faces of the cards
        ];
        let blankArray = new Array(12).fill(blankImage); // array for blank images
        let imageArray = []; // image array - shows face of cards
        let firstSelection = null; // first card flipped
        let secondSelection = null; // second card flipped
        let isProcessing = false; // this prevents the player from multiclicking while waiting for script to run
        let attempts = 0; // counts the number of attempts

        // this allows the function to shuffle an array (i am using a fisher-yates algorithm)
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // this fills the imageArray with two copies of each image
        actualImages.forEach(image => {
            imageArray.push(image, image); // each image appears two times
        });

        // this shuffles the images to random positions
        imageArray
        shuffle(imageArray);

        // this function arranges the blank images on the grid
        function displayImages() {
            gameBoard.innerHTML = ''; // clear the game board
            blankArray.forEach((img, index) => {
                let imgElement = document.createElement('img');
                imgElement.src = img;
                imgElement.dataset.index = index;
                imgElement.addEventListener('click', () => revealImage(index)); // this addEvenListener displays the blank  images on the grid when start is clicked
                gameBoard.appendChild(imgElement);
            });
        }

        // this function reveals the actual image when a blank image is clicked
        function revealImage(index) {
            if (isProcessing || blankArray[index] !== blankImage) return; // this prevents double clicks that can cause lags, latency delays and crashes
            blankArray[index] = imageArray[index]; // show the actual image
            displayImages();
            if (firstSelection === null) {
                firstSelection = index; // store the first selection
            } else if (secondSelection === null) {
                secondSelection = index; // store the second selection
                isProcessing = true; // process if pair match
                setTimeout(checkMatch, 1000); // delay before checking for a match
            }
        }

        // this function checks to see if the two images match
        function checkMatch() {
            attempts++; // attempt counter - goes up in incraments
            if (imageArray[firstSelection] !== imageArray[secondSelection]) {
                blankArray[firstSelection] = blankImage; // if the two don't match, this flips them back over
                blankArray[secondSelection] = blankImage;
            }
            // this resets card selections if they are wrong
            firstSelection = null;
            secondSelection = null;
            isProcessing = false;
            displayImages();
            // this checks if all cards are matched
            if (blankArray.every(img => img !== blankImage)) {
                // this updates player data with the final attempt counter
                const playerData = JSON.parse(localStorage.getItem("playerData"));
                playerData.attempts = attempts; 
                localStorage.setItem("playerData", JSON.stringify(playerData));
                // this redirects to the final page
                window.location.href = "final.html";
            }
        }

        displayImages(); // this is the initial display of blank images
    }

    
    // Final Page
    const finalPage = document.getElementById("finalPage");
    if (finalPage) {
        // this retrieves player data from local storage
        const playerData = JSON.parse(localStorage.getItem("playerData"));
        // this displays player data on the final page
        document.getElementById("playerName").textContent = `${playerData.firstName} ${playerData.lastName}`;
        document.getElementById("playerAge").textContent = playerData.age;
        document.getElementById("playerAttempts").textContent = playerData.attempts;

        // this event listener is for the "Play Again" button
        const playAgainButton = document.getElementById("playAgainButton");
        playAgainButton.addEventListener("click", function () {
            playerData.attempts = 0; // this resets attempts
            localStorage.setItem("playerData", JSON.stringify(playerData));
            window.location.href = "index.html"; // takes you back to index
        });
    }
});