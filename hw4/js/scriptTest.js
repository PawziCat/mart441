// Function to start the adventure
function startAdventure() {
    // Get the user's name from the input box
    const name = document.getElementById('nameInput').value;
    // Check if the name is empty
    if (name === '') {
        alert('Please enter your name to start the adventure.');
        return;
    }
    // Update the story with the user's name and initial choices
    updateStory(`Welcome, ${name}! You find yourself in a dark forest. Do you:`, [
        { text: 'Go left', action: () => choosePath('left') },
        { text: 'Go right', action: () => choosePath('right') },
        { text: 'Go straight', action: () => choosePath('straight') }
    ]);
}

// Function to handle the user's choice
function choosePath(choice) {
    // Use a switch statement to handle different choices
    switch (choice) {
        case 'left':
            updateStory('You encounter a friendly elf who gives you a magical sword. Do you:', [
                { text: 'Fight the dragon', action: () => choosePath('fight') },
                { text: 'Explore the forest', action: () => choosePath('explore') }
            ]);
            break;
        case 'right':
            updateStory('You find a hidden treasure chest. Do you:', [
                { text: 'Open it', action: () => choosePath('open') },
                { text: 'Leave it', action: () => choosePath('leave') }
            ]);
            break;
        case 'straight':
            updateStory('You meet a wise old man who offers you a choice of three potions. Do you:', [
                { text: 'Take the strength potion', action: () => choosePath('strength') },
                { text: 'Take the wisdom potion', action: () => choosePath('wisdom') },
                { text: 'Take the speed potion', action: () => choosePath('speed') }
            ]);
            break;
        case 'fight':
            updateStory('You bravely fight the dragon and win! You are a hero!', []);
            break;
        case 'explore':
            updateStory('You explore the forest and find a hidden village. You are welcomed as a guest.', []);
            break;
        case 'open':
            updateStory('You open the chest and find a pile of gold coins. You are rich!', []);
            break;
        case 'leave':
            updateStory('You leave the chest and continue your journey, feeling a sense of mystery.', []);
            break;
        case 'strength':
            updateStory('You gain immense strength and become a legendary warrior.', []);
            break;
        case 'wisdom':
            updateStory('You gain great wisdom and become a renowned sage.', []);
            break;
        case 'speed':
            updateStory('You gain incredible speed and become an unmatched explorer.', []);
            break;
    }
}

// Function to update the story and choices in the DOM
function updateStory(text, choices) {
    // Get the story container
    const storyDiv = document.getElementById('story');
    // Update the story text
    storyDiv.innerHTML = `<p>${text}</p>`;
    // Loop through the choices and create buttons for each
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = choice.action;
        storyDiv.appendChild(button);
    });
    // Add a restart button to allow the user to restart the story
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.onclick = () => location.reload();
    storyDiv.appendChild(restartButton);
}