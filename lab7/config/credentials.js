const md5 = require('blueimp-md5');

const publicKey = '8a2162b46353fbe092f3783266bc28e1';
const privateKey = 'b784534247ac46141c220e240a5e32bbdb34c2e0';

const getApiUrl = ({ baseUrl, args }) => {
    const ts = new Date().getTime();
    const stringToHash = ts + privateKey + publicKey;
    const hash = md5(stringToHash);
    const parsedargs = Object.keys(args).reduce((prev, key) => {
        const value = args[key];
        if (!!value) return prev + `&${key}=${value}`;
        else return prev;
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

module.exports = getApiUrl;
