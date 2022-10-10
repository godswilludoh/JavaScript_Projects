/* DS for TODO */
//todo model
/*const todo = {
	_id: 0, //integer
	title: '', //string
	isCompleted: false, //boolean
};
*/

const pageReload = () => {
	window.location.reload();
};

//Get todoDB from local storage
const todoDB = 'db101';

//reading from the local storage
const todoDBInstance = JSON.parse(localStorage.getItem(todoDB)) || [];

/* Create function */
const addTodo = () => {
	const todoInput = document.getElementById('todo-input');
	const title = todoInput.value;

	const newTodo = {
		_id: todoDBInstance.length + 1,
		title: title,
		isCompleted: false,
	};

	const updatedTodoDB = [...todoDBInstance, newTodo];
	localStorage.setItem(todoDB, JSON.stringify(updatedTodoDB));
	pageReload();
};

/* Render function */
const renderTodoItems = () => {
	const todoListContainer = document.querySelector('#todo-list-container');
	const todoListItems = todoDBInstance
		.map(({ _id, title, isCompleted }) => {
			return `
		<li class=${isCompleted && 'checked'}>${title} 
		<span class="edit-icon utility-btn" onclick="editMode(${_id})">✍🏼</span>
		<span class="btn-delete utility-btn" onclick="deleteTodo(${_id})">🗑</span>
		</li>
		`;
		})
		.join('');
	todoListContainer.innerHTML = todoListItems;
	console.log(todoListContainer);
};

/* Delete function */
function deleteTodo(todoId) {
	//to delete, use the filter method to remove
	const updatedTodoDB = todoDBInstance.filter(({ _id }) => _id !== todoId);
	localStorage.setItem(todoDB, JSON.stringify(updatedTodoDB));
	pageReload();
}

//TODO: Edit function
const editMode = (id) => {
	const todo = todoDBInstance.find((todo) => todo._id === id);
	// document.getElementById.("todo-input").value
	console.log(todo);
};
//2. Display the todo to be edited in the input box
//3. Display the update button

//Event Listeners
document.querySelector('#add-btn').addEventListener('click', addTodo);

//invoke on page load
renderTodoItems();
