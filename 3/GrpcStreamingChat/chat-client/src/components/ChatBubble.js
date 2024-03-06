import React from "react";
import { Grid } from "@mui/material";
import "./style.css";
// import { StreamMessage } from "../proto/random_pb";

const ChatBubble = ({ message, isCurrentUser }) => {
  const { senderName, message: text } = message;
  return (
    <Grid
      container
      item
      style={{
        width: "100%",
        justifyContent: isCurrentUser ? "flex-end" : "flex-start",
      }}
    >
      <blockquote
        className="speech-bubble"
        style={{ backgroundColor: isCurrentUser ? "#bad4ff" : undefined }}
      >
        <p>{text}</p>
        {!isCurrentUser && <cite>{senderName}</cite>}
      </blockquote>
    </Grid>
  );
};

export default ChatBubble;