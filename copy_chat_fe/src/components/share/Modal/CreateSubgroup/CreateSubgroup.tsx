import { BusinessRounded, CheckCircle } from "@mui/icons-material";
import { InputAdornment, FormControl, TextField, Fab } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore";
import { createSubgroup } from "../../../../store/be_call/subgroup";
import Modal from "../Modal";

export default function CreateSubgroup() {
  const dispatch = useDispatch();
  const [subgroupname, setSubgroupname] = useState("");
  const current_group_id = useSelector(
    (s: RootState) => s.ui.active?.group?.id
  );

  const handleCreate = async (e: any) => {
    e.preventDefault();
    if (current_group_id) {
      const payload = {
        group_id: current_group_id,
        subgroup_name: subgroupname,
      };
      console.log(payload);
      createSubgroup(payload, dispatch);
    }
  };

  return (
    <Modal
      className="CreateSubgroup"
      typeName={"CreateSubgroup"}
      title={"Create Sub Group"}
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
            onChange={(e) => setSubgroupname(e.target.value)}
            label="Please Input New Group's Name"
            variant="outlined"
            placeholder="groupname"
            required
            sx={{ p: 2 }}
          />
        </FormControl>
      </form>
    </Modal>
  );
}
