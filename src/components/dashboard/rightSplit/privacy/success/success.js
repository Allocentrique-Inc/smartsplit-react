const Success = (props) => {
  return (
    <div>
      SUCCESS
      <button
        onClick={()=>{props.setIsConsulting(e=>!e)}}
      >
        Voir le résumé
      </button>
    </div>
  )
}

export default Success