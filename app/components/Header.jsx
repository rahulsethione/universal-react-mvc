const React = require('react');

class Header extends React.Component {
    render() {
        return <div className="header">
            <div className="container">
                <h3>Dashboard</h3>
            </div>
        </div>;
    }
}

module.exports = Header;