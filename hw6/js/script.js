document.addEventListener("DOMContentLoaded", function () {
    const introForm = document.getElementById("introForm");
    if (introForm) {
        // Event listener for the form submission
        introForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevents the default form submission
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const age = document.getElementById("age").value;
            // Create a JSON object to store player data
            const playerData = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                attempts: 0 // Initialize attempts to zero
            };
            // Store the player data in local storage
            localStorage.setItem("playerData", JSON.stringify(playerData));
            // Redirect to the memory matching game page
            window.location.href = "memory.html";
        });
    }

    // Memory Matching Game Page
    const gameBoard = document.getElementById("gameBoard");
    if (gameBoard) {
        // Image paths for the blank and actual images
        const blankImage = './images/logo-concept-pink.jpg';
        const actualImages = [
            './images/what-lies-between.jpg', './images/placeholder-blue.jpg',
            './images/placeholder-green.jpg', './images/placeholder-white.jpg',
            './images/self-portrait.jpg', './images/ban-frog.jpg'
        ];
        let blankArray = new Array(12).fill(blankImage); // Array for blank images
        let imageArray = []; // Array for actual images
        let firstSelection = null; // First card selected
        let secondSelection = null; // Second card selected
        let isProcessing = false; // Flag to prevent multiple clicks
        let attempts = 0; // Counter for attempts

        // Function to shuffle an array using Fisher-Yates algorithm
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Duplicate each image to create pairs
        actualImages.forEach(image => {
            imageArray.push(image, image);
        });

        imageArray
        shuffle(imageArray);

        // Function to display the blank images on the game board
        function displayImages() {
            gameBoard.innerHTML = ''; // Clear the game board
            blankArray.forEach((img, index) => {
                let imgElement = document.createElement('img');
                imgElement.src = img;
                imgElement.dataset.index = index;
                imgElement.addEventListener('click', () => revealImage(index));
                gameBoard.appendChild(imgElement);
            });
        }

        // Function to reveal the actual image when a blank image is clicked
        function revealImage(index) {
            if (isProcessing || blankArray[index] !== blankImage) return; // Prevents double clicks
            blankArray[index] = imageArray[index]; // Show the actual image
            displayImages();
            if (firstSelection === null) {
                firstSelection = index; // Store the first selection
            } else if (secondSelection === null) {
                secondSelection = index; // Store the second selection
                isProcessing = true; // Set processing flag
                setTimeout(checkMatch, 1000); // Delay before checking for a match
            }
        }

        // Function to check if the two selected images match
        function checkMatch() {
            attempts++; // Increment the attempt counter
            if (imageArray[firstSelection] !== imageArray[secondSelection]) {
                // If the images don't match, flip them back over
                blankArray[firstSelection] = blankImage;
                blankArray[secondSelection] = blankImage;
            }
             // Reset selections and processing flag
            firstSelection = null;
            secondSelection = null;
            isProcessing = false;
            displayImages();
            // Check if all images are matched
            if (blankArray.every(img => img !== blankImage)) {
                // Update player data with the final score
                const playerData = JSON.parse(localStorage.getItem("playerData"));
                playerData.attempts = attempts;
                localStorage.setItem("playerData", JSON.stringify(playerData));
                // Redirect to the final page
                window.location.href = "final.html";
            }
        }

        displayImages(); // Initial display of blank images
    }

    // Final Page
    const finalPage = document.getElementById("finalPage");
    if (finalPage) {
        // Retrieve player data from local storage
        const playerData = JSON.parse(localStorage.getItem("playerData"));
        // Display player data on the final page
        document.getElementById("playerName").textContent = `${playerData.firstName} ${playerData.lastName}`;
        document.getElementById("playerAge").textContent = playerData.age;
        document.getElementById("playerAttempts").textContent = playerData.attempts;

        // Event listener for the "Play Again" button
        const playAgainButton = document.getElementById("playAgainButton");
        playAgainButton.addEventListener("click", function () {
            // Reset attempts and redirect to the introduction page
            playerData.attempts = 0;
            localStorage.setItem("playerData", JSON.stringify(playerData));
            window.location.href = "index.html";
        });
    }
});