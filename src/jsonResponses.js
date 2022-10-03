const decks = require('./defaultDeck.json');

// helper methods
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
    const cards = body.deck.split('|');
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
