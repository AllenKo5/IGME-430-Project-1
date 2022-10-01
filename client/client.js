import './addCard.js';
import './displayCard.js';
import * as storage from './storage.js';

const handleResponse = (response) => {
    const content = document.querySelector('#response');

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

    handleResponse(response);
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

    handleResponse(response);
}

const deckResults = (cardInfo) => {
    const deck = document.querySelector('#deck');
    const card = document.createElement('display-card');

    card.dataset.name = cardInfo.name;
    card.dataset.count = cardInfo.count;

    deck.appendChild(card);
};

const displayDeck = () => {
    const deck = document.querySelector('#deck');

    deck.innerHTML = '<p>';
    for (let k of Object.keys(storage.getDeck())) {
        deckResults(storage.getDeck()[k]);
    }
    deck.innerHTML += '</p>';
};

const cardResults = (cardInfo) => {
    const results = document.querySelector('#results');
    const card = document.createElement('add-card');

    card.dataset.name = cardInfo.name;

    results.appendChild(card);
};

const displayCards = async (response) => {
    const results = document.querySelector('#results');

    const json = await response.json();
    const cards = json.data;

    results.innerHTML = "";
    for (let i = 0; i < 20 && i < cards.length; i += 1) {
        cardResults(cards[i]);
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
    const displayButton = document.querySelector('#display-button');
    const searchButton = document.querySelector('#search-button');
    const cardName = document.querySelector('#card-name');

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendPost(addForm);
        return false;
    });
    loadForm.addEventListener('submit', (e) => {
        requestUpdate(loadForm);
    });
    displayButton.addEventListener('click', () => {
        displayDeck();
    });
    searchButton.addEventListener('click', () => {
        searchCard(cardName);
    });
};

window.onload = init;