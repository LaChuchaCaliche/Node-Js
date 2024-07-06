class Note{
    constructor (id,description,important = false){
    this.id = id;
    this.description=description;
    this.important=important;
    }
}
class NoteManager{
    constructor(){
        this.notes = JSON.parse(localStorage.getItem('notes'))||[];
        this.loadNotes();
        }
        addNewNote(description){
            const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1;
            const note = new Note(id, description);
            this.notes.push(note);
            this.saveNotes();
            this.renderNotes();
        }
        deleteNote(id){
            this.notes = this.notes.filter(note => note.id !== id);
            this.saveNotes();
            this.renderNotes();
        }
               
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        }

        loadNotes() {
            this.renderNotes();
        }
        renderNotes() {
            const notesList = document.getElementById('notes-list');
            notesList.innerHTML = '';
            this.notes.forEach(note => {
                const item = document.createElement('li');
                item.textContent = note.description;
                item.className = note.important ? 'important' : '';
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    });
    
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                    this.deleteNote(note.id);
                });
    
                
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.addEventListener('click',(e)=>{
                    e.stopPropagation();
                    const inputNewDescription = document.createElement("INPUT");
                    const sendNewDescription = document.createElement("BUTTON");
                    sendNewDescription.textContent = "Enviar"
                    item.append(inputNewDescription,sendNewDescription);
                    sendNewDescription.addEventListener('click',(e)=>{
                        e.preventDefault();
                        const editNote = this.notes.find(t => t.id === note.id);
                        editNote.description = inputNewDescription.value;
                        this.saveNotes();
                        this.renderNotes();
                       
                    } )});
                const importantButton = document.createElement("button");
                importantButton.textContent='Importante';
                importantButton.addEventListener('click',(e)=>{
                const importantNote = document.createElement('li');
                importantNote.textContent = note.description
                const $importantNotes = document.getElementById('ImportantNotes');
                console.log(importantNote)
,               $importantNotes.appendChild(importantNote);
                this.deleteNote(note.id);
                

                })
            
            item.appendChild(editButton);
            item.appendChild(deleteButton);
            item.appendChild(importantButton);
            notesList.appendChild(item);
    
            })}
        }


document.addEventListener('DOMContentLoaded', () => {
        const noteManager = new NoteManager();
        
        document.getElementById('addNote').addEventListener('click', (e) => {
        const newNote = document.getElementById('add-Note').value;
                if (newNote) {
                    noteManager.addNewNote(newNote);
                    document.getElementById('add-Note').value = '';
                }})})
            
