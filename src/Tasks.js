import React , {useEffect, useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
// import './Tasks.css'
import './Taskss.css'

import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from './actions/action';
import axios from './axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate ,Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Home from './images/Home.png'
import ARROWBUTTON from './images/arrowbutton.png'
import ARRORTICK from './images/arrowtick.png'
import RIGHTGRAPHIC from './images/rightgraphic.png';
import MANGRAPHIC from './images/mangraphic.png'

function Tasks() {
  
    const navigate = useNavigate();
    const [openBuy,setOpenbuy] = useState(false)
    const [openTweetinput,setOpenTweetinput] = useState(false)
    const [openRetweetInput,setOpenRetweetinput] = useState(false)
    const [openTelegraminput,setOpentelegraminput] = useState(false)
    const [openFollowinput,setOpenfollowinput] = useState(false)
    const [openWalletinput , setOpenwalleinput] = useState(false)
    const [telegramInputname , setTelegraminputname] = useState('')
    const [telegramInputemail,setTelegraminputemail] = useState('')
    const [telegramInput,setTelegraminput] = useState(false)
    const [checkTweet,setChecktweet] = useState('')
    const [checkFollower,setCheckfollower] = useState('')
    const [checkRetweet,setCheckretweet] = useState('')
    const [checkusername,setCheckusername] = useState('')
    const [checkusernameTrueorfalse,setCheckusernameTrueorfalse] = useState(false)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [twitterFollow,setTwitterfollow] = useState(false);
    const [joinTelegram,setJointelegram] = useState(false);
    const [buy,setBuy] = useState(false);
    const [retweet,setRetweet] = useState(false);
    const [tweet,setTweet] = useState(false);
    const [walletAddress,setWalletaddress] = useState('');
    const [walletAddressstatus,setWalletaddressstatus] = useState('');
    // const [checkFollowOrnot,setCheckfollowornot] = useState('')
    const loggedUserData = useSelector((state) => state.userReducer.user);
    const [provider,setProvider] = useState(null);

    console.log(loggedUserData)

    console.log(twitterFollow,joinTelegram,retweet,tweet,walletAddress)

    

 

    const logoutAdmin = async () => {
    
      setOpen(true);
      try{
  
        const response = await axios.get('/logout', { withCredentials: true });
      
  
      if (response.status === 200) {
        setOpen(false);
        // alert('admin log out seccessfully');
        toast.success('Admin log out successfully', {
          position: 'top-center',
          autoClose: 2000,
        });
        dispatch(removeUser());
        navigate('/');
      }
  
    }catch(err){
      console.log(err)
    }
  
    };

    const tweetData = 'Guyzz I have found this intresting Crypto ICO#ZEPCOIN  Its live now. Its $0.0001 $ZEP 🤑🤑 Zep it now.ZIP.....ZAP.....ZOOP🤗🤗🤗visit- https://zepcoin.io/join the community also- https://bit.ly/zepcoin#Zepians #newcrypto'

   
      
      
    const saveretweetstatus = async ()=>{
      try{
        await axios.post('/saveretweettaskstatus',{
          retweet : true,
          loggedUserData : loggedUserData
        },{withCredentials : true});
      }catch(err){
        console.log(err)
      }
    }
    
    const FetchTasks = async ()=>{

      const adminloginorlogoutStatus = await axios.get('/adminloginorlogout',{withCredentials: true})
      console.log('adminloginorlogoutstatus')
      console.log(adminloginorlogoutStatus)
      dispatch(addUser(adminloginorlogoutStatus.data));


      const followTaskresponse = await axios.post('/fetchfollowtaskresponse',{
        loggedUserData : adminloginorlogoutStatus.data
      },{withCredentials: true})

      const retweetTaskresponse = await axios.post('/fetchretweetTaskresponse',{
        loggedUserData : adminloginorlogoutStatus.data
      },{withCredentials: true})

      const walletAddresstaskresponse = await axios.post('/fetchwalletAddressresponse',{
        loggedUserData : adminloginorlogoutStatus.data
      },{withCredentials: true})

      const tweettaskresponse = await axios.post('/fetchtweettaskresponse',{
        loggedUserData : adminloginorlogoutStatus.data
      },{withCredentials: true})

      const telegramtaskresponse = await axios.post('/fetchtelegramtaskresponse',{
        loggedUserData : adminloginorlogoutStatus.data
      },{withCredentials: true})


      setTwitterfollow(followTaskresponse?.data?.twitterFollow)
      setCheckusernameTrueorfalse(retweetTaskresponse?.data?.retweet)
      setTweet(tweettaskresponse?.data?.tweet)
      setJointelegram(telegramtaskresponse?.data?.joinTelegram)
      if (walletAddresstaskresponse?.data === null){

        setWalletaddressstatus(false)
      }else{
        setWalletaddressstatus(true)

      }

      if(followTaskresponse?.data?.twitterFollow){
        setOpenfollowinput(false)
      }

      if(telegramtaskresponse?.data?.joinTelegram){
        setOpentelegraminput(false)
        setTelegraminput(false)
      }


      console.log('response from fetchfollowtaskresponse')
      console.log(followTaskresponse?.data?.twitterFollow)

      console.log('response from fetchretweetTaskresponse')
      console.log(retweetTaskresponse)

      console.log('response from walletAddresstaskresponse')
      console.log(walletAddresstaskresponse)

      console.log('response from tweettaskresponse')
      console.log(tweettaskresponse)

      console.log('response from telegramtaskresponse')
      console.log(telegramtaskresponse?.data?.joinTelegram)
      
    }

    useEffect(()=>{
      FetchTasks();
    },[])

    const savetweettaskstatus = async ()=>{

    const response =   await axios.post('/savetweettaskstatus',{
        tweet : true,
        loggedUserData : loggedUserData
      },{withCredentials : true})
      
      console.log(response)
      setOpenTweetinput(false)
    }


  
  

  return (

    <div className='tasks' >


    <img className='tasks__backgroundImage' src={Home}/>
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
  >
    <CircularProgress color="inherit" />
  </Backdrop>

    

    <div className='tasks__left'>

    <div className='logout__button'>
    {loggedUserData ? [provider === null ? [<button onClick={logoutAdmin} className="logout__button__forResponsive">LogOut Admin</button>] : null] : null}
    </div>
    

    <div className='task__mainHeading' >
    <h1 className='tasks__firstHeading'>Hey!</h1>
    <h1 className='tasks__secondHeading'>Claim your FREE 5K Airdrop</h1>
   
    </div>
    
    <div className='tasks__details'>

    


    <div className='tasks__div'>

    <div className='tasks__div__details'>

    <div className='task__div__top'>

    <h1 className='tasks__div__heading'>Enter your Cryto Wallet Address</h1>  
    {walletAddressstatus ? <img className='tasks__div__details__arrows' src={ARRORTICK}/> : <img className='tasks__div__details__arrows' src={ARROWBUTTON} onClick={()=> setOpenwalleinput(true)}/>  }

    </div>

   {openWalletinput ?  <div className='tasks__div__bottom'>

    <input value={walletAddress} onChange={(e)=>setWalletaddress(e.target.value)} placeholder='type wallet address' className='tasks__div__bottom_input'/>

    <button className='tasks__div__bottom__submit__button' onClick={async ()=>{
      const response = await axios.post('/savewallettaskstatus',{
        walletAddress : walletAddress,
        loggedUserData : loggedUserData
      },{withCredentials : true})

      if(response){
        setWalletaddressstatus(true)
        setOpenwalleinput(false)
      }else{
        setWalletaddressstatus(false)
      }

    }}>Submit</button>

   

    </div> : null}

    </div>


   

    </div>

    <div className='tasks__div'>

    <div className='tasks__div__top'>
    <h1 className='tasks__div__heading'>Follow @ZEPCOIN on twitter</h1>
    { twitterFollow ? <img className='tasks__div__details__arrows' src={ARRORTICK}/> : <img className='tasks__div__details__arrows' src={ARROWBUTTON} onClick={()=> setOpenfollowinput(true)}/> }
    </div>

  

    {openFollowinput ?
    
      <div className='tasks__div__bottom'>
        <div className='follow__div'>
      
    <p className='tasks__div__button'><a target="_blank" href='https://twitter.com/zepcoinofficial' className='tasks__div__links' >Click to Follow</a></p>

      <div className='follow__div__inputAndbutton'>
    <input className='tasks__div__checkFollower' placeholder='Enter twitter user id' value={checkFollower} onChange={(event)=> setCheckfollower(event.target.value)}/>
    <button className='tasks__div__checkFollower__button' onClick={async ()=>{
      try{
        const response = await axios.post('/checkfollower',
        {
          checkFollower : checkFollower
        },
        { withCredentials: true }
       )
       console.log('response from check follower')
       const success = console.log(response.data.success)
      //  console.log(response.data.relationship.source.followed_by)
      // setTwitterfollow(response.data.relationship.source.followed_by)
      
  
      if(response.data.success){
        await axios.post('/savefollowtaskstatus',{
          // twitterFollow : response.data.relationship.source.followed_by,
          twitterFollow : true,
          loggedUserData : loggedUserData
        },{withCredentials : true});

        setTwitterfollow(true)

        console.log('response.data.relationship.source.followed_by')
        // console.log(response.data.relationship.source.followed_by)
      }else{
        console.log('id is not matched with follower')
        alert('id not matched')
      }
      }catch(error){
        console.log('catch error block')
        // console.log(response.data.relationship.source.followed_by)
        console.log(error)
      }
    
    }}
    >Continue</button>
</div>

    </div>
     </div> 

      : null}

      

  

    </div>


    <div className='tasks__div'>

    <div className='tasks__div__top'>
    <h1 className='tasks__div__heading'>Join @ZEPCOIN on telegram</h1>
    { joinTelegram ? <img className='tasks__div__details__arrows' src={ARRORTICK}/> : <img className='tasks__div__details__arrows' src={ARROWBUTTON} onClick={()=> setOpentelegraminput(true)}/> } 
    </div>

    

   
    
    {openTelegraminput ?  
      ( <>  
         <a target="_blank" href='https://t.me/zepCoinOfficial' className='tasks__div__links joinTelegram__link' >Click to Join</a>
  

    <button className='joinTelegram__continueButton' onClick={()=>{
      setTelegraminput(true)
    }}>continue</button>

     {telegramInput ? <div className='telegramInput'> 
      <input value={telegramInputname} className='joinTelegram__input' placeholder='Enter Email' onChange={(event)=>{
      setTelegraminputname(event.target.value)
    }} /> 
    
    <input value={telegramInputemail} className='joinTelegram__input' placeholder='Enter Name' onChange={(event)=>{
      setTelegraminputemail(event.target.value)

    }}/> 
    
    <button className='joinTelegram__button' onClick={async ()=>{
      const response = await axios.post('/savetelegramtaskstatus',{
        joinTelegram : true,
        loggedUserData : loggedUserData
      },{withCredentials : true})

      setJointelegram(true)
      setOpentelegraminput(false)
      }} >save</button>
    
    </div> : null}
    
    </> ) 
    
    : null}

    

    


   
    </div>

    <div className='tasks__div'>

      <div className='task__div__top'>
    <h1 className='tasks__div__heading'>Retweet @ZEPCOIN on twitter</h1>
    { checkusernameTrueorfalse ? <img className='tasks__div__details__arrows' src={ARRORTICK}/> : <img className='tasks__div__details__arrows' src={ARROWBUTTON} onClick={()=> setOpenRetweetinput(true)}/> }

    </div>


    {openRetweetInput ? 
    
   ( [<div className='openretweetinput'> <a target="_blank" href='https://twitter.com/zepcoinofficial' className='tasks__div__links' onClick={()=>setRetweet(true)}>Click to Retweet</a>
    <input className='tasks__div__checkRetweet retweetInput' placeholder='enter retweet page id' value={checkRetweet} onChange={(event)=>{ setCheckretweet(event.target.value)}}/>
    <input className='retweetInput' placeholder='enter twitter user name to check retweet' value={checkusername} onChange={(event)=> setCheckusername(event.target.value)}/>
    <button className='retweetButton' onClick={async ()=>{
     
      try{
        const response = await axios.post('/checkretweeted',
          {
            checkRetweet : checkRetweet
          },
          { withCredentials: true }
        )
      console.log('response from checkretweeted')
        console.log(response)

        const retweetDoneornot = response?.data?.data?.map((data)=>{
          console.log(data.username)
  
          if(data.username === checkusername){
            setCheckusernameTrueorfalse(true)
            setOpenRetweetinput(false)
             console.log('checkusernameTrueorfalse response form the server')
             console.log(checkusernameTrueorfalse)
            //  if(checkusernameTrueorfalse){

              // saveretweetstatus();
              return 1;
            //  }
            
             }else{
              return 0;
             }
             
          })

          // console.log('retweetDoneornot')
          // console.log(retweetDoneornot)

         const responseFromretweetDoneornot = retweetDoneornot.map((data)=>{
            console.log(data)
            if(data){
              console.log('retweet done')
              saveretweetstatus();
            }else{
              return 0
              console.log('retweet not done')
            }

          })

          console.log('retweetDoneornot')
          console.log(responseFromretweetDoneornot)

          if(responseFromretweetDoneornot){
            alert('retweet not done yet')
          }

         


          

      }catch(error){
        console.log(error)
      }
  
        
      


    }}>Continue</button> </div>])
    
    : null}

   
    </div>



    <div className='tasks__div'>

    <div className='tasks__div__top'>
    <h1 className='tasks__div__heading tweet__on__twitter'>Tweet @ZEPCOIN on twitter</h1>
    { tweet ? <img className='tasks__div__details__arrows' src={ARRORTICK}/> : <img className='tasks__div__details__arrows' src={ARROWBUTTON} onClick={()=> setOpenTweetinput(true)}/> }
    </div>



   { openTweetinput ? ([ <div className='tweet__div'><a target="_blank" href='https://twitter.com/intent/tweet?text=Guyzz I have found this intresting Crypto ICO 
    Its live now. Its $0.0001 $ZEP 🤑🤑 Zep it now.
    
    
    ZIP.....ZAP.....ZOOP🤗🤗🤗
    
    visit- https://zepcoin.io/
    join the community also- https://bit.ly/zepcoin
    #Zepians #newcrypto' className='tasks__div__links' >Click For Tweet</a>

   
    <input className='tasks__div__checkTweet tweetInput' placeholder='Enter tweet Id' value={checkTweet} onChange={(event)=> setChecktweet(event.target.value)} />

    <button className='tasks__div__checkTweet__button tweetButton' onClick={async ()=>{
      const response = await axios.post('/checktweet',
        {
          tweetId : checkTweet
        },
        { withCredentials: true }
      )

      console.log('response from tweet id')
    
      console.log(response.data)


      if(response.data){
        setTweet(response.data)

        savetweettaskstatus()
      }else{
        console.log('not followed')
        alert('not tweeted  yet')
      }

    }}>Continue</button> </div>]) : null}




    </div>

    <div className='tasks__div'>

      <div className='tasks__div__top'>
    <h1 className='tasks__div__heading buy'>Buy ICO-ZEPCOIN</h1>
    {buy ? <img className='tasks__div__details__arrows' src={ARRORTICK}/> : <img className='tasks__div__details__arrows' src={ARROWBUTTON} onClick={()=> setOpenbuy(true)}/>  }
    </div>


   
    {openBuy ?     <button className='tasks__div__button buyButton'><a target="_blank" href='https://twitter.com/zepcoinofficial' className='tasks__div__links buyButton__link' onClick={()=>setBuy(true)}>BUY NOW</a></button>
    : null}

    </div>
   


    </div>

    

    </div>


    <div className='tasks__right'>
      <img src={RIGHTGRAPHIC} className='tasks__right__rightgraphic'/>
      <img src={MANGRAPHIC} className='task__right__mangraphic'/>


    </div>


   
   

    </div>
  )
}

export default Tasks