import React, { useState } from "react";


//create your first component
const Home = () => {
	const [toDoList, setToDoList] = useState([
		{
			label: "take out Trash",
			done: false
		},
		{
			label: "feed the dog",
			done: false
		}
	])
	const [inputValue, setInputValue] = useState("");
	const [hovered, setHovered] = useState(null);

	const addToDo = (e) => {
		if (e.key == "Enter" && inputValue != "") {
			let newList = toDoList.concat({
				label: inputValue,
				done: false
			})
			setToDoList(newList)
			setInputValue("")
		}
	};

	const deleteToDo = (index) => {
		let newList = toDoList.filter((item, idx) => idx != index)
		setToDoList(newList)
	}

	return (
		<div className="text-center">
			<h1>todos</h1>
			<div>
				<input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => addToDo(e)} />
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
		</div>
	);
};

export default Home;