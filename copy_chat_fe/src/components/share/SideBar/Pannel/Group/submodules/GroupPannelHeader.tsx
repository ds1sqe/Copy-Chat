import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/configStore";
import { ui_actions } from "../../../../../../store/ui";
import { useDispatch } from "react-redux";
import { Close, ExpandMore } from "@mui/icons-material";
import { border } from "@mui/system";

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

  if (group) {
    return (
      <Box
        sx={{
          height: 48,
          border: "1px solid gray",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
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
          <MenuItem onClick={() => dispatch(ui_actions.openModal("Invite"))}>
            Invite to group
          </MenuItem>
          <MenuItem>Change group setting</MenuItem>
          <MenuItem
            onClick={() => dispatch(ui_actions.openModal("CreateSubGroup"))}
          >
            Create subGroup{" "}
          </MenuItem>
        </Menu>
      </Box>
    );
  } else {
    return null;
  }
}
