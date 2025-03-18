import axios from "axios";
import Cookies from "js-cookie";
import { IUserResponce } from "./auth.model";

const API_URL = import.meta.env.VITE_API_URL;

export const getProfile = async () => {
	const token = Cookies.get("auth");

	const res = await axios.get<IUserResponce>(`${API_URL}/auth/profile`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (res.status === 401) {
		throw new Error("Not Authenticated");
	}

	return res.data;
};

export const login = async (body: { username: string; password: string }) => {
	const res = await axios.post<IUserResponce>(`${API_URL}/auth/login`, body);

	Cookies.set("auth", res.data.access_token, {
		expires: 2,
	});

	return res.data;
};

export const register = async (body: {
	username: string;
	password: string;
}) => {
	const res = await axios.post<IUserResponce>(`${API_URL}/auth/register`, body);

	Cookies.set("auth", res.data.access_token, {
		expires: 2,
	});

	return res.data;
};

export const logout = async () => {
	Cookies.remove("auth");
	window.location.reload();
};
