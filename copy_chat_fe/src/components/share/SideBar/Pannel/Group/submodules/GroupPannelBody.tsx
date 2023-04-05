import { useSelector } from "react-redux";

import { RootState } from "../../../../../../store/configStore";

import { Menu, MenuItem, Tooltip } from "@mui/material";

import { Link, useParams } from "react-router-dom";

import React from "react";

const GroupPannelBody = () => {
  const [channelId, setChannelId] = React.useState<number | null>(null);
  const { groupId, _ } = useParams();
  const channelList = useSelector((s: RootState) => s.entities.channels);
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  if (!groupId) {
    return null;
  }
  const currentChannels = channelList.filter(
    (e) => e.group_id === Number(groupId)
  );

  const handleManu = (id: number) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setChannelId(channelId === null ? id : null);
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
    setChannelId(null);
    setContextMenu(null);
  };

  const listOfChannels = currentChannels.map((e) => (
    <div key={e.id} id={e.name} onContextMenu={handleManu(e.id)}>
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
        <MenuItem color="red">Delete Channel</MenuItem>
      </Menu>
      <Tooltip title={e.name}>
        <Link to={`/group/${groupId}/${e.id}`}>{e.name}</Link>
      </Tooltip>
    </div>
  ));

  return <div>{listOfChannels}</div>;
};
export default GroupPannelBody;
