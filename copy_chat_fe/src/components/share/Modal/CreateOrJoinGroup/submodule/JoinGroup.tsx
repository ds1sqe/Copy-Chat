import { BusinessRounded, CheckCircle } from "@mui/icons-material";
import { InputAdornment, FormControl, TextField, Fab } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/configStore";
import { createGroup } from "../../../../../store/be_call/groups";
import { checkInvitation } from "../../../../../store/be_call/invitations";
import Modal from "../../Modal";

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

  return (
    <Modal className="JoinGroup" typeName={"JoinGroup"} title={"Join Group"}>
      {target_group === null || undefined ? (
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
        <>target_group:</>
      )}
    </Modal>
  );
}
