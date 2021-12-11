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

// export items
module.exports = utilities;
