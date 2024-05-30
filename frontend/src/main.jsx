import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/mainPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App/>}/>
				<Route path="/main" element={<MainPage/>}/>
				<Route path="*" element={<h1 className="text-center text-3xl">404 - Page not found</h1>}/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
)
