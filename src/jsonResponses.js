const decks = {
    'Branded Despia': {
        'Aluber the Jester of Despia': 2,
        'Despian Tragedy': 2,
        'Ad Libitum of Despia': 1,
        'Ash Blossom and Joyous Spring': 3,
        'Fallen of Albaz': 2,
        'Water Enchantress of the Temple': 3,
        'Wandering Gryphon Rider': 1,
        'Nibiru, the Primal Being': 2,
        'Dracoback, the Rideable Dragon': 1,
        'Fateful Adventure': 1,
        'Foolish Burial': 1,
        'Called by the Grave': 1,
        'Branded Fusion': 3,
        'Branded in Red': 2,
        'Branded Opening': 3,
        'Rite of Aramesir': 3,
        'Pot of Prosperity': 3,
        'Super Polymerization': 3,
        'Infinite Impermanence': 3,
        'Albion the Branded Dragon': 2,
        'Lubellion the Searing Dragon': 2,
        'Mirrorjade the Iceblade Dragon': 2,
        'Guardian Chimera': 2,
        'Masquerade the Blazing Dragon': 1,
        'Despian Quaeritis': 1,
        'Panzer Dragon': 1,
        'Predaplant Dragostapelia': 1,
        'Mudragon of the Swamp': 1,
        'Starving Venom Fusion Dragon': 1,
        'Alba-Lenatus the Abyss Dragon': 1,
    }
};

//helper methods
const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end();
};

// handler functions
const getDeck = (request, response) => {
    const responseJSON = {
        decks,
    };

    return respondJSON(request, response, 200, responseJSON);
};

const addDeck = (request, response, body) => {
    const responseJSON = {
        message: 'Deck must contain name and at least 1 card.',
    };

    // 400 response if name or deck is missing
    if (!body.name || !body.deck) {
        responseJSON.id = 'badRequest';
        return respondJSON(request, response, 400, responseJSON);
    }

    let statusCode = 204;

    // 201 response if no deck with the name exists
    if (!decks[body.name]) {
        statusCode = 201;
    }

    // add deck to decks object
    decks[body.name] = {};
    const cards = body.deck.split("|");
    for (let i = 0; i < cards.length - 1; i += 1) {
        if (!decks[body.name][cards[i]]) {
            decks[body.name][cards[i]] = 1;
        } else {
            decks[body.name][cards[i]] += 1;
        }
    }

    if (statusCode === 201) {
        responseJSON.message = 'Created deck successfully.';
        return respondJSON(request, response, statusCode, responseJSON);
    }

    // 204 response to update deck with no content
    return respondJSONMeta(request, response, statusCode);
};

const notFound = (request, response) => {
    const responseMessage = {
        message: 'The page you are looking for was not found.',
        id: 'pageNotFound',
    };

    return respondJSON(request, response, 404, responseMessage);
};

module.exports = {
    addDeck,
    getDeck,
    notFound,
};