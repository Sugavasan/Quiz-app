
import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <header>
      <nav className="navbar bg-primary fixed-top">
        <div className="container-fluid">
          <h3 className="navbar-brand" style={{ color: 'white' }}>
            Testyourself
          </h3>
          <Link to="/Main/" className="nav-link ms-auto" style={{ color: 'white' }}>
                   Home
                  </Link>
          <Link to='/Main/about' className="nav-link ms-2" aria-current="page" style={{ color: 'white' }}>
                    About
                  </Link>
                  <Link to="/Main/review" className="nav-link ms-2" style={{ color: 'white' }}>
                    Review
                  </Link>
                  <Link to="/Main/home" className="nav-link ms-2" style={{ color: 'white' }}>
                    
                  </Link>
                  <Link to="/Main/intro" className="nav-link ms-2" style={{ color: 'white' }}>
                    
                  </Link>
                 
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <i>HomePage</i>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                <Link to="/Main/" className="nav-link" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Logout
                  </Link>
                </li>
                    
                  </ul>
            
              <form className="d-flex mt-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
