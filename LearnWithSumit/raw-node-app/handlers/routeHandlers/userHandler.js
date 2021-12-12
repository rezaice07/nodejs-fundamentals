/*
 *Title: User handler
 *Decription: Route handler to handle user related routes
 *Author:Rejwanul Reja
 *Date: 12-Dec-2021
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
    body: {},
};
const acceptedMethods = ['get', 'post', 'put', 'delete'];

handler.userHandler = (reqProps, callBack) => {
    if (acceptedMethods.indexOf(reqProps.method) > -1) {
        handler._users[reqProps.method](reqProps, callBack);
    } else {
        callBack(405);
    }
};

// service : user
handler._users = {};

handler._users.post = (reqProps = requestProps, callBack) => {
    const firstName =
        typeof reqProps.body.firstName === 'string' && reqProps.body.firstName.length > 0
            ? reqProps.body.firstName
            : false;

    const lastName =
        typeof reqProps.body.lastName === 'string' && reqProps.body.lastName.length > 0
            ? reqProps.body.lastName
            : false;

    const phone =
        typeof reqProps.body.phone === 'string' && reqProps.body.phone.trim().length === 11
            ? reqProps.body.phone
            : false;

    const password =
        typeof reqProps.body.password === 'string' && reqProps.body.password.length > 0
            ? reqProps.body.password
            : false;

    const tosAgreement =
        typeof reqProps.body.tosAgreement === 'boolean' ? reqProps.body.tosAgreement : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure that the user does not already exists
        data.read('users', phone, (err) => {
            if (err) {
                // here err len means file not exists
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };

                // store the user to db
                data.create('users', phone, userObject, (err) => {
                    if (!err) {
                        callBack(200, { message: 'User created successfully!' });
                    } else {
                        callBack(500, { error: 'Could not create user!' });
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

handler._users.get = (reqProps = requestProps, callBack) => {
    const phone =
        typeof reqProps.queryStringObject.phone === 'string' &&
        reqProps.queryStringObject.phone.trim().length === 11
            ? reqProps.queryStringObject.phone
            : false;
    if (phone) {
        // verify token
        const token =
            typeof reqProps.heardObjects.token === 'string' ? reqProps.heardObjects.token : false;
        tokenHandler._tokens.verify(token, phone, (res) => {
            if (res) {
                // lookup the user
                data.read('users', phone, (err, res) => {
                    const user = parseJSON(res);
                    if (!err) {
                        delete user.password;
                        callBack(200, { user });
                    } else {
                        callBack(500, { error: 'There was an error on server side' });
                    }
                });
            } else {
                callBack(403, { error: 'User not authenticated' });
            }
        });
    } else {
        callBack(404, { message: 'Requested user was not found' });
    }
};

handler._users.put = (reqProps = requestProps, callBack) => {
    const firstName =
        typeof reqProps.body.firstName === 'string' && reqProps.body.firstName.length > 0
            ? reqProps.body.firstName
            : false;

    const lastName =
        typeof reqProps.body.lastName === 'string' && reqProps.body.lastName.length > 0
            ? reqProps.body.lastName
            : false;

    const phone =
        typeof reqProps.body.phone === 'string' && reqProps.body.phone.trim().length === 11
            ? reqProps.body.phone
            : false;

    const password =
        typeof reqProps.body.password === 'string' && reqProps.body.password.length > 0
            ? reqProps.body.password
            : false;

    if (phone) {
        if (firstName || lastName || password) {
            // verify token
            const token =
                typeof reqProps.heardObjects.token === 'string'
                    ? reqProps.heardObjects.token
                    : false;
            tokenHandler._tokens.verify(token, phone, (res) => {
                if (res) {
                    // lookup user
                    data.read('users', phone, (err, res) => {
                        if (!err) {
                            const user = parseJSON(res);
                            if (firstName) {
                                user.firstName = firstName;
                            }
                            if (lastName) {
                                user.lastName = lastName;
                            }
                            if (password) {
                                user.password = hash(password);
                            }
                            // store data to database
                            data.update('users', phone, user, (err) => {
                                if (!err) {
                                    callBack(200, { message: 'User updaetd successfully' });
                                } else {
                                    console.log(err);
                                    callBack(500, {
                                        message: 'Update Failed. Please try again!',
                                    });
                                }
                            });
                        } else {
                            callBack(404, {
                                message: 'You have a problem in your request. Please try again!',
                            });
                        }
                    });
                } else {
                    callBack(403, { error: 'User not authenticated' });
                }
            });
        } else {
            callBack(404, { message: 'You have a problem in your request. Please try again!' });
        }
    } else {
        callBack(404, { message: 'Invalid phone number. Please try again!' });
    }
};

handler._users.delete = (reqProps = requestProps, callBack) => {
    const phone =
        typeof reqProps.body.phone === 'string' && reqProps.body.phone.trim().length === 11
            ? reqProps.body.phone
            : false;

    if (phone) {
        // verify token
        const token =
            typeof reqProps.heardObjects.token === 'string' ? reqProps.heardObjects.token : false;
        tokenHandler._tokens.verify(token, phone, (res) => {
            if (res) {
                // lookup user
                data.delete('users', phone, (err) => {
                    if (!err) {
                        callBack(200, { message: 'User Deleted successfully' });
                    } else {
                        callBack(500, { message: 'Error On Deleting User. Please try again!' });
                    }
                });
            } else {
                callBack(403, { error: 'User not authenticated' });
            }
        });
    } else {
        callBack(500, { message: 'Invalid phone number. Please try again!' });
    }
};

module.exports = handler;
