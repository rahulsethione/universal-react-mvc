const Redux = require('redux');

/**
 * Reducer
 * @param {*} state 
 * @param {*} action 
 * @returns {*} nextState
 */
function Reducer(state = {}, action) {
    return {
        type: action.type || state.type,
        subtype: action.subtype || state.subtype,
        data: action.payload
    };
};

/**
 * @exports store
 */
module.exports = Redux.createStore(Reducer);