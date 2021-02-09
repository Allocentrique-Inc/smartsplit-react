const Vote = (props) => {
  const user_id = localStorage.getItem("user_id") 
  return (
    props.voting 
    && props.collaborator.rightHolder.user_id === user_id 
    // && props.collaborator.vote === "undecided" 
    ? ( 
      <div style={style.b1}>
        <button style={props.voteValue==="accepted"?style.acceptClicked:style.accept} onClick={()=>{props.setVote("accepted")}}>
          Accept
        </button>
        <button style={props.voteValue==="rejected"?style.refuseClicked:style.refuse} onClick={()=>{props.setVote("rejected")}}> 
          Reject
        </button>
      </div>
    )
    :null
  )
}

export default Vote

const style = { 
  b1 : {
    display : "flex",
    justifyContent : "space-between"
  },
  accept : {
    border : "1px solid green",
    backgroundColor: "white",
    outline : 0
  },
  acceptClicked : {
    backgroundColor: "green",
    color : "white" 
  },
  refuse : { 
    border : "1px solid red",
    backgroundColor: "white",
    outline : 0
  },
  refuseClicked : {
    backgroundColor: "red",
    color : "white" 
  }
}