import { useState } from "react"
import login from "../../api/auth/login"

const Login = (props) => {
  const [email, setEmail] = useState("simonboisclair553@hotmail.com")
  const [password, setPassword] = useState("ici12laba42")
  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)
  const handleConfirm = async () => { 
    await login({ email, password }) 
    props.resetLogginCheck()
  }
  return (
    <div>
      <div>
        email :
        <input value={email} onChange={handleEmail} />
      </div>
      <div>
        password : 
        <input value={password} onChange={handlePassword} />
      </div>
      <button onClick={handleConfirm}>
        Confirm
      </button>
    </div>
  )
}

export default Login