import './addCard.js';
import './displayCard.js';
import * as storage from './storage.js';

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
        if (json.decks[name]) {
            storage.setDeck(json.decks[name]);
        }
    }
    
    displayDeck();
}

const sendPost = async (addForm) => {
    const url = addForm.getAttribute('action');
    const method = addForm.getAttribute('method');
    const name = addForm.querySelector('#add-name').value;

    let deck = '';
    for (let k of Object.keys(storage.getDeck())) {
        for (let i = 0; i < storage.getDeck()[k].count; i += 1) {
            deck += `${storage.getDeck()[k].name}|`;
        }
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

    handleResponse(response, method);
};

const requestUpdate = async (loadForm) => {
    let url = loadForm.getAttribute('action');
    const method = loadForm.getAttribute('method');

    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
        },
    });

    handleResponse(response, method);
}

export const displayDeck = () => {
    const deck = document.querySelector('#deck');
   
    deck.innerHTML = '<p>';
    for (let k of Object.keys(storage.getDeck())) {
        const card = document.createElement('display-card');
        card.dataset.name = storage.getDeck()[k].name;
        card.dataset.count = storage.getDeck()[k].count;
        deck.appendChild(card);
    }
    deck.innerHTML += '</p>';
};

const displayCards = async (response) => {
    const results = document.querySelector('#results');

    const json = await response.json();
    if (!json.data) {
        results.innerHTML = "No cards found.";
    } else {
        const cards = json.data;

        results.innerHTML = "";
        for (let i = 0; i < 20 && i < cards.length; i += 1) {
            const card = document.createElement('add-card');
            card.dataset.name = cards[i].name;
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

const init = () => {
    const addForm = document.querySelector('#add-form');
    const loadForm = document.querySelector('#load-form');
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
    searchButton.addEventListener('click', () => {
        searchCard(cardName);
    });
};

window.onload = init;