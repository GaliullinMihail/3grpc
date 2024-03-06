import React, { useEffect, useState } from "react";
import "./App.css";
import { JwtSenderClient, JwtRequest } from "./generated/jwt_grpc_web_pb";
import { ChatServerClient } from "./generated/message_grpc_web_pb";
// import { 
//   ClientMessage,
//   ClientMessageLogin,
//   ClientMessageChat,
//   ServerMessage,
//   ServerMessageLoginFailure,
//   ServerMessageLoginSuccess,
//   ServerMessageUserJoined,
//   ServerMessageChat
// } from "./generated/message_pb";
import Greeting from "./components/Greeting";
import Chat from "./components/Chat";

const jwtClient = new JwtSenderClient("http://localhost:8080", null, null);

function App() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const chatClient = ChatServerClient("http://localhost:8080");

  const handleEnterChat = (name) => {
    setMessages([]);
    setUserList([]);

    const intiateReq = new JwtRequest();
    intiateReq.setName(name);
    console.log(jwtClient);
    jwtClient.sendJwt(intiateReq, {}, (err, resp) => {
      if (err) console.error(err);
      const token = resp.getMessage();
      console.log("resp");
      console.log(resp);
      console.log("token");
      console.log(token);
      setUser({ name, token });
    });
  };

  // const handleSendMessage = (msg, onSuccess) => {
  //   console.log(user, !user);
  //   if (!user) return;
  //   const req = new MessageRequest();
  //   req.setId(user.id);
  //   req.setMessage(msg);
  //   console.log("here we go");
  //   client.sendMessage(req, {}, (err, resp) => {
  //     if (err) throw err;
  //     onSuccess();
  //   });
  // };

  useEffect(() => {
    if (!user) return;
    // const chatReq = new StreamRequest();
    // (() => {
    //   chatReq.setId(user.id);
    //   const chatStream = client.chatStream(chatReq);
    //   chatStream.on("data", (chunk) => {
    //     const msg = chunk.toObject();
    //     console.log(msg);
    //     setMessages((prev) => [...prev, msg]);
    //   });
    // })();
    // (() => {
    //   const userListStream = client.userStream(chatReq);
    //   userListStream.on("data", (chunk) => {
    //     const { usersList } = chunk.toObject();
    //     console.log(usersList);
    //     setUserList(usersList);
    //   });
    // })();
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <Chat
          user={user}
          userList={userList}
          messages={messages}
          // onMessageSubmit={handleSendMessage}
        />
      ) : (
        <Greeting onUsernameEnter={handleEnterChat} />
      )}
    </div>
  );
}

export default App;