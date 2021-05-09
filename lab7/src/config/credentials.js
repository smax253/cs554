const md5 = require('blueimp-md5');

const publicKey = '';
const privateKey = '';

const getApiUrl = ({ baseUrl, args }) => {
    const ts = new Date().getTime();
    const stringToHash = ts + privateKey + publicKey;
    const hash = md5(stringToHash);
    const parsedargs = Object.keys(args).reduce((prev, key) => {
        const value = args[key];
        return prev + `&${key}=${value}`;
    }, '');
    const url =
        baseUrl +
        '?ts=' +
        ts +
        '&apikey=' +
        publicKey +
        '&hash=' +
        hash +
        parsedargs;

    return url;
};

export default getApiUrl;
