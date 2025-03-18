import { FC, ReactNode } from "react";

interface IPopupProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	children: ReactNode;
}

export const Popup: FC<IPopupProps> = ({ isOpen, setIsOpen, children }) => {
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center bg-black/25 bg-opacity-50 transition-opacity duration-300 ${
				isOpen
					? "opacity-100 pointer-events-auto"
					: " opacity-0 pointer-events-none"
			}`}
			onClick={togglePopup} // Закрытие по клику вне Popup
		>
			<div
				className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out"
				onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри Popup
			>
				{children}
			</div>
		</div>
	);
};
