const addBtn = document.getElementById('btn');
const note = document.getElementById('note');
const tasks = document.getElementById('tasks');
const colors = ['lightpink', 'bisque', 'burlywood', '#ffcfbf', 'darkseagreen', 'lightblue', 'lightsteelblue', 'mediumaquamarine', 'mistyrose', '#7be6ad', 'thistle'];


//get notes from localstorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];
//If notes exists in the local storage they will get stored in notes after they are parsed into an array
//else , notes will be initiakised as an empty array

function enableButton() {
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
  if (notes.length > 0) {
    tasks.innerHTML = '';
    notes.forEach((note, index) => {
      const displayNote = document.createElement('div');
      displayNote.className = 'note';
      displayNote.style.backgroundColor = note.color;
      displayNote.innerHTML = `
      <p class="para">${note.note}</p>
      <div class="buttons">
      <button id='${index}' onclick = 'editNote(this.id)' class="edit">&#9998;</button>
      <button id='${index}' onclick='deleteNote(this.id)' class="del">DEL</button>
      </div>`;

      tasks.appendChild(displayNote);

    });
  } else {
    tasks.innerHTML = `<h2 class='empty'>No notes available yet.</h2>`;
  }
}

renderNotes();

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
  //updating the localstorage with notes entered or deleted by the user
}


addBtn.addEventListener('click', () => {
  let noteVal = note.value;
  if (noteVal == '') {
    document.getElementById('msg').style.display = 'block';
  } else {
    let color = colors[Math.floor(Math.random() * colors.length)];
    console.log(color);
    notes.push({ note: noteVal, color });
    saveNotes();
    renderNotes();

    console.log(notes);
    console.log(noteVal);
    note.value = '';
    document.getElementById('msg').style.display = 'none';
  }

})


function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function editNote(index) {
  let editVal = Object.values(notes[index]);
  note.value = editVal[0] ;
  // console.log(editVal[0])
  // console.log(Object.values(notes[index]));
  deleteNote(index);
}