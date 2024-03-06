import React, { useState } from "react";
import { 
  TextField,
  Typography,
  Paper
} from "@mui/material";

const style = {
  paper: {
    height: "30vh",
    width: "30%",
    backgroundColor: "lightslategrey",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  input: {
    marginTop: "50px",
    width: "50%",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    height: 80,
    width: 80,
    margin: "2rem 0rem",
  },
};

const Greeting = (props) => {
  const [name, setName] = useState("");
  const { onUsernameEnter } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onUsernameEnter(name);
  };
  return (
    <>
      <Paper style={style.paper}>
        <form onSubmit={handleSubmit} style={style.form}>
          <Typography variant="h5">
            Please enter your name before joining the chat
          </Typography>
          <TextField
            style={style.input}
            placeholder="Enter Username..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            InputProps={{
              style: {
                color: "white",
              },
            }}
          />
        </form>
      </Paper>
    </>
  );
};

export default Greeting;