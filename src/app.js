import './styles.css';
import {NoteItem} from './noteItem';

const form = document.getElementById('form');
const addItemButton = document.getElementById('addItem');
const submitButton = document.getElementById('submit');

const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputPriority = document.getElementById('priority');
const inputColor = document.getElementById('color');
const closeButton = document.getElementById('close-form');

window.addEventListener('load', NoteItem.renderList);

closeButton.addEventListener('click', () => {
    event.preventDefault();
    if(submitButton.disabled === false) {
        form.style.display = 'none';
        addItemButton.disabled = false;
        inputTitle.value = '';
        inputDescription.value = '';
    }
});

addItemButton.addEventListener('click', () => {
    if(form.style.display === '' || form.style.display === 'none') {
        form.style.display = 'block';
        addItemButton.disabled = true;
    }
})

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    closeButton.disabled = true;
    
    const note = {
        title: inputTitle.value,
        description: inputDescription.value,
        priority: inputPriority.value,
        color: inputColor.value,
    }

    NoteItem.create(note)
    .then(() => {
        inputTitle.value = '';
        inputDescription.value = '';
        form.style.display = 'none';
        closeButton.disabled = false;
        submitButton.disabled = false;
        addItemButton.disabled = false;
    })
})