const User = require('../models/user');
const { Controller } = require('../../helpers');

let userModel = new User();
console.log('Here', userModel.modelName);

class UserController extends Controller {
    constructor() {
        super(new User());
    }
}

module.exports = UserController;