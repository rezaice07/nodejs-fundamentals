/*
 *Title: Token handler
 *Decription: Route handler to handle Token related routes
 *Author:Rejwanul Reja
 *Date: 12-Dec-2021
 */

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilies');
const { parseJSON } = require('../../helpers/utilies');

// module scaffolding
const handler = {};

// types
const requestProps = {
    path: '',
    trimmedPath: '',
    method: '',
    queryStringObject: '',
    heardObjects: '',
    body: {},
};
const acceptedMethods = ['get', 'post', 'put', 'delete'];

handler.tokenHandlerHandler = (reqProps, callBack) => {
    if (acceptedMethods.indexOf(reqProps.method) > -1) {
        handler._tokens[reqProps.method](reqProps, callBack);
    } else {
        callBack(405, { error: 'Invalid Request Method' });
    }
};

// service : token
handler._tokens = {};

handler._tokens.post = (reqProps = requestProps, callBack) => {};

handler._tokens.get = (reqProps = requestProps, callBack) => {};

handler._tokens.put = (reqProps = requestProps, callBack) => {};

handler._tokens.delete = (reqProps = requestProps, callBack) => {};

module.exports = handler;
