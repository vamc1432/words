import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import { Fab,Zoom } from '@material-ui/core';

function CreateArea(props) {
  var [ipnote, setipnote] = useState({
    content: ""
  });
  var [taclick,settaclick] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setipnote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function Add(e) {
    if(ipnote.content != "")
      props.add(ipnote);
    else
      alert("enter any text");
    setipnote({
      content: ""
    });
    e.preventDefault();
  }

  function handleClick(){
    settaclick(true);
  }
  return (
    <div >
      <form className="create-note" action="../../note" method="POST">
        <textarea
          onClick={handleClick}
          onChange={handleChange}
          name="content"
          value={ipnote.content}
          placeholder="Word to be stored..."
          rows={taclick ? "3":"1"}
        />
        <Zoom in={taclick ? true:false}>
        <Fab onClick={Add}>
        <AddIcon />
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
