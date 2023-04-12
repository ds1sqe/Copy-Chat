import {
  BusinessRounded,
  CheckCircle,
  ContentCopyOutlined,
  NoteAddOutlined,
} from "@mui/icons-material";
import {
  InputAdornment,
  FormControl,
  TextField,
  Fab,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/configStore";
import { createGroup } from "../../../../../store/sideEffects/groups";
import { createInvitation } from "../../../../../store/sideEffects/invitations";
import Modal from "../../Modal";

export default function CreateInvitation() {
  const dispatch = useDispatch();
  const activeGroup = useSelector((s: RootState) => s.ui.activeGroup);
  const invitations = useSelector((s: RootState) => s.entities.invitations);
  const default_invitation = () =>
    invitations.find(
      (e) =>
        e.group_id === activeGroup?.id &&
        (e?.target_id === null || e?.target_id === undefined)
    );

  if (activeGroup === undefined) {
    return null;
  }
  const createDefaultInvitation = async (e: any) => {
    e.preventDefault();
    const payload = {
      group_id: activeGroup.id,
    };
    if (payload?.group_id !== undefined) {
      createInvitation(payload, dispatch);
    }
  };
  const createTargetInvitation = async (e: any) => {
    e.preventDefault();
  };

  return (
    <Modal
      className="CreateInvitation"
      typeName={"CreateInvitation"}
      title={`Invite to ${activeGroup?.name}`}
    >
      <>
        {default_invitation() !== undefined ? (
          <>
            <Button variant="text">
              Invitation Code:
              {default_invitation()?.code}
              <ContentCopyOutlined />
            </Button>

            <form onSubmit={createTargetInvitation}>
              <FormControl>
                <TextField
                  id="create_invitation_input"
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
                  label="target member id?"
                  variant="outlined"
                  placeholder=""
                  sx={{ p: 2 }}
                />
              </FormControl>
            </form>
          </>
        ) : (
          <>
            <Button variant="text" onClick={createDefaultInvitation}>
              Create Invitation Code
              <NoteAddOutlined />
            </Button>

            <form onSubmit={createTargetInvitation}>
              <FormControl>
                <TextField
                  id="create_invitation_input"
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
                  label="target member id?"
                  variant="outlined"
                  placeholder=""
                  sx={{ p: 2 }}
                />
              </FormControl>
            </form>
          </>
        )}
      </>
    </Modal>
  );
}
