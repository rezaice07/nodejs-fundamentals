/*
 *Title: Token handler
 *Decription: Route handler to handle Token related routes
 *Author:Rejwanul Reja
 *Date: 12-Dec-2021
 */

// dependencies
const data = require('../../lib/data');
const { hash, createRandomString } = require('../../helpers/utilies');
const { parseJSON } = require('../../helpers/utilies');

// module scaffolding
const handler = {};

// types
const requestProps = {
    path: '',
    trimmedPath: '',
    method: '',
    queryStringObject: {
        id: '',
    },
    heardObjects: '',
    body: {
        id: '',
        extend: false,
    },
    tokenId: '',
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

handler._tokens.post = (reqProps = requestProps, callBack) => {
    const phone =
        typeof reqProps.body.phone === 'string' && reqProps.body.phone.trim().length === 11
            ? reqProps.body.phone
            : false;

    const password =
        typeof reqProps.body.password === 'string' && reqProps.body.password.length > 0
            ? reqProps.body.password
            : false;

    if (phone && password) {
        data.read('users', phone, (err, res) => {
            if (!err) {
                const user = parseJSON(res);
                const hashedPassword = hash(password);
                if (hashedPassword === user.password) {
                    // generate token
                    const tokenId = createRandomString(120);
                    const expires = Date.now() + 60 * 60 * 1000;
                    const tokenObject = {
                        phone,
                        id: tokenId,
                        expires,
                    };

                    // store the token to db
                    data.create('tokens', tokenId, tokenObject, (err) => {
                        if (!err) {
                            callBack(200, { message: 'Token created successfully!' });
                        } else {
                            callBack(500, { error: 'Could not create token!' });
                        }
                    });
                } else {
                    callBack(400, {
                        message: 'Password Is not valid.Try again',
                    });
                }
            } else {
                callBack(404, {
                    message: 'You have a problem in your request. Please try again!',
                });
            }
        });
    } else {
        callBack(404, { message: 'Invalid phone number. Please try again!' });
    }
};

handler._tokens.get = (reqProps = requestProps, callBack) => {
    // check the id if valid
    const id =
        typeof reqProps.queryStringObject.id === 'string' ? reqProps.queryStringObject.id : false;

    if (id) {
        // lookup the token
        data.read('tokens', id, (err, res) => {
            const tokenData = parseJSON(res);
            if (!err && tokenData) {
                callBack(200, { token: tokenData });
            } else {
                callBack(500, { error: 'There was an error on server side' });
            }
        });
    } else {
        callBack(500, { error: 'Request token not found.' });
    }
};

handler._tokens.put = (reqProps = requestProps, callBack) => {
    // check the id if valid
    const id = typeof reqProps.body.id === 'string' ? reqProps.body.id : false;

    const extend =
        typeof reqProps.body.extend === 'boolean' && reqProps.body.extend === true
            ? reqProps.body.extend
            : false;
    console.log(id && extend);
    if (id && extend) {
        data.read('tokens', id, (err, res) => {
            if (!err) {
                const tokenObject = parseJSON(res);
                if (tokenObject.expires > Date.now()) {
                    tokenObject.expires = Date.now() + 60 * 60 + 1000;

                    // store data to database
                    data.update('tokens', id, tokenObject, (err) => {
                        if (!err) {
                            callBack(200, { message: 'Token updaetd successfully' });
                        } else {
                            callBack(500, {
                                message: 'Update Failed. Please try again!',
                            });
                        }
                    });
                } else {
                    callBack(500, {
                        message: 'Token Alredy expired!',
                    });
                }
            } else {
                callBack(404, {
                    message: 'You have a problem in your request. Please try again!',
                });
            }
        });
    } else {
        callBack(404, { message: 'Invalid token. Please try again!' });
    }
};

handler._tokens.delete = (reqProps = requestProps, callBack) => {
    const id =
        typeof reqProps.body.id === 'string' && reqProps.body.id.trim().length > 0
            ? reqProps.body.id
            : false;

    if (id) {
        data.delete('tokens', id, (err) => {
            if (!err) {
                callBack(200, { message: 'Token Deleted successfully' });
            } else {
                callBack(500, { message: 'Error On Deleting Token. Please try again!' });
            }
        });
    } else {
        callBack(500, { message: 'Invalid Token. Please try again!' });
    }
};

handler._tokens.verify = (id, phone, callback) => {
    data.read('tokens', id, (err, res) => {
        const tokenData = parseJSON(res);
        if (!err && tokenData) {
            if (tokenData.phone === phone && tokenData.expires > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};

module.exports = handler;
