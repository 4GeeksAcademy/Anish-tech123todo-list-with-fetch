import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {
	const [toDoList, setToDoList] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [hovered, setHovered] = useState(null);

	useEffect(() => {
		fetchTodos(setToDoList);
	}, [])

	const API_URL = "https://playground.4geeks.com/todo";
	const user = "Rishi"

	const fetchTodos = (setToDoList) => {
		fetch(`${API_URL}/users/${user}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("fail to fetch users" + response.status)
				}
				console.log("reposnse from API: ", response)
				return response.json()
			})
			.then((data) => {
				console.log("toDoList from API", data)
				setToDoList(data && Array.isArray(data.todos) ? data.todos : []);
			})
			.catch((error) => {
				console.error("Fetched to do fail", error)
			})

	}

	const addToDo = (e) => {
		if (e.key == "Enter" && inputValue != "") {
			fetch("https://playground.4geeks.com/todo/todos/Rishi", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					label: inputValue,
					is_done: false
				})
			})
				.then((response) => {
					if (!response.ok) {
						alert("click the add user button to add tasks");

					}
					console.log("new to do added:", inputValue);
					fetchTodos(setToDoList)
				})
				.catch((error) => {
					console.error("add task failed :", error);

				})
			setInputValue("")
		}
	};

	const deleteToDo = (index) => {
		let todoId = toDoList[index].id;
		let deletedTodo = toDoList[index].label;

		fetch(`${API_URL}/todos/${todoId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {
				if (response.ok) {
					console.log("to do deleted:", deletedTodo);
					fetchTodos(setToDoList)
				}
			})
			.catch((error) => {
				console.error("delete task failed :", error);
			})
	}
	const handleDeleteUser = () => {
		fetch(`${API_URL}/users/Rishi`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {
				if (response.ok) {
					console.log("user and tos deleted");
					setToDoList([])
					alert("your tasks are gone")
				}
			})
			.catch((error) => {
				console.error("delete user failed :", error);
			})
	};

	const handleAddUser = () => {
		fetch(`${API_URL}/users/Rishi`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {
				if (response.ok) {
					console.log("user andded to API");
					fetchTodos(setToDoList);
					alert("you can now save tasks");
				}
			})
			.catch((error) => {
				console.error("adding user failed :", error);
			})
	}

	return (
		<div className="text-center">
			<h1>todos</h1>
			<div>
				<input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={addToDo} />
			</div>
			<ul className="list-group w-50 mx-auto mt-5">
				{toDoList.map((item, index) => {
					return (
						<li onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} className="list-group-item">
							{item.label}
							<button onClick={() => deleteToDo(index)} className={`btn ${hovered == index ? "" : "hidden"}`} ><i className="fa-solid fa-trash-can"></i></button>
						</li>
					)
				})}
				<li className="list-group-item">{toDoList.length == 0 ? "No tasks, add a task" : toDoList.length == 1 ? "1 item left" : toDoList.length + " items left"}</li>
			</ul>
			<div className="d-flex justify-content-center mt-4">
				<button onClick={handleDeleteUser} className="btn btn-danger">delete all tasks and user</button>

				<button onClick={handleAddUser} className="btn btn-success ms-3">add user to save tasks</button>
			</div>
		</div>
	);
};

export default Home;