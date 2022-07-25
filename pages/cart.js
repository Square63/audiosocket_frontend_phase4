import { Form, Button } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React, { useContext, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/actions/authActions";
import { removeCartItem } from "../redux/actions/authActions";
import { editWorkTitle, editWorkTitleForAll } from "../redux/actions/authActions";
import {AuthContext} from "../store/authContext";
import { useRouter } from "next/router";
import Braintree from "../components/braintree";
import InpageLoader from "../components/InpageLoader";
import Notiflix from "notiflix";
import CustomAudioWave from "../components/CustomAudioWave";

function Cart() {
  const form = useRef(null);
  const dispatch = useDispatch();
  const [showBrainTree, setShowBrainTree] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cartTracks = useSelector(state => state.user.cartTracks);
  const cartSfxes = useSelector(state => state.user.cartSfxes);
  const cartLineItems = useSelector(state => state.user.cartLineItems);
  const [validated, setValidated] = useState(false);
  const [multipleVideosChecked, setMultipleVideosChecked] = useState(false);
  const { totalCartPrice } = useContext(AuthContext);

  useEffect(() => {
    if (!cartTracks)
      dispatch(getCart())
    else
      setIsLoading(false);
  }, [cartTracks])

  function convertSecToMin(duration) {
    if (duration != null) {
      let minutes = Math.floor(duration / 60).toString();
      minutes = minutes.length == 1 ? ("0" + minutes) : minutes
      let seconds = parseInt((duration - minutes * 60)).toString();
      seconds = seconds.length == 1 ? ("0" + seconds) : seconds
      return minutes+':'+seconds
    } else {
      return "00:00"
    }

  }

  function handleRemoveTrack(trackTitle, itemableId) {
    Notiflix.Confirm.show(
      'Please confirm',
      `Are you sure you want to remove track ${trackTitle} from cart?`,
      'Yes',
      'No',
      function () {
        setIsLoading(true)
        dispatch(removeCartItem(itemableId))
      }
    );
  }

  function handleEditWorkTitle(e, itemableId) {
    dispatch(editWorkTitle(itemableId, e.target.value))
  }

  function handleIndividualWorkTitle() {
    setMultipleVideosChecked(!multipleVideosChecked)
    const className = document.getElementsByClassName("individualWorkTitle")[0].classList[0]
    document.querySelectorAll('.' + className).forEach(element => {
      element.classList.toggle('individualWorkTitleField');
    });
  }

  const handleSubmit = async (e) => {
    const cartForm = e.currentTarget;
    const data = new FormData(form.current);
    if (!multipleVideosChecked && cartForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      setShowBrainTree(true);
      if(!multipleVideosChecked)
        dispatch(editWorkTitleForAll(data.get('workTitleAll')))
    }
  }

  return (
    <>
    {!isLoading ? (
      showBrainTree ?
        <Braintree transactionAmount={totalCartPrice}></Braintree>
        :
        (<>
          {(cartTracks || cartSfxes) &&
            <div className="fixed-container">
              <div className="trackListingBlock">
                <h1 className="listingPageHeading">Checkout</h1>
                <div className="trackListingHeading">
                  <h2>Items in Cart ({cartLineItems.length})</h2>
                </div>

                <div className="trackRowWrapper cartStuff">
                  <div className="trackRow headingRow">
                    <div className="rowParticipant artistName">
                      Title / Artist
                    </div>
                    <div className="rowParticipant audioWave">
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
                  {cartTracks.map((track, index) => {
                    return(
                    <div key={index} className="trackRow">
                      <CustomAudioWave track={track} showWorkTitle={true} handleEditWorkTitle={handleEditWorkTitle} cartLineItem={cartLineItems[index]}/>

                      <div className="rowParticipant duration">
                        {convertSecToMin(track.duration)}
                      </div>
                      <div className="rowParticipant licenseType">
                        {cartLineItems[index].license.name}
                      </div>
                      <div className="rowParticipant price">
                        ${cartLineItems[index].license.price}
                      </div>
                      <div className="rowParticipant controls">
                        <OverlayTrigger overlay={<Tooltip>Remove</Tooltip>}>
                          <a href="javascript:void(0)" onClick={() => { handleRemoveTrack(track.title, cartLineItems[index].id);}}>
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
                    </div>)
                  })}
                  {cartSfxes.map((sfx, index) => {
                    return(
                    <div key={index} className="trackRow">
                      <CustomAudioWave track={sfx} showWorkTitle={true} handleEditWorkTitle={handleEditWorkTitle} cartLineItem={cartLineItems[index]}/>
                      <div className="rowParticipant duration">
                        {convertSecToMin(sfx.duration)}
                      </div>
                      <div className="rowParticipant licenseType">
                        {cartLineItems[index].license.name}
                      </div>
                      <div className="rowParticipant price">
                        ${cartLineItems[index].license.price}
                      </div>
                      <div className="rowParticipant controls">
                        <OverlayTrigger overlay={<Tooltip>Remove</Tooltip>}>
                          <a href="javascript:void(0)" onClick={() => { handleRemoveTrack(sfx.title, cartLineItems[index].id);}}>
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
                    </div>)
                  })}
                </div>
                <div className="addTitle">
                  <div className="addTitleSection">
                    <div className="boxWithShadow">
                      <Form noValidate validated={validated} onSubmit={handleSubmit} ref={form}>
                        <Form.Group controlId="formWorkTitle">
                          <label>Please add your Video or Work Title to your License</label>
                          <Form.Control required className="individualWorkTitle" name="workTitleAll" type="text" placeholder="Enter work title…" />
                          {!multipleVideosChecked &&
                            <Form.Control.Feedback type="invalid">
                              Work Title is required!
                            </Form.Control.Feedback>
                          }
                        </Form.Group>
                        <Form.Group controlId="formWorkTitleCheckbox">
                          <div className="toogleSwitch">
                            <input type="checkbox" id="audiosocketEmail" onChange={() => {handleIndividualWorkTitle()}}/>
                            <Form.Label for="audiosocketEmail">&nbsp;</Form.Label>
                            <span className="switchText">My cart has tracks for multiple videos/works</span>
                          </div>
                        </Form.Group>
                          <Button variant="link" type="submit" disabled={cartLineItems.length> 0 ? false : true} className="btn btnMainLarge btn-block">Checkout and License Tracks - <span className="">${totalCartPrice}</span></Button>
                        <p className="text-center">By clicking checkout, you agree to your <a href="javascript:void(0)">license terms</a>.</p>
                      </Form>
                    </div>
                  </div>
                  <div className="totalPrice">
                    <span>Total: <strong>${totalCartPrice}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          }
        </>)
    ) : (
      <InpageLoader />
    )}
    </>
  );
}

export default Cart;
