let deck = {};

const addCard = (name) => {
    if (deck[name]) {
        if (deck[name].count === 3) {
            return false;
        }
        deck[name].count += 1;
    } else {
        deck[name] = {};
        deck[name].name = name;
        deck[name].count = 1;
    }
    return true;
};

const removeCard = (name) => {
    if (deck[name]) {
        delete deck[name];
    }
}

const getDeck = () => {
    return deck;
};

const setDeck = (newDeck) => {
    deck = newDeck;
}

export {
    addCard,
    removeCard,
    getDeck,
    setDeck,
}