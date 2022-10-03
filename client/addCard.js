import * as storage from './storage.js';
import * as client from './client.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
div {
    width: 300px;
    border-radius: 0.2em;
    background-color: #f4f4f4;
}
p, button {
    margin: 0.5em 1em;
}
</style>
<div>
<p id='p1'></p>
<button id="main-button">Add to Main/Extra Deck</button>
<p id='p2'></p>
</div>
`;

class AddCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.mainButton = this.shadowRoot.querySelector('#main-button');
        this.p1 = this.shadowRoot.querySelector('#p1');
        this.p2 = this.shadowRoot.querySelector('#p2');

        this.mainButton.addEventListener('click', () => {
            const success = storage.addCard(this.getAttribute('data-name'));
            if (success) {
                this.p2.innerHTML = 'Added to deck';
            } else {
                this.p2.innerHTML = 'Already at max copies';
            }
            client.displayDeck();
        });

        this.render();
    }

    render() {
        this.p1.innerHTML = this.getAttribute('data-name');
    }
}

customElements.define('add-card', AddCard);