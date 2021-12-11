// dependencies
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    const filePath = `${lib.basedir + dir}/${file}.json`;
    // open file for writing
    fs.open(filePath, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);
            // write data to file and hen close it
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if (!err) {
                    fs.close(fileDescriptor, (err) => {
                        if (!err) {
                            callback(false);
                        } else {
                            callback('Error closing the new file');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            callback('Could not create new file, it may already exists');
        }
    });
};

// read data from file
lib.read = (dir, file, callback) => {
    const filePath = `${lib.basedir + dir}/${file}.json`;
    fs.readFile(filePath, 'utf8', (err, data) => {
        callback(err, data);
    });
};

// udpate data
lib.update = (dir, file, data, callback) => {
    const filePath = `${lib.basedir + dir}/${file}.json`;
    // file open for wrting
    fs.open(filePath, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // conver the data to string
            const stringData = JSON.stringify(data);
            // truncate the file
            fs.ftruncate(fileDescriptor, (err) => {
                if (!err) {
                    // write into the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if (!err) {
                            // close the file
                            fs.close(fileDescriptor, (err) => {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback('Error on closing file');
                                }
                            });
                        } else {
                            callback('Error on wrting file');
                        }
                    });
                } else {
                    callback('Error on truncating file');
                }
            });
        } else {
            callback('Error Updating. File may not exist');
        }
    });
};

// delete existing file
lib.delete = (dir, file, callback) => {
    const filePath = `${lib.basedir + dir}/${file}.json`;
    // unlink file
    fs.unlink(filePath, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Error on deleting!');
        }
    });
};

module.exports = lib;
