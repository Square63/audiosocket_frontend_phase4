import Alert from 'react-bootstrap/Alert';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Image from 'next/image';
import search from "../styles/Search.module.scss";
function Search() {
  return (
    <div className={search.searchWrapper}>
      <Alert variant="success" className="brandAlert">
        <div className="fixed-container">
          <p>
            Special Offer! 20% off all spooky tracks for the month of October!
          </p>
        </div>
      </Alert>
      <div className="fixed-container">
        <h1 className={search.pageHeading}>Search Music</h1>
        <div className={search.searchUploadStuff}>
          <Form className="stickySearch largeStuff haveIcon">
            <Form.Control type="text" placeholder="Search by YouTube link, Spotify song link, or Keyword" />
            <Button variant="default" type="submit" className="btnMainLarge stickyBtn">Search</Button>
            <svg xmlns="http://www.w3.org/2000/svg" className="" width="22.414" height="22.414" viewBox="0 0 22.414 22.414">
              <g id="icon-magnifying-glass" transform="translate(1 1)">
                <path id="Path_1" data-name="Path 1" d="M305.541,309.272a8.271,8.271,0,1,0-8.271,8.27A8.272,8.272,0,0,0,305.541,309.272Z" transform="translate(-289 -301)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                <line id="Line_2" data-name="Line 2" x2="5.989" y2="5.866" transform="translate(14.011 14.134)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </g>
            </svg>
          </Form>
          <a href="" className="btn btnMainXlarge">
            Upload a Track
            <svg xmlns="http://www.w3.org/2000/svg" width="17.465" height="16.526" viewBox="0 0 17.465 16.526">
              <g id="icon-upload" transform="translate(16.965 0.5) rotate(90)">
                <path id="Shape_111" data-name="Shape 111" d="M8.775,3.221V.716A.7.7,0,0,0,8.1,0H.675A.7.7,0,0,0,0,.716V15.749a.7.7,0,0,0,.675.716H8.1a.7.7,0,0,0,.675-.716V13.244" fill="none" stroke="#1a1c1d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                <path id="Shape_112" data-name="Shape 112" d="M0,0H12.826" transform="translate(2.7 8.233)" fill="none" stroke="#1a1c1d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                <path id="Shape_113" data-name="Shape 113" d="M3.375,0,0,3.579,3.375,7.159" transform="translate(2.7 4.653)" fill="none" stroke="#1a1c1d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
    
  );
}

export default Search;