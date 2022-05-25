import React, {useRef, useState, useEffect} from "react";
import { FileUploader } from "react-drag-drop-files";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../common/api";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { removeFromPlaylist } from "../../redux/actions/authActions";
import { ToastContainer, toast } from 'react-toastify';

import playlist from "../../styles/Playlist.module.scss";
import InpageLoader from "../InpageLoader";

function EditPlaylistModal({showModal = false, onCloseModal, loading, myPlaylistDetail, myPlaylistTracks}) { 
  const dispatch = useDispatch();
  const { query } = useRouter();  
  const formNewPlaylist = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const fileTypes = ["JPG", "PNG", "GIF", "SVG", "JPEG"];

  useEffect(() => {
    setIsLoading(false);
  }, [myPlaylistTracks])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlaylistForm = e.currentTarget;
    const data = new FormData(formNewPlaylist.current);
    setIsLoading(true);
    let url = `${BASE_URL}/api/v1/consumer/consumers_playlists/${myPlaylistDetail.id}`;
    const userAuthToken = JSON.parse(localStorage.getItem("user") ?? "");
    const URL = url;
    if (newPlaylistForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      await axios.request({
        headers: {
          "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
          "auth-token": userAuthToken
        },
        method: "patch",
        url: URL,
        data: data,
        
      }).then (response => {
        if (!response.status === 200) {
          onCloseModal(false);
          setValidated(false);
          setIsLoading(false);
          setFile(null);
          toast.error("Error while updating playlist.");
        } else {
          onCloseModal(false);
          setValidated(false);
          setIsLoading(false);
          setFile(null);
          toast.success('Playlist updated successfully.');
        }
      })
    } 
  }

	const handleRemoveTrack = async (e, trackId) => {
    setIsLoading(true);
    e.preventDefault();
    dispatch(removeFromPlaylist(query.id, trackId))
    // const newPlaylistForm = e.currentTarget;
    // const data = new FormData(formNewPlaylist.current);
		// data.append('playlist_tracks_attributes[][id]', trackId)
    // setIsLoading(true);
    // let url = `${BASE_URL}/api/v1/consumer/consumers_playlists/${myPlaylistDetail.id}`;
    // const userAuthToken = JSON.parse(localStorage.getItem("user") ?? "");
    // const URL = url;
		// await axios.request({
		// 	headers: {
		// 		"Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
		// 		"auth-token": userAuthToken
		// 	},
		// 	method: "patch",
		// 	url: URL,
		// 	data: data,
			
		// }).then (response => {
		// 	if (!response.status === 200) {
		// 		onCloseModal(false);
		// 		setValidated(false);
		// 		setIsLoading(false);
		// 		setFile(null);
		// 		toast.error("Error while updating playlist.");
		// 	} else {
		// 		// onCloseModal(false);
		// 		setValidated(false);
		// 		setIsLoading(false);
		// 		setFile(null);
		// 		toast.success('Track removed successfully.');
		// 	}
		// })
  }

  const handleClose = () => {
    onCloseModal(false);
    setValidated(false);
    setIsLoading(false);
  }

  const handleChange = (file) => {
    setFile(file);
  };

	// const handleRemoveTrack = (e, playlistName) => {
  //   let consumerPlaylistId = 0;
  //   let removedPlaylistId = 0;
  //   e.preventDefault();
  //   e.target.closest("li").remove()
  //   for(var i = 0; i < playlists.playlists[0].consumer_playlists.length; i++) {
    
  //     for(var j = 0; j < playlists.playlists[0].consumer_playlists[i].playlist_tracks.length; j++) {
  //       if ((playlists.playlists[0].consumer_playlists[i].name == playlistName)  && (playlists.playlists[0].consumer_playlists[i].playlist_tracks[j].mediable_id == track.id)) {
  //         consumerPlaylistId = playlists.playlists[0].consumer_playlists[i].id
  //         removedPlaylistId = playlists.playlists[0].consumer_playlists[i].playlist_tracks[j].id
  //       }
  //     }
  //   }
  //   dispatch(removeTrackFromPlaylist(consumerPlaylistId, removedPlaylistId));
  // }

	const items = myPlaylistTracks.playlist_tracks && myPlaylistTracks.playlist_tracks.map((playlistTrack, index) =>
    <li key={index}>
			
      <a href="javascript:void(0)">
				<svg xmlns="http://www.w3.org/2000/svg" width="2.5" height="12.5" viewBox="0 0 2.5 12.5">
					<g id="icon-sort" transform="translate(-496.25 -992.25)">
						<path id="Oval_12" data-name="Oval 12" d="M429,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,429,347.25Z" transform="translate(843.5 564.5) rotate(90)" fill="#6e7377"/>
						<path id="Oval_13" data-name="Oval 13" d="M434,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,434,347.25Z" transform="translate(843.5 564.5) rotate(90)" fill="#6e7377"/>
						<path id="Oval_14" data-name="Oval 14" d="M439,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,439,347.25Z" transform="translate(843.5 564.5) rotate(90)" fill="#6e7377"/>
					</g>
				</svg>
				<span className={playlist.songTitle}>{playlistTrack.mediable.title}</span>
			</a>
      <svg xmlns="http://www.w3.org/2000/svg" width="14.744" height="14.744" viewBox="0 0 14.744 14.744" onClick={(e) => handleRemoveTrack(e, playlistTrack.id)}>
        <g id="icon-trash" transform="translate(0.5 0.5)">
          <path id="Shape_1765" data-name="Shape 1765" d="M291.756,3298.5l-1.083,10.284a1.2,1.2,0,0,1-1.188,1.07h-6.215a1.2,1.2,0,0,1-1.189-1.07L281,3298.5" transform="translate(-279.506 -3296.11)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          <path id="Shape_1766" data-name="Shape 1766" d="M278.5,3298.5h13.744" transform="translate(-278.5 -3296.11)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          <path id="Shape_1767" data-name="Shape 1767" d="M285.5,3296.89V3295.1a.6.6,0,0,1,.6-.6h4.183a.6.6,0,0,1,.6.6v1.792" transform="translate(-281.317 -3294.5)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          <path id="Shape_1768" data-name="Shape 1768" d="M290,3303v6.274" transform="translate(-283.128 -3297.921)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          <path id="Shape_1769" data-name="Shape 1769" d="M294.3,3303l-.3,6.274" transform="translate(-284.738 -3297.921)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          <path id="Shape_1770" data-name="Shape 1770" d="M285.5,3303l.3,6.274" transform="translate(-281.317 -3297.921)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
        </g>
      </svg>
    </li>
  )

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="md"
      className="themeModal downloadTrack">
      <Modal.Header closeButton>
        <Modal.Title >
          <h2 className="modalName">Edit Playlist</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <InpageLoader/>
        ) : (
          <div className="modal-container">
            <Form className="modalForm PlaylistForm" validated={validated} noValidate ref={formNewPlaylist} onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Playlist Name <span className="labelAsterik">*</span></Form.Label>
                <Form.Control required type="text" placeholder="Enter name" name="name" defaultValue={myPlaylistDetail.name} />
                <Form.Control.Feedback type="invalid">
                  Name is required!
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <div className="dragDropContainer">
                  {file ? <p className="dragDropContent">File Uploaded…</p> : <p className="dragDropContent">Drag &amp; Drop <br /> Project Image <br />Or <br />Choose File…</p>}
                  <FileUploader
                    handleChange={handleChange}
                    types={fileTypes}
                    name="playlist_image"
                  />
                </div>
                <p>{file ? `File name: ${file.name}` : "No files uploaded yet"}</p>
              </Form.Group>
              <Button variant="link" className={isLoading ? "btn btnMainLarge btn-block disabled" : "btn btnMainLarge btn-block"} type="submit">
                Update Playlist Details
              </Button>
            </Form>

            <div className="playlistNames">
              <h4 className="mt-4">Playlist Tracks</h4>
              <ul className="scrollingList">
                {items}
              </ul>
              
            </div>
          </div>
        )}
        
      </Modal.Body>
    </Modal>
  );
}

export default EditPlaylistModal;
