import SectionTitle from "../_/sectionTitle/sectionTitle";
import Collaborator from "../_/collaborator/collaborator";
import Modify from "../_/modify/modify";

const Copyright = (props) => {
  return (
    <div style={style.b1}>
      <SectionTitle value="Copyright" />
      <Modify {...props} destination="copyright" />
      {props.workpiece.rightSplit.copyright.map((collaborator, id) => {
        return (
          <Collaborator
            {...props}
            collaborator={collaborator}
            key={collaborator.rightHolder.user_id}
            setVote={props.setCopyright}
            voteValue={props.copyright}
          />
        );
      })}
    </div>
  );
};

export default Copyright;

const style = {
  b1: {
    border: "1px solid black",
    padding: "10px",
    margin: "10px",
  },
};
