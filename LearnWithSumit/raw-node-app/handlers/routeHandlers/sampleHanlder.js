/*
 *Title: Sample handler
 *Decription: Sample handler
 *Author:Rejwanul Reja
 *Date: 10D-Dec-2021
 */

// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callBack) => {
    console.log(requestProperties);

    callBack(200, [
        {
            message: 'This is sample url',
        },
        {
            message: 'This is sample url02',
        },
        {
            message: 'This is sample url03',
        },
    ]);
};

module.exports = handler;
