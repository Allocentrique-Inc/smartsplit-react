import DownBar from '../../_/downBar/downBar';

export default function Recording(props) {
  return (
    <>
      <main>
        <div className="left">
          <form>
            <div className="formSection toDo">
              <h3>Enregistrement</h3>
            </div>
            <div className="formSection toDo">
              <h3>Mixage</h3>
            </div>
            <div className="formSection toDo">
              <h3>Mastering</h3>
            </div>
            <div className="formSection toDo">
              <h3>Production</h3>
            </div>
          </form>
        </div>
        <div className="right toDo">DESCRIPTION</div>
      </main>
      <DownBar
        frontUrl={`/workpiece/${props.workpiece_id}/documentation/release`}
        backUrl={`/workpiece/${props.workpiece_id}/documentation/performance`}
      />
    </>
  );
}
