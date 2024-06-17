// JavaScript code for game functionality

// Game variables
let score = 0; // Tracks the player's score
let time = 30; // Game duration in seconds
let level = 1; // Game level to increase difficulty
let timerId; // To store the timer interval ID
let moleAppearInterval; // To store the mole appearance interval ID

// Function to show a mole at a random hole
function showMole() {
  const moleId = Math.floor(Math.random() * 9) + 1; // Randomly choose a mole
  const mole = document.getElementById(`mole${moleId}`);
  mole.style.display = "block"; // Show the mole

  setTimeout(() => {
    mole.style.display = "none"; // Hide the mole after 800ms
  }, 800 - level * 100); // Decrease time based on level to increase difficulty
}

// Function to start the game timer
function startTimer() {
  timerId = setInterval(() => {
    if (time > 0) {
      time--; // Decrease the time by 1 second
      document.getElementById("time").textContent = time; // Update the displayed time
    } else {
      clearInterval(timerId); // Stop the timer
      clearInterval(moleAppearInterval); // Stop moles from appearing
      endGame(); // Show the final score
    }
  }, 1000);
}

// Function to start the game
function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "flex";
  score = 0; // Reset score
  time = 30; // Reset time
  level = 1; // Reset level
  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = time;
  startTimer(); // Start the game timer
  moleAppearInterval = setInterval(showMole, 1000 - level * 100); // Show a mole every second minus level difficulty

  document.querySelectorAll(".mole").forEach((mole) => {
    mole.addEventListener("click", () => {
      if (mole.style.display === "block") {
        score++; // Increment the score
        document.getElementById("score").textContent = score; // Update the displayed score
        mole.style.display = "none"; // Hide the mole
        playSound(); // Play hit sound
        // Increase level every 10 points
        if (score % 10 === 0) {
          level++;
          clearInterval(moleAppearInterval);
          moleAppearInterval = setInterval(showMole, 1000 - level * 100);
        }
      }
    });
  });
}

// Function to end the game
function endGame() {
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("endScreen").style.display = "flex";
  document.getElementById("finalScore").textContent = score;
}

// Function to reset the game
function resetGame() {
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("startScreen").style.display = "flex";
}

// Function to play hit sound
function playSound() {
  const hitSound = document.getElementById("hitSound");
  hitSound.play();
}

// Start the game when the page loads
window.onload = () => {
  document.getElementById("startScreen").style.display = "flex";
};

/*
Design Considerations and Challenges:
1. Usability: The game is designed to be straightforward and easy to use, suitable for all ages. 
   The simple interface ensures that users can start playing without any instructions.
2. Feedback: Immediate visual feedback is given when a mole is clicked, reinforcing the action and engaging the player.
3. Timing and Difficulty: The moles appear and disappear at regular intervals, with a moderate speed that balances challenge and playability. 
   Adjusting these intervals can increase or decrease the difficulty.
4. Scalability: While this prototype is basic, it can be expanded with additional features such as increasing difficulty levels, 
   more complex animations, sound effects, and leaderboards.
*/

/*
Future Implementation Considerations:
1. Responsive Design: Ensuring the game works well on various devices and screen sizes.
2. Complex Game Logic: Implementing levels, power-ups, and other game mechanics to increase replayability.
3. Performance: Optimizing the code to ensure smooth performance, especially on lower-end devices.
*/

/*
Acknowledgements
The game design and structure were inspired by various online tutorials and examples of Whack-a-Mole games. Notably, resources like MDN Web Docs and Stack Overflow were consulted for understanding JavaScript game mechanics and CSS animations.
Chatbots and online forums were instrumental in resolving issues related to event handling in JavaScript and CSS styling quirks providing quick insights and debugging tips during development.
*/
