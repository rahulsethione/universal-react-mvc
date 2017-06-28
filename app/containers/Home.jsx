const React = require('react');
const PropTypes = require('prop-types');

const Header = require('../components/Header');

const { Component } = React;

/**
 * @class Home
 * @extends React.Component
 */
class Home extends Component {
    render() {
        return <div className="home-container">
            <Header />
            <button onClick={() => console.log('Clicked')}></button>
        </div>;
    }
}

/**
 * @exports class Home
 */
module.exports = Home;