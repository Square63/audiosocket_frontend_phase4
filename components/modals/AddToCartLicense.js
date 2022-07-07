import React, { useRef, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import {AuthContext} from "../../store/authContext";
import Link from "next/link";
import router from "next/router";
import { getLicenses } from '../../redux/actions/trackActions';
import { BASE_URL } from '../../common/api';
import axios from "axios";
import { TOAST_OPTIONS } from '../../common/api';
import { ToastContainer, toast } from 'react-toastify';


function AddToCartLicense({ showModal = false, onCloseModal, track, type}) {
  const form = useRef(null);
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState();
  const userAuthToken = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";

  const authContext = useContext(AuthContext);
  const licenses = useSelector(state => state.allTracks.licenses);

  useEffect(() => {
    if (!licenses){
      dispatch(getLicenses());
    }
  }, [licenses])

  function handleLicenseClick(e, licenseId) {
    setSelectedLicense(licenseId);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preferenceForm = e.currentTarget;
    if (preferenceForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      // const data = new FormData(form.current);
      handleClose();
      await axios.request({
        headers: {
          "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
          "auth-token": userAuthToken
        },
        method: "post",
        url: (`${BASE_URL}/api/v1/consumer/licenses/${selectedLicense}/attach_to_media?&mediable_type=${type}&mediable_id=${track.id}`)

      }).then(response => {
        if (!response.status === 200) {
          onCloseModal(false);
          toast.error("Error while selcting license.");
        } else {
          onCloseModal(true);
          authContext.handleAddToCart(response.data.mediable.id, response.data.mediable_type, response.data.id);
        }
      }).catch(error => {
        onCloseModal(true);
        toast.error(error.response.data.message);
      });
    }
  }

  const handleClose = () => {
    onCloseModal(false);
    setValidated(false);
    setIsLoading(false);
  }

  // const handleLicenseClick = (trackId, licenseId) => {
  //   if (licenseId) {
  //     dispatch(attachToMedia(trackId, licenseId));
  //   }
  // }

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="md"
      className="themeModal downloadTrackLicense">
      <Modal.Header closeButton>
        <Modal.Title >
          <h2 className="modalName">License Track</h2>
          <p className="modalTrackName">
            {track && track.title}
          </p>
          <p className="modalTrackArtist">
            Justin G. Marcellus
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-container">
          <div className="modalPlansInfo">
            <div className="licensePriceOption">
              <Form className="newThemeRadio roundShape">
                {['radio'].map((type) => (
                  <div key='inline'>
                    {licenses && licenses.map(license =>
                      <Form.Check
                        key={license.id}
                        label={license.name}
                        name="group1"
                        type={type}
                        id={`inline-${license.id}`}
                        onClick={(e) => handleLicenseClick(e, license.id)}
                      />
                    )}
                    <Form.Label className="labelBetweenForm">Not finding the license you need?</Form.Label>
                    <Form.Check
                      label="Custom License"
                      name="group1"
                      type={type}
                      id={`inline-${type}-4`}
                    />
                  </div>
                ))}
              </Form>
              <p className="quriesAddress">Have a question? Email us at info@audiosocket.com to get personal assistance.</p>
            </div>
            <div className="discountOffer">
              <h4>Save money with unlimited music licenses</h4>
              <hr/>
              <div className="discountContent">
                <p>
                  For the same price as a single track license, get an unlimited subscription.
                </p>
                <a className="btn btnMainSmall" onClick={()=> {router.push('/pricing')}}>View Plans &amp; Pricing</a>
              </div>
            </div>
          </div>
          <div className="modalLicenseInfo">
            <h3>License Info</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Please add your Video or Work Title to your License</Form.Label>
                <Form.Control type="text" placeholder="Enter work title…" />
              </Form.Group>
              <Button variant="link" className="btn btnMainLarge btn-block" type="submit">
                Checkout and License Track - <span className="modalPriceBtn">$129</span>
              </Button>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddToCartLicense;
