const Presentation = (props) => { 
  return (
    <>
      <div style={style.b1}>
        <div style={style.logo}/>
        <div style={style.title}>
          {(()=>{
            switch (props.view) {
              case "copyright": return "DROITS D'AUTEUR"
              case "performance": return "INTERPRETATION"
              case "recording": return "ENREGISTREMENT SONORE" 
              case "privacy": return "CONFIDENTIALITE" 
              default: return "ERROR";
            }
          })()}
        </div>
      </div>
      <div style={style.text1}>
          {(()=>{
            switch (props.view) {
              case "copyright": return "Qui a inventé cette pièce musicale?"
              case "performance": return "Qui a joué sur l'enregistrement sonore?"
              case "recording": return "Qui possède l'enregistrement sonore?" 
              case "privacy": return "Veux tu rendre ce partage public?" 
              default: return "ERROR";
            }
          })()} 
      </div>
      <div style={style.text2}>
          {(()=>{
            switch (props.view) {
              case "copyright": return `Sépare ici le droit d'auteur entre les créateurs, c'est-à-dire, les
              auteurs des paroles, les compositeurs et les arrengeurs de la
              musique.  Il est d'usage de partager le droit d'auteur
              équitablement.  Mais tu peux faire autrement.`
              case "performance": return `On sépare ici le droit voisin entre les interprètes, autant les 
              musiciens que les chanteurs.  Les membres d'un groupe se 
              partage ce droit à part égales; Les artistes principaux et 
              artistes invités se partagent 80%, tandis que le 20% restant est 
              partagé parmi les artistes accompagnateurs, le cas échéant.`
              case "recording": return `On sépare ici le droit voisin des producteurs, c'est à dire ceux 
              qui ont investi leru temps et/ou leur argent pour enregistrer et  
              finaliser le produit afin d'être commercialisé. 
              Il est usage de partager ce droit en parts égales ou au prorata  
              de l'investissement.` 
              case "privacy": return "Expliquez ou est-ce que ca va se retrouver et que ca va etre soumis au vote." 
              default: return "ERROR";
            }
          })()}  
      </div>
    </>
  )
}

export default Presentation

const style = {
  b1 : {
    display: "flex", 
    alignItems: "center", 
    marginBottom: "32px", 
    marginTop: "72px"
  }, 
  logo : {
      backgroundColor: "#2DA84F",
      width : "22px",
      height : "22px",
      marginRight: "17px"
  },
  title : { 
      fontFamily: "IBM Plex Sans",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "24px", 
      color : "#2DA84F", 
  }, 
  text1 : {
      fontFamily: "IBM Plex Sans",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "40px",
      lineHeight: "48px", 
      color : "#203548",
      marginBottom : "16px"
  }, 
  text2 : {
      fontFamily: "IBM Plex Sans",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "24px", 
      color : "#687A8B",
      marginBottom: "72px"
  },
}