/*
 *Title: Environments
 *Decription: Handle all environment related things
 *Author:Rejwanul Reja
 *Date: 10D-Dec-2021
 */

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
    port: 7000,
    envName: 'staging',
    secretKey: 'ghdjdjdtjdtjdtjdfjdtjdtj',
};

environments.production = {
    port: 8000,
    envName: 'production',
    secretKey: 'afafafafafaefeafasfaefaef',
};
// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport = environments[currentEnvironment.trim()];
// typeof environments[currentEnvironment] === 'object'
//     ? environments[currentEnvironment]
//     : environments.staging;

// exports
module.exports = environmentToExport;
