const API_URL="https://playground.4geeks.com/todo";
const user ="Rishi"

export const fetchTodo = (setToDoList)=>{
    fetch(`${API_URL}/users/${user}`)
        .then((response)=> {
            if (!response.ok) {
                throw new Error("fail to fetch users"+response.status)
            }
            console.log("reposnse from API: ", response)
            return response.json()
        })
        .then((data)=> {
            console.log("toDoList from API", data)
            setToDoList(data && Array.isArray(data.todos) ? data.todos: []);
        })
        .catch((error)=> {
            console.error("Fetched to do fail" , error)
        })

}

// .then((data) => {
//     console.log("Todo List from API", data);
//     if (Array.isArray(data.todos)) {
//         setTodos(data.todos);
//     } else {
//         console.error("Fetched data is not an array:", data.todos);
//         setTodos([]);
//     }
// })
// .catch((error) => {
//     console.error("There has been a problem with your fetch operation:", error);
// });