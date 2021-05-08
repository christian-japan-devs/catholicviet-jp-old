import React from "react";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
import NewFeeds from "./NewFeed";
import "./main.css";

const Main = () => {
  return (
    <div>
      <MainHeader />
      <br />
      <main className="container body">
        <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
          <div className="col-md-6 px-0">
            <h1 className="display-4 fst-italic">Thư Mục Vụ</h1>
            <p className="lead my-3">
              Cha P.M. Nguyễn Hữu Hiến, Đã 1 năm rồi, từ tháng 2 năm 2020,
              coronavirus đã làm thay đổi bộ mặt thế giới, mang lại biết bao tổn
              thất từ tinh thần cho đến vật chất, chính trị, kinh tế, nghĩa là
              thay đổi cả cuộc sống vốn bình an của nhân loại,
            </p>
            <p className="lead mb-0">
              <a href="#" className="text-white fw-bold">
                Đọc tiếp...
              </a>
            </p>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-2"></div>
          <NewFeeds />
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <h3 className="pb-4 mb-4 fst-italic border-bottom">
              From the Firehose
            </h3>
            <article className="blog-post">
              <h2 className="blog-post-title">Another blog post</h2>
              <p className="blog-post-meta">
                December 23, 2013 by <a href="#">Jacob</a>
              </p>

              <p>
                I am ready for the road less traveled. Already{" "}
                <a href="#">brushing off the dust</a>. Yeah, you're lucky if
                you're on her plane. I used to bite my tongue and hold my
                breath. Uh, She’s a beast. I call her Karma (come back). Black
                ray-bans, you know she's with the band. I can't sleep let's run
                away and don't ever look back, don't ever look back.
              </p>
              <blockquote>
                <p>
                  Growing fast into a <strong>bolt of lightning</strong>. Be
                  careful Try not to lead her on
                </p>
              </blockquote>
              <p>
                I'm intrigued, for a peek, heard it's fascinating. Oh oh! Wanna
                be a victim ready for abduction. She's got that international
                smile, oh yeah, she's got that one international smile. Do you
                ever feel, feel so paper thin. I’m gon’ put her in a coma.
                Sun-kissed skin so hot we'll melt your popsicle.
              </p>
              <p>
                This is transcendental, on another level, boy, you're my lucky
                star.
              </p>
            </article>

            <article className="blog-post">
              <h2 className="blog-post-title">New feature</h2>
              <p className="blog-post-meta">
                December 14, 2013 by <a href="#">Chris</a>
              </p>

              <p>
                From Tokyo to Mexico, to Rio. Yeah, you take me to utopia. I'm
                walking on air. We'd make out in your Mustang to Radiohead. I
                mean the ones, I mean like she's the one. Sun-kissed skin so hot
                we'll melt your popsicle. Slow cooking pancakes for my boy,
                still up, still fresh as a Daisy.
              </p>
              <ul>
                <li>I hope you got a healthy appetite.</li>
                <li>You're never gonna be unsatisfied.</li>
                <li>Got a motel and built a fort out of sheets.</li>
              </ul>
              <p>
                Don't need apologies. Boy, you're an alien your touch so
                foreign, it's <em>supernatural</em>, extraterrestrial. Talk
                about our future like we had a clue. I can feel a phoenix inside
                of me.
              </p>
            </article>

            <nav className="blog-pagination" aria-label="Pagination">
              <a className="btn btn-text-dark" href="#">
                Older
              </a>
              <a className="btn btn-text-dark" href="#" aria-disabled="true">
                Newer
              </a>
            </nav>
          </div>

          <div className="col-md-4">
            <div className="p-4 mb-3 bg-light rounded">
              <h4 className="fst-italic">About</h4>
              <p className="mb-0">
                Saw you downtown singing the Blues. Watch you circle the drain.
                Why don't you let me stop by? Heavy is the head that{" "}
                <em>wears the crown</em>. Yes, we make angels cry, raining down
                on earth from up above.
              </p>
            </div>

            <div className="p-4">
              <h4 className="fst-italic">Archives</h4>
              <ol className="list-unstyled mb-0">
                <li>
                  <a href="#">March 2014</a>
                </li>
                <li>
                  <a href="#">February 2014</a>
                </li>
                <li>
                  <a href="#">January 2014</a>
                </li>
                <li>
                  <a href="#">December 2013</a>
                </li>
                <li>
                  <a href="#">November 2013</a>
                </li>
                <li>
                  <a href="#">October 2013</a>
                </li>
                <li>
                  <a href="#">September 2013</a>
                </li>
                <li>
                  <a href="#">August 2013</a>
                </li>
                <li>
                  <a href="#">July 2013</a>
                </li>
                <li>
                  <a href="#">June 2013</a>
                </li>
                <li>
                  <a href="#">May 2013</a>
                </li>
                <li>
                  <a href="#">April 2013</a>
                </li>
              </ol>
            </div>

            <div className="p-4">
              <h4 className="fst-italic">Elsewhere</h4>
              <ol className="list-unstyled">
                <li>
                  <a href="#">GitHub</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
      <br />
      <br />
      <MainFooter />
    </div>
  );
};

export default Main;
