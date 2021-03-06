import withPrivateRoute from "../../components/withPrivateRoute";
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import user from "../../styles/User.module.scss";
import License from "../../components/modals/License";
import { getConsumerLicenses } from "../../redux/actions/authActions";
import InpageLoader from '../../components/InpageLoader';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

const CustomAudioWave = dynamic(
  () => import('../../components/CustomAudioWave'),
  { ssr: false }
)

function Licenses() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState();
  const consumerLicenses = useSelector(state => state.user.csonsumerLicenses);
  const { query } = useRouter();

  useEffect(() => {
    if (!consumerLicenses)
      dispatch(getConsumerLicenses())
  })

  useEffect(() => {
    if (consumerLicenses) {
      if (query.from) {
        toast.success("License purchased successfully")
        window.history.replaceState(null, '', '/user/licenses')
      }
      setIsLoading(false)
    }
  }, [consumerLicenses])

  const handleClose = (show) => {
    setShowModal(show)
  }

  return (
    <>
    {isLoading ? (
        <InpageLoader/>
      ) : (
          <>
            <div className={user.licenses}>
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
              <div className={user.listingWrapper+' userListingWrapper'}>
                <div className={user.listingHeading}>
                  <h2>Licenses</h2>
                  <p>Please be sure to create a license each time you use a track, even if you use the same track multiple times. The license agreement is the document required by law to demonstrate proof of your right to use the track in your Work. To License tracks you downloaded, toggle to ???Downloads??? and Select ???License Track???.</p>
                </div>
                <div className="trackRowWrapper">
                  <div className="trackRow headingRow">
                    <div className="rowParticipant artistName">
                      Title / Artist
                      <span className="sortingMedium">
                        <a href="" className="decending"></a>
                        <a href="" className="ascending"></a>
                      </span>
                    </div>
                    <div className="rowParticipant audioWave"></div>
                    <div className={user.workTitle + ' rowParticipant'}>
                      Work Title
                      <span className="sortingMedium">
                        <a href="" className="decending"></a>
                        <a href="" className="ascending"></a>
                      </span>
                    </div>
                    <div className={user.licenseAgreement + ' rowParticipant'}>
                      License Agreement
                    </div>
                    <div className={user.purchaseReceipt + ' rowParticipant'}>
                      Purchase Receipt
                    </div>
                    <div className={user.purchaseDate + ' rowParticipant'}>
                      Purchase Date
                    </div>
                    <div className="rowParticipant controls"></div>
                  </div>
                  {consumerLicenses.map((consumerLicense, index) =>
                    <div className="trackRow" key={index}>
                      <CustomAudioWave track={consumerLicense.mediable} footer={false} footerPlaying={false} notClickable={true} />
                      <div className={user.workTitle + ' rowParticipant'}>
                        {consumerLicense.work_title}
                      </div>
                      <div className={user.licenseAgreement + ' rowParticipant'}>
                        <a href={consumerLicense.license_pdf} className="noTextLine" target="_blank" rel="noreferrer">
                          License Agreement
                        </a>
                      </div>
                      <div className={user.purchaseReceipt + ' rowParticipant'}>
                        <a href={consumerLicense.invoice} className="noTextLine" target="_blank" rel="noreferrer">
                          Receipt
                        </a>
                      </div>
                      <div className={user.purchaseDate + ' rowParticipant'}>
                        {consumerLicense.license_purchased_date.slice(0, -5)}
                      </div>
                      <div className="rowParticipant controls">
                        <OverlayTrigger overlay={<Tooltip>Download</Tooltip>}>
                          <a href="javascript:void(0)" onClick={() => {setShowModal(true); setIndex(index)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22.743" height="21.503" viewBox="0 0 22.743 21.503">
                              <g id="icon-download" transform="translate(0.5 21.003) rotate(-90)">
                                <path id="Shape_111" data-name="Shape 111" d="M11.589,4.254V.945A.92.92,0,0,0,10.7,0H.891A.92.92,0,0,0,0,.945V20.8a.92.92,0,0,0,.891.945H10.7a.92.92,0,0,0,.891-.945V17.489" fill="#fff" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                                <path id="Shape_112" data-name="Shape 112" d="M0,0H16.937" transform="translate(3.566 10.872)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                                <path id="Shape_113" data-name="Shape 113" d="M4.457,0,0,4.727,4.457,9.454" transform="translate(3.566 6.145)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                              </g>
                            </svg>
                          </a>
                        </OverlayTrigger>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <License showModal={showModal} onCloseModal={handleClose} license={consumerLicenses[index]} />
            </div>
          </>
        )
      }
    </>
  );
}

export default withPrivateRoute(Licenses);
