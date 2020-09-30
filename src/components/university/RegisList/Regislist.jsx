import React from "react";
//import { DropdownMenu, DropdownItem, } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button, Input } from "reactstrap";

var BASEDIR = process.env.REACT_APP_BASEDIR;

class Regislist extends React.Component {
  render() {
    var coursesList = [];
    for (var i = 0; i < this.props.courses.length; i++) {
      coursesList.push();
    }
    return;
  }
}

Regislist.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
};

export default Regislist;
