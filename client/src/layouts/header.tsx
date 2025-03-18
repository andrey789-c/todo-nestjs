import { useEffect, useState } from "react";
import { useUserStore } from "../store/user/user";
import { Popup } from "./popup";
import { LoginForm } from "./form";

interface IHeaderProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export const Header = ({ isOpen, setIsOpen }: IHeaderProps) => {
	const { getUser, user, logout } = useUserStore();

	useEffect(() => {
		setIsOpen(false);
	}, [user]);

	useEffect(() => {
		getUser();
	}, []);

	const onToggleAuth = () => {
		if (user) {
			logout();
		} else {
			setIsOpen(true);
		}
	};

	return (
		<header>
			<button
				onClick={() => onToggleAuth()}
				className="absolute right-7.5 top-7.5 bg-blue-700 text-white px-8 py-3 text-sm rounded-sm cursor-pointer"
			>
				{user ? "Выйти" : "Войти"}
			</button>

			<Popup isOpen={isOpen} setIsOpen={setIsOpen}>
				<LoginForm />
			</Popup>
		</header>
	);
};
