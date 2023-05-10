import { useSelector } from "react-redux";
import { RootState } from "../../../store/configStore";
import TextChannelContext from "./submodule/TextChannelContext";
import CallChannelContext from "./submodule/CallChannelContext";

export default function ChannelContext() {
  const activeChannel = useSelector((s: RootState) => s.ui.active.channel);

  if (!activeChannel || activeChannel?.type === undefined) {
    return <></>;
  } else if (activeChannel?.type === "TXT") {
    return (
      <>
        <TextChannelContext />
      </>
    );
  } else if (activeChannel?.type === "CAL") {
    return (
      <>
        <CallChannelContext />
      </>
    );
  } else {
    return null;
  }
}
