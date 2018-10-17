import React, { Component } from "react";
import "./navBarSignedIn.css";
import { Link } from "react-router-dom";

const NavBarSignedIn = ({ trySignOut }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" to="/">
          Bottle Green
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/aboutus">
                About Us<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history">
                History
              </Link>
            </li>
          </ul>

          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Profile
            </a>
            <div
              className="dropdown-menu"
              id="bootstrap-overrides"
              aria-labelledby="navbarDropdown"
            >
              <Link className="dropdown-item" to="/profile">
                My Profile
              </Link>
              <div className="dropdown-divider" />
              <a className="dropdown-item" onClick={trySignOut}>
                sign out
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBarSignedIn;
