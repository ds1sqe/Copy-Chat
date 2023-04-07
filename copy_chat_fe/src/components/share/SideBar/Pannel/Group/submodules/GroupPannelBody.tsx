import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../../../../store/configStore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryProps,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";

import React from "react";
import { TextFields, ExpandMore } from "@mui/icons-material";
import { ui_actions } from "../../../../../../store/ui";
import { Entity } from "../../../../../../types/entity.types";

const GroupPannelBody = () => {
  const dispatch = useDispatch();
  const [channelId, setChannelId] = React.useState<number | null>(null);
  const { groupId } = useParams();
  const activeGroup = useSelector((s: RootState) => s.ui.activeGroup);
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
      setChannelId(channelId === null ? id : null);
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
      e.preventDefault();
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
    setChannelId(null);
    setSubgroupContextMenu(null);
  };

  const handleChannelManuClose = () => {
    setChannelId(null);
    setChannelContextMenu(null);
  };

  const createChannel = () => {
    dispatch(ui_actions.openModal("CreateChannel"));
  };

  const listOfSubgroup = activeGroup.subgroups.map((subgroup) => (
    <div key={subgroup.id} onContextMenu={handleSubgroupManu(subgroup)}>
      <Accordion key={subgroup.id}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            flexDirection: "row-reverse",
            ml: 0,
            mx: 0,
            pl: 0,
            py: 0,
          }}
        >
          <Tooltip title={subgroup.name}>
            <Typography variant="body2">{subgroup.name}</Typography>
          </Tooltip>
        </AccordionSummary>
        <Menu
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
          <Typography>{subgroup.name}</Typography>
          <MenuItem>Manage Subgroup</MenuItem>
          <MenuItem>Change Subgroup Name</MenuItem>
          <MenuItem onClick={createChannel}>Create Channel</MenuItem>
          <MenuItem color="red">Delete Subgroup</MenuItem>
        </Menu>
        <AccordionDetails
          sx={{
            pl: 1,
            mt: 0,
            mb: 0,
          }}
        >
          {activeGroup.channels
            .filter((ch) => ch.subgroup_id === subgroup.id)
            .map((e) => (
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
                    <Link to={`/group/${groupId}/${e.id}`}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        {e.type === "TXT" && <TextFields />}
                        <Typography variant="body1">{e.name}</Typography>
                      </div>
                    </Link>
                  </Tooltip>
                </div>
              </div>
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  ));

  return <div>{listOfSubgroup}</div>;
};
export default GroupPannelBody;
