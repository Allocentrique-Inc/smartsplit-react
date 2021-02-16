import DownBar from '../../_/downBar/downBar';

export default function Lyrics(props) {
  return (
    <>
      <main>
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
      </main>
      <DownBar
        backUrl={`/workpiece/${props.workpiece_id}/documentation/info`}
        frontUrl={`/workpiece/${props.workpiece_id}/documentation/streaming`}
      />
    </>
  );
}
