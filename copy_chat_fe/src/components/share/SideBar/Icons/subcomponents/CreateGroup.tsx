import { useDispatch } from "react-redux";
import { ui_actions } from "../../../../../store/ui";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Tooltip } from "@mui/material";

export default function CreateGroup() {
  const dispatch = useDispatch();

  const openCreateGroupModal = () => {
    dispatch(ui_actions.openModal("CreateGroup"));
  };

  return (
    <div onClick={openCreateGroupModal}>
      <Tooltip title="Create New Group">
        <Fab>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}
