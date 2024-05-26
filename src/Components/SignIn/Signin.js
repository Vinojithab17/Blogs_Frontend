import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MuiAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import React, {  useState } from "react";
import { toast } from "react-toastify";
import validator from 'validator';
import "../../App.css";
import axios from 'axios';
import bcrypt from 'bcryptjs';


export default function LoginForm() {


    //to validate email
    const [emailError, setEmailError] = useState('')
    //to aleart a invalid email
    // const [emailAlert, setAlert] = React.useState(false);
    const [submitted, setSubmitted] = useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    // to store the values from the form
    const [values, setValues] = React.useState({
        email: "",
        password: "",
        showPassword: false
    });
    // validates the email
    const validateEmail = (e) => {
        // setAlert({
        //     emailAlert: true
        // });
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


    // sets value for the attributes in the form
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (e) => {
        setSubmitted(true)
        if (values.email === "" || values.password === "") {
            toast.info("Fill All Fields", {
                toastId: "1",
            })

            e.preventDefault()
        }

        else {
            console.log(`${values.email}`)
            e.preventDefault();
            console.log("submitted")
            console.log(values);
            try {
                // to login the user
                const apiUrl = process.env.REACT_APP_API_URL;
                const requestBody = {
                  email: values.email
                };
            
                console.log('Request Body:', requestBody);
            
                const response = await axios.post(`${apiUrl}/login`, requestBody, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                console.log(response);
                
                // for dubugging purpose
                console.log(response.data.user);// for dubugging purpose

                if (response.status === 200) {

                   const result  = await bcrypt.compareSync(values.password, response.data.user.password)
                    if(!result){
                        toast.warn("Incorrect Email or Password", {
                            toastId: "1"
                        })
                    }

                    else if (result){
                        localStorage.setItem('user', JSON.stringify(response.data.user))
                        const user = JSON.parse(localStorage.getItem('user'));
                        console.log('this user is a valid user',user); 
                        window.location.href = "/blogs"
                    }
                }
            } catch (error) {
                console.log(error.response.data.NoUser)
                if (error.response.data.NoUser) {
                    toast.warn("Incorrect Email or Password", {
                        toastId: "1"
                    })
                }
            }
        }

    };

    // const handleOpen = () => {

    //     this.setState({
    //         open: true
    //     });
    //     console.log(this.state.open);

    // };
    // to enable show password
    const handleClickShowPassword = () => {
        setValues({ ...values, ["showPassword"]: !values.showPassword });
    };

    //to enable handle mouse down
    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    return (
        <><div className="backg">

            {/* <TopAppBar/> */}

            {/* <ButtonAppBar/> */}
            <div className="container text-center bg-white bg-opacity-75 p-3" style={{
                width: "340px", height: "auto", marginTop: "10rem", padding: '25px'

                , marginBottom: "6rem", boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
                borderRadius: '10px'
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                ><Avatar sx={{ m: 1, bgcolor: 'primary.main', alignItems: 'center' }}>
                        <LockOutlinedIcon />
                    </Avatar></Box>

                <h2 style={{ margin: "auto", textAlign: "center" }}>Sign in</h2>
                <br></br>
                <br></br>

                <FormControl sx={{ m: 1, width: '33ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Email*</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={'text'}
                        value={values.email ? values.email : ""}
                        onChange={(e) => validateEmail(e)}
                        label="Email*"
                        className='email'
                        startAdornment={<InputAdornment position="start"> <MailOutlineIcon
                            sx={{ color: 'action.active', mr: 1, my: 0.5 }} /></InputAdornment>}
                    />

                    {emailError}
                    {submitted && values.email === "" ? <p style={{ color: 'red' }}>Email is Required !!!!!</p> : ""}
                </FormControl>

                <FormControl sx={{ m: 1, width: '33ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                    <OutlinedInput

                        id="outlined-adornment-password"
                        className='password'
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password ? values.password : ""}
                        onChange={handleChange("password")}
                        endAdornment={
                            <InputAdornment position="end">

                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password*"
                    />
                    {submitted && values.password === "" ? <div><p style={{ color: 'red' }}> Password is Required !!!!!</p></div> : ""}
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                    className="sign-in"
                >
                    Sign In
                </Button>
                <Typography variant="body2">
                    {"Don't have an account? "}
                    <Link href="/" variant="body2">
                        {"Sign Up"}
                    </Link>
                </Typography>
            </div>

            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="#">
                    Vinojith
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </Typography>
            </div>
        </>

    );
}
