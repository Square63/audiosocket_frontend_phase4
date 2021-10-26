import Head from 'next/head';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import Select from "react-select";
import amazon from '../images/amazon.svg';
import disnep from '../images/Disnep.svg';
import hbo from '../images/HBO.svg';
import mailchimp from '../images/mailchimp.svg';
import nbc from '../images/NBC.svg';
import netflix from '../images/netflix.svg';
import vice from '../images/vice.svg';
import Slider from "react-slick";
import slick1 from '../images/slick01.jpg';
import slick2 from '../images/slick02.jpg';
import slick3 from '../images/slick03.jpg';
import slick4 from '../images/slick04.jpg';
import slick5 from '../images/slick05.jpg';
import Sample1 from '../images/sample1.jpeg';
import Sample2 from '../images/sample2.jpeg';
import Sample3 from '../images/sample3.jpeg';
import mood1 from '../images/mood1.png';
import mood2 from '../images/mood2.png';
import mood3 from '../images/mood3.jpg';
import mood4 from '../images/mood4.jpg';
import testimonialAvatar from '../images/avatar.png';
import Carousel from 'react-bootstrap/Carousel';
import CarouselMood from 'react-elastic-carousel';
import $ from 'jquery';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import { useRouter } from "next/router";
import {useContext, useEffect, useState, useRef} from "react";
import styles from '../styles/Home.module.scss';

const imagess = [Sample1, Sample2, Sample3, Sample1, Sample2, Sample3];

const breakPoints = [
  { width: 1, itemsToShow: 2, pagination: true },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 750, itemsToShow: 3, itemsToScroll: 2, pagination: false },
  { width: 1100, itemsToShow: 4, itemsToScroll: 2, pagination: false },
  
];

function toggleClass(e) {
  $('.tab').each(function(i, obj) {
    obj.classList.remove('tabSelected')
  });
  e.currentTarget.classList.add("tabSelected");
  var tabSelectedHeight = e.currentTarget.nextElementSibling.children[0].clientHeight + 80
  tabSelectedHeight = tabSelectedHeight <= 697 ? 'auto' : tabSelectedHeight
  e.currentTarget.parentElement.parentElement.style.height = tabSelectedHeight == 'auto'? 'auto' : tabSelectedHeight.toString() + 'px'
};

export default function Home() {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    { text: "Aim to inspire", src: mood1 },
    { text: "Ambient.", src: mood2 },
    { text: "Angry", src: mood3 },
    { text: "Dreamy", src: mood4 },
    { text: "Love", src: Sample1 },
    { text: "Life", src: Sample2 },
    { text: "Nature", src: Sample3 },
  ];

  const settings2 = {
    speed: 300,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [{breakpoint: 550, settings: {slidesToShow: 1}}, {breakpoint: 768, settings: {slidesToShow: 3}}, {breakpoint: 1200, settings: {slidesToShow: 5, slidesToScroll: 2}}],
    beforeChange: (current, next) => setImageIndex(next),
  };

  var settings = {
    // infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: "0",
    centerMode: true,   
    responsive: [{breakpoint: 550, settings: {slidesToShow: 1}}, {breakpoint: 768, settings: {slidesToShow: 3}}, {breakpoint: 1200, settings: {slidesToShow: 5, slidesToScroll: 2}}],
  };

  const [videoPlay, setVideoPlay] = useState(false);

  function togglePlay(e) {
    if (!videoPlay) {
      e.target.nextSibling.style.zIndex = 1000;
      e.target.nextSibling.play()
      setVideoPlay(true);
    }
    else {
      e.target.style.zIndex = -1
      setVideoPlay(false);

    }
  };

  return (
    <div>
      <Head>
        <title>Audiosocket</title>
        <meta name="description" content="Audiosocket" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        /> 
      </Head>

      <main className={styles.main}>
        <section className="heroSection">
          <div className="heroContent">
            <div className="fixed-container">

              <h1>Find &amp; License Music. Fast.</h1>
              <p>Licensing plans start at $10/month with unlimited access to over 80K songs and 25K SFX from amazing bands &amp; artists.</p>
              <Form className="heroForm">
                <Form.Control type="search" placeholder="Enter a keyword, YouTube link, or Spotify song link…" />
                <Button variant="default" type="submit" className="btnMainLarge stickyBtn">Search</Button>
              </Form>
              <div className="brandsStrip">
                <Image src={amazon} alt="Amazon" className="heroBrand"/>
                <Image src={mailchimp} alt="Mailchimp" className="heroBrand mailChimp"/>
                <Image src={disnep} alt="Disnep" className="heroBrand"/>
                <Image src={hbo} alt="HBO" className="heroBrand"/>
                <Image src={netflix} alt="NETFLIX" className="heroBrand"/>
                <Image src={nbc} alt="NBC" className="heroBrand"/>
                <Image src={vice} alt="VICE" className="heroBrand"/>
              </div>
            </div>
          </div>
        </section>
        
        <section className="howToUse">
          <div className="fixed-container">
            <h2>Learn how to use our search tools to find tracks quickly.</h2>
            <div className="tabsContainer">
              <div className="tabs">
                <div className="tab tabSelected" onClick={toggleClass}>
                  <div className="tabImg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="37.035" height="38.927" viewBox="0 0 37.035 38.927">
                      <g id="Group_212" data-name="Group 212" transform="translate(1.035 1)">
                        <g id="filter-text">
                          <path id="Shape_1080" data-name="Shape 1080" d="M525.059,2008.776a1.594,1.594,0,0,0-1.2-2.645H503.793a1.593,1.593,0,0,0-1.2,2.645l8.844,10.1v8.972a1.593,1.593,0,0,0,2.478,1.326l1.593-1.063a1.593,1.593,0,0,0,.709-1.326v-7.909Z" transform="translate(-502.2 -2006.131)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_1081" data-name="Shape 1081" d="M533.8,2034.131h6.373" transform="translate(-508.36 -2011.654)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_1082" data-name="Shape 1082" d="M529.8,2040.131h9.56" transform="translate(-507.546 -2012.837)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_1083" data-name="Shape 1083" d="M529.8,2046.131h9.56" transform="translate(-507.546 -2013.984)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_1084" data-name="Shape 1084" d="M525.8,2029.724a1.593,1.593,0,0,1,1.593-1.593H540.14a1.593,1.593,0,0,1,1.593,1.593v15.933a1.593,1.593,0,0,1-1.593,1.593H527.393a1.593,1.593,0,0,1-1.593-1.593Z" transform="translate(-506.733 -2010.324)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="tabHeading">
                    <h3>Filters &amp; keywords.</h3>
                    <p>Genre, Mood, BPM, Vocals, Themes, Instruments.</p>
                  </div>
                </div>
                <div className="tabsContent">
                  <div className="tabsInnerContent">
                    <div className="searchvideoSection">
                      <p>Watch the filters &amp; keywords guide</p>
                      <div className="videoContainer" onClick={togglePlay}>
                        <span></span>
                        <video poster="./screenSearch.png" controls>
                          <source src="./simpleSearch.mp4" type="video/mp4"/>
                        </video>
                      </div>
                      <div className="catalogBtn-block">
                        <button className="btn btnMainLarge">Search the catalog</button>
                      </div>
                    </div>
                    <div className="outOfScenario">
                      <h5>Try out this scenario.</h5>
                      <p>You’re looking for a cool contemporary electronic rock track with female vocals that is moody for your travel video. Something that fans of Phantogram would love.</p>
                    </div>
                    <div className="stepsWrapper">
                      <div className="stepSection">
                        <h5>Step 1 :</h5>
                      </div>
                      <div className="stepContent selectOption">
                        <Form>
                          <Form.Label className="stepsLabel">Select Genre : <span>Rock</span></Form.Label>
                          <div className="roundedForm">
                            <select aria-label="Default select example" className="form-control circularInput">
                              <option>Select Genre</option>
                              <option value="1">Classical</option>
                              <option value="2">Rock</option>
                              <option value="3">POP</option>
                            </select>
                            <div variant="default" type="submit" className="circularBtn">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13.328" height="16.414" viewBox="0 0 13.328 16.414">
                                <g id="icon-arrow-down" transform="translate(1.414 1)">
                                  <path id="Shape_1938" data-name="Shape 1938" d="M334.432,2393.5v14" transform="translate(-329.182 -2393.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                  <path id="Shape_1939" data-name="Shape 1939" d="M337.432,2402.5l-5.25-5.25" transform="translate(-332.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                  <path id="Shape_1940" data-name="Shape 1940" d="M334.432,2402.5l5.25-5.25" transform="translate(-329.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                    <div className="stepsWrapper">
                      <div className="stepSection">
                        <h5>Step 2 :</h5>
                      </div>
                      <div className="stepContent">
                        <Form>
                          <Form.Label className="stepsLabel">Select Vocals : <span>Female</span></Form.Label>
                          {['radio'].map((type) => (
                            <div key={`inline-${type}`}>
                              <Form.Check
                                label="Male"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                              />
                              <Form.Check
                                label="Female"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                              />
                              <Form.Check
                                label="Instrumental"
                                name="group1"
                                type={type}
                                id={`inline-${type}-3`}
                              />
                            </div>
                          ))}
                        </Form>
                      </div>
                    </div>
                    <div className="stepsWrapper">
                      <div className="stepSection">
                        <h5>Step 3 :</h5>
                      </div>
                      <div className="stepContent">
                        <Form>
                          <Form.Label className="stepsLabel">Add “Phantogram” in keyword search.</Form.Label>
                          <div className="roundedForm">
                            <Form.Control type="search" className="circularInput" placeholder="Enter your email." />
                            <Button variant="default" type="submit" className="circularBtn">
                              <svg xmlns="http://www.w3.org/2000/svg" width="15.014" height="12.278" viewBox="0 0 15.014 12.278">
                                <g id="Group_16" data-name="Group 16" transform="translate(1 10.864) rotate(-90)">
                                  <path id="Shape_1938" data-name="Shape 1938" d="M0,0V12.6" transform="translate(4.725 0)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                  <path id="Shape_1939" data-name="Shape 1939" d="M4.725,4.725,0,0" transform="translate(0 7.875)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                  <path id="Shape_1940" data-name="Shape 1940" d="M0,4.725,4.725,0" transform="translate(4.725 7.875)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                </g>
                              </svg>
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tabs">
                <div className="tab" onClick={toggleClass}>
                <div className="tabImg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37">
                    <g id="Icon_-_Playlist" data-name="Icon - Playlist" transform="translate(1 1)">
                      <g id="Group_166" data-name="Group 166">
                        <g id="playlist-album">
                          <path id="Rectangle-path_80" data-name="Rectangle-path 80" d="M231.5,1913.132a1.518,1.518,0,0,1,1.518-1.518h27.325a1.518,1.518,0,0,1,1.518,1.518v27.325a1.519,1.519,0,0,1-1.518,1.518H233.022a1.518,1.518,0,0,1-1.518-1.518Z" transform="translate(-231.504 -1911.614)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_1151" data-name="Shape 1151" d="M237.5,1946.457a1.518,1.518,0,0,0,1.518,1.518h27.325a1.519,1.519,0,0,0,1.518-1.518v-27.325a1.518,1.518,0,0,0-1.518-1.518" transform="translate(-232.865 -1912.975)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Oval_190" data-name="Oval 190" d="M255.823,1938.253a2.319,2.319,0,1,0-2.319-2.319A2.32,2.32,0,0,0,255.823,1938.253Z" transform="translate(-236.805 -1916.915)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Oval_191" data-name="Oval 191" d="M241.823,1940.253a2.319,2.319,0,1,0-2.319-2.319A2.319,2.319,0,0,0,241.823,1940.253Z" transform="translate(-233.432 -1917.397)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_1152" data-name="Shape 1152" d="M245.5,1934.913v-8.885a1.545,1.545,0,0,1,1.121-1.486l7.731-2.21a1.546,1.546,0,0,1,1.971,1.488v9.546" transform="translate(-234.927 -1914.235)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="tabHeading">
                  <h3>Curated Playlists &amp; Creator Kits.</h3>
                  <p>Find inspiration using our professionally curated playlists &amp; creators kits.</p>
                </div>
                </div>
                <div className="tabsContent">
                  <div className="tabsInnerContent">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of `de Finibus Bonorum et Malorum` (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, `Lorem ipsum dolor sit amet..`, comes from a line in section 1.10.3
                  </div>
                </div>
              </div>

              <div className="tabs">
                <div className="tab" onClick={toggleClass}>
                  <div className="tabImg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="37.003" height="37.003" viewBox="0 0 37.003 37.003">
                      <g id="Group_153" data-name="Group 153" transform="translate(1 1)">
                        <g id="video-file-upload">
                          <path id="Shape_813" data-name="Shape 813" d="M228.748,1307.9H216.594a1.521,1.521,0,0,1-1.519-1.522v-31.959a1.521,1.521,0,0,1,1.519-1.522h20.2a1.514,1.514,0,0,1,1.074.446l5.632,5.642a1.519,1.519,0,0,1,.445,1.076v5.011" transform="translate(-215.075 -1272.897)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_814" data-name="Shape 814" d="M236.445,1292.391l-7.627-4.106a1.172,1.172,0,0,0-1.743,1.025v8.8a1.173,1.173,0,0,0,1.743,1.025l3.337-2.053" transform="translate(-217.971 -1276.584)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Oval_80" data-name="Oval 80" d="M246.281,1313.309a9.206,9.206,0,1,0-9.206-9.206A9.206,9.206,0,0,0,246.281,1313.309Z" transform="translate(-220.484 -1278.307)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_815" data-name="Shape 815" d="M249.075,1310.1V1300.9" transform="translate(-223.203 -1279.703)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_816" data-name="Shape 816" d="M248.027,1300.9l-3.452,3.452" transform="translate(-222.147 -1279.61)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_817" data-name="Shape 817" d="M249.075,1300.9l3.452,3.452" transform="translate(-223.226 -1279.61)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="tabHeading">
                    <h3>Upload a track for reference.</h3>
                    <p>Upload your own track to find similar tracks.</p>
                  </div>
                </div>
                <div className="tabsContent">
                  <div className="tabsInnerContent">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of `de Finibus Bonorum et Malorum` (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, `Lorem ipsum dolor sit amet..`, comes from a line in section 1.10.3
                  </div>
                </div>
              </div>

              <div className="tabs">
                <div className="tab" onClick={toggleClass}>
                  <div className="tabImg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35.915" height="39.987" viewBox="0 0 35.915 39.987">
                      <g id="Icon_-_Link" data-name="Icon - Link" transform="translate(0.993 0.993)">
                        <g id="Group_259" data-name="Group 259">
                          <g id="audio-file-upload">
                            <path id="Shape_1576" data-name="Shape 1576" d="M245.567,2639.78H232.452a1.64,1.64,0,0,1-1.64-1.641v-34.464a1.64,1.64,0,0,1,1.64-1.641h21.792a1.638,1.638,0,0,1,1.159.481l6.077,6.084a1.645,1.645,0,0,1,.48,1.161v10.328" transform="translate(-230.812 -2602.034)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.987"/>
                            <path id="Shape_1577" data-name="Shape 1577" d="M247.073,2628.3c0,1.551-1.861,2.8-4.157,2.8s-4.157-1.254-4.157-2.8,1.861-2.8,4.157-2.8S247.073,2626.752,247.073,2628.3Z" transform="translate(-232.222 -2606.158)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.987"/>
                            <path id="Shape_1578" data-name="Shape 1578" d="M248.693,2626.333v-11.269a1.663,1.663,0,0,1,2.494-1.444l3.326,1.9" transform="translate(-233.961 -2604.073)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.987"/>
                            <g id="Programming-Apps-Websites_Apps_app-window-link" data-name="Programming-Apps-Websites / Apps / app-window-link" transform="translate(17.846 21.943)">
                              <g id="Group_208" data-name="Group 208">
                                <g id="app-window-link">
                                  <path id="Shape_1385" data-name="Shape 1385" d="M265.557,2638.054l3.527-3.527a3.326,3.326,0,1,0-4.7-4.705l-3.527,3.529" transform="translate(-254.001 -2628.849)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.987"/>
                                  <path id="Shape_1386" data-name="Shape 1386" d="M257.167,2637.034l-3.525,3.527a3.326,3.326,0,0,0,4.7,4.706l3.527-3.524" transform="translate(-252.667 -2630.184)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.987"/>
                                  <path id="Shape_1387" data-name="Shape 1387" d="M264.626,2634.928l-5.88,5.878" transform="translate(-253.658 -2629.84)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.987"/>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="tabHeading">
                    <h3>Link a track for reference.</h3>
                    <p>Use a YouTube URL or Spotify Song link to find similar tracks.</p>
                  </div>
                </div>
                <div className="tabsContent">
                  <div className="tabsInnerContent">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of `de Finibus Bonorum et Malorum` (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, `Lorem ipsum dolor sit amet..`, comes from a line in section 1.10.3
                  </div>
                </div>
              </div>

              <div className="tabs">
                <div className="tab" onClick={toggleClass}>
                  <div className="tabImg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="37.411" height="37.41" viewBox="0 0 37.411 37.41">
                      <g id="Icon_-_Mag-note" data-name="Icon - Mag-note" transform="translate(1 1)">
                        <g id="Icon_-_Magnifying_Glass" data-name="Icon - Magnifying Glass">
                          <g id="Group_10" data-name="Group 10">
                            <path id="Path_1" data-name="Path 1" d="M318.352,315.678a14.676,14.676,0,1,0-14.676,14.674A14.678,14.678,0,0,0,318.352,315.678Z" transform="translate(-289 -301)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                            <line id="Line_2" data-name="Line 2" x2="10.648" y2="9.218" transform="translate(24.352 25.781)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          </g>
                        </g>
                        <path id="Shape_1577" data-name="Shape 1577" d="M246.423,2628.083c0,1.43-1.715,2.586-3.832,2.586s-3.832-1.156-3.832-2.586,1.715-2.584,3.832-2.584S246.423,2626.654,246.423,2628.083Z" transform="translate(-230.72 -2609.057)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.987"/>
                        <path id="Shape_1578" data-name="Shape 1578" d="M248.693,2625.322v-10.388a1.533,1.533,0,0,1,2.3-1.331l3.066,1.755" transform="translate(-233.103 -2606.176)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.987"/>
                      </g>
                    </svg>
                  </div>
                  <div className="tabHeading">
                    <h3>Search by project type.</h3>
                    <p>Search by the type of project you’re working on to find recommendations.</p>
                  </div>
                </div>
                <div className="tabsContent">
                  <div className="tabsInnerContent">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of `de Finibus Bonorum et Malorum` (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, `Lorem ipsum dolor sit amet..`, comes from a line in section 1.10.3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="moodSlider">
          <div className="testimonialContainer">
            <div className="moodContent">
              <div className="moodText">
                <h2>Curated playlists to fit your project.</h2>
                <p>Flip through some of our most popular playlists to see the high-quality tracks we carry.</p>
              </div>
              <div className="moodFilters">
                <a href="" className="btn btnMainOutline">Creator Kits</a>
                <a href="" className="btn btnMainOutline">Moods</a>
                <a href="" className="btn btnMainOutline">Genres</a>
                <a href="" className="btn btnMainOutline">themes</a>
              </div>
            </div>       
            <CarouselMood breakPoints={breakPoints}>
              {images.map((item) => (
                <div key={item} className="moodSlide">
                  <Image src={item.src} alt="Mood" className="moodImage"></Image>
                  <span className="moodOverlayText">{item.text}</span>
                </div>
              ))}
            </CarouselMood>
          </div>
        </section>

        <section className="testimonial">
          <div className="testimonialContainer">
            <Carousel>
              <Carousel.Item interval={3000}>
                <div className="authorImg">
                  <Image src={testimonialAvatar} alt="Picture" className=""/>
                </div>
                <Carousel.Caption>
                  <p>“Audiosocket blows away the service I used to use in terms of number of tracks and quality tracks! I used to have to settle for using the same tracks over and over for my corporate clients. This service lets me find just the right track with enough variety to make each project unique.”</p>
                  <div className="authorStatus">
                    <p className="authorName">Pete Larson</p>
                    <p><span>Ready Fire Digital</span> , <span>Filmmaker</span></p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <div className="authorImg">
                  <Image src={testimonialAvatar} alt="Picture" className=""/>
                </div>
                <Carousel.Caption>
                  <p>“Audiosocket blows away the service I used to use in terms of number of tracks and quality tracks! I used to have to settle for using the same tracks over and over for my corporate clients. This service lets me find just the right track with enough variety to make each project unique. I used to use in terms of number of tracks and quality tracks! I used to have to settle for using the same tracks over and over for my corporate clients. This service lets me find just the right track with enough variety to make each project unique.”</p>
                  <div className="authorStatus">
                    <p className="authorName">Pete Larson</p>
                    <p><span>Ready Fire Digital</span> , <span>Filmmaker</span></p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <div className="authorImg">
                  <Image src={testimonialAvatar} alt="Picture" className=""/>
                </div>
                <Carousel.Caption>
                  <p>“Audiosocket blows away the service I used to use in terms of number of tracks and quality tracks! I used to have to settle for using the same tracks over and over for my corporate clients. This service lets me find just the right track with enough variety to make each project unique.”</p>
                  <div className="authorStatus">
                    <p className="authorName">Pete Larson</p>
                    <p><span>Ready Fire Digital</span> , <span>Filmmaker</span></p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              
            </Carousel>
          </div>
        </section>

        <section className="pricing">
          <div className="bgWave">
            <div className="fixed-container">
              <h2>Priced to fit your needs.</h2>
              <div className="pricingPlans">
                <div className="plan personal">
                  <h4 className="planHeading">personal</h4>
                  <div className="planPrice">
                    <p className="planPriceText">Plans starting at</p>
                    <p className="planPriceAmount"><span>$10</span>&nbsp;/Month</p>
                  </div>
                  <p className="planDescription">
                    Perfect if you’re creating and publishing videos or podcasts on your personal web channels. This is a single user account.
                  </p>
                  <div className="PlanBtnContainer">
                    <a href="" className="btn btnMainLarge">Learn More</a>
                  </div>
                </div>

                <div className="plan commercial">
                  <h4 className="planHeading">commercial</h4>
                  <div className="planPrice">
                    <p className="planPriceText">Plans starting at</p>
                    <p className="planPriceAmount"><span>$33</span>&nbsp;/Month</p>
                  </div>
                  <p className="planDescription">
                    Perfect for the freelancer or business with up to 100 employees creating web media for commercial purposes. This is a single user account.
                  </p>
                  <div className="PlanBtnContainer">
                    <a href="" className="btn btnMainLarge">Learn More</a>
                  </div>
                </div>

                <div className="plan enterprises">
                  <h4 className="planHeading">enterprises</h4>
                  <div className="planPrice">
                    <p className="planPriceText">Customized quote to meet your needs.</p>
                  </div>
                  <p className="planDescription">
                    Need a plan for a large business (more than 100 employees), a team account or for TV, Film, Radio or VOD rights? Let us customize a license or plan just for you!
                  </p>
                  <div className="PlanBtnContainer">
                    <a href="" className="btn btnMainLarge">Request a custom quote</a>
                  </div>
                </div>

              </div>
              <p className="plansBottDesc">We also offer single-use licenses.</p>
              <div className="btnContainer text-center">
                <a href="" className="btn btnMainLarge">Learn More</a>
              </div>
            </div>
          </div>
        </section>

        <section className="campareWithCompetitor">
          <div className="blackSection">
            <div className="blackContent">
              <div className="blackHeading">
                <h2>It’s not even close.</h2>
              </div>
              <div className="blackPara">
                <p>Used by top creators in Film, TV &amp; Advertising, Audiosocket’s band &amp; composer roster is the largest &amp; most diverse in its class.</p>
              </div>
            </div>
            
          </div>
          <div className="greySection">
            <div className="greyInnerSec">
              <div className="provider">
                <div className="columnLabel">
                  Provider
                </div>
                <div className="columnData">
                  Audiosocket
                </div>
                <div className="columnData">
                  Epidemic Sound
                </div>
                <div className="columnData">
                  Artlist
                </div>
                <div className="columnData">
                  Soundstripe
                </div>
              </div>
              <div className="trackCount">
                <div className="columnLabel">
                  Number of tracks in catalog
                </div>
                <div className="columnData">
                  <span className="AsBar">80,000+ Tracks</span>
                </div>
                <div className="columnData">
                  <span className="epidemicBar">&nbsp;</span>
                </div>
                <div className="columnData">
                  <span className="artlistBar">&nbsp;</span>
                </div>
                <div className="columnData">
                  <span className="soundstripeBar">&nbsp;</span>
                </div>
              </div>
              <div className="planRate">
                <div className="columnLabel">
                  Plans starting at
                </div>
                <div className="columnData">
                  <span>$10<sup>.00</sup> <small>/Month</small></span>
                </div>
                <div className="columnData">
                  <span>$15<sup>.00</sup> <small>/Month</small></span>
                </div>
                <div className="columnData">
                  <span>$16<sup>.00</sup> <small>/Month</small></span>
                </div>
                <div className="columnData">
                  <span>$12<sup>.00</sup> <small>/Month</small></span>
                </div>
              </div>
            </div>
            <div className="browseMusic">
              <a href="" className="btn btnMainXlarge">Browse Music</a>
            </div>
          </div>
        </section>

        <section className="slickSlider">
          <div className="testimonialContainer">
            <div className="slickContent">
              <h2>Built for creators, trusted by film studios.</h2>
            </div>
            <Slider {...settings}>
              <div className="slickSlides">
                <Image src={slick1} alt="Image" key="12"></Image>
              </div>
              <div className="slickSlides">
                <Image src={slick2} alt="image" key="22"></Image>
              </div>
              <div className="slickSlides">
                <Image src={slick3} alt="image" key="33"></Image>
              </div>
              <div className="slickSlides">
                <Image src={slick4} alt="image" key="44"></Image>
              </div>
              <div className="slickSlides">
                <Image src={slick5} alt="image" key="55"></Image>
              </div>
              <div className="slickSlides">
                <Image src={slick3} alt="image" key="66"></Image>
              </div>
            </Slider>
            {/* <div className="App">
              <Slider {...settings2}>
                {imagess.map((img, idx) => (
                  <div className={idx === imageIndex ? "slide activeSlide" : "slide"} key={idx}>
                    <Image src={img} alt={img} />
                  </div>
                ))}
              </Slider>
            </div> */}
          </div>
        </section>
      </main>


      
    </div>

  )
}