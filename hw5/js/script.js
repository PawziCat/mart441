document.addEventListener("DOMContentLoaded", function () {

// These are the image files for the back and face of the cards    
const blankImage = ['./images/logo-concept-pink.jpg']; // blank images - shows the back of the cards
const actualImages = ['./images/what-lies-between.jpg', './images/placeholder-blue.jpg', './images/placeholder-green.jpg', './images/placeholder-white.jpg', './images/self-portrait.jpg', './images/ban-frog.jpg']; // actual images - shows the faces of the cards

let blankArray = new Array(12).fill(blankImage); // blank array - shows back of cards
let imageArray = []; // image array - shows face of cards
let gameBoard = document.getElementById("gameBoard");

let firstSelection = null; // first card flipped
let secondSelection = null; // second card flipped
let isProcessing = false; // This prevents the player from clicking while waiting for script to run

// This allows the function to shuffle an array (I am using a Fisher-Yates algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// This fills the imageArray with two copies of each image
actualImages.forEach(image => {
    imageArray.push(image, image); // Each image appears two times
});

// This shuffles the images to random positions
shuffle(imageArray);

// This displays the blank images on the grid
function displayImages() {
    gameBoard.innerHTML = '';
    blankArray.forEach((img, index) => {
        let imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.dataset.index = index;
        imgElement.addEventListener('click', () => revealImage(index));
        gameBoard.appendChild(imgElement);
    });
}

// This shows the actual image when the blank image is clicked
function revealImage(index) {
    if (isProcessing || blankArray[index] !== blankImage) return; // This prevents double clicks that can cause lags, latency delays and crashes
    
    blankArray[index] = imageArray[index];
    displayImages();

    if (firstSelection === null) {
        firstSelection = index; // Stores choice for the first card
    } else if (secondSelection === null) {
        secondSelection = index; // Stores choice for the second card
        isProcessing = true;

        setTimeout(checkMatch, 1000); // Slight delay before checking cards for match
    }
}

// This checks to see if the two images match
function checkMatch() {
    if (imageArray[firstSelection] !== imageArray[secondSelection]) {
        // If the two don't match, this flips them back over
        blankArray[firstSelection] = blankImage;
        blankArray[secondSelection] = blankImage;
    }

    // This resets selections if they are wrong
    firstSelection = null;
    secondSelection = null;
    isProcessing = false;


    // this displays images
    displayImages();
}
displayImages();
});