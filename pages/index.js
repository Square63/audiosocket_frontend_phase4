import Link from "next/link";
import Head from 'next/head';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse'
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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import slick001 from '../images/slick001.png';
import slick002 from '../images/slick002.png';
import slick003 from '../images/slick003.png';
import slick004 from '../images/slick004.png';
import slick005 from '../images/slick005.png';
import slick006 from '../images/slick006.png';
import slick007 from '../images/slick007.png';
import slick008 from '../images/slick008.png';
import slick009 from '../images/slick009.png';
import slick010 from '../images/slick010.png';
import slick011 from '../images/slick011.png';
import slick012 from '../images/slick012.png';
import slick013 from '../images/slick013.png';
import slick014 from '../images/slick014.png';
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
import { wrapper } from '../redux/store';
import { getFilters } from '../redux/actions/filterActions';
import { useDispatch, useSelector } from "react-redux";
import InpageLoader from '../components/InpageLoader';
import { getTracks, getTracksFromAIMS } from '../redux/actions/trackActions';
import { facebookCallback, getTrendingPlaylists } from '../redux/actions/authActions';
import { gmailCallback } from '../redux/actions/authActions';
import { useCookie } from 'next-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const imagess = [slick001, slick002, slick003, slick004, slick005, slick006,
   slick007, slick008, slick009, slick010, slick011, slick012, slick013, slick014];

const breakPoints = [
  { width: 1, itemsToShow: 2, pagination: true },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 750, itemsToShow: 3, itemsToScroll: 2, pagination: false },
  { width: 1100, itemsToShow: 4, itemsToScroll: 2, pagination: false },

];

function toggleClass(e) {
  var x = e.clientX;
  var y = e.clientY;
  var result = 690 - y;
  $('.tab').each(function(i, obj) {
    obj.classList.remove('tabSelected')
  });

  // window.scrollTo(0, y+result)
  e.currentTarget.classList.add("tabSelected");
  var tabSelectedHeight = e.currentTarget.nextElementSibling.children[0].clientHeight + 80
  tabSelectedHeight = tabSelectedHeight <= 697 ? 'auto' : tabSelectedHeight
  let height = tabSelectedHeight == 'auto'? 'auto' : tabSelectedHeight.toString() + 'px'
  e.currentTarget.parentElement.parentElement.style.height = height
  e.currentTarget.parentElement.parentElement.style.minHeight = height

};

export default function Home(props) {
  const cookie = useCookie()
  let genresArray = []
  let vocalsArray = []
  const dispatch = useDispatch();
  const router = useRouter();
  const socialLogin = useSelector(state => state.auth.user);
  const filters = useSelector( state => state.allFilters.filters[0])
  const trendingPlaylists = useSelector( state => state.auth.trending_playlists)
  const [searchValue, setSearchValue] = useState("");
  filters.map((filter, index) =>
    filter.name == "Genres" &&
      genresArray.push(...filter.sub_filters.slice(0, 5), ...filter.sub_filters.filter(sub => sub.name == "Electronic"))
  );

  filters.map((filter, index) =>
    filter.name == "Vocals" &&
      vocalsArray.push(filter.sub_filters.slice(0, 5))
  );

  useEffect(() => {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let code = url.searchParams.get("code");
    let scope = url.searchParams.get("scope");
    if (code){
      if (scope)
        dispatch(gmailCallback(code))
      else {
        dispatch(facebookCallback(code))
      }
    } else {
      setTimeout(function() {
        setLoading(false)
      }.bind(this), 1000);
    }
    localStorage.removeItem("genre")
    localStorage.removeItem("vocal")
    localStorage.removeItem("keyword")

    setTimeout(function() {
      if (document.getElementsByClassName("tabsContainer")[0]) {
        document.getElementsByClassName("tabsContainer")[0].style.minHeight = '1140px';
      }
    }.bind(this), 1000);
    if (window.location.href == 'http://localhost:3000')
      document.body.classList.add('homepage');
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setTimeout(function () {
        setLoading(false)
      }.bind(this), 1000);
    } else if (socialLogin.auth_token){
      localStorage.setItem("user", JSON.stringify(socialLogin.auth_token));
      localStorage.setItem("last_name", JSON.stringify(socialLogin.last_name));
      localStorage.setItem("email", JSON.stringify(socialLogin.email));
      cookie.set('user', JSON.stringify(socialLogin.auth_token))
      toast.success('Successfully Logged In.');
      router.push('/');
    }
  }, [socialLogin]);

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

  const [step1, setStep1] = useState("");
  const [step2, setStep2] = useState("");
  const [step3, setStep3] = useState("");

  const [loading, setLoading] = useState(true)

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
    centerPadding: '0',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [{breakpoint: 1200, settings: {slidesToShow: 5, slidesToScroll: 2}}, {breakpoint: 768, settings: {slidesToShow: 3}},{breakpoint: 550, settings: {slidesToShow: 1, centerPadding: '70px'}}],
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

  const handleFiltersKeywordStep1 = (e) => {
    setStep1(e.target.value)
  }

  const handleFiltersKeywordStep2 = (e) => {
    setStep2(e.target.value)
  }

  const handleFiltersKeywordStep3 = (e) => {
    setStep3(e.target.value)
  }

  function handleSubmit() {
    setLoading(true)
    localStorage.setItem('genre', step1);
    localStorage.setItem('vocal', step2);
    localStorage.setItem('filterKeyword', step3)
    router.push('/search')
  }

  function handleAimsSearch(e) {
    let searchQuery = e.target.previousElementSibling.value
    localStorage.setItem('keyword', searchQuery)
    dispatch(getTracks(searchQuery, 'aims_search', [], "", "", 1));
    router.push('/search')
  }

  function handleSearch(e) {
    let type = searchValue.includes("https") ? "aims_search" : "local_search"
    localStorage.setItem('localKeyword', searchValue)
    localStorage.setItem('localKeywordType', type)
    router.push('/search')
  }

  function handleCuratedPlaylistFilter(type) {
    localStorage.setItem('curatedPlaylistFilterType', type)
    router.push('/playlist/curatedPlaylist')
  }

  const handleUploadTrack = async(e) => {
    const file = e.target.files[0]
    localStorage.setItem("uploadFileFromWelcome", file)
    dispatch(getTracksFromAIMS('', file));
    router.push('/search')
  }

  const handleSearchCatalog = async() => {
    setLoading(true)
    router.push('/search')
  }

  const handleSearchPlaylists = async() => {
    setLoading(true)
    router.push('/playlist/curatedPlaylist')
  }

  const handleCreatorKits = async() => {
    setLoading(true)
    router.push('/playlist/creatorKits')
  }

  const [open, setOpen] = useState(false);

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
          href="https://cdnjs.cloudflare.com/ajax/libs/slick3carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>

      <main className={styles.main}>
        {loading ? (
          <InpageLoader />
        ) : (
          <>
            <ToastContainer
              position="top-center"
              autoClose={10000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              style={{ width: "auto" }}
            />
            <section className="heroSection">
            <div className="heroContent">
              <div className="fixed-container">


                <h1>A Musical Journey Awaits.</h1>
                <p>Audiosocket makes finding and licensing great music simple. Use our Search Guides below to start your journey &amp; let the music inspire.</p>
                <Form className="stickySearch heroForm" onSubmit={e => { e.preventDefault(); }}>
                  <Form.Control type="text" placeholder="Enter a keyword, YouTube link, or Spotify song link…" onChange={(e) => setSearchValue(e.target.value)} />
                  <Button variant="default" type="submit" className="btnMainLarge stickyBtn" onClick={(e) => handleSearch(e)}>Search</Button>
                </Form>
                <div className="brandsStrip">
                  <h2>Built for creators, trusted by world-class brands.</h2>
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
                          <div className="catalogBtn-block" onClick={handleSearchCatalog}>
                            <button className="btn btnMainLarge">Search the catalog</button>
                          </div>
                        </div>
                        <div className="outOfScenario">
                          <h5>Try out this scenario.</h5>
                          <p>You’re looking for a cool contemporary electronic track with female vocals that is moody for your travel video. Something that fans of Phantogram would love.</p>
                        </div>
                        <div className="stepsWrapper">
                          <div className="stepSection">
                            <h5>Step 1 :</h5>
                          </div>
                          <div className="stepContent selectOption">
                            <Form>
                              <Form.Label className="stepsLabel">Select Genre : <span>{step1}</span></Form.Label>
                              <div className="roundedForm">
                                <select aria-label="Default select example" className="form-control circularInput" onChange={(e) => handleFiltersKeywordStep1(e)}>
                                  <option>Select Genre</option>
                                  {genresArray.map(filter =>
                                    <option key={filter.id} value={filter.name}>{filter.name}</option>
                                  )}
                                </select>

                                <div variant="default" className="circularBtn">
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
                            <Form className="newThemeRadio">
                              <Form.Label className="stepsLabel">Select Vocals : <span>{step2}</span></Form.Label>
                              {['radio'].map((type) => (
                                <div key={`inline-${type}`}>
                                  {vocalsArray[0].map(filter =>
                                    <Form.Check
                                      key={filter.id}
                                      label={filter.name}
                                      name="group1"
                                      type={type}
                                      id={`inline-${filter.id}-1`}
                                      value={filter.name}
                                      onClick={(e) => handleFiltersKeywordStep2(e)}
                                    />
                                  )}
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
                            <Form onSubmit={e => { e.preventDefault(); }}>
                              <Form.Label className="stepsLabel">Add “Phantogram” in keyword search.</Form.Label>
                              <div className="roundedForm">
                                <Form.Control type="text" className="circularInput" placeholder="Enter Phantogram" onChange={(e) => handleFiltersKeywordStep3(e)}/>
                                <Button variant="default" type="submit" className="circularBtn" onClick={() => handleSubmit()}>

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
                        <div className="searchvideoSection">
                          <p>Watch the curated playlists &amp; creator kits guide.</p>
                          <div className="videoContainer" onClick={togglePlay}>
                            <span></span>
                            <video poster="./screenSearch.png" controls>
                              <source src="./simpleSearch.mp4" type="video/mp4"/>
                            </video>
                          </div>
                        </div>
                        <div className="outOfScenario">
                          <h5>Curated Playlists</h5>
                          <p>Use our curated playlists to find the perfect track for your project. Playlists are created by genre/mood or by the type of project you’re working on.</p>
                          <div className="catalogBtn-block text-center mt-5" onClick={handleSearchPlaylists}>
                            <button className="btn btnMainLarge">Go to Playlists</button>
                          </div>
                        </div>
                        <div className="outOfScenario">
                          <h5>Creator Kits</h5>
                          <p>Creator Kits include everything you need to add audio to your project including: Music, Sound Effects, and Sound Design. The projects includes stems so you can tailor the kit to fit your needs.</p>
                          <div className="catalogBtn-block text-center mt-5" onClick={handleCreatorKits}>
                            <button className="btn btnMainLarge">Go to Creator Kits</button>
                          </div>
                        </div>
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
                        <div className="searchvideoSection">
                          <p>Watch the upload a track search guide.</p>
                          <div className="videoContainer" onClick={togglePlay}>
                            <span></span>
                            <video poster="./screenSearch.png" controls>
                              <source src="./simpleSearch.mp4" type="video/mp4"/>
                            </video>
                          </div>
                          <div className="catalogBtn-block" onClick={handleSearchCatalog}>
                            <button className="btn btnMainLarge">Search catalog</button>
                          </div>
                        </div>
                        <div className="outOfScenario">
                          <h5>Upload a reference track</h5>
                          <p>If you have a track that sounds about right but isn’t royalty-free, we can find tracks for you to license based on your track.</p>
                          <a href="" className="tryOut">Try it Out</a>
                          <Form.Group controlId="formFile" className="uploadComponent">
                            <Form.Label>Chose an mp3 or WAV file from your computer to get results within seconds!</Form.Label>
                            <Form.Control type="file" onChange={(e) => handleUploadTrack(e)}/>
                          </Form.Group>

                        </div>
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
                        <h3>Use A Track URL From The Web.</h3>
                        <p>Use a YouTube URL or Spotify Song link to find similar tracks.</p>
                      </div>
                    </div>
                    <div className="tabsContent">
                      <div className="tabsInnerContent">
                        <div className="searchvideoSection">
                          <p>Watch the link a track search guide.</p>
                          <div className="videoContainer" onClick={togglePlay}>
                            <span></span>
                            <video poster="./screenSearch.png" controls>
                              <source src="./simpleSearch.mp4" type="video/mp4"/>
                            </video>
                          </div>
                          <div className="catalogBtn-block" onClick={handleSearchCatalog}>
                            <button className="btn btnMainLarge">Search catalog</button>
                          </div>
                        </div>
                        <div className="outOfScenario">
                          <h5>Link a reference track</h5>
                          <p>Found a track you love but don&apos;t have a license to use it? Paste the YouTube URL or Spotify Song Link into the Search Bar to find songs that are similar.</p>
                          <a href="" className="tryOut">Try it Out</a>
                          <Form className="stickySearch" onSubmit={e => { e.preventDefault(); }}>
                            <Form.Control type="text" placeholder="Paste in a YouTube link or Spotify song link" />
                            <Button variant="default" type="submit" className="btnMainLarge stickyBtn" onClick={(e) => handleAimsSearch(e)}>Search</Button>
                          </Form>
                        </div>
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
                    <p>Flip through some of our most popular playlists to listen to the high-quality tracks we offer.</p>
                  </div>
                  <div className="moodFilters hideOntablet">
                    <Link href="/playlist/creatorKits">
                      <a className="btn btnMainOutline">
                        Creator Kits
                      </a>
                    </Link>
                    <a href="javascript:void(0)" onClick={() => {handleCuratedPlaylistFilter('moods')}} className="btn btnMainOutline">
                      Moods
                    </a>
                    <a href="javascript:void(0)" onClick={() => { handleCuratedPlaylistFilter('genres') }} className="btn btnMainOutline">
                      Genres
                    </a>
                    <a href="javascript:void(0)" onClick={() => { handleCuratedPlaylistFilter('themes') }} className="btn btnMainOutline">
                      Themes
                    </a>
                  </div>
                  <div className="MoodFilterDropdown ShowOntablet">
                    <Form>
                      <div className="roundedForm">
                        <select aria-label="Default select example" className="form-control circularInput">
                          <option>Creator Kits</option>
                          <option value="1">Moods</option>
                          <option value="2">Genres</option>
                          <option value="3">Themes</option>
                        </select>
                        <div variant="default" className="circularBtn">
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
                <CarouselMood breakPoints={breakPoints}>
                  {trendingPlaylists.map((playlist) => (
                    <Link href={"/playlist/curatedPlaylist/" + playlist.id} key={playlist}>
                      <div className="moodSlide">
                        {playlist.compressed_playlist_image && <Image src={playlist.compressed_playlist_image} alt="Mood" className="moodImage" layout="fill"></Image>}
                        <span className="moodOverlayText">{playlist.name}</span>
                      </div>
                    </Link>
                  ))}
                </CarouselMood>
              </div>
              <div className="ViewPlaylist">
                <Link href="/playlist/curatedPlaylist">
                  <a className="btn btnMainLarge">
                    View All Playlists
                  </a>
                </Link>
              </div>
            </section>

            <section className="pricing">
              <div className="bgWave">
                <div className="pricingContainer">
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
                      <Link
                        href={{
                          pathname: "pricing",
                          query: {
                              personal: true,
                          }
                        }}
                      >
                      <a className="btn btnMainLarge">Learn More</a>
                    </Link>

                      </div>
                    </div>

                    <div className="plan commercial">
                      <h4 className="planHeading">commercial</h4>
                      <div className="planPrice">
                        <p className="planPriceText">Plans starting at</p>
                        <p className="planPriceAmount"><span>$33</span>&nbsp;/Month</p>
                      </div>
                      <p className="planDescription">
                        Perfect for the freelancer or business with up to 50 employees creating web media for commercial purposes. This is a single user account.
                      </p>
                      <div className="PlanBtnContainer">
                        <Link
                          href={{
                            pathname: "pricing",
                            query: {
                                commercial: true,
                            }
                          }}
                        >
                          <a className="btn btnMainLarge">Learn More</a>
                        </Link>
                      </div>
                    </div>

                    <div className="plan enterprises">
                      <h4 className="planHeading">enterprises</h4>
                      <div className="planPrice">
                        <p className="planPriceText">Customized quote to meet your needs.</p>
                      </div>
                      <p className="planDescription">
                        Need a plan for a large business (more than 50 employees), a team account with multiple seats, or TV, Film, Radio, VOD or expanded media rights? Let us customize a license or a plan just for you!
                      </p>
                      <div className="PlanBtnContainer">
                        <Link
                          href={{
                            pathname: "pricing",
                            query: {
                                enterprise: true,
                            }
                          }}
                        >
                          <a className="btn btnMainLarge">Request a custom quote</a>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="singleLicenseOffer homeColorTrend">
                  <div className="fixed-container">
                    <div className="licenseHeading">
                      <h3>We also offer single-use licenses.</h3>
                    </div>
                    <Collapse in={open}>
                      <div id="example-collapse-text">
                        <p className="singleTrackDesc">When browsing for tracks, click the Add To Cart button and select a single license from the pop-up.</p>
                        <div className="licenseTypeWrapper">
                          <div className="licenseType">
                            <span className="licenseName">
                              Individual
                              <OverlayTrigger overlay={<Tooltip>For individual users creating media for their personal channels. Perfect for your YouTube videos, podcast, vlogs, and home videos that are self-published on 3rd party platforms. Monetization via Adsense/AdShare on 3rd party platforms is permitted.</Tooltip>}>
                                <a className="info"></a>
                              </OverlayTrigger>
                            </span>
                            <p className="licenseAmount">$15</p>
                          </div>
                          <div className="licenseType">
                            <span className="licenseName">
                              Small Business
                              <OverlayTrigger overlay={<Tooltip>For use by businesses with 50 or fewer employees or freelancers creating content for businesses with 50 or fewer employees.</Tooltip>}>
                                <a className="info"></a>
                              </OverlayTrigger>
                            </span>
                            <p className="licenseAmount">$99</p>
                          </div>
                          <div className="licenseType">
                            <span className="licenseName">
                              Indie Film
                              <OverlayTrigger overlay={<Tooltip>For use by individual videographers, or filmmakers in a single film or video with a budget less than $1 Million USD. Films may be distributed on the Web and submitted to film festivals. </Tooltip>}>
                                <a className="info"></a>
                              </OverlayTrigger>
                            </span>
                            <p className="licenseAmount">$129</p>
                          </div>
                          <div className="licenseType">
                            <span className="licenseName">
                              Large Business
                              <OverlayTrigger overlay={<Tooltip>For use by businesses with 51 or more employees or freelancers creating content for businesses with 51 or more employees.</Tooltip>}>
                                <a className="info"></a>
                              </OverlayTrigger>
                            </span>
                            <p className="licenseAmount">$995</p>
                          </div>
                          <div className="licenseType">
                            <span className="licenseName">
                              Custom License
                            </span>
                            <Link href="/pricing?enterprise=true" >
                              <a className="contactSale">Contact Sales</a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                    <div className="text-center mt-5">
                      <Button
                        variant="link"
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        className="btnMainLarge"
                      >
                        See {open ? "Less" : "More"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="slickSlider">
              <div className="testimonialContainer">
                <div className="slickContent">
                  <h2>Built for creators, blockbuster approved.</h2>
                  <p>A strong storyline and script can move us, but the soundtrack transports us. If you love cinema as much as us, check out some of our featured placements. <br />Let the music inspire your next masterpiece!</p>
                </div>
                <Slider {...settings2}>
                  {imagess.map((img, idx) => (
                    <div className={idx === imageIndex ? "slide activeSlide" : "slide"} key={idx}>
                      <div className="slickSlides">
                        <Image src={img} alt={img} />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </section>
          </>
        )}
      </main>
    </div>

  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      await store.dispatch(getFilters(req))
      await store.dispatch(getTrendingPlaylists(req))
    });
