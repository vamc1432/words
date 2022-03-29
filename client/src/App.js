import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import Footer from "./components/Footer";
import CreateArea from "./components/CreateArea";

function App() {
  var [notes, setnotes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/getall")
      .then((res) => res.json())
      .then((jsondata) => setnotes(jsondata))
      .catch((error) => {
        console.log(error);
      });
  },[]);
  function addNote(newNote) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    };
    fetch("http://localhost:4000/addnote", requestOptions)
      .then((res) => res.json())
      .then((jsondata) => setnotes(jsondata));
  }
  function deleteNote(id) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    fetch("http://localhost:4000/deletenote", requestOptions)
      .then((res) => res.json())
      .then((jsondata) => setnotes(jsondata));
  }
  
  return (
    <div>
      <Header />
      <CreateArea add={addNote} />
      {notes.map((i, index) => {
        return (
          <Note
            key={i.word+index}
            id={i._id}
            NoteMessage={i.word}
            del={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
