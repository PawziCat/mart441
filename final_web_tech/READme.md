### Brianna Thompson
#### MART441-Web-Tech
#### Homework 15
#### May 9, 2025
------



### Project Description:
For my game I decided to continue building on a previous game *Zuka's Shadow*. *Zuka's Shadow* it is about a dog named Zuka that is trying to survive in a world filled with dangerous, sugar crazed ghosts. The player objective is to collect Star Cookies to earn points and survive as long as possible, but be wary, the more stars you collect the more Ghosts Zuka attracts.



### All Updates and Changes:
* Fixed the issue where the platforms had a odd issue where the png for the platforms and the collider for them were not functioning together properly.  
  * Discovered it was because of the setScale for the platforms as setScale(2) when the code does not allow for that.The solution was to return the setScale to setScale(1). This required me to make additional changes to the code and the the platform pngs.
* Refined player movement by reducing jump height.
* Refined later "levels" so that the gravity is smoother.
* Add sound effects to the collected diamonds.
* Add sound effects to the collected stars.
* Add sound effects to the dog.
* Add sound effects to the ghost when they drop in.
* Add sound effect when the player dies.
* Added a level system in which when all the stars are collect, the level will change when the next round of objects and / or enemies appear.
* Added a title screen.
  * Added a header graphic for the game title.
  * Positioned images of Zuka on a platform and the Ghosts floating nearby with different scale for visual interest.
* Added a start button to the title page, when clicked it will initiate the game.
  * I struggled to get the button to load the other page at first, it ended up being my placement of the code, the buttons redirect needed to be after the images.
* Added a game over button that redirects the player back to the title page when the player dies.
  * Took a bit of work to get the button to stay hidden until the player died. Originally it was appearing when the page was first loaded, not when the player died. It was also not overlayed over the game canvas and was appearing aligned to the left of the canvas and centered on the page together side by side.
  * To fix the issue I placed the button in the body and style it to 'display: none' so that the button wouldn't visibly load with the page. Then I added its function as an addEventListener under the hitGhost function to ensure that it didn't "appear" until the hitGhost function ran.



#### Notes:
See data folder for a numbered layout of platforms
See data folder for the Attributions and Copyrights for all used assets.



-----

### Links

#### Repository for UM Spring 2025 MART441 Web Technology
https://github.com/PawziCat/mart441

### Live Site:
https://pawzicat.github.io/mart441/final_web_tech/
