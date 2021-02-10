import Title from "./title/title";
import Creation from "./creation/creation";
import SplitOwner from "./splitOwner/splitOwner";
import Consult from "../consult/consult";
import DownBar from "./downBar/downBar";
import { useState } from "react";

const Vote = (props) => {
  const [copyright, setCopyright] = useState("");
  const [performance, setPerformance] = useState("");
  const [recording, setRecording] = useState("");
  const commonProps = {
    copyright,
    setCopyright,
    performance,
    setPerformance,
    recording,
    setRecording,
  };

  return (
    <div className="vote">
      <div className="b1">
        <div className="inner">
          <Title />
          <Creation />
          <SplitOwner />
          <Consult {...props} {...commonProps} voting={true} />
        </div>
      </div>
      <DownBar {...props} {...commonProps} />
    </div>
  );
};

export default Vote;
