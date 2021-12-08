import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Settings = () => {
  return (
    <div className="boxSetting">
      <form>
        <Form.Group>
          <div className="toogleSwitch">
            <input type="checkbox" id="youtubeWhitelisting" />
            <Form.Label for="youtubeWhitelisting">&nbsp;</Form.Label>
            <span className="switchText">YouTube whitelisting Enabled</span>
          </div>
        </Form.Group>
        <Form.Group>
          <div className="toogleSwitch">
            <input type="checkbox" id="audiosocketEmail" />
            <Form.Label for="audiosocketEmail">&nbsp;</Form.Label>
            <span className="switchText">Receive marketing emails from Audiosocket</span>
          </div>
        </Form.Group>
      </form>
    </div>
  );
};

export default Settings;
