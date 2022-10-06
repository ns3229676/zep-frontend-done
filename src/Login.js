import React , { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import './Login.css'
import axios from './axios';
// import { FcGoogle } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from './actions/action';


function Login() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordType,setPasswordtype] = useState('password')
    const dispatch = useDispatch();
    const stateData = useSelector((state) => {
        const loggedUserData = state.userReducer.user;
    });
    
    const forEmail = (event) => {
        setEmail(event.target.value);
      };
    
      const forPassword = (event) => {
        setPassword(event.target.value);
      };
    
    const signIn = async (event) => {
        setOpen(true);
        event.preventDefault();
        console.log('signIn');
        const response = await axios.post(
          '/createuser',
          {
            adminEmail: email,
            password: password,
          },
          { withCredentials: true }
        );

        console.log(response)
    
        // const responsedData =  Object(response)
        const responseStringified = JSON.stringify(response);
        const data = Object(responseStringified);
        const responsedData = JSON.parse(data);
        //    console.log(responsedData.data.adminEmail)
    
        
        if (responsedData.status === 200) {
          setOpen(false);
          dispatch(addUser(responsedData.data.adminEmail));
    
          // alert('user registered successfully');
          toast.success('signed in successfully', {
            position: 'top-center',
            autoClose: 2000,
          });
          navigate('/tasks');
        } else if (responsedData.status === 202) {
          setOpen(false);
          // alert('please enter all credentials');
          toast.error('please add all credentials', {
            position: 'top-center',
            autoClose: 2000,
          });
        }else if (responsedData.status === 208){
          setOpen(false);
          // alert('user already registerd please login');
          toast.error('email is not valid please type valid email', {
            position: 'top-center',
            autoClose: 2000,
          });
        }
        else {
          setOpen(false);
          // alert('user already registerd please login');
          toast.error('user already registerd please login', {
            position: 'top-center',
            autoClose: 2000,
          });
        }
      };
    
      //login API
    
      const logIn = async (event) => {
        setOpen(true);
        event.preventDefault();
    
       
    
       
    
          const response = await axios.post(
            '/login',
            {
              adminEmail: email,
              password: password,
            },
            { withCredentials: true }
          );
        
    
        const responseStringified = JSON.stringify(response);
        const data = Object(responseStringified);
        const responsedData = JSON.parse(data);
    
        console.log(response);
    
        console.log(response.data.adminEmail);
        if (response.status === 200) {
          // alert('user logged in  succesfully');
          toast.success('user logged in  succesfully', {
            position: 'top-center',
            autoClose: 2000,
          });
    
          dispatch(addUser(response.data.adminEmail));
          // navigate('/addnews');
          navigate('/tasks');
        } else if (response.status === 202) {
          setOpen(false);
          toast.error('please enter all credentials', {
            position: 'top-center',
            autoClose: 2000,
          });
          // alert('please enter all credentials');
        }else if(response.status === 205){
          setOpen(false);
          toast.error('invalid credentials ', {
            position: 'top-center',
            autoClose: 2000,
          });
    
        }else if(response.status === 208){
          setOpen(false);
          // alert('user already registerd please login');
          toast.error('email is not valid please type valid email', {
            position: 'top-center',
            autoClose: 2000,
          });
        }else if(response.status === 210){
    
          setOpen(false);
          // alert('user already registerd please login');
          toast.error('password is invalid', {
            position: 'top-center',
            autoClose: 2000,
          });
        }
        else {
          setOpen(false);
          // alert('email is not registered please create your account');
          toast.error('email is not registered please create your account', {
            position: 'top-center',
            autoClose: 2000,
          });
        }
      }
    
      const togglePassword = (event)=>{
        event.preventDefault();
        if(passwordType === 'password'){
          setPasswordtype('text')
        }else{
          setPasswordtype('password')
        }
      }
    

  return (
    <div className='login'>

    <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
    </Backdrop>

    <input className='login__input' placeholder='enter email'  value={email} onChange={forEmail}/>

    <div className='password__div'>
    <input className='login__input' type={passwordType} placeholder='enter password' value={password} onChange={forPassword}/>

    <div className='togglePassword'>
    {passwordType === 'password' ? <VisibilityIcon className='toggleButton' onClick={togglePassword}/>   : <VisibilityOffIcon className='toggleButton' onClick={togglePassword}/>}
   
    
    
    </div>

    </div>

    <div className='login__buttons'>

    <button className='login__signIn__button' onClick={signIn}>sign In</button>
    <button className='login__logIn__button' onClick={logIn}>Log In</button>

    </div>

    </div>
  )
}
// <FcGoogle/> <p className='continue__withGoogle__heading'>Continue with Google </p>
export default Login