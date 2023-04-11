import { BusinessRounded, CheckCircle } from "@mui/icons-material";
import { InputAdornment, FormControl, TextField, Fab } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../../../../store/sideEffects/groups";
import Modal from "../../Modal";

export default function CreateInvitation() {
  const dispatch = useDispatch();

  const handleCreate = async (e: any) => {
    e.preventDefault();
    const payload = {};
    //createGroup(payload, dispatch);
  };

  return (
    <Modal
      className="CreateInvitation"
      typeName={"CreateInvitation"}
      title={"Create Invitation"}
    >
      <form onSubmit={handleCreate}>
        <FormControl>
          <TextField
            id="create_group_input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessRounded />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Fab size="medium">
                    <CheckCircle />
                  </Fab>
                </InputAdornment>
              ),
            }}
            //       onChange={(e) => setGroupname(e.target.value)}
            label="Please Input New Group's Name"
            variant="outlined"
            placeholder="groupname"
            required
            sx={{ p: 2 }}
          />
        </FormControl>
      </form>
    </Modal>
  );
}
