import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/configStore";
import { actions as ui } from "../../../../../../store/ui";
import { useDispatch } from "react-redux";

export default function GroupPannelHeader() {
  const group = useSelector((s: RootState) => s.ui.activeGroup);
  const dispatch = useDispatch();

  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const [groupid, setGroupId] = React.useState<number | null>(null);

  const handleManu = (id: number) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setGroupId(groupid === null ? id : null);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX + 3,
            mouseY: e.clientY - 6,
          }
        : null
    );
  };
  const handleManuClose = () => {
    setGroupId(null);
    setContextMenu(null);
  };

  const openSubgroupCreate = () => {
    dispatch(ui.openModal("CreateSubgroup"));
  };

  if (group) {
    return (
      <div key={group.id} id={String(group.id)} onClick={handleManu(group.id)}>
        <h3>{group.name}</h3>
        <Menu
          open={contextMenu !== null}
          onClose={handleManuClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
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
