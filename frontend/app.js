require('./styles/app.css')
const UI = require('./UI')

document.addEventListener('DOMContentLoaded', () =>{
    const ui = new UI
    ui.renderTask();
})

document.getElementById('task-form')
.addEventListener('submit', e =>{
    const title =document.getElementById('title').value;
    const author= document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;

    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);

    const ui =new UI();
    ui.addNewTask(formData);
    ui.renderMessage('New Task Added', 'success', 3000);

    e.preventDefault();

});

document.getElementById('task-cards')
.addEventListener('click', e =>{
    if(e.target.classList.contains('delete')){
        const ui = new UI();
        ui.deleteTask(e.target.getAttribute('_id'));
        ui.renderMessage('Task Removed', 'danger', 3000)
    }

    e.preventDefault();
});