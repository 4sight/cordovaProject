// class Data {
//   constructor(){
//     this.notebook = [
//     { id: 1, text: 'Dear diary, today I wrote an MVC.' },
//     { id: 2, text: 'Dear diary, today I finished coding.'},
//   ]
//   }

//   addNote(noteText){
//     const note = {
//       id: this.notebook.length > 0 ? this.notebook[this.notebook.length - 1].id + 1 : 1,
//       text: noteText
//     }
//     this.notebook.push(note)
//   }

//   editNote(id, newText){
//     this.notebook = this.notebook.map(note => note.id === id ? { id: note.id, text: newText } : note
//       )
//   }

//   deleteNote(id){
//     this.notebook = this.notebook.filter(note => note.id !== id)
//   }
// }

class Data {
  constructor(){
    this.box = { color: 'blue' }
  }
  toggleBox(){
    console.log(this.box.color);
    this.box.color = this.box.color == 'blue' ? 'green' : 'blue';
  }
}