import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "app/App";

const container = document.getElementById('root');

if (!container) {
    throw new Error('Контейнер root  не найден, не удалось ымрнтировать рекат-приложение');
}

const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
);
