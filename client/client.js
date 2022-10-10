import './addCard.js';
import './displayCard.js';
import * as storage from './storage.js';

// displays deck using display card template
export const displayDeck = () => {
    const deck = document.querySelector('#deck');
    const extraDeck = document.querySelector('#extra-deck');

    deck.innerHTML = '';
    extraDeck.innerHTML = '';
    for (let k of Object.keys(storage.getDeck())) {
        const card = document.createElement('display-card');
        card.dataset.name = storage.getDeck()[k].name;
        card.dataset.type = storage.getDeck()[k].type;
        card.dataset.count = storage.getDeck()[k].count;
        if (card.dataset.type === "Fusion Monster" ||
            card.dataset.type === "Synchro Monster" ||
            card.dataset.type === "Xyz Monster" ||
            card.dataset.type === "Link Monster") {
            extraDeck.appendChild(card);
        } else {
            deck.appendChild(card);
        }
    }
};

// displays corresponding response based on error code
const handleResponse = async (response, method) => {
    const content = document.querySelector('#response');
    const loadForm = document.querySelector('#load-form');
    const name = loadForm.querySelector('#load-name').value;

    switch (response.status) {
        case 200:
            content.innerHTML = '<b>Success</b>';
            break;
        case 201:
            content.innerHTML = '<b>Created</b>';
            break;
        case 204:
            content.innerHTML = '<b>Updated (No Content)</b>';
            return;
        case 400:
            content.innerHTML = '<b>Bad Request</b>';
            break;
        default:
            content.innerHTML = '<b>Not Found</b>';
            break;
    }

    if (method === 'get') {
        const json = await response.json();
        if (json) {
            storage.setDeck(json.decks);
        }
    } else {
        const json = await response.json();
        content.innerHTML += `<br>${json.message}`;
        if (json.id) {
            content.innerHTML += `<br>Id: ${json.id}`;
        }
    }

    displayDeck();
}

// sends locally stored deck to JSON object
const sendPost = async (addForm) => {
    const url = addForm.getAttribute('action');
    const method = addForm.getAttribute('method');
    const name = addForm.querySelector('#add-name').value;

    let deck = '';
    for (let k of Object.keys(storage.getDeck())) {
        deck += `${storage.getDeck()[k].name}|${storage.getDeck()[k].type}|${storage.getDeck()[k].count}|`;
    }

    const formData = `name=${name}&deck=${deck}`;

    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    });

    loadDecks();

    handleResponse(response, method);
};

const requestUpdate = async (loadForm) => {
    const loadName = document.querySelector('#load-name');
    let url = loadForm.getAttribute('action');
    const method = loadForm.getAttribute('method');

    url += `?name=${loadName.value}`;

    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
        },
    });

    handleResponse(response, method);
}

// displays cards searched from YGOPRODeck API
const displayCards = async (response) => {
    const results = document.querySelector('#results');

    const json = await response.json();
    if (!json.data) {
        results.innerHTML = "No cards found.";
    } else {
        const cards = json.data;

        results.innerHTML = "";
        for (let i = 0; i < 40 && i < cards.length; i += 1) {
            const card = document.createElement('add-card');
            card.dataset.name = cards[i].name;
            const cardType = cards[i].type;
            if (cardType.includes("Spell")) {
                card.dataset.type = "Spell Card";
            } else if (cardType.includes("Trap")) {
                card.dataset.type = "Trap Card";
            } else if (cardType.includes("Ritual")) {
                card.dataset.type = "Ritual Monster";
            } else if (cardType.includes("Fusion")) {
                card.dataset.type = "Fusion Monster";
            } else if (cardType.includes("Synchro")) {
                card.dataset.type = "Synchro Monster";
            } else if (cardType.includes("XYZ")) {
                card.dataset.type = "Xyz Monster";
            } else if (cardType.includes("Link")) {
                card.dataset.type = "Link Monster";
            } else if (cardType.includes("Normal")) {
                card.dataset.type = "Normal Monster";
            } else {
                card.dataset.type = "Effect Monster";
            }
            results.appendChild(card);
        }
    }
};

const searchCard = async (cardName) => {
    const YGOPRO_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php?";
    let url = YGOPRO_URL;

    let term = "";
    if (cardName.value) {
        term = cardName.value.trim();
        term = encodeURIComponent(term);
    }
    url += `fname=${term}`;

    const response = await fetch(url);

    displayCards(response);
};

// populate load dropdown with decks stored in JSON object
const updateDecks = async (response) => {
    const loadNames = document.querySelector('#load-name');
    const json = await response.json();

    loadNames.innerHTML = "";
    for (let c of Object.keys(json.decks)) {
        const option = document.createElement('option');
        option.value = c;
        option.innerHTML = c;
        loadNames.appendChild(option);
    }
};

const loadDecks = async () => {
    const response = await fetch('/getFull');
    updateDecks(response);
};

// clear current deck
const clearDeck = () => {
    const deck = document.querySelector('#deck');
    const extraDeck = document.querySelector('#extra-deck');

    deck.innerHTML = '';
    extraDeck.innerHTML = '';

    storage.setDeck({});
};

const init = () => {
    const addForm = document.querySelector('#add-form');
    const loadForm = document.querySelector('#load-form');
    const clearButton = document.querySelector('#clear-button');
    const searchButton = document.querySelector('#search-button');
    const cardName = document.querySelector('#card-name');

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendPost(addForm);
        return false;
    });
    loadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        requestUpdate(loadForm);
        return false;
    });
    clearButton.addEventListener('click', () => {
        clearDeck();
    });
    searchButton.addEventListener('click', () => {
        searchCard(cardName);
    });

    loadDecks();
};

window.onload = init;