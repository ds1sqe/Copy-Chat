import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { ui_actions } from "../../../../store/ui";
import Modal from "../Modal";

export default function Invite() {
  const dispatch = useDispatch();

  return (
    <Modal className="Invite" typeName={"Invite"} title={"Invite Member"}>
      <Button
        variant="outlined"
        onClick={() => dispatch(ui_actions.openModal(""))}
      >
        Invite Friend
      </Button>
      <Button
        variant="outlined"
        onClick={() => dispatch(ui_actions.openModal("CreateInvitation"))}
      >
        Create Or Share Invitation Code
      </Button>
    </Modal>
  );
}
