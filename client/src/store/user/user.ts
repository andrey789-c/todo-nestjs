import { create } from "zustand";
import { IUserStore } from "./user.model";
import { getProfile } from "../../api/auth";
import { login, register, logout } from "../../api/auth/auth";
import { AxiosError } from "axios";

interface ErrorResponse {
	message: string;
}

export const useUserStore = create<IUserStore>()((set) => ({
	user: null,
	error: '',
	getUser: async () => {
		await getProfile().then((res) => {
			set({ user: { id: res.id, username: res.username } });
		}).catch((err) => {
			console.log(err);
		});
	},
	login: async (username, password) => {
		await login({ username, password }).then((res) =>
			set({ user: { id: res.id, username: res.username } })
		).catch((err: AxiosError<ErrorResponse>) => {
			console.log(err);
			set({ error: err.response?.data?.message || 'Произошла ошибка' });
		});
	},
	register: async (username, password) => {
		await register({ username, password }).then((res) =>
			set({ user: { id: res.id, username: res.username } })
		).catch((err: AxiosError<ErrorResponse>) => {
			set({ error: err.response?.data?.message || 'Произошла ошибка' });
		});
	},
	logout: async () => {
		await logout();
		set({ user: null });
	},
}));
