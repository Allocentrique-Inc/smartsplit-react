import colors from "../../../../_/colors";

const Dragger = ({ shares, setShares, setLock, lock, dividingMethod, id }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {dividingMethod === "manual" && (
        <button onClick={() => setLock(!lock)}>
          {lock ? "locked" : "lock"}
        </button>
      )}
      <div
        style={{
          display: "flex",
          height: "40px",
          alignItems: "center",
          cursor: "pointer",
          marginRight: "20px",
        }}
        onClick={(e) => {
          setShares(
            Math.round((e.clientX - e.target.getBoundingClientRect().x) / 2)
          );
        }}
      >
        <div
          style={{
            width: "200px",
            borderRadius: "4px",
            height: "8px",
            border: "1.5px solid black",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "8px",
              width: shares ? shares * 2 + "px" : "0px",
              backgroundColor: colors[id],
              borderRadius: "4px 0px 0px 4px",
            }}
          ></div>
        </div>
      </div>
      <div>{shares && shares.toFixed(4)}</div>
    </div>
  );
};

export default Dragger;
