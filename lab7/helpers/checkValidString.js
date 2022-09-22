const checkValidString = (str) => {
    return !!str && typeof str === 'string' && !!str.trim();
};

module.exports = checkValidString;
