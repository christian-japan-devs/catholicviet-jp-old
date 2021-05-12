import React from 'react';

const MainFooter = () => {
  return (
    <div className="container">
      <hr />
      <div className="row">
        <div className="col-lg-4 mb-5 mb-lg-0">
          <h4 className="text-uppercase mb-4">Địa chỉ</h4>
          <a
            className="btn btn-outline-light btn-social mx-1"
            target="_blank"
            href="https://goo.gl/maps/cFdWMapfPUQbkfM97"
          >
            <i className="fa fa-fw fa-map-marker"></i>
          </a>
          <p className="lead mb-0">
            Ga Yotsuya,Tokyo, Nhật Bản.
            <br />
            Nhà thờ Thánh Ignatius.
          </p>
        </div>
        <div className="col-lg-4 mb-5 mb-lg-0">
          <h4 className="text-uppercase mb-4">Liên hệ</h4>
          <a
            className="btn btn-outline-light btn-social mx-1"
            target="_blank"
            href="https://www.facebook.com/conggiaovietnamtainhatban"
          >
            <i className="fab fa-fw fa-facebook-f"></i>
          </a>
          <a
            className="btn btn-outline-light btn-social mx-1"
            target="_blank"
            href="https://www.facebook.com/Giới-Trẻ-Công=Giáo=Việt-Nam-Vùng-Kanto-1291810040948655"
          >
            <i className="fab fa-fw fa-facebook-f"></i>
          </a>
          <p className="lead mb-0">
            FB Giáo đoàn công giáo
            <br />
            FB Giới trẻ công giáo
          </p>
        </div>
        <div className="col-lg-4">
          <h4 className="text-uppercase mb-4">Cổng thông tin</h4>
          <a
            className="btn btn-outline-light btn-social mx-1"
            target="_blank"
            href="http://vietcatholicjp.net/biet-de-yeu/"
          >
            <i className="fa fa-fw fa-globe"></i>
          </a>
          <p className="lead mb-0">Công giáo Việt Nam tại Nhật</p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default MainFooter;
