import React, { useRef } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CancelIcon from '@mui/icons-material/Cancel';
import './Register.css';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userRegisterSuccess = () => {
  toast.success('Registered successfully!');
};

const userRegisterFail = () => {
  toast.error('Failed to register!');
};

const Register = ({ setShowRegister }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      userName: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    try {
      const response = await axios.post('/users/register', newUser);
      console.log(response);
      //Notify for successful registration
      userRegisterSuccess();
      setShowRegister(false);
    } catch (err) {
      //produce a failing notification
      userRegisterFail();
      console.log(err);
    }
  };

  return (
    <div className="register_container">
      <div className="application">
        <ExitToAppIcon />
        Create a new profile.
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="userName" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passRef} />
        <button className="register_button">Register</button>
        <CancelIcon
          className="register_cancel"
          onClick={() => setShowRegister(false)}
        />
      </form>
    </div>
  );
};

export default Register;
