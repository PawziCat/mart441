$(document).ready(function() {
    // Arrays for images, text, and shapes
    const images = ['./images/lemon.jpg', './images/blueberry.jpg', './images/strawberry.jpg']; // image array
    const texts = ['Lemon', 'Blueberry', 'Strawberry']; // text array
    const shapes = ['circle1', 'square1', 'triangle1', 'circle2', 'square2', 'triangle2', 'circle3', 'square3', 'triangle3']; // shape array

    let currentImageIndex = 0; // image index
    let currentTextIndex = 0; // text index
    let currentShapeIndex = 1; // shape index


    // this function switches the images
    function switchImage() {
        $('#image').fadeOut(900, function() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            $('#image').attr('src', images[currentImageIndex]).removeClass().addClass('image' + (currentImageIndex + 1)).fadeIn(900);
        });
    }

    // this function switches the text
    function switchText() {
        $('#text').fadeOut(800, function() {
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            $('#text').text(texts[currentTextIndex]).removeClass().addClass('text' + (currentTextIndex + 1)).fadeIn(800);
        });
    }

    // this function switches the shapes
    function switchShape() {
        $('#shapes').fadeOut(700, function() { 
            currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
            let shapeClass = shapes[currentShapeIndex];
            $('#shapes').removeClass().addClass('shape ' + shapeClass).fadeIn(700);
        });
    }

    // this does the initial setup
    $('#image').attr('src', images[currentImageIndex]).addClass('image1'); // image
    $('#text').text(texts[currentTextIndex]).addClass('text1'); // text
    $('#shapes').addClass('shape ' + shapes[currentShapeIndex]); // shape

    //this sets the intervals for switching content
    setInterval(switchImage, 3000); // images
    setInterval(switchText, 3000); // texts
    setInterval(switchShape, 2000); // shapes

    // this function moves the elements to new locations
    function moveElement(element) {
        let newLeft = Math.floor(Math.random() * ($(window).width() - element.width())); // width
        let newTop = Math.floor(Math.random() * ($(window).height() - element.height())); // height
        element.animate({ left: newLeft, top: newTop }, 2000);
    }

    // this will set the intervals for moving the elements
    setInterval(function() { moveElement($('#image')); }, 3000); // moves the images
    setInterval(function() { moveElement($('#text')); }, 3000); // moves the texts
    setInterval(function() { moveElement($('#shapes')); }, 3000); // moves the shapes
});