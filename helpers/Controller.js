const Promise = require('bluebird');

const Model = require('./Model');
const htmlResponse = require('./htmlResponse');

/**
 * @class Controller
 */
class Controller {

    /**
     * @constructor
     * @param {*} model 
     */
    constructor(model) {
        
        this._model = model;
        this.get = this.get.bind(this);
        this.createHtmlRoutes = this.createHtmlRoutes.bind(this);
    }

    get model() {
        return this._model.modelName;
    }

    /**
     * GET /[model]/:id or GET /[model]
     * @param {*} req 
     * @param {*} res
     * @returns Promise
     */
    get(req, res, next) {
        let { id = null } = req.params;

        return new Promise((resolve, reject) => {
            if (id) {
                this._model.getOneById(id)
                    .then(doc => resolve(doc.toJSON()))
                    .catch(reject);
            } else {
                this._model.get(req.query)
                    .then(resolve)
                    .catch(reject);
            }
        });
    }

    createHtmlRoutes(expressRouter) {
        const routeName = this._model.modelName.toLowerCase();
        
        expressRouter.get(`/${routeName}`, htmlResponse(this.get));
        expressRouter.get(`/${routeName}/:id`, htmlResponse(this.get));
    }

    createJsonApiRoutes(expressRouter) {
        expressRouter.get(`/${this._model.modelName.toLowerCase()}`, this.get);
        expressRouter.get(`/${this._model.modelName.toLowerCase()}/:id`, this.get);
    }
}

/**
 * @exports class Controller
 */
module.exports = Controller;