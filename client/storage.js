let deck = {};

const addCard = (name) => {
    if (!deck[name]) {
        deck[name] = {};
        deck[name].name = name;
        deck[name].count = 1;
    } else {
        if (deck[name].count === 3) {
            return false;
        }
        deck[name].count += 1;
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
    deck = {};
    for (let k of Object.keys(newDeck)) {
        deck[k] = {};
        deck[k].name = k;
        deck[k].count = newDeck[k];
    }
}

export {
    addCard,
    removeCard,
    getDeck,
    setDeck,
}