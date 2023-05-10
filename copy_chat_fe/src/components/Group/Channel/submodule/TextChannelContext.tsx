import { AccountCircleTwoTone, Textsms } from "@mui/icons-material";
import {
  Container,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore";
import { messageCreate } from "../../../../store/ws_call/message";

export default function TextChannelContext() {
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();

  const activeChannel = useSelector((s: RootState) => s.ui.active.channel);
  const activeGroup = useSelector((s: RootState) => s.ui.active.group);
  const user = useSelector((s: RootState) => s.auth.user);
  const anchor = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (
      activeChannel?.group_id === undefined ||
      activeChannel?.subgroup_id === undefined ||
      message === null
    )
      return;
    const data = {
      gid: activeChannel.group_id,
      cid: activeChannel.id,
      text: message,
    };
    messageCreate(data, dispatch);
  };

  const enterPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        sendMessage();
        setMessage("");
      }
    }
  };

  const messageList = activeChannel?.messages.map((m) => {
    return (
      <ListItem
        key={m.id}
        style={
          m.account_id === user?.id
            ? { justifyContent: "flex-end" }
            : { justifyContent: "flex-start" }
        }
      >
        <Paper elevation={4}>
          <Box sx={{ display: "flex" }}>
            <AccountCircleTwoTone />
            <ListItemText
              sx={{ alignContent: "center" }}
              primary={
                <>
                  <Typography variant="body1">
                    {
                      activeGroup?.members.find((mb) => mb.id === m.account_id)
                        ?.username
                    }
                  </Typography>
                </>
              }
            />
          </Box>
          <Box>
            <ListItemText
              primary={
                <>
                  <Typography
                    variant="body2"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {m.text}
                  </Typography>
                </>
              }
              secondary={
                <Typography variant="subtitle2">{m.datetime}</Typography>
              }
            />
          </Box>
        </Paper>
      </ListItem>
    );
  });

  const scrollToBottom = () => {
    anchor.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "100%",
        border: "1px solid gray",
        width: "100%",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <Container sx={{ width: "100%", my: { xs: 3 } }}>
        <TextField
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => enterPress(e)}
          sx={{ width: "100%" }}
          multiline
          maxRows={4}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Textsms />
              </InputAdornment>
            ),
          }}
          placeholder={"message"}
          value={message}
        ></TextField>
      </Container>
      <Container sx={{ overflowY: "scroll", width: "100%" }}>
        {messageList !== undefined && (
          <List sx={{ display: "flex", flexDirection: "column" }}>
            {messageList}
          </List>
        )}
        <div ref={anchor}></div>
      </Container>
    </Box>
  );
}
