import { Groups } from "@mui/icons-material";
import { Fab, Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../../store/configStore";
import { deleteGroup } from "../../../../../store/be_call/groups";

export default function GroupList() {
  const dispatch = useDispatch();

  const groups = useSelector((s: RootState) => s.entities.groups);
  const activeGroup = useSelector((s: RootState) => s.ui.activeGroup);
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
  const handleDelete = () => {
    if (groupid !== null) {
      deleteGroup({ group_id: groupid }, dispatch);
    }
  };

  const is_active = (id: number) => id === activeGroup?.id;

  const groupsIcons = groups.map((e) => (
    <div
      key={e.id}
      id={e.name}
      onContextMenu={handleManu(e.id)}
      style={{
        border: is_active(e.id) ? "1px solid white" : "",
      }}
    >
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
        <MenuItem>Change Group Profile</MenuItem>
        <MenuItem color="red" onClick={handleDelete}>
          Delete Group
        </MenuItem>
      </Menu>
      <Tooltip title={e.name}>
        <Link to={`/group/${e.id}/`}>
          <Fab
            style={{
              border: is_active(e.id) ? "2px solid white" : "",
            }}
          >
            <Groups />
          </Fab>
        </Link>
      </Tooltip>
    </div>
  ));

  return <div>{groupsIcons}</div>;
}
