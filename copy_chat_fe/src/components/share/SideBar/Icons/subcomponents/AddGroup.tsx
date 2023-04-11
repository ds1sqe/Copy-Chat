import { useDispatch } from "react-redux";
import { ui_actions } from "../../../../../store/ui";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Tooltip } from "@mui/material";

export default function AddGroup() {
  const dispatch = useDispatch();

  const openAddGroupModal = () => {
    dispatch(ui_actions.openModal("AddGroup"));
  };

  return (
    <div onClick={openAddGroupModal}>
      <Tooltip title="Create or Join a Group">
        <Fab>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}
