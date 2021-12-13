/*
 *Title: Check handler
 *Decription: Check handler to handle check related routes
 *Author:Rejwanul Reja
 *Date: 13-Dec-2021
 */

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilies');
const { parseJSON } = require('../../helpers/utilies');
const tokenHandler = require('./tokenHandler');
// module scaffolding
const handler = {};

// types
const requestProps = {
    path: '',
    trimmedPath: '',
    method: '',
    queryStringObject: '',
    heardObjects: { token: '' },
    body: {
        protocol: '',
        url: '',
        method: '',
        successCode: [],
        timeoutSeconds: 0,
    },
};
const acceptedMethods = ['get', 'post', 'put', 'delete'];

handler.checkHandler = (reqProps, callBack) => {
    if (acceptedMethods.indexOf(reqProps.method) > -1) {
        handler._checks[reqProps.method](reqProps, callBack);
    } else {
        callBack(405);
    }
};

// service : check
handler._checks = {};

handler._checks.post = (reqProps = requestProps, callBack) => {
    // validate inputs
    const protocol =
        typeof reqProps.body.protocol === 'string' &&
        ['http', 'https'].indexOf(reqProps.body.protocol)
            ? reqProps.body.protocol
            : false;

    const url =
        typeof reqProps.body.url === 'string' && reqProps.body.url.trim().length > 0
            ? reqProps.body.url
            : false;

    const method =
        typeof reqProps.body.method === 'string' &&
        ['get', 'post', 'put', 'delete'].indexOf(reqProps.body.method) > 0
            ? reqProps.body.method
            : false;

    const successCode =
        typeof reqProps.body.successCode === 'object' &&
        reqProps.body.successCode instanceof Array > 0
            ? reqProps.body.successCode
            : false;

    const timeoutSeconds =
        typeof reqProps.body.timeoutSeconds === 'number' &&
        reqProps.body.timeoutSeconds % 1 === 0 &&
        reqProps.body.timeoutSeconds >= 1 &&
        reqProps.body.timeoutSeconds <= 5
            ? reqProps.body.timeoutSeconds
            : false;

    if (protocol && url && method && successCode && timeoutSeconds) {
        // verify token
        const token =
            typeof reqProps.heardObjects.token === 'string' ? reqProps.heardObjects.token : false;

        // lookup the token
        data.read('tokens', token, (err, res) => {
            const userData = parseJSON(res);
            if (!err && userData.phone) {
                const { phone } = userData;

                // lookup the user
                data.read('users', phone, (err, res) => {
                    const user = parseJSON(res);
                    if (!err) {
                        tokenHandler._tokens.verify(token, phone, (tokenIsValid) => {
                            if (tokenIsValid) {
                                // TODO: need to implement
                                callBack(200, user);
                            } else {
                                callBack(403, { error: 'User not authenticated' });
                            }
                        });
                    } else {
                        callBack(500, { error: 'There was an error on server side' });
                    }
                });
            } else {
                callBack(500, { error: 'There was an error on server side' });
            }
        });
    } else {
        callBack(400, { error: 'Problem in your request' });
    }
};

handler._checks.get = (reqProps = requestProps, callBack) => {};

handler._checks.put = (reqProps = requestProps, callBack) => {};

handler._checks.delete = (reqProps = requestProps, callBack) => {};

module.exports = handler;
