const mongoose = require('mongoose');
const connect = (url) => {
    mongoose
        .connect(url)
        .then(() => {
            console.log('Connect Db success!');
        })
        .catch((err) => {
            console.log('connect database faild');
            console.log(err);
        });
};
module.exports = { connect };
