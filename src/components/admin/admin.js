import { useState } from "react"
import login from "../../api/auth/login"
import getWorkpiece from "../../api/workpieces/getWorkpiece"
import getUser from "../../api/users/getUsers"
import getWorkpiecesByOwner from "../../api/workpieces/getWorkpiecesByOwner"
import postWorkpiece from "../../api/workpieces/postWorkpiece"

const Admin = (props) => {
  const user_id = localStorage.getItem("user_id")
  const [show, setShow] = useState(true)
  return (
    <>
      <button
        onClick={() => { setShow(!show) }}
      >
        {show ? "HIDE ADMIN" : "SHOW ADMIN"}
      </button>
      {show
        && (<div>
          <h1>ADMIN / API / TEST</h1>
          <hr />

          <h2>Auth</h2>
          <button
            onClick={() => {
              login({
                // email: "simon@iptoki.com",
                email: "simonboisclair553@hotmail.com",
                password: "ici12laba42"
              })
            }}
          >
            login
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            getCheck
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            getRefresh
          </button>


          <hr />
          <h2>Users</h2>
          <button
            onClick={() => {
              getUser({
                user_id
              })
            }}
          >
            getUser
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            patchUser
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            deleteUser
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            getUserAvatar
      </button>

          <h2>Account Management</h2>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            postUser
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            activateUser
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            requestPassword
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            changePassword
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            verifyMobilePhone
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            inviteNewUser
      </button>


          <h2>Collaborators</h2>
          <button
            style={{ backgroundColor: "yellow" }}
            onClick={() => {
            }}
          >
            getUsersCollaborators
      </button>
          <button
            style={{ backgroundColor: "yellow" }}
            onClick={() => {
            }}
          >
            postCollaborators
      </button>

          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            getCollaboratorById
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            deleteCollaboratorById
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            postCollaboratorById ***
      </button>


          <h2>Contributors</h2>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            getUsersContributors
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            postContributors
      </button>

          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            getContributorById
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            deleteContributorById
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            postContributorById ***
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            patchContributorById ***
      </button>


          <hr />
          <h2>WorkPiece</h2>
          <button
            onClick={() => {
              getWorkpiece({
                workpiece_id: "e5de5afc-b362-450b-aa3a-0792f2a9075d"
              })
            }}
          >
            getWorkpiece
      </button>
          <button
            onClick={() => {
              getWorkpiecesByOwner({
                user_id
              })
            }}
          >
            getWorkpiecesByOwner
      </button>
          <button
            onClick={() => {
              postWorkpiece({
                title: "The Time Is Mine"
              })
            }}
          >
            postWorkpiece
      </button>
          <button
            style={{ backgroundColor: "yellow" }}
            onClick={() => {
            }}
          >
            patchWorkpieces
      </button>
          <button
            style={{ backgroundColor: "yellow" }}
            onClick={() => {
            }}
          >
            deleteWorkpieces
      </button>


          <h2>RightSplit</h2>
          <button
            style={{ backgroundColor: "yellow" }}
            onClick={() => {
            }}
          >
            postRightSplit
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            putRightSplit
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            deleteRightSplit
      </button>


          <button
            style={{ backgroundColor: "grey" }}
            onClick={() => {
            }}
          >
            submitRightSplit
      </button>
          <button
            style={{ backgroundColor: "grey" }}
            onClick={() => {
            }}
          >
            voteRightSplit
      </button>
          <button
            style={{ backgroundColor: "grey" }}
            onClick={() => {
            }}
          >
            swapUserRightSplit
      </button>


          <h2>Documentation</h2>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            getDocumentation
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            patchDocumentation
      </button>

          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            getField
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            patchField
      </button>


          <h2>File</h2>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            postFile
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            getFileById
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            deleteFileById
      </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
            }}
          >
            patchFileById
      </button>
        </div>)
      }
    </>
  )
}

export default Admin