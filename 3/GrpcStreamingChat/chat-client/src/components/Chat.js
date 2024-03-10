import React, { useState } from "react";
import {
  Divider,
  Paper,
  Avatar,
  TextField,
  Chip,
  Icon,
  InputAdornment
} from "@mui/material";
import { Grid, Typography } from "@mui/material";
import UserList from "./UserList";
import ChatBubble from "./ChatBubble";

const style = {
  container: {
    height: "80vh",
    padding: "2rem",
    width: "85vw",
  },
  paper: {
    padding: "30px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    backgroundColor: "lightslategrey",
  },
  avatar: {
    margin: "20px",
  },
};

const Chat = (props) => {
  const [msg, setMsg] = useState("");
  const { messages, onMessageSubmit, user } = props;

  const handleSendMessage = (e) => {
    console.log("called");
    e.preventDefault();
    if (!msg) return;
    console.log("here ", msg);
    onMessageSubmit(msg, () => setMsg(""));
  };

  return (
    <form onSubmit={handleSendMessage}>
      <Grid container style={style.container} spacing={3}>
        <Grid item xs={9}>
          <Paper style={style.paper}>
            <div
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "aliceblue",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: "10%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar style={style.avatar} />
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Typography variant="button">{user.name}</Typography>
                  <Chip
                    color="primary"
                    size="small"
                    style={{ width: "70px" }}
                    label="online"
                  />
                </Grid>
              </div>
              <Divider />
              <div style={{ height: "752px", overflowY: "auto" }}>
                {messages.map((msg, i) => (
                  <ChatBubble
                    key={i}
                    message={msg}
                    isCurrentUser={msg.userName === user.name}
                  />
                ))}
              </div>
              <Divider />
              <div style={{ width: "100%", alignItems: "center", padding: "10px" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Start Typing..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

export default Chat;