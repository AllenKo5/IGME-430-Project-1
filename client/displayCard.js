import * as storage from './storage.js';
import * as client from './client.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
div {
    width: 300px;
    border-radius: 0.2em;
    color: ghostwhite;
}
p, button {
    margin-left: 1em;
}
p {
    padding-top: 1em;
}
button {
    margin-bottom: 1em;
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
        this.div = this.shadowRoot.querySelector('div');

        this.removeButton.addEventListener('click', () => {
            storage.removeCard(this.getAttribute('data-name'));
            client.displayDeck();
        });

        this.render();
    }

    render() {
        this.p.innerHTML = `Name: ${this.getAttribute('data-name')}<br>Type: ${this.getAttribute('data-type')}<br>Count: ${this.getAttribute('data-count')}`;

        switch (this.getAttribute('data-type')) {
            case "Spell Card":
                this.div.style.backgroundColor = '#00886f';
                break;
            case "Trap Card":
                this.div.style.backgroundColor = '#aa3979';
                break;
            case "Ritual Monster":
                this.div.style.backgroundColor = '#4e75ba';
                break;
            case "Fusion Monster":
                this.div.style.backgroundColor = '#85428f';
                break;
            case "Synchro Monster":
                this.div.style.color = '#000000';
                this.div.style.backgroundColor = '#dbd6d2';
                break;
            case "Xyz Monster":
                this.div.style.backgroundColor = '#000000';
                break;
            case "Link Monster":
                this.div.style.backgroundColor = '#09467c';
                break;
            case "Normal Monster":
                this.div.style.backgroundColor = '#bc9a5a';
                break;
            case "Effect Monster":
                this.div.style.backgroundColor = '#b8582d';
                break;
            default:
                this.div.style.backgroundColor = 'white';
                break;
        }
    }
}

customElements.define('display-card', DisplayCard);