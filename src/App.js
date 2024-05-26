import { createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
// import { LandingPage } from './components/pages/LandingPage';
import Blog from './Components/Pages/Blogs';
import SignupForm from './Components/SignUp/login';
import LoginForm from './Components/SignIn/Signin';
import BlogForm from './Components/Blogs/BlogForm';


const theme = createTheme({
  palette: {
    primary: {
      main: '#465AF7'
    },
    secondary: {
      main: "#7858D7"
    }
  },
  typography: {
    fontFamily: 'Quicksand'
  }
})


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
          <Route exact path="/blogs" element={<Blog/>}></Route>
          <Route exact path="/" element={<SignupForm/>}></Route>
          <Route exact path="/login" element={<LoginForm/>}></Route>
          <Route exact path="/CreateBlogs" element={<BlogForm/>}></Route>


            {/* <Route exact path="/" element={<LandingPage/>}></Route>
            <Route exact path="/signIn" element={<LoginForm/>}></Route>
            <Route path="/wards" element={<AdminDashboard/>}></Route>
            <Route path="/add-wards" element={<AddWard/>}></Route>
            <Route path="/create-schedule" element={<CreateSchedule/>}></Route>
            <Route path="/set-deadline" element={<SetDeadline/>}></Route>
            <Route path="/view-doctors" element={<DoctorsView/>}></Route>
            <Route path="/ConsultantDashboard" element={<ConsultantDashboard/>}></Route>
            <Route path="/DoctorDashboard" element={<DoctorDashboard/>}></Route>
            <Route path="/Persistant" element={<Persistant/>}></Route>
            <Route path="/Popup" element={<PopUp />}></Route>
            <Route path="/ConsultantChangepwd" element={<ChangePassword />}></Route>
            <Route path='/set-constraints' element={<SetConstraint/>}></Route>
            <Route path='/ViewExchangeShifts' element={<ViewExchangeShifts/>}></Route>
            <Route path='/ConsultantViewSwappingShifts' element={<ConsultantViewSwappingShifts/>}></Route>
            <Route exact path="/restricted" element={<AccessDenied/>}></Route> */}
          </Routes>
        </Router>
      </ThemeProvider>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        theme="colored"
        newestOnTop
        closeOnClick
        rtl={false}
        draggable={false}
      />
    </>
  );
}

export default App;