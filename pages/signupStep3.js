import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useRef, useContext, useEffect} from "react";
import {AuthContext} from "../store/authContext";
import {useRouter} from "next/router";
import signup from "../styles/Signup.module.scss";
import Select from "react-select";
import Link from "next/link"

function SignupStep3() {
  return(
    <div>Sign Up Step 3</div>
  );
}

export default SignupStep3;