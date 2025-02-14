let currentScene = 0;
let inventory = [];
let health = 100;

const scenes = [
// scene 0: the crossroad    
    {
        text: "It was the kind of day that makes one want to start an adventure; the air was crisp and clean, the sky cloudless, and mystery beckoned beyond the distant horizon. You shoulder you pack and with a deep breath step through your door, as you close it you begin a new chapter of life. You come to the boundary of your village, with a one last glance towards the only home you have ever known you start your adventure. After a few hours of uneventful travel you come to a point where the road crosses another, between the two turns there is a winding dirt path. This would be a fitting time to chose what direction you would like to go.",
        image: "./images/paths.jpg",
        options: [
            { text: "Take the northern road", nextScene: 1, action: "nothing" }, // roots
            { text: "Take the southern road", nextScene: 2, action: "add_item", item: "" }, // cave
            { text: "Follow the winding dirt path", nextScene: 3, action: "nothing", item: "" } //robbed
        ]
    },
// scene 1: northern road (robbed)
    {
        text: "You feel a surge of energy and collapse to the ground. Your attacker, a young dirty boy, hit you with a spell that paralyzes you. Once they are sure their spell was successful, they quickly dig through your pack and steal your gold, adding to the insult they also take your single ration. After mocking you, the boy runs off into the forest with his ill gotten gains. You are left to contemplate your existence as the effects of the spell dissipate.",
        image: "./images/paths.jpg",
        options: [
            { text: "return to road, its probably safer", nextScene: 0, action: "nothing" }, // return to scene 0: crossroad
            { text: "Continue down the path with injured pride", nextScene: 7, action: "nothing" },
            { text: "Chase down the little bandit and take back your stuff", nextScene: 9, action: "remove_item", item: "25 gold coins, ration" } // scene 9: field
        ]
    },
// scene 2 southern road (cave)
    {
        text: "The path leads to a large and very dark cave. Looking around, you note that there are no bones present nor tracks of any beasts. Do you enter?",
        image: "./images/cave.jpg",
        options: [
            { text: "Enter the cave", nextScene: 8, action: "nothing" },
            { text: "Go back", nextScene: 0, action: "nothing" }, // return to scene 0: crossroad
            { text: "Search around the cave entrance", nextScene: 7, action: "add_item", item: "rusty key" } // remain in scene 2: cave, acquire additional torch
        ]
    },
// scene 3: winding path (roots)
     {
        text: "Your journey down the winding path is slow, as you go, the air begins to feel increasingly muggy. The forest around you has grown dense, so dense that the trees have choked out any other life. The lack of life is evident in the ringing silence around you, you feel uneasy but attribute it to hypervigilence. All over the trees are strange flowers hanging down in long chains, their scent hanging thickly in the air. Further ahead you can make out the trail which leads down into what seems to be a hollow in the roots, above it is a sign that reads Lothloch Hollow",
        image: "./images/roots.jpg",
        options: [
            { text: "Investigate the flowers", nextScene: 4, action: "nothing", item: "" },
            { text: "Search the area", nextScene: 4, action: "nothing" },
            { text: "enter the hollow", nextScene: 5, action: "nothing" }
        ]        
    },
// scene 4: search area: flowers (roots)
    {
        text: "Looking over the flowering vines with admiration. They look almost black upon first glance but with deeper inspection you realize they are actually a deep purple. You reachout to touch one and it begins to gently glow. You consider picking a couple to bring with you...",
        image: "./images/flower.jpg",
        options: [
            { text: "Pick a single flower", nextScene: 3, action: "add_item", item: "sword, 25 gold coins, ration, strange flower" },
            { text: "Leave them.", nextScene: 3, action: "nothing" }
        ]
    },
// scene 5: the nest (roots)
    {
        text: "You enter the hollow in the roots, after crawling through the maze you come across a strangely warm and damp chamber. On the far side of it sits a decent sized nest made of moss and rotted leaves, peering over the side you spot a large glistening egg. You find yourself entranced by its beauty and wonder where its mother is. You consider taking it for a moment, after all you can't just leaave a defenseless egg... However you have no idea what manner of creature this egg contains or if the parent is nearby. Do you take it?",
        image: "./images/egg.jpg",
        options: [
            { text: "Take it! Could be valuable or tasty.", nextScene: 10, action: "add_item", item: "" }, // scene 10: attacked by basilisk
            { text: "You think better of it and leave it.", nextScene: 11, action: "nothing" } // scene 3: (roots)
        ]
    },
// scene 6: treasure cache (cave)
    {
        text: "Deep inside the cave, you find an old chest tucked behid a pile of rocks. Looking at the lock you realize that that rusty key you found seems to match. You unlock the chest and it is full of various valuables from coins to gems and all manner of jewelry",
        image: "./images/treasure.jpg",
        options: [
            { text: "Thrilled with your extraordinary luck you, decide to return home.", nextScene: 0, action: "add_item", item: "" }
        ]
    },
// scene 7: rusty key (cave: entrance)
    {
        text: "Looking around the area carefully, your foot finds a small metalix object. Bending down, you pick up a small rusty key. It could be junk, it could be useful. Do you take the key?",
        image: "./images/caveEntrance.jpg",
        options: [
            { text: "Explore the cave", nextScene: 8, action: "add_item", item: "rusty key" },
            { text: "Return to crossroad", nextScene: 0, action: "add_item", item: "" },
            { text: "Continue following the road south", nextScene: 8, action: "add_item", item: "" }
        ]
    },
// scene 8: shiny gem (cave)
    {
        text: "Lighting a torch, you prepare to enter the cave and look around warily. Before you enter you catch and glint of something shiny from the corner of your eye. Digging through the grass you find a cold, smooth yellow gem. It might be valuable or even useful later, you stow it in your pack.",
        image: "./images/cave.jpg",
        options: [
            { text: "Explore the cave", nextScene: 8, action: "add_item", item: "" }, //scene 8 
            { text: "Return to crossroad", nextScene: 0, action: "add_item", item: "" }, // scene 0 (crossroad)
            { text: "Continue searching cave", nextScene: 6, action: "add_item", item: "treasure cache" } // scene 6 (treasure cache)
        ]
    },
// scene 9: chase down bandit (field)
    {
        text: "You quickly catch up to the little bandit and snatch them up by their collar. You drop them in annoyance, they just stare up at you with their dirty little cheeks stuffed full of your ration. You take back your gold, resigning yourself to the lose of your food. Now what to do with the kid, they could be no more than 8years old.",
        image: "./images/field.jpg",
        options: [
            { text: "Take pity on the kid and bring them back to your village", nextScene: 0, action: "add_item", item: "25 gold coins" }, // scene 0 (crossroad)
            { text: "Return to crossroad", nextScene: 0, action: "add_item", item: "25 gold coins" }, // scene 0 (crossroad)
            { text: "Continue following the road south", nextScene: 9, action: "add_item", item: "25 gold coins" } // no further scenes written
        ]
    },   
// scene 10: basilisk (roots)
    {
        text: "You scoop up the egg greedily and begin to stow it in your pack, as you do you hear a bizaare sound. It is a kin to the sound of sand falling or leaves rustling in the wind, neither of which was present. Turning to address the sound you see a glint of blue, the sound you hear were dozens of small clawed feet. In this moment of realization, you feel your blood run cold, you had found your way into the den of a Basilisk. Shakily you draw your sword, what will you do?",
        image: "./images/basilisk.jpg",
        options: [
            { text: "Fight!", nextScene: 13, action: "damage", amount: 100 }, // scene 13 (petrified)
            { text: "Return the egg and hope for the best", nextScene: 13, action: "damage", amount: 100 }, // scene 13 (petrified)
            { text: "Run!", nextScene: 12, action: "remove_item", item: "glistening egg" } // scene 12 hollow exit / bridge
        ]
    },   
// scene 11: Lothlock Hollow (roots)
    {
        text: "You think better of taking the egg, it would be wrong to seperate it from its mother. You decide to continue pushing on through the maze of roots, at one point even wondering if coming her was such a good idea after all. Your concerns are quickly calmed when you see a light in the distance, you eagerly make your way to it but the roots have grown over the path out. They are younger roots and your could potentially cut them or you can simply turn back and hope that your find your way back out again.",
        image: "forest_clearing.jpg",
        options: [
            { text: "Use your sword to cut the roots", nextScene: 12, action: "add_item", item: "" }, // scene 12 (hollow exit / bridge)
            { text: "Return to crossroad", nextScene: 0, action: "add_item", item: "" } // scene 0 (crossroad)
        ]
    },
// scene 12: hollow exit / bridge (bridge)
{
    text: "Using your sword, you make quick work of the roots that block your path. You emerge into the sun and blink under the bright sun. The air was clearer now, and the cool breeze was refreshing after the mugginess of the Hollow. You continue to follow the path until you come to a bridge, it is washed out but still passable if you are willing to risk it.",
    image: "forest_clearing.jpg",
    options: [
        { text: "Cross the bridge", nextScene: 12, action: "nothing", item: "" }, // no further scenes written
        { text: "find another way to cross", nextScene: 12, action: "nothing", item: "" }, // no further scenes written
        { text: "Return to the winding path", nextScene: 3, action: "nothing", item: "" } 
    ]
},
// scene 13: GAME OVER (petrified)
{
    text: "Despite your attempt to return the egg, the offense has already been committed. As you set the egg down in front of the mother you accidentally meet its gaze and it is quickly over. Your body stiffens and your clothes harden agains your form. You open your mouth to scream, but no sound could come from your now gaping stone mouth.",
    image: "./images/statue.jpg",
    options: [
        { text: "You Have Died", nextScene: 0, action: "damage", amount: 100 } // scene 0 (crossroad)
    ]
}
];


// sets scene
function chooseOption(optionIndex) {
    const currentSceneData = scenes[currentScene];
    const chosenOption = currentSceneData.options[optionIndex - 1];
// run chosen scene
    if (chosenOption) {
        currentScene = chosenOption.nextScene;

// Perform actions
        // add to inventory
        if (chosenOption.action === "add_item") {
            inventory.push(chosenOption.item);
            updateInventoryDisplay();
            showMessage("You found " + chosenOption.item + "!");
        }
        // remove inventory
         if (chosenOption.action === "remove_item") {
            inventory.push(chosenOption.item);
            updateInventoryDisplay();
            showMessage("You lost " + chosenOption.item + "!");
            }
        // damage
        } else if (chosenOption.action === "damage") 
            {
            health -= chosenOption.amount;
            updateHealthDisplay();
            showMessage("Ouch! You lost " + chosenOption.amount + " health.");
            if (health <= 0) {
                showMessage("Your journey has come to an end...");
                currentScene = 13; // GAME OVER (basilisk)
            }
        // heal
        } else if (chosenOption.action === "heal") {
            health += chosenOption.amount;
            updateHealthDisplay();
            showMessage("You gained " + chosenOption.amount + " health.");
             if (health > 100) {
                health = 100;
                updateHealthDisplay();
            }
        }
        displayScene();
    }

// displays scenes
function displayScene() {
    const currentSceneData = scenes[currentScene]; // updates scene
    document.getElementById('story-text').textContent = currentSceneData.text; // updated text
    document.getElementById('scene-image').src = currentSceneData.image; // updated image
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    if (currentSceneData.options && currentSceneData.options.length > 0){
        currentSceneData.options.forEach((option, index) => {
            const button = document.createElement('button'); // writes statement for button
            button.textContent = option.text;
            button.onclick = () => chooseOption(index + 1);
            optionsDiv.appendChild(button);
        });
        optionsDiv.style.display = 'block';
        document.getElementById('result').style.display = 'none';

    }else{
        optionsDiv.style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').textContent = currentSceneData.text;
    }

}
// updates inventory
function updateInventoryDisplay() {
    document.getElementById('inventory').textContent = "Inventory: " + inventory.join(", ");
}
// updates health
function updateHealthDisplay() {
    document.getElementById('health').textContent = "Health: " + health;
}
// displays message or notice
function showMessage(msg) {
    document.getElementById('message')
}