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
<button id="main-button">Add to Main/Extra Deck</button>
<button id="side-button">Add to Side Deck</button>
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
        this.sideButton = this.shadowRoot.querySelector('#side-button');
        this.p = this.shadowRoot.querySelector('p');

        this.mainButton.addEventListener('click', () => {

        });
        this.sideButton.addEventListener('click', () => {

        });

        this.render();
    }

    render() {
        this.p.innerHTML = this.getAttribute('data-name');
    }
}

customElements.define('add-card', AddCard);