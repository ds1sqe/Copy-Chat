import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as ui } from "../../store/ui";
import { Store } from "../../types/store";
import Listener from "./Listener/Listener";
import CreateGroup from "./Modal/CreateGroup/CreateGroup";

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

  const onClick = () => dropdown && dispatch(ui.toggleDropdown({}));

  return (
    <div onClick={onClick}>
      {props.children}
      <Listener />

      <CreateGroup />
    </div>
  );
}
