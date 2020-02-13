export class NoteItem {
    static create(note) {
        return fetch('https://note-list-aa0b6.firebaseio.com/notes.json', {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            note.id = response.name;
            return note
        })
        .then(addToLocalStorage)
    
    }

    static renderList() {
    }
}

const addToLocalStorage = (note) => {
    const notes = getQuestionsFromLocalStorage();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

const getQuestionsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('notes') || '[]');
}

