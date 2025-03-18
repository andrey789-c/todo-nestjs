# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --force

# Копируем исходный код
COPY . .

# Открываем порт, который использует приложение
EXPOSE 80

RUN npm run build

CMD ["npm", "run", "preview"]