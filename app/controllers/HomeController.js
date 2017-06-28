const Promise = require('bluebird');
const { htmlResponse } = require('../../helpers');
const { states } = require('../constants');

class HomeController {
    constructor() {
        this.state = states.home;
        
        this.render = this.render.bind(this);
    }

    render(req, res) {
        return Promise.resolve({});
    }
}

module.exports = HomeController;