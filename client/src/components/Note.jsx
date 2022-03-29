import React, { useState } from "react";
import Editnote from "./Editnote";
import Delete from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function Note(props) {
  const [editclicked, seteditclicked] = useState(false);
  const [editedNote, setEditedNote] = useState({
      Edtitle:props.NoteTitle,
      Edcontent:props.NoteMessage
  });
  function editNote(newEnote, EditId) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newEnote,id:EditId }),
    };
    fetch("http://localhost:4000/editnote", requestOptions)
    .then((res) =>res.json())
    .then((jsondata) => {
      setEditedNote((prev)=>{
        return({
          ...prev,
          Edtitle:newEnote.title,
          Edcontent:newEnote.content
        });
      });
      seteditclicked(false);
    });
  }
  return (
    <div className="note">
      {editclicked ? (
        <Editnote
          Econtent={editedNote.Edcontent}
          Eid={props.id}
          edit={editNote}
        />
      ) : (
        <div>
          <p>{editedNote.Edcontent}</p>
          <button
            onClick={() => {
              props.del(props.id);
            }}
          >
            <Delete />
          </button>
          <button
            onClick={() => {
              seteditclicked(true);
              console.log("clicked");
            }}
          >
            <EditIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default Note;
