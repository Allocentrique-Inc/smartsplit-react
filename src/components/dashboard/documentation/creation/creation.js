import DownBar from '../../_/downBar/downBar';

export default function Creation(props) {
  return (
    <>
      <main>
        <div className="left">
          <form>
            <div className="formInput">
              <label htmlFor="date">Date de création</label>
              <input
                type="date"
                id="date"
                value={props.creation.date}
                onChange={(e) =>
                  props.setField('creation', { date: e.target.value })
                }
              />
            </div>
            <div className="formInput toDo">
              <label htmlFor="authors">Auteurs</label>
              <input
                type="text"
                id="authors"
                value={props.creation.authors[0]}
                onChange={(e) =>
                  props.setField('creation', { authors: [e.target.value] })
                }
              />
            </div>
            <div className="formInput toDo">
              <label htmlFor="composers">Compositeurs</label>
              <input
                type="text"
                id="composers"
                value={props.creation.composers}
                onChange={(e) =>
                  props.setField('creation', { composers: [e.target.value] })
                }
              />
            </div>
            <div className="formInput toDo">
              <label htmlFor="publishers">Éditeurs</label>
              <input
                type="text"
                id="publishers"
                value={props.creation.publishers}
                onChange={(e) =>
                  props.setField('creation', { publishers: [e.target.value] })
                }
              />
            </div>
            <div className="formInput">
              <label htmlFor="iswc">Code ISWC</label>
              <input
                type="text"
                id="iswc"
                value={props.creation.iswc}
                onChange={(e) =>
                  props.setField('creation', { iswc: e.target.value })
                }
              />
            </div>
          </form>
        </div>
        <div className="right toDo">DESCRIPTION</div>
      </main>
      <DownBar
        frontUrl={`/workpiece/${props.workpiece_id}/documentation/performance`}
        backUrl={`/workpiece/${props.workpiece_id}`}
      />
    </>
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
