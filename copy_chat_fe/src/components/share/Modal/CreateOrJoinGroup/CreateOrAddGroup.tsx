import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { ui_actions } from "../../../../store/ui";
import Modal from "../Modal";

export default function AddGroup() {
  const dispatch = useDispatch();

  const openJoinGroupModal = () => {
    dispatch(ui_actions.openModal("JoinGroup"));
  };
  const openCreateGroupModal = () => {
    dispatch(ui_actions.openModal("CreateGroup"));
  };

  return (
    <Modal
      className="AddGroup"
      typeName={"AddGroup"}
      title={"Join or Create Group"}
    >
      <Button variant="outlined" onClick={openJoinGroupModal}>
        Join Already Exists
      </Button>
      <Button variant="outlined" onClick={openCreateGroupModal}>
        Create Your Own
      </Button>
    </Modal>
  );
}
