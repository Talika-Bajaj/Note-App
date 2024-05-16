const addBtn = document.getElementById('btn');
const note = document.getElementById('note');
const tasks = document.getElementById('tasks');

//get notes from localstorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];
//If notes exists in the local storage they will get stored in notes after they are parsed into an array
//else , notes will be initiakised as an empty array

function enableButton(params) {
  if (note.value == '') {
    addBtn.disabled = true;
    document.getElementById('msg').style.display = 'block';
  } else {
    document.getElementById('msg').style.display = 'none';
    // console.log(note.value);
    addBtn.disabled = false;

  }
}

function renderNotes() {
  tasks.innerHTML = '';
  notes.forEach((note, index) => {
    const displayNote = document.createElement('div');
    displayNote.className = 'note';
    displayNote.innerHTML = `
 
    <p class="para">${note}</p>
    <div class="buttons">
      <button id='${index}' onclick = 'editNote(this.id)' class="edit">&#9998;</button>
      <button id='${index}' onclick='deleteNote(this.id)' class="del">DEL</button>
    </div>`;

    tasks.appendChild(displayNote);
  });
}

renderNotes();

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
  //updating the localstorage with notes entered or deleted by the user
}


addBtn.addEventListener('click', ()=> {
  let noteVal = note.value;
  if (noteVal == '') {
   
    document.getElementById('msg').style.display = 'block';
  } else {

    notes.push(noteVal);
    saveNotes();
    renderNotes();

    console.log(notes);
    console.log(noteVal);
    note.value = '';
    document.getElementById('msg').style.display = 'none';
  }

})


function deleteNote (index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function editNote (index) {
  note.value = notes[index];
  deleteNote(index);
}