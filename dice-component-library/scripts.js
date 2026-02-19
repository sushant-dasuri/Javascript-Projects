class RollDice extends HTMLElement {

    #dice;

    /**
     * The constructor object
     */

    constructor() {
        //Access the parent class properties and methods
        super();

        //Creates a shadow root
        this.root = this.attachShadow({mode: 'closed'});

         // Define Properties 
        this.#dice = [1, 2, 3, 4, 5, 6];


        //Render HTML
        let btnText = this.innerHTML.trim();
        this.root.innerHTML = 
        ` <p>
            <button><slot>Roll Dice</slot></button>
        </p>
        <div aria-live="polite"></div>`   

    }


    /**
				 * Randomly shuffle an array
				 * https://stackoverflow.com/a/2450976/1293256
				 * @param  {Array} array The array to shuffle
				 * @return {Array}       The shuffled array
				 */
				#shuffle (array) {

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

                /**
                 * Shuffle dice array and return the first number
                 * @return {Number} The result
                 */

                #roll () {
                    this.#shuffle(this.#dice);
                    return this.#dice[0];
                }

                /**
                 * Runs each time the element is appended to or moved in the DOM
                 */

                connectedCallback() {
                    // Attach a click event listener to the button
                    let btn = this.root.querySelector('button');
                    if(!btn) return;
                    btn.addEventListener('click', this.#clickHandler);

                }

                /** 
                 * Handle click events
                 * @param {Event} event The event object
                 */

                #clickHandler(event) {

                    // Get the host component
                    let host = event.target.getRootNode().host;

                    //Get the message element
                    let target = host.root.querySelector('[aria-live="polite"]')
                    if(!target) return;

                    //Roll the dice
                    let roll = host.#roll();

                    //Inject the message into the UI
                    target.textContent = `You rolled a ${roll}`;


                }

                /** 
                 * Runs when the element is removed from the DOM
                 */

                disconnectedCallback() {
                    //Remove the click event listener from the button 
                    let btn = this.root.querySelector('btn');
                    if(!btn) return;
                    btn.removeEventListener('click', this.#clickHandler);
                }
}

 if('customElements' in window) {
        customElements.define('roll-dice', RollDice)
    }