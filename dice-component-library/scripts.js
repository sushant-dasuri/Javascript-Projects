class RollDice extends HTMLElement {

    /**
     * The constructor object
     */

    constructor() {
        //Access the parent class properties and methods
        super();

        //Render HTML
        let btnText = this.innerHTML.trim();
        this.innerHTML = 
        ` <p>
            <button>Roll Dice</button>
        </p>
        <div aria-live="polite"></div>`
    }
}

 if('customElements' in window) {
        customElements.define('roll-dice', RollDice)
    }