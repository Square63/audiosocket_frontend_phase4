import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
function Checkout() {
  return (
    <div className="fixed-container">
      <div className="trackListingBlock">
        <h1 className="listingPageHeading">Checkout</h1>
        <div className="trackListingHeading">
          <h2>Tracks in Cart (3)</h2>
          <a href="javascript:void(0)" className="btn btnMainSmall inBlack">View Downloaded Tracks</a>
        </div>
        <div className="trackRowWrapper">
          <div className="trackRow headingRow">
            <div className="rowParticipant artistName">
              Title / Artist
            </div>
            <div className="rowParticipant duration">
              Duration
            </div>
            <div className="rowParticipant licenseType">
              License Type
            </div>
            <div className="rowParticipant price">
              Price
            </div>
            <div className="rowParticipant controls"></div>
          </div>

          <div className="trackRow">
            <div className="rowParticipant artistName">
              <div className="playPauseBtn">
                <span className="play d-none"></span>
                <span className="pause"></span>
              </div>
              <div className="aboutSong">
                <div className="songData">
                  <a href="" className="songName">saving</a>
                </div>
                <div className="songArtist">
                  <a href="" className="noTextLine">
                    Justin G. Marcellus Abady
                  </a>
                </div>
                <Form style={{display: 'none'}}>
                  <Form.Control type="text" placeholder="Enter work title…" />
                </Form>
              </div>
            </div>
            <div className="rowParticipant duration">
              01:10
            </div>
            <div className="rowParticipant licenseType">
              Individual Subscription
            </div>
            <div className="rowParticipant price">
              $0.00
            </div>
            <div className="rowParticipant controls">
              <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                <a href="javascript:void(0)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g id="Interface-Essential_Edit_pencil-circle" data-name="Interface-Essential / Edit / pencil-circle" transform="translate(-422 -3146)">
                      <g id="Group_335" data-name="Group 335">
                        <g id="pencil-circle">
                          <path id="Shape_1730" data-name="Shape 1730" d="M432.661,3162.168l-4.95,2.122,2.122-4.951,8.839-8.839,2.828,2.829-8.839,8.839Z" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1731" data-name="Shape 1731" d="M439.664,3155.169l-2.828-2.829" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1732" data-name="Shape 1732" d="M432.661,3162.169l-2.828-2.829" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Oval_259" data-name="Oval 259" d="M434,3169.5a11.5,11.5,0,1,0-11.5-11.5A11.5,11.5,0,0,0,434,3169.5Z" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </OverlayTrigger>

              <OverlayTrigger overlay={<Tooltip>Remove</Tooltip>}>
                  <a href="javascript:void(0)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <g id="Actions" transform="translate(-1050 -29.5)">
                        <g id="icon-trashcan" transform="translate(772 -3264.5)">
                          <path id="Shape_1765" data-name="Shape 1765" d="M299,3298.5l-1.812,17.209a2,2,0,0,1-1.988,1.791H284.8a2,2,0,0,1-1.989-1.791L281,3298.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1766" data-name="Shape 1766" d="M278.5,3298.5h23" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1767" data-name="Shape 1767" d="M285.5,3298.5v-3a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v3" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1768" data-name="Shape 1768" d="M290,3303v10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1769" data-name="Shape 1769" d="M294.5,3303l-.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1770" data-name="Shape 1770" d="M285.5,3303l.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </g>
                    </svg>
                  </a>
                </OverlayTrigger>
            </div>
          </div>
          
          <div className="trackRow">
            <div className="rowParticipant artistName">
              <div className="playPauseBtn">
                <span className="play d-none"></span>
                <span className="pause"></span>
              </div>
              <div className="aboutSong">
                <div className="songData">
                  <a href="" className="songName">saving</a>
                </div>
                <div className="songArtist">
                  <a href="" className="noTextLine">
                    Justin G. Marcellus Abady
                  </a>
                </div>
                <Form style={{display: 'none'}}>
                  <Form.Control type="text" placeholder="Enter work title…" />
                </Form>
              </div>
            </div>
            <div className="rowParticipant duration">
              01:10
            </div>
            <div className="rowParticipant licenseType">
              Individual Subscription
            </div>
            <div className="rowParticipant price">
              $0.00
            </div>
            <div className="rowParticipant controls">
              <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                <a href="javascript:void(0)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g id="Interface-Essential_Edit_pencil-circle" data-name="Interface-Essential / Edit / pencil-circle" transform="translate(-422 -3146)">
                      <g id="Group_335" data-name="Group 335">
                        <g id="pencil-circle">
                          <path id="Shape_1730" data-name="Shape 1730" d="M432.661,3162.168l-4.95,2.122,2.122-4.951,8.839-8.839,2.828,2.829-8.839,8.839Z" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1731" data-name="Shape 1731" d="M439.664,3155.169l-2.828-2.829" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1732" data-name="Shape 1732" d="M432.661,3162.169l-2.828-2.829" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Oval_259" data-name="Oval 259" d="M434,3169.5a11.5,11.5,0,1,0-11.5-11.5A11.5,11.5,0,0,0,434,3169.5Z" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </OverlayTrigger>

              <OverlayTrigger overlay={<Tooltip>Remove</Tooltip>}>
                  <a href="javascript:void(0)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <g id="Actions" transform="translate(-1050 -29.5)">
                        <g id="icon-trashcan" transform="translate(772 -3264.5)">
                          <path id="Shape_1765" data-name="Shape 1765" d="M299,3298.5l-1.812,17.209a2,2,0,0,1-1.988,1.791H284.8a2,2,0,0,1-1.989-1.791L281,3298.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1766" data-name="Shape 1766" d="M278.5,3298.5h23" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1767" data-name="Shape 1767" d="M285.5,3298.5v-3a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v3" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1768" data-name="Shape 1768" d="M290,3303v10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1769" data-name="Shape 1769" d="M294.5,3303l-.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1770" data-name="Shape 1770" d="M285.5,3303l.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </g>
                    </svg>
                  </a>
                </OverlayTrigger>
            </div>
          </div>
          
          <div className="trackRow">
            <div className="rowParticipant artistName">
              <div className="playPauseBtn">
                <span className="play d-none"></span>
                <span className="pause"></span>
              </div>
              <div className="aboutSong">
                <div className="songData">
                  <a href="" className="songName">saving</a>
                </div>
                <div className="songArtist">
                  <a href="" className="noTextLine">
                    Justin G. Marcellus Abady
                  </a>
                </div>
                <Form style={{display: 'none'}}>
                  <Form.Control type="text" placeholder="Enter work title…" />
                </Form>
              </div>
            </div>
            <div className="rowParticipant duration">
              01:10
            </div>
            <div className="rowParticipant licenseType">
              Individual Subscription
            </div>
            <div className="rowParticipant price">
              $0.00
            </div>
            <div className="rowParticipant controls">
              <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                <a href="javascript:void(0)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g id="Interface-Essential_Edit_pencil-circle" data-name="Interface-Essential / Edit / pencil-circle" transform="translate(-422 -3146)">
                      <g id="Group_335" data-name="Group 335">
                        <g id="pencil-circle">
                          <path id="Shape_1730" data-name="Shape 1730" d="M432.661,3162.168l-4.95,2.122,2.122-4.951,8.839-8.839,2.828,2.829-8.839,8.839Z" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1731" data-name="Shape 1731" d="M439.664,3155.169l-2.828-2.829" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1732" data-name="Shape 1732" d="M432.661,3162.169l-2.828-2.829" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Oval_259" data-name="Oval 259" d="M434,3169.5a11.5,11.5,0,1,0-11.5-11.5A11.5,11.5,0,0,0,434,3169.5Z" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </OverlayTrigger>

              <OverlayTrigger overlay={<Tooltip>Remove</Tooltip>}>
                  <a href="javascript:void(0)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <g id="Actions" transform="translate(-1050 -29.5)">
                        <g id="icon-trashcan" transform="translate(772 -3264.5)">
                          <path id="Shape_1765" data-name="Shape 1765" d="M299,3298.5l-1.812,17.209a2,2,0,0,1-1.988,1.791H284.8a2,2,0,0,1-1.989-1.791L281,3298.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1766" data-name="Shape 1766" d="M278.5,3298.5h23" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1767" data-name="Shape 1767" d="M285.5,3298.5v-3a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v3" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1768" data-name="Shape 1768" d="M290,3303v10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1769" data-name="Shape 1769" d="M294.5,3303l-.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1770" data-name="Shape 1770" d="M285.5,3303l.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </g>
                    </svg>
                  </a>
                </OverlayTrigger>
            </div>
          </div>
          
        </div>
        <div className="addTitle">
          <div className="addTitleSection">
            <div className="boxWithShadow">
              <form>
                <Form.Group>
                  <label>Please add your Video or Work Title to your License</label>
                  <Form.Control type="text" placeholder="Enter work title…" />
                </Form.Group>
                <Form.Group>
                  <div className="toogleSwitch">
                    <input type="checkbox" id="audiosocketEmail" />
                    <Form.Label for="audiosocketEmail">&nbsp;</Form.Label>
                    <span className="switchText">My cart has tracks for multiple videos/works</span>
                  </div>
                </Form.Group>
                <Form.Group>
                  <Button variant="link" className="btn btnMainLarge btn-block">Checkout and License Tracks - <span className="">$0.00</span></Button>
                </Form.Group>
                <p className="text-center">By clicking checkout, you agree to your <a href="javascript:void(0)">license terms</a>.</p>
              </form>
            </div>
          </div>
          <div className="totalPrice">
            <span>Total: <strong>$0.00</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;