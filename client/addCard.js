import * as storage from './storage.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
div {
    width: 500px;
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
            storage.addCard(this.getAttribute('data-name'));
            this.p2.innerHTML += 'Added to deck<br>';
        });

        this.render();
    }

    render() {
        this.p1.innerHTML = this.getAttribute('data-name');
    }
}

customElements.define('add-card', AddCard);