import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../../../store/sideEffects/groups";
import Modal from "../Modal";

export default function CreateGroup() {
  const dispatch = useDispatch();
  const [groupname, setGroupname] = useState("");

  const handleCreate = async (e: any) => {
    e.preventDefault();
    const payload = {
      groupname: groupname,
    };
    createGroup(payload, dispatch);
  };

  return (
    <Modal className="CreateGroup" typeName={"CreateGuild"}>
      <header className="G">
        <h1>Create Group</h1>
        <p>Create a Group.</p>
      </header>

      <h3 className="uppercase font-bold mt-10">Create Your Own</h3>

      <form onSubmit={handleCreate}>
        <label>
          <p>Username</p>
          <input
            type="text"
            autoComplete="username"
            onChange={(e) => setGroupname(e.target.value)}
            required
          />
        </label>
      </form>
    </Modal>
  );
}
