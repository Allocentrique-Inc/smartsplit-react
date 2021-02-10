import { useHistory } from "react-router-dom";

const Tile = (props) => {
  const history = useHistory();
  const action = getActionNameAndDestination(props);
  return (
    <div className="tile">
      <div className="image" />
      <div>
        <div className="title"> {getTitle(props.tileId)} </div>
        <div className="description"> {getDescription(props.tileId)} </div>
      </div>
      <button
        className={action.className}
        onClick={() => {
          history.push(action.destination);
        }}
      >
        {action.name}
      </button>
    </div>
  );
};

export default Tile;

const getTitle = (tileId) => {
  switch (tileId) {
    case "share":
      return "Partage tes droits";
    case "document":
      return "Documente ton oeuvre";
    case "protect":
      return "Protège ton oeuvre";
    default:
      return "---";
  }
};
const getDescription = (tileId) => {
  switch (tileId) {
    case "share":
      return "Crée les partages sur les droits à l'aide de notre guide.  Tu vas voir, c'est beaucoup plus simple que tu ne le crois :)";
    case "document":
      return "Rends totalement découvrable ton oeuvre aux yeux des moteurs de recherche pour augmenter ton auditoire.";
    case "protect":
      return "Associe dès aujourd’hui ton enregistrement sonore à ses ayant droits et laisse des traces indélébiles de ça sur une blockchain.";
    default:
      return "---";
  }
};
const getActionNameAndDestination = (props) => {
  switch (props.tileId) {
    case "share": {
      const _state =
        props.workpiece &&
        props.workpiece.rightSplit &&
        props.workpiece.rightSplit._state;
      switch (_state) {
        case undefined:
          return {
            name: "Commencer",
            destination: `/workpiece/${props.workpiece_id}/right-split/copyright`,
            className: "action start",
          };
        case "draft":
          return {
            name: "Continuer",
            destination: `/workpiece/${props.workpiece_id}/right-split/kanban`,
            className: "action",
          };
        default:
          return {
            name: "Consulter",
            destination: `/workpiece/${props.workpiece_id}/right-split/kanban`,
            className: "action",
          };
      }
    }
    case "document": {
      return {
        name: "Commencer",
        destination: "",
        className: "action start",
      };
    }
    case "protect": {
      return {
        name: "Commencer",
        destination: "",
        className: "action start",
      };
    }
    default:
      return {
        name: "---",
        destination: "",
        className: "action start",
      };
  }
};
