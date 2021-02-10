const SelectPerspective = (props) => {
  return (
    <div className="selectPerspective">
      <button
        className={"tab " + (props.tab === "owner" ? "selectedTab" : "")}
        onClick={() => {
          props.setTab("owner");
        }}
      >
        Mes ajouts
      </button>
      <button
        className={"tab " + (props.tab === "rightHolder" ? "selectedTab" : "")}
        onClick={() => {
          props.setTab("rightHolder");
        }}
      >
        Partagées avec moi
      </button>
    </div>
  );
};

export default SelectPerspective;
