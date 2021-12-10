/*
 *Title: Not found Handler
 *Decription: 404 Not found handler
 *Author:Rejwanul Reja
 *Date: 10D-Dec-2021
 */
// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callBack) => {
    console.log(requestProperties);
    callBack(404, {
        message: 'Your request URL was not found url',
    });
};

module.exports = handler;
