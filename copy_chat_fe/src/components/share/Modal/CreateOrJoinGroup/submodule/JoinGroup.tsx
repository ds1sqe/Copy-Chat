import { BusinessRounded, CheckCircle } from "@mui/icons-material";
import {
  InputAdornment,
  FormControl,
  TextField,
  Fab,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/configStore";
import {
  activateInvitation,
  checkInvitation,
} from "../../../../../store/be_call/invitations";
import Modal from "../../Modal";
import { ui_actions } from "../../../../../store/ui";

export default function JoinGroup() {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const target_group = useSelector((s: RootState) => s.ui.openedModalDetail);

  const valiateCode = async (e: any) => {
    e.preventDefault();
    const payload = {
      code: code,
    };
    checkInvitation(payload, dispatch);
  };
  const joinGroup = async (e: any) => {
    e.preventDefault();
    const payload = {
      code: code,
    };
    activateInvitation(payload, dispatch);
  };
  return (
    <Modal className="JoinGroup" typeName={"JoinGroup"} title={"Join Group"}>
      {target_group === null || target_group === undefined ? (
        <form onSubmit={valiateCode}>
          <FormControl>
            <TextField
              id="join_group_input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessRounded />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setCode(e.target.value)}
              label="Please Input Invitation Code"
              variant="outlined"
              placeholder="Invitation Code:"
              required
              sx={{ p: 2 }}
            />
          </FormControl>
        </form>
      ) : (
        <>
          <Typography variant="h3">{target_group.name}</Typography>
          <Typography variant="body1">{target_group.description}</Typography>
          <Button variant="outlined" onClick={joinGroup}>
            Join
          </Button>
          <Button
            variant="outlined"
            onClick={() => dispatch(ui_actions.unsetModalDetail())}
          >
            Cancel
          </Button>
        </>
      )}
    </Modal>
  );
}
