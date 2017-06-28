const { createElement } = require('react');
const { renderToString } = require('react-dom/server');

/**
 * Renders HTML with React as a response
 * @param controller
 */
module.exports = controller => (req, res, next) => {
    let userAgent = req.headers['user-agent'],
        location = req.url,
        session = req.session;
        
    return controller(req, res, next)
        .then(data => {
            let body = renderToString(createElement(require('../app/Index'), { location, data }));
            res.render('index', { body, data });
        })
        .catch(next);
}                                                                         