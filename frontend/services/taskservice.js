class TaskService{
    constructor(){
        this.URI = 'http://localhost:3000/api/tasks'
    }

    async getTask(){
        const response = await fetch(this.URI);
        const task = await response.json()

        return task
    }
    async postTask(task){
        const response = await fetch(this.URI, {
            method: 'POST',
            body: task 
        });
        const data = response.json();
        console.log(data)
    }
    async deleteTask(taskId){
        const response = await fetch(`${this.URI}/${taskId}`, {
            headers:{
                'Content-type': 'application/json'
            },
            method: 'DELETE'
        })

        const data = await response.json()
        console.log(data)
    }
}

module.exports= TaskService;