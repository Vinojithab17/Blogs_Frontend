// import Button from 'react-bootstrap/Button';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import * as React from 'react';
// import '../css/clerk.css';
// import background from '../images/background.jpg';
// import TextField from '@mui/material/TextField';<FontAwesomeIcon icon="fa-solid fa-circle-check" />
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { useState } from "react";

import "../../App.css";
// import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {successToast, warningToast} from "../common/Toasts";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function SignupForm() {

  const [state, setState] = React.useState({
    open1: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const { vertical, horizontal, open1 } = state;

  const handleClick = (newState) => () => {
    setState({ open1: true, ...newState });
  };

  const handleClose1 = () => {
    setState({ ...state, open1: false });
  };
  //--------------------------

  // const buttons = (
  //   <React.Fragment>
  //     <Button
  //       onClick={handleClick({
  //         vertical: 'top',
  //         horizontal: 'center',
  //       })}
  //     >
  //       Top-Center
  //     </Button>

  //   </React.Fragment>
  // );


  const nav = useNavigate();
  const [value, setValue] = React.useState(false);
  const [emailAlert, setAlert] = React.useState(false);
  const [values, setValues] = React.useState({
    password: "",
    re_password: "",
    showPassword: false,
    fname: "",
    lname: "",
    email: "",
    samepassword: false,
    date: new Date('2014-08-18T21:11:54')

  });
  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    setAlert({
      emailAlert: true
    });
    var email = e.target.value;
    setValues({ ...values, email: email });
    if (validator.isEmail(email)) {
      setEmailError(<Alert severity="success"><strong>Valid Email ;)</strong> </Alert>)
    } else {
      setEmailError(
        <Alert severity="warning"><strong>Enter Valid Email! </strong> </Alert>
        )
    }
  }

  const validatePassword = (p) => {
    // var p = document.getElementById('newPassword').value,
    let errors = [];
    if (p.length < 8) {
      errors.push("Your password must be at least 8 characters");
    }
    if (p.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
    }
    if (p.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
    }
    if (errors.length > 0) {
      // alert("error in pwd");
      setValues({
        ...values,
        samepassword: true
      });
      return false;
    }
    return true;
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };


  const handleSubmit = async (e) => {
    // alert("hi");
    console.log(values);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(values.password, salt);
    const match = await bcrypt.compare(values.password, hash);
    const requestBody = {
      name: values.fname+values.lname,
      email: values.email,
      password: values.password,
      role: "user",
    };
    // console.log(requestBody);
    // console.log(match);

    handleClick({
      vertical: 'top',
      horizontal: 'center',
    })
    const apiUrl = process.env.REACT_APP_API_URL;
    axios.post(`${apiUrl}/profile/add`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
     
      if(res.data.message){
        console.log('this is the error data',res.data);
        warningToast("Email already exists");
        // handleClick({
        //   vertical: 'top',
        //   horizontal: 'center'
        // })()
      }
      
      else if (res.data.success){
        console.log(res.data);
        successToast("Account successfully created");
        setTimeout(() => {
          console.log("working"); // count is 0 here
          nav("/");
          }, 1550);
        
      }
      
    }).catch((err) => {
      if(err.response.data.emailExits){
        // console.log('this is the error data',res.data);
        warningToast("Email already exists");
        // handleClick({
        //   vertical: 'top',
        //   horizontal: 'center'
        // })()
      }
      console.log(err.response.data.emailExits);

      console.log(err.message);
    });


  }
  const samePwd = () => {
    setValues({
      ...values,
      samepassword: !values.samepassword,
    });
  };

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(true);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const addUser = () => {

// console.log(values.date);
    if (values.fname === "" || values.email === "" || values.password === "" || values.re_password === "" || values.date === "") {
      // console.log("Empty");
      setValue({
        value: true
      });
      // console.log(value.value);
    } else {
      // console.log(values.fname);
      setValue({
        value: false
      });
      // console.log(value.value);

      // setTimeout(function(){ setValues({ ...values, ['alert']: false }); }, 6000);
      if (values.password !== values.re_password && !values.samepassword) {
        samePwd();
      }
      if (values.password === values.re_password && !values.samepassword && validatePassword(values.password)) {

        // alert("hi");
        handleSubmit();
        // const bcrypt = require('bcrypt');
        // let pswrd = bcrypt.hashSync(values.password, 10);
      } else if (values.password === values.re_password && values.samepassword && validatePassword(values.password)) {
        console.log(validatePassword(values.password));
        samePwd();
        handleSubmit();
      }
      // values.email !== '' && alert(`${values.email}___${values.fname}`);

    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
   < div className="backg">
    <div className="container bg-white bg-opacity-75 p-3" style={{
      width: "620px", height: "auto", marginTop: "10rem", padding: '25px'

      , marginBottom: "6rem", boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
      borderRadius: '10px'
  }}>



    {/* {values.date} */}
      <Snackbar autoHideDuration={4000}
      
        anchorOrigin={{ vertical, horizontal }}
        open={open1}
        onClose={handleClose1}
        message=""
        key={vertical + horizontal}
      >
        <Alert severity="warning"><strong>Email ID Already Exits!! </strong></Alert>
      </Snackbar>
      <h2>Sign UP</h2>
      <FormControl >
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <TextField sx={{ m: 1, width: '30ch' }} id="outlined-basic" label="First Name" variant="outlined"

              value={values.fname}
              onChange={handleChange('fname')}
              required />

            <TextField sx={{ m: 1, width: '30ch' }} id="outlined-basic" label="Last Name" variant="outlined"

              value={values.lname}
              onChange={handleChange('lname')} />

            <br />
            <FormControl sx={{ m: 1, width: '30ch' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth*"
                  value={values.date}
                  onChange={(newValue) => {

                    setValues({ ...values, date: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Email*</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={'text'}
                value={values.email}
                onChange={(e) => validateEmail(e)}
                label="Email*"
                startAdornment={<InputAdornment position="start"> <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /></InputAdornment>}
              />
              {emailError}
            </FormControl>
            <br />
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password*"
              />
            </FormControl>


            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Re-Enter Password*</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.re_password}
                onChange={handleChange('re_password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Re-Enter Password*"
              />
            </FormControl>

          </div>

        </Box>
        {value.value ? <Alert severity="warning"><strong>Fill All Required (*) Details!</strong> </Alert> : ""}
        {values.samepassword ? <div> <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">
            <AlertTitle>Warning</AlertTitle>
            Warning in password — <strong>
              <br />
              Both password must be Same!
              <br />
              Your password must be at least 8 characters!
              <br />
              Your password must contain at least one letter!
              <br />
              Your password must contain at least one digit!
              <br />
            </strong>
          </Alert>
        </Stack></div> : ""}


        <Button variant="contained" sx={{ m: 1, width: '15ch' }} onClick={addUser} >Submit</Button>

        <Typography variant="body2">
                    {"Already have an account? "}
                    <Link href="/login" variant="body2">
                        {"Sign In"}
                    </Link>
                </Typography>
      </FormControl>

    </div>
    </div>
  );
}

export default SignupForm;

// export default SignupForm;