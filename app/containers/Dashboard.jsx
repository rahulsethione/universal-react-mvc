const React = require('react');
const { Switch, Route } = require('react-router');

const Header = require('../components/Header');

class Dashboard extends React.Component {
    render() {
        return <div className="dashboard-main">
            <Header></Header>
        </div>;
    }
}

module.exports = Dashboard;