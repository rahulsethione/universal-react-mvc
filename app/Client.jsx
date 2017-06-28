require('./styles/main.scss');

const React = require('react');
const { render } = require('react-dom');
const { Provider } = require('react-redux');
const { StaticRouter, Switch, Route } = require('react-router');

const Store = require('./store');
const Home = require('./containers/Home');
const Dashboard = require('./containers/Dashboard');

// const Index = () => <Provider store={Store}>
//         <StaticRouter context={{}} location={window.location.pathname}>
//                 <Switch>
//                         <Route path="/" render={() => React.createElement(Dashboard, { location: window.location.pathname, data: window.__data })} />
//                 </Switch>
//         </StaticRouter>
// </Provider>;
const Index = ({ location = window.location.pathname, data = window.__data }) => <Provider store={Store}>
        <StaticRouter context={{}} location={location} >
                <Switch>
                        <Route path="/" render={() => React.createElement(Dashboard, { location, data })} />
                </Switch>
        </StaticRouter>
</Provider>;

/*
 * Mounting React to entry point in browser
 */
if(typeof window !== 'undefined') {
        render(<Index />, document.getElementById('app'));
}

/**
 * @exports component Index for initial render from server
 */
module.exports = Index;


