const checkValidString = (str) => {
    return !!str && typeof str === 'string' && !!str.trim();
};

export { checkValidString };
