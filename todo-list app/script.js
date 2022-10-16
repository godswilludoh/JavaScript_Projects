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

// function uuid4() {
// 	return ([1e7] + -1e3 + -4e3 + )
// }

const addBtn = document.querySelector('.add-btn');
const editBtn = document.querySelector('.edit-btn');

//Get todoDBName from local storage
const todoDBName = 'db101';

//reading from the local storage
const todoDBInstance = JSON.parse(localStorage.getItem(todoDBName)) || [];

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
	localStorage.setItem(todoDBName, JSON.stringify(updatedTodoDB));
	pageReload();
};

let checked = document.getElementsByTagName('span');
checked.innerHTML;
console.log(checked);

/* Render function */
const renderTodoItems = () => {
	const todoListContainer = document.querySelector('#todo-list-container');
	const todoListItems = todoDBInstance
		.map(({ _id, title, isCompleted }) => {
			return `
		<li class=${isCompleted && 'checked'}>${title} 
		<span class="btn-complete utility-btn" id="btn-complete" onclick="completedStatus(${_id})">${
				isCompleted ? '❌' : '✅'
			}</span>
		<span class="edit-icon utility-btn" onclick="editMode(${_id})">✍🏼</span>
		<span class="btn-delete utility-btn" onclick="deleteTodo(${_id})">🗑</span>
		</li>
		`;
		})
		.join('');
	todoListContainer.innerHTML = todoListItems;
};

/* Delete function */
function deleteTodo(todoId) {
	//to delete, use the filter method to remove
	const updatedTodoDB = todoDBInstance.filter(({ _id }) => _id !== todoId);
	localStorage.setItem(todoDBName, JSON.stringify(updatedTodoDB));
	pageReload();
}

/*Edit function*/
const editMode = (_id) => {
	const todo = todoDBInstance.find((todo) => todo._id === _id);
	document.getElementById('todo-input').value = todo.title;
	addBtn.style.display = 'none';
	editBtn.style.display = 'inline-block';
	editBtn.setAttribute('id', _id);
};

/*Update function*/
function updateTodoListTitle() {
	const { id } = this;
	const _id = parseInt(id); //alias
	const todoToUpdate = todoDBInstance.find((todo) => todo._id === _id);
	todoToUpdate.title = document.getElementById('todo-input').value;

	const updatedTodoDB = todoDBInstance.map((todo) =>
		todo._id === _id ? todoToUpdate : todo
	);

	localStorage.setItem(todoDBName, JSON.stringify(updatedTodoDB));

	pageReload();
}

/* Completed Status */
const completedStatus = (_id) => {
	const todoCompleted = todoDBInstance.find((todo) => todo._id === _id);

	todoCompleted.isCompleted === false
		? (todoCompleted.isCompleted = true)
		: (todoCompleted.isCompleted = false);

	let clickedTodo = todoDBInstance.map((todo) =>
		todo._id === _id ? todoCompleted : todo
	);
	localStorage.setItem(todoDBName, JSON.stringify(clickedTodo));
	renderTodoItems();
};

// function checkedState(_id) {
// 	let list = document.querySelector('ul');
// 	list.addEventListener('click', function (e) {
// 		console.log(e.target);

// 		const todoCompleted = todoDBInstance.find((todo) => todo._id === _id);
// 		todoCompleted.isCompleted === false
// 			? (e.target.textContent = '✅')
// 			: (e.target.textContent = '❌');
// 	});
// }
//Event Listeners
addBtn.addEventListener('click', addTodo);
editBtn.addEventListener('click', updateTodoListTitle);

//invoke on page load
renderTodoItems();
