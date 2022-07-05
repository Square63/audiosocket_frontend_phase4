import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import user from "../../styles/User.module.scss";

const Settings = () => {
  return (
    <div className={user.boxSetting}>
      <form>
        <Form.Group>
          <div className="toogleSwitch">
            <input type="checkbox" id="youtubeWhitelisting" />
            <Form.Label for="youtubeWhitelisting">&nbsp;</Form.Label>
            <span className="switchText">YouTube whitelisting Enabled</span>
            <OverlayTrigger overlay={<Tooltip>Info</Tooltip>}>
              <a href="javascript:void(0)" className={user.info}></a>
            </OverlayTrigger>
          </div>
        </Form.Group>
        <Form.Group>
          <div className="toogleSwitch">
            <input type="checkbox" id="audiosocketEmail" />
            <Form.Label for="audiosocketEmail">&nbsp;</Form.Label>
            <span className="switchText">Receive marketing emails from Audiosocket</span>
          </div>
        </Form.Group>
        <div className="col-md-12 pt-3 text-center">
          <Button variant="link" className="btnMainLarge" type="submit">
            Update Setting
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
