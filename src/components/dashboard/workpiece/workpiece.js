import { useEffect, useState } from 'react';
import { useParams, Route } from 'react-router-dom';
import getWorkpiece from '../../../api/workpieces/getWorkpiece';
import RightSplit from '../rightSplit/rightSplit';
import Orientation from '../orientation/orientation';
import Documentation from '../documentation/documentation';

const Workpiece = (props) => {
  const { workpiece_id } = useParams();
  const [workpiece, setWorkpiece] = useState('');

  const resetData = async () => {
    const incomingWorkpiece = await getWorkpiece({
      workpiece_id,
    });
    setWorkpiece(incomingWorkpiece);
  };

  const commonProps = {
    ...props,
    workpiece,
    resetData,
    workpiece_id,
  };

  useEffect(() => {
    resetData();
  }, [props.selectedWorkpiece]);

  if (!workpiece) {
    return null;
  }
  return (
    <>
      <Route path="/workpiece/:workpiece_id/right-split/">
        <RightSplit {...commonProps} />
      </Route>
      <Route path="/workpiece/:workpiece_id/documentation/">
        <Documentation {...commonProps} />
      </Route>
      <Route path="/workpiece/:workpiece_id/" exact>
        <Orientation {...commonProps} />
      </Route>
      <Route path="/workpiece/:workpiece_id/protect/">
        <div>PROTEXT</div>
      </Route>
    </>
  );
};

export default Workpiece;
