import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ui_actions } from "../../store/ui";
import { Store } from "../../types/store";
import FetchData from "./FetchData/FetchData";
import Listener from "./Listener/Listener";
import CreateChannel from "./Modal/CreateChannel/CreateChannel";
import CreateGroup from "./Modal/CreateGroup/CreateGroup";
import CreateSubgroup from "./Modal/CreateSubgroup/CreateSubgroup";

export type WrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { pageTitle?: string };

export default function Wrapper(props: WrapperProps) {
  const dispatch = useDispatch();
  const dropdown = useSelector((s: Store.AppState) => s.ui.openDropdown);

  useEffect(() => {
    document.title = props.pageTitle ?? "Copy-Chat";
  });

  const onClick = () => dropdown && dispatch(ui_actions.toggleDropdown({}));

  return (
    <div onClick={onClick}>
      {props.children}

      <Listener />
      <FetchData />
      <CreateGroup />
      <CreateSubgroup />
      <CreateChannel />
    </div>
  );
}
