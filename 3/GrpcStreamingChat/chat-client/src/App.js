import React, { useEffect, useState } from "react";
import "./App.css";
import { RandomClient } from "./proto/RandomServiceClientPb";
import {
  StreamRequest,
  InitiateRequest,
  StreamMessage,
  UserStreamResponse,
  User,
  MessageRequest,
} from "./proto/random_pb";
import Greeting from "./components/Greeting";
import Chat from "./components/Chat";

export const client = new RandomClient("http://localhost:8080");

function App() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);

  const handleEnterChat = (name, avatar) => {
    const intiateReq = new InitiateRequest();
    intiateReq.setName(name);
    intiateReq.setAvatarUrl(avatar);
    client.chatInitiate(intiateReq, {}, (err, resp) => {
      if (err) throw err;
      const id = resp.getId();
      setUser({ id, name, avatar });
    });
  };

  const handleSendMessage = (msg, onSuccess) => {
    console.log(user, !user);
    if (!user) return;
    const req = new MessageRequest();
    req.setId(user.id);
    req.setMessage(msg);
    console.log("here we go");
    client.sendMessage(req, {}, (err, resp) => {
      if (err) throw err;
      onSuccess();
    });
  };

  useEffect(() => {
    if (!user) return;
    const chatReq = new StreamRequest();
    (() => {
      chatReq.setId(user.id);
      const chatStream = client.chatStream(chatReq);
      chatStream.on("data", (chunk) => {
        const msg = chunk.toObject();
        console.log(msg);
        setMessages((prev) => [...prev, msg]);
      });
    })();
    (() => {
      const userListStream = client.userStream(chatReq);
      userListStream.on("data", (chunk) => {
        const { usersList } = chunk.toObject();
        console.log(usersList);
        setUserList(usersList);
      });
    })();
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <Chat
          user={user}
          userList={userList}
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