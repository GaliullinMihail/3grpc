import React from "react";
import { Card, Avatar, Typography, Chip, Grid } from "@mui/material";

const style = {
  card: {
    height: "80px",
    width: "100%",
    backgroundColor: "aliceblue",
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  avatar: {
    margin: "20px",
  },
};

const UserList = (props) => {
  const { users } = props;
  return (
    <>
      {users.map((u) => (
        <Card style={style.card} key={u.id}>
          <Avatar style={style.avatar} src={u.avatar} />
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Typography variant="body1">{u.name}</Typography>
            <Chip
              color={u.isOnline ? "primary" : "default"}
              size="small"
              style={{ width: "70px" }}
              label={u.isOnline ? "online" : "offline"}
            />
          </Grid>
        </Card>
      ))}
    </>
  );
};

export default UserList;