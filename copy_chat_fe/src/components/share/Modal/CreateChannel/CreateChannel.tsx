import { BusinessRounded, CheckCircle } from "@mui/icons-material";
import {
  InputAdornment,
  FormControl,
  TextField,
  Fab,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore";
import { createChannel } from "../../../../store/be_call/channel";
import Modal from "../Modal";

export default function CreateChannel() {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("TXT");
  const current_group_id = useSelector((s: RootState) => s.ui.active.group?.id);
  const current_subgroup_id = useSelector(
    (s: RootState) => s.ui.active.subgroup?.id
  );

  const handleCreate = async (e: any) => {
    e.preventDefault();
    if (current_group_id && current_subgroup_id) {
      const payload = {
        group_id: current_group_id,
        subgroup_id: current_subgroup_id,
        channel_name: channelName,
        channel_type: channelType,
      };
      console.log(payload);
      createChannel(payload, dispatch);
    }
  };

  return (
    <Modal
      className="CreateChannel"
      typeName={"CreateChannel"}
      title={"Create Channel"}
    >
      <form onSubmit={handleCreate}>
        <FormControl>
          <TextField
            id="create_group_input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessRounded />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Fab size="medium">
                    <CheckCircle />
                  </Fab>
                </InputAdornment>
              ),
            }}
            onChange={(e) => setChannelName(e.target.value)}
            label="Please Input New Channel's Name"
            variant="outlined"
            placeholder="channelname"
            required
            sx={{ p: 2 }}
          />
          <ToggleButtonGroup
            value={channelType}
            exclusive
            onChange={(e, v) => setChannelType(v)}
          >
            <ToggleButton value="TXT">Text</ToggleButton>
            <ToggleButton value="CAL">Call</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
      </form>
    </Modal>
  );
}
