import { CreateTodoForm, Header } from "./layouts";
import { useTodoStore } from "./store/todo/todos";
import TodoList from "./components/list";
import { useEffect, useState } from "react";
import { useUserStore } from "./store/user/user";
function App() {
	const { todos, getTodos, getCategories } = useTodoStore();
	const [isOpen, setIsOpen] = useState(false);
	const { user } = useUserStore();

	useEffect(() => {
		if (user) {
			getTodos();
		}
		getCategories();
	}, [user]);

	return (
		<div>
			<Header isOpen={isOpen} setIsOpen={setIsOpen} />
			{user ? (
				<div className="mt-20">
					<TodoList todos={todos} onToggle={() => {}} />
					<CreateTodoForm />
				</div>
			) : (
				<div className="mt-30 text-center text-2xl">
					Для того, чтобы использовать приложение, необходимо{" "}
					<button
						className="text-blue-500 cursor-pointer hover:text-blue-600"
						onClick={() => setIsOpen(true)}
					>
						авторизоваться
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
