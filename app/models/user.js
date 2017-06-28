let mongoose = require('mongoose');
let { Model } = require('../../helpers');

let schema = new mongoose.Schema({
    name: String,
    email: String,
    passowrd: String
});

let model = mongoose.model('User', schema);

class User extends Model {
    constructor() {
        super(model);
    }
}

module.exports = User;