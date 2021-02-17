import DownBar from '../../_/downBar/downBar';

export default function Release(props) {
  return (
    <>
      <main>
        <div className="left">
          <form>
            <div className="formInput toDo">
              <label htmlFor="date">Date de sortie</label>
              <input
                type="date"
                id="date"
                value={props.release.date}
                onChange={(e) =>
                  props.setField('release', { date: e.target.value })
                }
              />
            </div>
            <div className="formInput toDo">
              <label htmlFor="label">Label</label>
              <input
                type="string"
                id="label"
                value={props.release.label}
                onChange={(e) =>
                  props.setField('release', { label: e.target.value })
                }
              />
            </div>
            <div className="formInput toDo">
              <label htmlFor="format">Format du produit</label>
              <input
                type="string"
                id="format"
                value={props.release.format}
                onChange={(e) =>
                  props.setField('release', { format: e.target.value })
                }
              />
            </div>
            <div className="formInput toDo">
              <label htmlFor="support">Support</label>
              <input
                type="string"
                id="support"
                value={props.release.support}
                onChange={(e) =>
                  props.setField('release', { support: e.target.value })
                }
              />
            </div>
            <div className="formInput toDo">
              <label htmlFor="distributor">Distribution</label>
              <input
                type="string"
                id="distributor"
                value={props.release.distributor}
                onChange={(e) =>
                  props.setField('release', { distributor: e.target.value })
                }
              />
            </div>
            <div className="formInput toDo">
              <label htmlFor="upc">Code UPC/EAN</label>
              <input
                type="string"
                id="upc"
                value={props.release.upc}
                onChange={(e) =>
                  props.setField('release', { upc: e.target.value })
                }
              />
            </div>
          </form>
        </div>
        <div className="right toDo">DESCRIPTION</div>
      </main>
      <DownBar
        frontUrl={`/workpiece/${props.workpiece_id}/documentation/files`}
        backUrl={`/workpiece/${props.workpiece_id}/documentation/recording`}
      />
    </>
  );
}
