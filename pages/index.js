import Head from 'next/head';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import amazon from '../images/amazon.svg';
import disnep from '../images/disnep.svg';
import hbo from '../images/HBO.svg';
import mailchimp from '../images/mailchimp.svg';
import nbc from '../images/NBC.svg';
import netflix from '../images/netflix.svg';
import vice from '../images/vice.svg';
import Demo from '../images/sliderFirst.png';
import Carousel from 'react-bootstrap/Carousel';
import CarouselMood from 'react-elastic-carousel';
import Item from "./Item";
// import Sample1 from '../images/sample1.jpeg'
// import Sample2 from '../images/sample2.jpeg'
// import Sample3 from '../images/sample3.jpeg'
// import Slider from "react-slick";
import $ from 'jquery';

import { useRouter } from "next/router";
import {useContext, useEffect, useState} from "react";
import styles from '../styles/Home.module.scss';

const breakPoints = [
  { width: 1, itemsToShow: 2 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
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
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    
  return (
    <div>
      <Head>
        <title>Audiosocket</title>
        <meta name="description" content="Audiosocket" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <main className={styles.main}>
        <div className="heroSection">
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
        </div>
        <section className="howToUse">
          <div className="fixed-container">
            <h2>Learn how to use our search tools to find tracks quickly.</h2>
            <div className="tabsContainer">
              <div className="tabs">
                <div className="tab" onClick={toggleClass}>
                  <div className="tabImg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="37.035" height="38.927" viewBox="0 0 37.035 38.927">
                      <g id="Group_212" data-name="Group 212" transform="translate(1.035 1)">
                        <g id="filter-text">
                          <path id="Shape_1080" data-name="Shape 1080" d="M525.059,2008.776a1.594,1.594,0,0,0-1.2-2.645H503.793a1.593,1.593,0,0,0-1.2,2.645l8.844,10.1v8.972a1.593,1.593,0,0,0,2.478,1.326l1.593-1.063a1.593,1.593,0,0,0,.709-1.326v-7.909Z" transform="translate(-502.2 -2006.131)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Shape_1081" data-name="Shape 1081" d="M533.8,2034.131h6.373" transform="translate(-508.36 -2011.654)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Shape_1082" data-name="Shape 1082" d="M529.8,2040.131h9.56" transform="translate(-507.546 -2012.837)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Shape_1083" data-name="Shape 1083" d="M529.8,2046.131h9.56" transform="translate(-507.546 -2013.984)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Shape_1084" data-name="Shape 1084" d="M525.8,2029.724a1.593,1.593,0,0,1,1.593-1.593H540.14a1.593,1.593,0,0,1,1.593,1.593v15.933a1.593,1.593,0,0,1-1.593,1.593H527.393a1.593,1.593,0,0,1-1.593-1.593Z" transform="translate(-506.733 -2010.324)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
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
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3
                    
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
                          <path id="Rectangle-path_80" data-name="Rectangle-path 80" d="M231.5,1913.132a1.518,1.518,0,0,1,1.518-1.518h27.325a1.518,1.518,0,0,1,1.518,1.518v27.325a1.519,1.519,0,0,1-1.518,1.518H233.022a1.518,1.518,0,0,1-1.518-1.518Z" transform="translate(-231.504 -1911.614)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Shape_1151" data-name="Shape 1151" d="M237.5,1946.457a1.518,1.518,0,0,0,1.518,1.518h27.325a1.519,1.519,0,0,0,1.518-1.518v-27.325a1.518,1.518,0,0,0-1.518-1.518" transform="translate(-232.865 -1912.975)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Oval_190" data-name="Oval 190" d="M255.823,1938.253a2.319,2.319,0,1,0-2.319-2.319A2.32,2.32,0,0,0,255.823,1938.253Z" transform="translate(-236.805 -1916.915)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Oval_191" data-name="Oval 191" d="M241.823,1940.253a2.319,2.319,0,1,0-2.319-2.319A2.319,2.319,0,0,0,241.823,1940.253Z" transform="translate(-233.432 -1917.397)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Shape_1152" data-name="Shape 1152" d="M245.5,1934.913v-8.885a1.545,1.545,0,0,1,1.121-1.486l7.731-2.21a1.546,1.546,0,0,1,1.971,1.488v9.546" transform="translate(-234.927 -1914.235)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
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
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3
                  </div>
                </div>
              </div>

              <div className="tabs">
                <div className="tab" onClick={toggleClass}>
                  <div className="tabImg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="37.003" height="37.003" viewBox="0 0 37.003 37.003">
                      <g id="Group_153" data-name="Group 153" transform="translate(1 1)">
                        <g id="video-file-upload">
                          <path id="Shape_813" data-name="Shape 813" d="M228.748,1307.9H216.594a1.521,1.521,0,0,1-1.519-1.522v-31.959a1.521,1.521,0,0,1,1.519-1.522h20.2a1.514,1.514,0,0,1,1.074.446l5.632,5.642a1.519,1.519,0,0,1,.445,1.076v5.011" transform="translate(-215.075 -1272.897)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Shape_814" data-name="Shape 814" d="M236.445,1292.391l-7.627-4.106a1.172,1.172,0,0,0-1.743,1.025v8.8a1.173,1.173,0,0,0,1.743,1.025l3.337-2.053" transform="translate(-217.971 -1276.584)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Oval_80" data-name="Oval 80" d="M246.281,1313.309a9.206,9.206,0,1,0-9.206-9.206A9.206,9.206,0,0,0,246.281,1313.309Z" transform="translate(-220.484 -1278.307)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Shape_815" data-name="Shape 815" d="M249.075,1310.1V1300.9" transform="translate(-223.203 -1279.703)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Shape_816" data-name="Shape 816" d="M248.027,1300.9l-3.452,3.452" transform="translate(-222.147 -1279.61)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          <path id="Shape_817" data-name="Shape 817" d="M249.075,1300.9l3.452,3.452" transform="translate(-223.226 -1279.61)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
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
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3
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
                            <path id="Shape_1576" data-name="Shape 1576" d="M245.567,2639.78H232.452a1.64,1.64,0,0,1-1.64-1.641v-34.464a1.64,1.64,0,0,1,1.64-1.641h21.792a1.638,1.638,0,0,1,1.159.481l6.077,6.084a1.645,1.645,0,0,1,.48,1.161v10.328" transform="translate(-230.812 -2602.034)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.987"/>
                            <path id="Shape_1577" data-name="Shape 1577" d="M247.073,2628.3c0,1.551-1.861,2.8-4.157,2.8s-4.157-1.254-4.157-2.8,1.861-2.8,4.157-2.8S247.073,2626.752,247.073,2628.3Z" transform="translate(-232.222 -2606.158)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.987"/>
                            <path id="Shape_1578" data-name="Shape 1578" d="M248.693,2626.333v-11.269a1.663,1.663,0,0,1,2.494-1.444l3.326,1.9" transform="translate(-233.961 -2604.073)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.987"/>
                            <g id="Programming-Apps-Websites_Apps_app-window-link" data-name="Programming-Apps-Websites / Apps / app-window-link" transform="translate(17.846 21.943)">
                              <g id="Group_208" data-name="Group 208">
                                <g id="app-window-link">
                                  <path id="Shape_1385" data-name="Shape 1385" d="M265.557,2638.054l3.527-3.527a3.326,3.326,0,1,0-4.7-4.705l-3.527,3.529" transform="translate(-254.001 -2628.849)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.987"/>
                                  <path id="Shape_1386" data-name="Shape 1386" d="M257.167,2637.034l-3.525,3.527a3.326,3.326,0,0,0,4.7,4.706l3.527-3.524" transform="translate(-252.667 -2630.184)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.987"/>
                                  <path id="Shape_1387" data-name="Shape 1387" d="M264.626,2634.928l-5.88,5.878" transform="translate(-253.658 -2629.84)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.987"/>
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
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3
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
                            <path id="Path_1" data-name="Path 1" d="M318.352,315.678a14.676,14.676,0,1,0-14.676,14.674A14.678,14.678,0,0,0,318.352,315.678Z" transform="translate(-289 -301)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                            <line id="Line_2" data-name="Line 2" x2="10.648" y2="9.218" transform="translate(24.352 25.781)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          </g>
                        </g>
                        <path id="Shape_1577" data-name="Shape 1577" d="M246.423,2628.083c0,1.43-1.715,2.586-3.832,2.586s-3.832-1.156-3.832-2.586,1.715-2.584,3.832-2.584S246.423,2626.654,246.423,2628.083Z" transform="translate(-230.72 -2609.057)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.987"/>
                        <path id="Shape_1578" data-name="Shape 1578" d="M248.693,2625.322v-10.388a1.533,1.533,0,0,1,2.3-1.331l3.066,1.755" transform="translate(-233.103 -2606.176)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.987"/>
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
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="testimonial">
          <div className="fixed-container">
            <Carousel>
              <Carousel.Item>
                <Image src={Demo} alt="Amazon" className=""/>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
                    <p class="planPriceText">Customized quote to meet your needs.</p>
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
      </main>
      <div className="carousel-wrapper">
        <CarouselMood breakPoints={breakPoints}>
          {items.map((item) => (
            <Item key={item}>{item}</Item>
          ))}
        </CarouselMood>
      </div>
      
    </div>
  )
}
