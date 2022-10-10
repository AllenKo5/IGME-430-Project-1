import * as storage from './storage.js';
import * as client from './client.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
div {
    width: 300px;
    height: 150px;
    border-radius: 0.2em;
    color: ghostwhite;
}
p, button {
    margin-left: 1em;
}
#p1 {
    padding-top: 1em;
}
</style>
<div>
<p id='p1'></p>
<p id='p2'></p>
<button id="main-button">Add to Deck</button>
<p id='p3'></p>
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
        this.p3 = this.shadowRoot.querySelector('#p3');
        this.div = this.shadowRoot.querySelector('div');

        this.mainButton.addEventListener('click', () => {
            const success = storage.addCard(this.getAttribute('data-name'), this.getAttribute('data-type'));
            if (success) {
                this.p3.innerHTML = 'Added to deck';
            } else {
                this.p3.innerHTML = 'Already at max copies';
            }
            client.displayDeck();
        });

        this.render();
    }

    render() {
        this.p1.innerHTML = this.getAttribute('data-name');
        this.p2.innerHTML = this.getAttribute('data-type');
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

customElements.define('add-card', AddCard);