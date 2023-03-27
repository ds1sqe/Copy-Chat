import { useSelector } from "react-redux";
import { Store } from "../../../types/store";

export default function Navbar() {
  const group = useSelector((s: Store.AppState) => s.ui.activeGroup);
  const subgroup = useSelector((s: Store.AppState) => s.ui.activeSubGroup);

  return (
    <div className="Navbar">
      {group && (
        <h3 className="group-header">
          <span>{group?.name}</span>
          <span>{group?.id}</span>
        </h3>
      )}
      {subgroup && (
        <h3 className="group-header">
          <span>{subgroup?.name}</span>
          <span>{subgroup?.id}</span>
        </h3>
      )}
    </div>
  );
}
