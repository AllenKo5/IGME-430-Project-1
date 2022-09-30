let deck = {};

const addCard = (name) => {
    if (deck[name]) {
        deck[name].count += 1;
    } else {
        deck[name] = {};
        deck[name].name = name;
        deck[name].count = 1;
    }
};

const removeCard = (name) => {
    if (deck[name]) {
        delete deck[name];
    }
}

const getDeck = () => {
    return deck;
};

export {
    addCard,
    removeCard,
    getDeck,
}