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
        .then(this.renderList)
    
    }

    static renderList() {
        const notes = getQuestionsFromLocalStorage();
        const rootNotes = document.getElementById('note-list');
        const rootUrgentNotes = document.getElementById('note-list-urgent');

        let htmlNotes = '';
        let htmlUrgentNotes = '';

        if(notes != '') {
            htmlNotes = notes
            .filter((note) => note.priority !== 'High priority')
            .map(toCard).join('')

            htmlUrgentNotes = notes
            .filter((note) => note.priority === 'High priority')
            .map(toCard).join('')
        }

        htmlUrgentNotes !== ''
        ? rootUrgentNotes.innerHTML = htmlUrgentNotes
        : rootUrgentNotes.innerHTML = `You don\'t have high priority notes`;

        htmlNotes !== '' 
        ? rootNotes.innerHTML = htmlNotes
        : rootNotes.innerHTML = `You don\'t have any not high priority notes`;
    }

    editNote(note) {
        console.log(note)
    }
}

const toCard = (note) => {
    return `
    <div class="note" style="${note.color >= '#666666' ? "color: #000000" : "color: #ffffff"};
        background-color: ${note.color}" id="${note.id}">
        <div class="note__wrapper">
            <div class="mui--text-headline note__title" id="${note.id}">${note.title}</div>
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash"></i>
            <div class="mui--text-black-54 note__priority">${note.priority}</div>
        </div>
        <div class="note__description">${note.description}</div>
    </div>
    <br>
    `
}

const addToLocalStorage = (note) => {
    const notes = getQuestionsFromLocalStorage();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

const getQuestionsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('notes') || '[]');
}