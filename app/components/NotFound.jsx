const React = require('react');

const { Component } = React;

class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>Not Found</div>;
    }
}

module.exports = NotFound;