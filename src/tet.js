
import React , { useState ,useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth} from './firebase'; 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input }  from '@material-ui/core';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
  
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(false);
 
 useEffect(()=>{
   const unsubscribe=auth.onAuthStateChanged((authUser)=>{
     if(authUser){
       console.log(authUser);
       setUser(authUser);
     } else{
       //sMedialElemntAudioSourceNode()
       setUser(null);
     }
   })
   return ()=>{
     unsubscribe();
   }
 },[user,username]);

useEffect(() => {

  db.collection('posts').onSnapshot(snapshot =>{
    setPosts(snapshot.docs.map(doc=>({
      id: doc.id,
      post: doc.data()
  })));
})  
}, []);

const Singup=(event)=>{
  event.preventDefault();
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
    return authUser.user.updateProfile({
      displayName:username
    })
  })
  .catch((error)=> alert(error.message));
}
const SignIn=(event)=>{
  event.preventDefault();
  auth
  .signInWithEmailAndPassword(email.password)
  .catch((error)=> alert(error.message))
  setOpenSignIn(false);
}

  return (
    <div className="App">
     <Modal
       open={open}
       onClose={()=>setOpen(false)}
  >
    <div style={modalStyle} className={classes.paper}>
    <div className="app__header">
        <img
        className="app_headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
        />
      <center>
        <form className="app__signup">
        <Input 
        placeholder="username"
        type="text"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        />
        <Input 
        placeholder="email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <Input 
        placeholder="password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
            <Button onClick={Singup}>login</Button>
        </form>
      </center>
      </div>
    </div>
      </Modal>
      <Modal
       open={openSignIn}
       onClose={()=>setOpenSignIn(false)}
  >
    <div style={modalStyle} className={classes.paper}>
    <div className="app__header">
        <img
        className="app_headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
        />
      <center>
        <form className="app__signup">
        <Input 
        placeholder="email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <Input 
        placeholder="password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
            <Button onClick={Singup}>login</Button>
        </form>
      </center>
      </div>
    </div>
      </Modal>
      <div className="app__header">
        <img
        className="app_headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
        />
        </div>
        {
          user ?(
            <Button onClick={()=>auth.signOut()}>logout</Button>
          ):(
            <div className="app__LoginContainer">
                 <Button onClick={()=>setOpenSignIn(true)}>Sing In</Button>
                   <Button onClick={()=>setOpen(true)}>Sing up</Button>
            </div>
           
          )
          } 
         <h1>hello !!</h1>
         {
            posts.map(post=>(
            <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
         ))
         }
      
        
     {/* header */}
     


  



    </div>
  );
}

export default App;
