import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext'; 
import configureStore from './redux/stores/configureStore'; // 
import App from './App';


const store = configureStore();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}> 
            <AuthProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);
