/*
 *Title: Utilities
 *Decription: Utilities
 *Author:Rejwanul Reja
 *Date: 10-Dec-2021
 */

// dependencies
const crypto = require('crypto');
const environment = require('./environment');

// module scaffolding
const utilities = {};

// generate hash value
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const { secretKey } = environment;
        const hash = crypto.createHmac('sha256', secretKey).update(str).digest('hex');
        return hash;
    }

    return false;
};

// parse JSON string to Object
utilities.parseJSON = (jsonString) => {
    let output = {};
    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    return output;
};

// create random string
utilities.createRandomString = (strLen) => {
    let length = strLen;
    length = typeof strLen === 'number' && strLen > 0 ? strLen : false;

    if (length) {
        const possibleCharacters =
            'galkglakgoi64gae87galkglakgoi64gae87ghr89bfd4bs4b897sh4s6h4s6h4s6hs887974s6h46s4hs6h4s6h48s97h89rewg46bs7r98gh65sfb4sb789sth56ghr89bfd4bs4b897sh4s6h4s6h4s6hs887974s6h46s4hs6h4s6h48s97h89rewg46bs7r98gh65sfb4sb789sth56galkglakgoi64gae87galkglakgoi64gae87ghr89bfd4bs4b897sh4s6h4s6h4s6hs887974s6h46s4hs6h4s6h48s97h89rewg46bs7r98gh65sfb4sb789sth56ghr89bfd4bs4b897sh4s6h4s6h4s6hs887974s6h46s4hs6h4s6h48s97h89rewg46bs7r98gh65sfb4sb789sth56';

        let output = '';
        for (let i = 1; i <= length; i += 1) {
            const randNo = Math.floor(Math.random() * possibleCharacters.length);
            const randomCharacter = possibleCharacters.charAt(randNo);
            output += randomCharacter;
        }

        return output;
    }
    return false;
};

// export items
module.exports = utilities;
