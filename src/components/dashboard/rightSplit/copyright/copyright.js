import { useState } from "react";
import AddCollaborators from "../_/addCollaborators/addCollaborators";
import { useParams } from "react-router-dom";
import Circle from "../_/circle/circle";
import TopBar from "../_/topBar/topBar";
import DividingMethod from "./dividingMethod/dividingMethod";
import Presentation from "../_/presentation/presentation";
import recalculateShares from "../_/recalculateShares";
import Collaborator from "./collaborator/collaborator";
import DownBar from "../_/downBar/downBar";

const ceil = (el) => Math.floor(el * 10000) / 10000;

const Copyright = (props) => {
  let { workpiece_id } = useParams();
  const [dividingMethod, selectDividingMethod] = useState("equal");

  const addCollaborators = (user_id) => {
    const calculatedCopyright = recalculateShares({
      newDividingMethod: dividingMethod,
      copyright: [
        ...props.copyright,
        {
          rightHolder: user_id,
          roles: [],
          comment: "",
          shares: 0,
          lock: false,
        },
      ],
    });
    props.setCopyright(calculatedCopyright);
  };

  const deleteCollaborator = (rightHolder) => {
    const arr = [...props.copyright];
    arr.splice(
      props.copyright.find((el1) => el1.user_id === rightHolder),
      1
    );
    const calculatedCopyright = recalculateShares({
      newDividingMethod: dividingMethod,
      copyright: arr,
    });
    props.setCopyright(calculatedCopyright);
  };

  const deleteRole = (role, id) => {
    const arr = [...props.copyright];
    arr[id].roles = arr[id].roles.filter((el) => el !== role);
    const calculatedCopyright = recalculateShares({
      newDividingMethod: dividingMethod,
      copyright: arr,
    });
    props.setCopyright(calculatedCopyright);
  };

  const addRole = (role, id) => {
    const arr = [...props.copyright];
    arr[id].roles.push(role);
    const calculatedCopyright = recalculateShares({
      newDividingMethod: dividingMethod,
      copyright: arr,
    });
    props.setCopyright(calculatedCopyright);
  };

  const handleSelectDividingMethod = (newDividingMethod) => {
    const calculatedCopyright = recalculateShares({
      newDividingMethod,
      copyright: props.copyright,
    });
    props.setCopyright(calculatedCopyright);
    selectDividingMethod(newDividingMethod);
  };

  const handleDrag = ({ newShares, id }) => {
    if (dividingMethod === "manual") {
      if (props.copyright[id].lock !== true) {
        const draggedDifferential = newShares - props.copyright[id].shares;
        const notFocussed = props.copyright.filter((el, ID) => ID !== id);
        const unLocks = notFocussed.filter((el) => el.lock !== true);
        const unlockedSum = unLocks.reduce((acc, el) => el.shares + acc, 0);
        const sharesToSeparate = unlockedSum - draggedDifferential;
        let arr = [...props.copyright].map((EL, ID) => {
          if (id === ID) {
            EL.shares = ceil(
              sharesToSeparate < 0 ? newShares + sharesToSeparate : newShares
            );
          } else {
            if (EL.lock !== true) {
              EL.shares =
                EL.shares === 0
                  ? 0
                  : sharesToSeparate < 0
                  ? 0
                  : // : ceil((EL.shares) + ((-draggedDifferential) / unLocks.length))
                    ceil((EL.shares / unlockedSum) * sharesToSeparate);
            }
          }
          return EL;
        });
        props.setCopyright(arr);
      }
    }
  };

  const commonProps = {
    workpiece_id,
    dividingMethod,
    selectDividingMethod,
    addCollaborators,
    deleteCollaborator,
    deleteRole,
    addRole,
    handleSelectDividingMethod,
    handleDrag,
  };

  return (
    <div>
      <TopBar {...props} />
      <div style={style.b1}>
        <div style={style.b1b1}>
          <div style={style.b1b1b1}>
            <Presentation view="copyright" />

            <DividingMethod {...commonProps} />

            {props.copyright.map((el, id) => {
              // Incomming data is different than PostingData
              const collaborator =
                typeof el.rightHolder === "string"
                  ? props.collaborators.find(
                      (EL) => EL.user_id === el.rightHolder
                    )
                  : el.rightHolder;
              return (
                <Collaborator
                  key={collaborator.user_id}
                  {...props}
                  {...commonProps}
                  el={el}
                  id={id}
                  collaborator={collaborator}
                />
              );
            })}

            <AddCollaborators
              {...props}
              {...commonProps}
              preSelectedCollaborators={props.copyright}
            />
          </div>
          <div style={style.b1b1b2}>
            <div style={style.b1b1b2b1}>
              <Circle {...props} collaborators={props.copyright} />
            </div>
          </div>
        </div>
      </div>
      <DownBar
        backUrl={`/workpiece/${workpiece_id}`}
        frontUrl={`/workpiece/${workpiece_id}/right-split/performance`}
      />
    </div>
  );
};

export default Copyright;

const style = {
  b1: {
    display: "flex",
    justifyContent: "center",
  },
  b1b1: {
    width: "944px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "100px",
    minHeight: "90vh",
  },
  b1b1b1: {
    width: "464px",
  },
  b1b1b2: {
    width: "464px",
  },
  b1b1b2b1: {
    position: "sticky",
    top: "144px",
    display: "flex",
    justifyContent: "space-around",
  },
};
