var React = require('react');

var NavbarBrand = React.createClass({
    render: function () {
        return (
            <div className="navbar-header pull-left">
                <a href="#" className="navbar-brand">
                    <small>
                        <img src="assets/img/logo.png" alt=""/>
                    </small>
                </a>
            </div>
        );
    }
});

module.exports = NavbarBrand;