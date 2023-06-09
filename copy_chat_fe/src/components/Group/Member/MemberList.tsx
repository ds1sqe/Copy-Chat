import { AccountCircle, StarOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configStore";

const MemberList = () => {
  const openList = useSelector((s: RootState) => s.ui.memberList.open);
  const current_group = useSelector((s: RootState) => s.ui.active.group);
  const current_memberships = current_group?.memberships;
  const current_members = current_group?.members;

  const lists = current_memberships?.map((membership) => (
    <div key={membership.id}>
      <Typography variant="subtitle2" sx={{ mr: 2, pr: 1 }}>
        {membership.name}
        {" - "}
        {membership.owners.length}
      </Typography>
      {membership.owners.map((id) => {
        const member = current_members?.find((member) => member.id === id);
        if (member) {
          return (
            <div
              key={member.id}
              style={{
                marginRight: 0,
                paddingRight: 0,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography variant="body1" key={member.id}>
                {member.username}
              </Typography>
              {membership.permission >= 1023 ? (
                <StarOutline fontSize="small" />
              ) : (
                <AccountCircle />
              )}
            </div>
          );
        } else return null;
      })}
    </div>
  ));

  if (openList) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "20em",
          height: "100%",
          border: "1px solid gray",
        }}
      >
        {lists}
      </div>
    );
  } else {
    return null;
  }
};
export default MemberList;
