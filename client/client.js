const displayCards = async (response, results) => {

    const json = await response.json();
    const cards = json.data;
    
    for (let i = 0; i < 20 && i < cards.length; i += 1) {
        results.innerHTML += cards[i].name + '<br>';
    }
    results.innerHTML += '</p>';
};

const searchCard = async (cardName, results) => {
    const YGOPRO_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php?";
    let url = YGOPRO_URL;

    let term = "";
    if (cardName.value) {
        term = cardName.value.trim();
        term = encodeURIComponent(term);
    }
    url += `fname=${term}`;

    const response = await fetch(url);

    displayCards(response, results);
};

const init = () => {
    const cardName = document.querySelector('#name-field');
    const searchButton = document.querySelector('#search-button');
    const results = document.querySelector('#results');

    searchButton.addEventListener('click', () => {
        results.innerHTML = '<p>';
        searchCard(cardName, results);
    });
};

window.onload = init;