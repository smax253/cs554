const checkValidString = (str) => {
    if (typeof str !== 'string' || str.trim().length === 0) return false;
    else return true;
};

const checkValidRating = (num) => {
    if (typeof num !== 'number' || num < 0) return false;
    else return true;
};

const checkValidYear = (year) => {
    if (typeof year !== 'number' || !Number.isInteger(year) || year < 0)
        return false;
    else return true;
};

const checkValidCast = (cast) => {
    if (!Array.isArray(cast) || cast.length === 0) return false;
    for (const person of cast) {
        if (typeof person !== 'object' || person === null) return false;
        if (Object.keys(person).length !== 2) return false;
        const { firstName, lastName } = person;
        if (!checkValidString(firstName)) return false;
        if (!checkValidString(lastName)) return false;
    }
    return true;
};

const checkValidInfo = (info) => {
    if (typeof info !== 'object' || info === null) return false;
    if (Object.keys(info).length !== 2) return false;
    const { director, yearReleased } = info;
    if (!checkValidString(director)) return false;
    if (!checkValidYear(yearReleased)) return false;
    return true;
};

const checkValidMovieFields = ({ title, plot, info, cast, rating }) => {
    if (!checkValidString(title))
        throw { error: 'title must be a non-empty string', statusCode: 400 };
    if (!checkValidString(plot))
        throw { error: 'plot must be a non-empty string', statusCode: 400 };
    if (!checkValidInfo(info))
        throw {
            error:
                'info must be an object with a director string and a year number',
            statusCode: 400,
        };
    if (!checkValidCast(cast))
        throw {
            error:
                'cast must be an array with objects with strings firstName and lastName',
            statusCode: 400,
        };
    if (!checkValidRating(rating))
        throw {
            error: 'rating must be a positive number',
            statusCode: 400,
        };
    return true;
};

module.exports = {
    checkValidString,
    checkValidCast,
    checkValidInfo,
    checkValidRating,
    checkValidYear,
    checkValidMovieFields,
};
