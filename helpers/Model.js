/**
 * Base class for mongoose model classes
 * @class Model
 */
class Model {

    /**
     * @constructor
     * @param {*} model 
     */
    constructor(model) {
        this.model = model;
    }

    get modelName() {
        return this.model.modelName;
    }

    /**
     * Gets one document if selection parameter is '_id'
     * @param {*} _id 
     * @returns Promise
     */
    getOneById(_id) {
        return this.model.findById({ _id }).exec();
    }

    /**
     * Gets documents that match the query parameters
     * @param {*} query 
     * @returns Promise
     */
    get(query = {}) {
        return this.model.find(Object.assign({}, query)).exec();
    }

    /**
     * Gets the first document if selection parameters match with optional projection fields
     * @param {*} condition 
     * @param {*} projection (optional)
     * 
     */
    getOne(condition, projection) {
        let doc = this.model.findOne(condition);
        if (projection) {
            doc = doc.select(projection);
        }
        return doc.exec();
    }

    /**
     * Gets and populates the documents if selection parameters match
     * @param {*} condition (optional)
     * @param {*} fields (optional)
     * @returns Promise
     */
    findAndPopulate(condition = {}, fields = [], limit) {
        let query = this.model.find(condition);
        if (limit && _.isFinite(limit)) {
            query = query.limit(limit);
        }

        return query.populate(fields).exec();
    }

    /**
     * Gets and populates the first document if selection parameters match
     * @param {*} condition 
     * @param {*} fields (optional)
     * @returns Promise
     */
    findOneAndPopulate(condition, fields = []) {
        return this.model.findOne(condition).populate(fields).exec();
    }

    /**
     * Creates a new document
     * @param {*} data 
     * @returns Promise
     */
    create(data) {
        return this.model(data).save();
    }

    /**
     * Updates one document by '_id'
     * @param {*} _id 
     * @param {*} updates 
     * @param {*} options 
     * @returns Promise
     */
    updateOne(_id, updates, options = {}) {
        if (!updates || Object.keys(updates).length == 0) {
            return Promise.reject(new Error('Bad Request: Cannot update a document to \'undefined\', \'null\' or an empty object.'))
        }
        return this.model.findOneAndUpdate({ _id }, updates, Object.assign({ new: true }, options)).exec();
    }

    /**
     * Deletes one document by '_id'
     * @param {*} _id 
     * @param {*} query 
     * @returns Promise
     */
    deleteOneById(_id, query) {
        return this.model.remove({ _id }).exec();
    }

    /**
     * Deletes multiple documents that match the condition in query
     * @param {*} query
     * @returns Promise 
     */
    deleteMany(query) {
        if (query && Object.keys(query).length > 0) {
            return this.model.destroy(Object.assign({}, query));
        } else {
            return Promise.reject(new Error('Bad Request: Cannot delete all documents.'));
        }
    }
}

/**
 * @exports class Model
 */
module.exports = Model;