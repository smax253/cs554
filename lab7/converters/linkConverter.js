const extractIdFromURI = require('../helpers/extractIdFromURI');

const linkConverter = (item) => {
    const id = extractIdFromURI(item.resourceURI);
    return {
        name: item.name,
        id,
    };
};

module.exports = linkConverter;
