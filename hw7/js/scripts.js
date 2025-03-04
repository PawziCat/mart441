// this class represents the image object(s)
class ImageObject {
    constructor(title, image, description, author, year) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.author = author;
        this.year = year;
    }
}

// this creates an array that will store the image object(s) and their descriptions
// order of info : title, image file, description, author, year
const images = [
    new ImageObject('"We are the 99%..."', './images/rainey.jpg', 'During the Occupy Wallstreet Movement, at a the Novemnber Occupy Seattle march 84 year old Dorli Rainey was pepper sprayed by a Seattle police officer. The image of her standing drenched in milk to neutralize the pepper spray turned her into a powerful symbol. “We are the 99%,” the rallying cry of people as they protested the 1% of upper class citizens that hold a majority of the wealth in the United States. The movement demanded that investment bankers responsible for the financial crisis that began in late 2007 to be held accountable.', 'Joshua Trujillo', 2011),
    new ImageObject('The Red Hand', './images/fish.jpg', 'At the 2019 State 1B Track Championships in Cheney, Muckleshoot Tribal School student Rosalie Fish painted her face with a hand print and MMIW down her upper leg. This was to raise awareness for Missing and Murdered Indigenous Women. In 2012, the U.S. Department of Justice found that indigenous women in parts of the US are being murdered at rates more than 10 times the national average and human trafficking is another crisis. The lack of available law enforcement in these communities leaves Native women easy targets for violence and trafficking.', 'Tyler Tjomsland', 2019),
    new ImageObject('The Largest Migration in European History', './images/refugees.jpg', 'Ukrainians lined up for miles at the Ukrainian-Polish border as they flee the country. Over a quarter of the Ukrainian population has fled the country as refugees due to the ongoing war with Russia. On February 24, 2022 the Russian Federation conducted a large-scale invasion on Ukraine sparking the largest war since World War II. THe war was a result of Putins dispute over the expansion of the North Atlantic Treaty Organization (NATO) and the legitimacy of Ukrainian identity and statehood. ', 'Angelos Tzortzinis', 2022),
    new ImageObject('Genocide in Gaza', './images/gaza.jpg', 'The Hamas-led attacks in southern Israel on 7 October 2023 lead to the Israeli government launching their military in an offensive attack. Acts of genocide towards the Palestinians in Gaza have been commited by the Israel for months as nonstop bombing, restrictions from humanitarian aid and country-wide starvation. The war has left the population on the edge of collapse, by October 7th, 2024 more than 42,000 Palestinians have died, including over 13,300 children, many of them in deliberate indiscriminate attacks.', 'Mark Kerrison', 2024),
    new ImageObject('Black Lives Matter', './images/blm.jpg', 'In July 13, 2013, the Black Lives Matter Movement started in response to the acquittal of the murderer of Trayvon Martin who was shot and killed by George Zimmerman. Alicia Garza, Patrisse Cullors, and Opal Tometi responded by starting the movement with the goal of ending police brutality and systematic racism directed a black communities. The moevment received worldwide support as it influenced politics, law enforcement, conviction policies  and sparked cconversations about the state of racial progression in the US.', 'Russ Rowland', 2020)
];

// this sends references to the index 
const imageElement = document.getElementById('image');
const descriptionElement = document.getElementById('description');
const switchButton = document.getElementById('switch-button');

// Variable to keep track of the currently displayed image index
let currentIndex = -1;

// Function to switch the image and description
function switchImage() {
    let randomIndex;
    // Ensure the new random index is different from the current index
    do {
        randomIndex = Math.floor(Math.random() * images.length);
    } while (randomIndex === currentIndex);
    
    currentIndex = randomIndex;
    const selectedImage = images[randomIndex];
    // Update the image source and description
    imageElement.src = selectedImage.image;
    descriptionElement.innerHTML = `<strong>${selectedImage.title}</strong><br>${selectedImage.description}<br><em>${selectedImage.author}, ${selectedImage.year}</em>`;
}

// this adds the event listener to the button so that the button will switch the image when clicked
switchButton.addEventListener('click', switchImage);

// this initializes the first image
switchImage();