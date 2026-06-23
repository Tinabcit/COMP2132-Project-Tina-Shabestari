# COMP2132-Project-Tina-Shabestari

## Study Hangman Game

### Author

Tina Shabestari
Student ID: A01002676
COMP2132 Project

## Project Description

This project is a browser-based Hangman game that I created for COMP2132 using HTML, SCSS, TypeScript, JavaScript, and JSON.

The game randomly selects a category, word, and hint from a JSON file each time a new game starts. The player must guess the hidden word one letter at a time using the input box. If the player guesses a correct letter, it is revealed in the word. If the player guesses incorrectly, the hangman image changes and the number of remaining attempts decreases.

The game keeps track of the letters that have already been guessed so the same letter cannot be entered multiple times. The player wins when all letters in the word have been revealed and loses after six incorrect guesses.

When the game ends, a message is displayed showing whether the player won or lost. The player can then click the Play Again button to start a new game with a different word and hint.

## Features

* Random word selection
* Random category selection
* Hint system
* Multiple categories
* Tracks guessed letters
* Prevents duplicate guesses
* Remaining attempts counter
* Win and lose conditions
* Play Again button
* Responsive layout
* JSON file loaded using fetch()
* TypeScript game logic
* SCSS styling
* CSS and JavaScript animations
* Hangman image progression

## Categories

The game includes words from several categories:

* Coding
* Web Development
* School
* Gaming
* Art
* Food
* Sports
* Transportation
* Music
* Technology

## Technologies Used

* HTML
* SCSS (SASS)
* TypeScript
* JavaScript
* JSON
* Git
* GitHub

## What I Learned

Through this project I practiced:

* Working with JSON files
* Using fetch requests
* Creating and using objects
* Writing functions
* DOM manipulation
* Event handling
* Loops and conditionals
* TypeScript
* SCSS mixins
* Responsive web design
* Git and GitHub version control

## Project Files

* index.html
* style.scss
* style.css
* script.ts
* script.js
* words.json
* hangman0.png to hangman6.png

## How To Play

1. Read the category and hint.
2. Enter one letter in the input box.
3. Click the Guess Letter button or press Enter.
4. Correct letters will appear in the word.
5. Incorrect guesses will update the hangman image.
6. The player loses after six incorrect guesses.
7. The player wins when the entire word is revealed.
8. Click Play Again to start a new game.

## Image Credits

The images used in this project were found online through Google and are being used for educational purposes only.

The original image source and reference link have been included in the HTML comments. All credit belongs to the original creator of the images.

## GitHub Repository

https://github.com/Tinabcit/COMP2132-Project-Tina-Shabestari

Thank you for taking the time to review my project.
