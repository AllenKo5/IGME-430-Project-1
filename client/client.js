import './addCard.js';
import './displayCard.js';
import * as storage from './storage.js';

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

    results.innerHTML = '<p>';
    for (let i = 0; i < 20 && i < cards.length; i += 1) {
        cardResults(cards[i]);
    }
    results.innerHTML += '</p>';
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
    const cardName = document.querySelector('#name-field');
    const deckButton = document.querySelector('#deck-button');
    const searchButton = document.querySelector('#search-button');

    deckButton.addEventListener('click', () => {
        displayDeck();
    });
    searchButton.addEventListener('click', () => {
        searchCard(cardName);
    });
};

window.onload = init;