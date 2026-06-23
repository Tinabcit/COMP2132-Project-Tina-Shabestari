# COMP2132-Project-Tina-Shabestari

## Study Hangman Game

### Author
**Tina Shabestari**
Student ID: A01002676
COMP2132 – JavaScript Frameworks and Server
BCIT Full Stack Web Development Program

---
## Project Description

Study Hangman is a browser-based Hangman game developed using HTML, SCSS, TypeScript, JavaScript, and JSON. The purpose of the game is to correctly guess a hidden word before reaching the maximum number of incorrect guesses.

At the beginning of each game, a random category, word, and hint are selected from a JSON file. The player uses the hint to help guess the word one letter at a time. Correct guesses reveal the matching letters in the word, while incorrect guesses increase the hangman count and display the next hangman image.

The game keeps track of letters that have already been guessed and prevents duplicate guesses. The application continuously checks whether the player has won or lost. A player wins by correctly revealing all letters in the word and loses after six incorrect guesses.

Once the game is finished, the player is shown a message indicating whether they won or lost and is given the option to start a new game by clicking the Play Again button.

---
## Features

* Random word selection
* Random category selection
* Hint system
* Multiple word categories
* Tracks guessed letters
* Prevents duplicate guesses
* Remaining attempts counter
* Win and lose conditions
* Play Again button
* Responsive design
* JSON data loading using fetch()
* TypeScript game logic
* SCSS styling with mixins
* CSS fade-in animation
* JavaScript image animation
* Hangman image progression

---

## Categories Included

* 💻 Coding
* 🌐 Web Development
* 📚 School
* 🎮 Gaming
* 🎨 Art
* 🍔 Food
* ⚽ Sports
* 🚗 Transportation
* 🎵 Music
* 📱 Technology

---
## Technologies Used

* HTML5
* SCSS (SASS)
* TypeScript
* JavaScript
* JSON
* Git
* GitHub

---
## Learning Outcomes

This project demonstrates several concepts learned in COMP2132:

* Working with JSON files
* Using fetch requests
* Creating custom functions
* Using JavaScript objects
* DOM manipulation
* Event handling
* Loops and conditional statements
* Random number generation
* TypeScript interfaces and type annotations
* SCSS variables and mixins
* Responsive web design
* Version control with Git and GitHub

---
## Folder Structure

```text
project
│
├── html
│   └── index.html
│
├── css
│   ├── style.scss
│   └── style.css
│
├── js
│   ├── script.ts
│   └── script.js
│
├── data
│   └── words.json
│
├── images
│   ├── hangman0.png
│   ├── hangman1.png
│   ├── hangman2.png
│   ├── hangman3.png
│   ├── hangman4.png
│   ├── hangman5.png
│   └── hangman6.png
│
└── README.md
```

---

## How To Play

1. Read the category and hint.
2. Enter one letter at a time in the input box.
3. Click the Guess Letter button or press Enter.
4. Correct letters will be revealed in the hidden word.
5. Incorrect guesses will increase the hangman count.
6. You have six incorrect guesses before losing the game.
7. Guess all letters correctly to win.
8. Click Play Again to start a new game.

---

## Image Credits

The images used in this project were found online through Google and are used for educational purposes only as part of this COMP2132 project.
The original image source and reference links have been included in the HTML file comments. All credit for the images belongs to their original creators and owners.

---

## Project Requirements Completed

✔ Random word and hint selection
✔ JSON file loaded using fetch()
✔ TypeScript game logic
✔ JavaScript object and custom functions
✔ SCSS styling with mixins
✔ Responsive page design
✔ At least 6 images used
✔ Relative file paths
✔ Win and lose conditions
✔ Play Again functionality
✔ Animation effects
✔ Published to GitHub

---

## Repository

GitHub Repository:

https://github.com/Tinabcit/COMP2132-Project-Tina-Shabestari

---
Thank you for reviewing my COMP2132 Study Hangman project.
