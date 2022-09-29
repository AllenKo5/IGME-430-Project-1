import "./addCard.js";

const createCard = (cardInfo) => {
    const results = document.querySelector('#results');
    const card = document.createElement('add-card');

    card.dataset.name = cardInfo.name;

    results.appendChild(card);
};

const displayCards = async (response) => {
    const results = document.querySelector('#results');

    const json = await response.json();
    const cards = json.data;
    
    for (let i = 0; i < 20 && i < cards.length; i += 1) {
        createCard(cards[i]);
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
    const searchButton = document.querySelector('#search-button');
    const results = document.querySelector('#results');

    searchButton.addEventListener('click', () => {
        results.innerHTML = '<p>';
        searchCard(cardName);
    });
};

window.onload = init;