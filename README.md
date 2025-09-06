# SellMeThisPen
Привет!
Эта программа реализует функционал перевода речи на испанский язык, используя Web Speech API для распознавания речи прямо в браузере.

1) Склонируйте себе через git clone (https/ssh ключ)

2) Откройте в двух разных терминалах server и client
- Подтяните нод модули на сервере и клиенте (выполните **npm install**/yarn install в зависимости от вашего пакетного менеджера в папках server и client)
- Запустите server и client через команду **npm run dev** (yarn dev, если у вас yarn)

3) Перейдите по адресу http://localhost:5173/
- По кнопке Start начинается запись, по кнопке Stop заканчивается
- Для перевода на испанский нажмите Translate
- Распознанный текст появится на экране

Примечания:
- Для работы требуется современный браузер с поддержкой Web Speech API (Chrome, Edge, Safari)
- Приложение использует микрофон для записи речи
- Распознавание речи происходит в реальном времени
- Перевод осуществляется через LibreTranslate API

Обратную связь можно оставить в тг: https://t.me/moramova


____________________


Hello!

This program implements the functionality for translating speech into Spanish.

Setup:
- Clone the repository using git clone (via HTTPS or SSH).

(Optional) On the server, create a .env file in the root directory and configure it using the .env_example file as a reference.
If you skip this step, the application will run with default settings on port 3000.

Running the application:
- Navigate to both the server and client directories in your terminal and run the install command corresponding to your package manager: **npm install** (for npm) or yarn install (for Yarn)
- Open two separate terminal windows for the server and the client.
In each terminal, run the command **npm run dev** (yarn dev, if you use yarn) to start both the server and the client.

Usage:
- Go to http://localhost:5173/.
- Click the Start button to begin recording and the Stop button to end it.
- Press Translate to convert the speech to Spanish.

You can leave your feedback on Telegram: https://t.me/moramova