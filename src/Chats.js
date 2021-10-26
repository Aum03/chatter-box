import axios from "axios";
import React, { useEffect } from "react";
import { ChatEngine } from "react-chat-engine";
import { useHistory } from "react-router-dom";
import "./Chats.css";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function Chats() {
  const [{ user }, dispatch] = useStateValue();

  const history = useHistory();

  const logout = async () => {
    if (user) {
      await auth.signOut();
      history.push("/");
    }
  };
 
  //to get the image of an user
  const getfile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image.jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
    }

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          projectID:process.env.REACT_APP_CHAT_ENGINE_ID,
          userName: user.email,
          userSecret: user.uid,
        },
      })

      .catch(() => {
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);
        getfile(user.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);
          axios.post("https://api.chatengine.io/users", formData, {
            headers: {
              "private-key":process.env.REACT_APP_CHAT_ENGINE_KEY,
            },
          });
        });
      });
  }, []);

  if (!user) {
    return "LOADING...";
  }
  

  return (
    <div className="chat_page">
      <div className="navbar">
        <div className="navbar_logo">
          <h1 className="navbar_logoName">Chatter-box</h1>
        </div>
        <div className="navbar_logout" onClick={logout}>
          <h4>Logout</h4>
        </div>
      </div>
      <div>
        <ChatEngine
          height="89.2vh"
          projectID={ process.env.REACT_APP_CHAT_ENGINE_ID}
          userName={user.email}
          userSecret={user.uid}
        />
      </div>
    </div>
  );
}

export default Chats;
