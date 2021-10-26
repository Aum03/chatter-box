import React, { useEffect } from "react";
import { FacebookFilled, GoogleCircleFilled } from "@ant-design/icons";
import { Button, Card, CardContent } from "@material-ui/core";
import { auth } from "./firebase";
import firebase from "firebase";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
function Login() {
  
  //const [user, setUser] = useState({});
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch({
          type: "SET_USER",
          user: authuser,
        });
        history.push("/chats");
       
      } 
      else 
      {
        dispatch({
          type: "SET_USER",
          user: null,
        });
       
      }
      return () => {
        unsubscribe();
      };
     });
  }, [history]);
  

  const loginGoogle = () => {
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };

  const loginFacebook = () => {
    auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  };
//console.log(user);
  return (
    <div className="login_page">
      <div>
        <Card className="login_card" variant="outlined">
          <CardContent className="login_details">
            <h2>Welcome to chatter-box</h2>
            <Button className="login_button" onClick={loginGoogle}>
              <GoogleCircleFilled style={{ fontSize: "25px" }} />
              <div className="login_buttonGoogle">Sign in with google</div>
            </Button>

            <Button className="login_button" onClick={loginFacebook}>
              <FacebookFilled style={{ fontSize: "25px" }} />
              <div className="login_buttonFacebook">Sign in with Facebook</div>
            </Button>
            <div className="footer">
            <p class="text-gray-400 text-sm text-center sm:text-left">© 2021 Aum Yadav
            
            </p>
            <span >All rights reserved</span>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
