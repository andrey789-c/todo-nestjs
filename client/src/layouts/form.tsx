import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../components";
import { useUserStore } from "../store";

export const LoginForm = () => {
	const [isRegister, setIsRegister] = useState(false);

	const [formData, setFormData] = useState({ username: "", password: "", password2: "" });
	const [loading, setLoading] = useState(false);

	const { register, login, error } = useUserStore();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);


		try {
			if(isRegister && formData.password === formData.password2) {
				register(formData.username, formData.password);
			} else {
				login(formData.username, formData.password);
			}
			
		} catch (err: any) {
			console.log(err);
		
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 items-center p-6"
		>

           <h2 className="text-2xl font-semibold mb-2.5">{isRegister ? 'Регистрация' : 'Войти'}</h2> 

			<Input
				label="Имя пользователя"
				name="username"
				value={formData.username}
				onChange={handleChange}
			/>
			<Input
				label="Пароль"
				name="password"
				type="password"
				value={formData.password}
				onChange={handleChange}
			/>

			{isRegister ? (
				<Input
					label="Повторите пароль"
					name="password2"
					type="password"
					value={formData.password2}
					onChange={handleChange}
				/>
			) : null}
			{error && <p className="text-red-500 mt-2">{error}</p>}

			<div className="flex">
				{isRegister ? (
					<span className="text-gray-700">
						Я уже зарегистрирован, <button type="button" onClick={() => setIsRegister(false)} className="underline">Войти</button>
					</span>
				) : (
					<span className="text-gray-700">
						У меня нет аккаунта, <button type="button" onClick={() => setIsRegister(true)} className="underline">Зарегистрироваться</button>
					</span>
				)}
			</div>
			<button
				type="submit"
				className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition-all"
				disabled={loading}
			>
				{loading ? "Загрузка..." : "Войти"}
			</button>
		</form>
	);
};
