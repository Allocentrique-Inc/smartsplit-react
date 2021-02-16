export default function Performance(props) {
  return (
    <div className="content">
      <div className="left">
        <form>
          <div className="formInput toDo">
            <label htmlFor="peformers">Performers ?</label>
            <input
              type="string"
              id="performers"
              value={props.performance.performers}
              onChange={(e) =>
                props.setField('performance', { performers: e.target.value })
              }
            />
          </div>
          <div className="formInput toDo">
            <label htmlFor="conductor">Conductor ?</label>
            <input
              type="string"
              id="conductor"
              value={props.performance.conductor}
              onChange={(e) =>
                props.setField('performance', { conductor: e.target.value })
              }
            />
          </div>
        </form>
      </div>
      <div className="right toDo">DESCRIPTION</div>
    </div>
  );
}

// authors: {
//   type: "array",
//   items: {
//     anyOf: [{ type: "string" }, UserSchema.userPublicProfile],
//   },
// },
// composers: {
//   type: "array",
//   items: {
//     anyOf: [{ type: "string" }, UserSchema.userPublicProfile],
//   },
// },
// publishers: {
//   type: "array",
//   items: {
//     anyOf: [{ type: "string" }, UserSchema.userPublicProfile],
//   },
// },
// iswc: {
//   type: "string",
// },
