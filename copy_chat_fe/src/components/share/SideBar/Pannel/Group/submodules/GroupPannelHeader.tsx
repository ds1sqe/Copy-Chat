import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/configStore";
import { ui_actions } from "../../../../../../store/ui";
import { useDispatch } from "react-redux";
import { Close, ExpandMore } from "@mui/icons-material";

export default function GroupPannelHeader() {
  const group = useSelector((s: RootState) => s.ui.activeGroup);
  const dispatch = useDispatch();

  const [groupMenuAnchor, setGroupMenuAnchor] =
    React.useState<HTMLElement | null>(null);

  const handleManu = (e: React.MouseEvent<HTMLElement>) => {
    setGroupMenuAnchor(e.currentTarget);
  };
  const handleManuClose = () => {
    setGroupMenuAnchor(null);
  };

  const openSubgroupCreate = () => {
    dispatch(ui_actions.openModal("CreateSubgroup"));
  };

  if (group) {
    return (
      <div>
        <Button
          key={group.id}
          onClick={(e) => handleManu(e)}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Typography variant="h5">{group.name}</Typography>
          {groupMenuAnchor === null ? (
            <ExpandMore
              fontSize="large"
              style={{ flexDirection: "row-reverse" }}
            />
          ) : (
            <Close fontSize="large" style={{ flexDirection: "row-reverse" }} />
          )}
        </Button>

        <Menu
          open={groupMenuAnchor !== null}
          onClose={handleManuClose}
          anchorEl={groupMenuAnchor}
          anchorPosition={{ top: 0, left: 0 }}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem>Invite Member</MenuItem>
          <MenuItem>Change Group Setting</MenuItem>
          <MenuItem onClick={openSubgroupCreate}>Create SubGroup </MenuItem>
        </Menu>
      </div>
    );
  } else {
    return null;
  }
}
