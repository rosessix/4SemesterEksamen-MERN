import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from './modules/axiosInstance'
import { useNavigate } from 'react-router-dom'

function App() {
	const navigate = useNavigate()
	const [loginState, setLoginState] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const submitForm = async () => {
		if (!username || !password) return alert('Du skal udfylde felterne.')

		//Udfør login
		if (loginState) {
			axios.post('/users/login', {
				name: username,
				password: password
			}).then(data => {
				let userId = data?.userId

				if (userId) {
					localStorage.setItem('uid', userId)
				}

				navigate('/main')
				
			}).catch(data => {
				handleErrors(data)
			})
		} else { // udfør registrering
			axios.post('/users/create', {
				name: username,
				password: password
			}).catch(data => {
				handleErrors(data)
			}) 
		}
	}

	const handleErrors = (err) => {
		let errMsg = err.response?.data?.error
		if (errMsg == undefined) errMsg = err.message
		console.log(errMsg)
		alert(errMsg)
	}

	return (
		<div className="w-screen h-screen bg-[#202020] flex justify-center items-center text-white">
			<div className="w-96 h-96">
				<h1 className="text-3xl">{loginState ? 'Velkommen tilbage!' : 'Godt at møde dig!'}</h1>
				<h1 className="text-sm text-zinc-400">{loginState ? 'Vi har savnet dig!' : 'Indtast din oplysninger for at komme igang!'}</h1>
				<div className="mt-2">
					<label htmlFor="input-username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brugernavn</label>
					<input type="text" id="input-username" onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
				</div>
				<div className="mt-2">
					<label htmlFor="input-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adgangskode</label>
					<input type="password" id="input-password" onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
				</div>
				<div className="w-full flex justify-center items-center mt-2 flex-col">
					<p className="text-xs mb-2 text-zinc-400 hover:text-blue-500 cursor-pointer" onClick={() => setLoginState(!loginState)}>{!loginState ? 'Har du allerede en konto? Skift til login' : 'Har du ikke en konto? Skift til oprettelse'}</p>
					<button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full" onClick={() => submitForm()}>{loginState ? 'Login' : 'Opret konto'}</button>
				</div>
			</div>
		</div>
	)
}

export default App
