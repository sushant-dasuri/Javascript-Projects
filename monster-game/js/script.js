// The monsters and socks
let monsters = [
  {
    name: "monster1",
    alt: "A yellow monster with a curly nose",
  },
  {
    name: "monster2",
    alt: "A yellow monster with a wide head, one eye, and an underbite",
  },
  {
    name: "monster3",
    alt: "A green monster with eyes on stalks and a mouth at the top of its head",
  },
  {
    name: "monster4",
    alt: "A red monster with horns, four eyes, and no legs",
  },
  {
    name: "monster5",
    alt: "A green monster with three horns on each side of its head, one eye, and a sad look on its face",
  },
  {
    name: "monster6",
    alt: "A green, triangle-shaped monster with sharp teeth, walking upside-down on its hands",
  },
  {
    name: "monster7",
    alt: "A purple monster with a single, sad looking eye and tentacles for arms",
  },
  {
    name: "monster8",
    alt: "A purple, oval-shaped monster with one eye and no arms or legs",
  },
  {
    name: "monster9",
    alt: "A blue, insect-like monster, with bug eyes, three body sections, and a pair of wings",
  },
  {
    name: "monster10",
    alt: "A blue monster with lopsided eyes on stalks and long, sharp teeth",
  },
  {
    name: "monster11",
    alt: "A furry gray monster with long arms and a happy face",
  },
  {
    name: "sock",
    alt: "A pair of athletic socks",
  },
];

// Get the #app element
let app = document.querySelector("#app");

// Track the number of monsters found
let found = 0;

//
// Methods
//

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Shuffle the monsters array
shuffle(monsters);

// Inject the monsters into the DOM
app.innerHTML = `<p>Click a door to reveal a monster. Try not to find the sock.</p>
                <div class="row">
					${monsters
            .map(function (monster, index) {
              return `
							<div class="grid" aria-live="polite">
								<button data-monster="${index}"><img alt="Door ${index + 1}" src="img/door.svg"></button>
							</div>`;
            })
            .join("")}
				</div>`;

//Listen for click events
document.addEventListener("click", clickHandler);

// Handle click events
function clickHandler(event) {
  //Get the monster
  let btn = event.target.closest("button[data-monster]");
  if (!btn) return;
  let monster = monsters[btn.getAttribute("data-monster")];
  if (!monster) return;

  // If a sock was found, show the lost message
  if (monster.name === "sock") {
    window.location.href = "monster-game-lost.html";
    return;
  }

  	// Otherwise, increase the "monster found" count by 1
    found++;

    //If all 11 monsters have been found, show the win message
    if(found === monsters.length - 1) {
        window.location.href = 'monster-game-won.html';
        return;
    }


  //Create a monster image
  let img = document.createElement("img");
  img.src = `img/${monster.name}.svg`;
  img.alt = monster.alt;

  //Replace the button with the monster image
  btn.replaceWith(img);
}
