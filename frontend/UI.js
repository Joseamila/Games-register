const task = require('../backend/models/task');
const TaskService = require('./services/taskservice')
const taskServices = new TaskService();

const { format } = require('timeago.js')

class UI{

    async renderTask(){
        const tasks = await taskServices.getTask();
        const taskCardContainer = document.getElementById('task-cards');
        taskCardContainer.innerHTML= '';
        tasks.forEach(task =>{
            const div = document.createElement('div');
            div.className ='';
            div.innerHTML=`
                <div class=""card md-2>
                    <div class="row m-3">
                        <div class="col-md-4">
                            <img src="http://localhost:3000/${task.imagePath}" alt="" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${task.title}</h4>
                                <p class="card-text">${task.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${task._id}">X</a>
                            </div>
                        
                        </div>
                    </div>
                    <div class="card-footer">
                     ${format(task.created_at)}
                    </div>
                </div>
            `;

            taskCardContainer.appendChild(div);
        })
    }

    async addNewTask(task){
        await taskServices.postTask(task)
        this.clearTaskForm();
        this.renderTask();
    }

    clearTaskForm(){
        document.getElementById('task-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement('div');
        div.className= `alert alert-${colorMessage} mt-3 message`
        div.appendChild(document.createTextNode(message))

        const container = document.querySelector('.col-md-4');
        const taskForm = document.querySelector('#task-form');

        container.insertBefore(div, taskForm);
        setTimeout(()=>{
            document.querySelector('.message').remove()
        }, secondsToRemove)

    }

    async deleteTask(id){
        await taskServices.deleteTask(id);
        this.renderTask();
    }

}

module.exports = UI;