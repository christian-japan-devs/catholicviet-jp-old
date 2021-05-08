import React from "react";
import "./MainHeader.css";

const MainHeader = () => {
  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-navbar-main text-uppercase fixed-top py-3"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand" href="#">
            Vietcatholicjp
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-0 mx-lg-1">
                <a
                  className="nav-link py-3 px-0 px-lg-3 js-scroll-trigger active"
                  href="gospel.html"
                >
                  PV LỜI CHÚA
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <a
                  className="nav-link py-3 px-0 px-lg-3 js-scroll-trigger"
                  href="mass.html"
                >
                  THÁNH LỄ
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <a
                  className="nav-link py-3 px-0 px-lg-3 js-scroll-trigger"
                  href="mucvu.html"
                >
                  MỤC VỤ
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <a
                  className="nav-link py-3 px-0 px-lg-3 js-scroll-trigger"
                  href="about.html"
                >
                  GIỚI THIỆU
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <a
                  className="nav-link py-3 px-0 px-lg-3  js-scroll-trigger"
                  href="contact.html"
                >
                  LIÊN LẠC
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </nav>
    </div>
  );
};

export default MainHeader;
