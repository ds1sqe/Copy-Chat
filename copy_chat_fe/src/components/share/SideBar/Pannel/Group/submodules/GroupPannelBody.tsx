import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../../../../store/configStore";

import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";

import React from "react";
import {
  TextFields,
  ExpandLess,
  ExpandMore,
  Settings,
} from "@mui/icons-material";
import { ui_actions } from "../../../../../../store/ui";
import { Entity } from "../../../../../../types/entity.types";

const GroupPannelBody = () => {
  const dispatch = useDispatch();
  const [closedChannels, setClosedChannels] = React.useState<number[]>([]);
  const [closedSubgroups, setClosedSubgroups] = React.useState<number[]>([]);
  const activeGroup = useSelector((s: RootState) => s.ui.activeGroup);
  const activeChannel = useSelector((s: RootState) => s.ui.activeChannel);
  const [subgroupContextMenu, setSubgroupContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const [channelContextMenu, setChannelContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  if (!activeGroup) {
    return null;
  }
  const handleChannelManu =
    (id: number) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setChannelContextMenu(
        channelContextMenu === null
          ? {
              mouseX: e.clientX + 3,
              mouseY: e.clientY - 6,
            }
          : null
      );
    };
  const handleSubgroupManu =
    (subgroup: Entity.SubGroup) => (e: React.MouseEvent<HTMLElement>) => {
      console.log(subgroup);
      dispatch(ui_actions.focusSubgroup(subgroup));
      setSubgroupContextMenu(
        subgroupContextMenu === null
          ? {
              mouseX: e.clientX + 3,
              mouseY: e.clientY - 6,
            }
          : null
      );
    };

  const handleSubgroupManuClose = () => {
    setSubgroupContextMenu(null);
  };

  const handleChannelManuClose = () => {
    setChannelContextMenu(null);
  };

  const createChannel = () => {
    dispatch(ui_actions.openModal("CreateChannel"));
  };

  const handleSubgroupExpands = (
    e: React.MouseEvent,
    subgroup: Entity.SubGroup
  ) => {
    const isClosed =
      closedSubgroups.find((s) => s === subgroup.id) !== undefined;
    if (isClosed) {
      setClosedSubgroups(closedSubgroups.filter((s) => s !== subgroup.id));
      const subChannel = activeGroup.channels.filter(
        (ch) => ch.subgroup_id === subgroup.id
      );
      setClosedChannels(
        closedChannels.filter(
          (ch) => !(subChannel.find((sch) => sch.id === ch) !== undefined)
        )
      );
    } else {
      setClosedSubgroups([...closedSubgroups, subgroup.id]);
      const subChannel = activeGroup.channels.filter(
        (ch) => ch.subgroup_id === subgroup.id
      );
      setClosedChannels([
        ...closedChannels,
        ...subChannel.map((sch) => sch.id),
      ]);
    }
  };

  const listOfSubgroup = activeGroup.subgroups.map((subgroup) => (
    <div key={subgroup.id}>
      <List
        key={subgroup.id}
        subheader={
          <ListItem
            key={subgroup.id}
            style={{
              display: "flex",
              flexDirection: "row",
              paddingBottom: 1,
            }}
          >
            <ListItemIcon onClick={(e) => handleSubgroupExpands(e, subgroup)}>
              {closedSubgroups.find((s) => s === subgroup.id) === undefined ? (
                <ExpandMore />
              ) : (
                <ExpandLess />
              )}
              <ListItemText
                style={{
                  marginLeft: 0,
                  paddingLeft: 0,
                  justifyContent: "flex-start",
                }}
              >
                <Typography variant="body2">{subgroup.name}</Typography>
              </ListItemText>
            </ListItemIcon>
            <ListItemButton
              style={{
                flexDirection: "row-reverse",
                justifyContent: "flex-start",
                paddingRight: 0,
                marginRight: 0,
              }}
              onClick={handleSubgroupManu(subgroup)}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        }
      >
        <Menu
          key={subgroup.id}
          open={subgroupContextMenu !== null}
          onClose={handleSubgroupManuClose}
          anchorReference="anchorPosition"
          anchorPosition={
            subgroupContextMenu !== null
              ? {
                  top: subgroupContextMenu.mouseY,
                  left: subgroupContextMenu.mouseX,
                }
              : undefined
          }
        >
          <MenuItem>Manage Subgroup</MenuItem>
          <MenuItem>Change Subgroup Name</MenuItem>
          <MenuItem onClick={createChannel}>Create Channel</MenuItem>
          <MenuItem color="red">Delete Subgroup</MenuItem>
        </Menu>
        {activeGroup.channels
          .filter((ch) => ch.subgroup_id === subgroup.id)
          .map((e) => (
            <ListItem key={e.id} sx={{ py: 0, my: 0 }}>
              <Collapse
                in={
                  closedChannels.find((s) => s === e.id) === undefined ||
                  e.id === activeChannel?.id
                }
                timeout="auto"
              >
                <div
                  key={e.id}
                  id={e.name}
                  onContextMenu={handleChannelManu(e.id)}
                >
                  <Menu
                    open={channelContextMenu !== null}
                    onClose={handleChannelManuClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                      channelContextMenu !== null
                        ? {
                            top: channelContextMenu.mouseY,
                            left: channelContextMenu.mouseX,
                          }
                        : undefined
                    }
                  >
                    <MenuItem>Mange Channel</MenuItem>
                    <MenuItem>Change Channel Name</MenuItem>
                    <MenuItem color="red">Delete Channel</MenuItem>
                  </Menu>
                  <div>
                    <Tooltip title={e.name}>
                      <Link to={`/group/${activeGroup.id}/${e.id}`}>
                        <ListItemButton selected={e.id === activeChannel?.id}>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            {e.type === "TXT" && (
                              <TextFields fontSize="small" />
                            )}
                            <Typography variant="body1">{e.name}</Typography>
                          </div>
                        </ListItemButton>
                      </Link>
                    </Tooltip>
                  </div>
                </div>
              </Collapse>
            </ListItem>
          ))}
      </List>
    </div>
  ));

  return <div>{listOfSubgroup}</div>;
};
export default GroupPannelBody;
