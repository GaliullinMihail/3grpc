import React, { useEffect, useState } from "react";
import "./App.css";
import { JwtSenderClient, JwtRequest } from "./generated/jwt_grpc_web_pb";
import { 
  ChatServerClient,
  ClientMessageLogin,
  ClientMessageChat,
  ClientMessage
} from "./generated/message_grpc_web_pb";
import Greeting from "./components/Greeting";
import Chat from "./components/Chat";

const jwtClient = new JwtSenderClient("http://localhost:8080", null, null);
const chatClient = new ChatServerClient("http://localhost:8080", null, null);

function App() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [serverStream, setServerStream] = useState(null);

  const handleEnterChat = (name) => {
    setMessages([]);

    let intiateReq = new JwtRequest();
    intiateReq.setName(name);
    jwtClient.sendJwt(intiateReq, {}, (err, resp) => {
      if (err) console.error(err);
      let response = resp.toObject();
      let token = resp.getMessage();
      console.log("resp");
      console.log(resp);
      console.log("response");
      console.log(response);
      console.log("token");
      console.log(token);
      setUser({
        name : name,
        token : token 
      });
    });
  };

  const handleSendMessage = (msg, onSuccess) => {
    if (!user) return;
    const request = new ClientMessage();
    const req = new ClientMessageChat();
    req.setUserName(user.name);
    req.setText(msg);
    console.log("here we go");
    let metadata = {
      "Authorization": `Bearer ${user.token}`
    } 
    request.setChat(req);
    chatClient.sendMessage(request, metadata, (err, resp) => {
      if (err) console.log(err);
      console.log(resp);
    });

    onSuccess();
  };

  useEffect(() => {
    if (!user) return;
    
    (async () => {
      let loginReq = new ClientMessageLogin();
      loginReq.setUserName(user.name);
      loginReq.setChatRoomId("0");

      let metadata = {
        "Authorization": `Bearer ${user.token}`
      } 
      let clientMessage = new ClientMessage();
      clientMessage.setLogin(loginReq);
      var ans = chatClient.getServerStream(clientMessage, metadata);
      
      console.log(ans);
      setServerStream(ans);
      ans.on("data", (chunk) => {
        const msg = chunk.toObject();
        console.log(msg.chat);
        if (msg.chat !== undefined)
          setMessages((prev) => [...prev, msg.chat]);

      });

      ans.on("status", function (status) {
        console.log(status.code, status.details, status.metadata);
      });

      ans.on("end", () => {
        console.log("Stream ended.");
      });
      console.log("useEffect");
    })();
    
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <Chat
          user={user}
          messages={messages}
          onMessageSubmit={handleSendMessage}
        />
      ) : (
        <Greeting onUsernameEnter={handleEnterChat} />
      )}
    </div>
  );
}

export default App;