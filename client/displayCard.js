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
<p></p>
<button id="remove-button">Remove card</button>
</div>
`;

class DisplayCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.removeButton = this.shadowRoot.querySelector('#remove-button');
        this.p = this.shadowRoot.querySelector('p');

        this.removeButton.addEventListener('click', () => {
            storage.removeCard(this.getAttribute('data-name'));
        });

        this.render();
    }

    render() {
        this.p.innerHTML = `Name: ${this.getAttribute('data-name')}<br>Count: ${this.getAttribute('data-count')}`;
    }
}

customElements.define('display-card', DisplayCard);