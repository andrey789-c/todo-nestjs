# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект (если требуется)
RUN npm run build

# Открываем порт, который использует приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start:dev"]