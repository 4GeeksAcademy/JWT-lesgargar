import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="text-center mt-5">
			<h1>Welcome !</h1>
			<img src="https://img.freepik.com/vector-gratis/casa-tradicional-puerta-diseno-ilustrador-vectorial_24640-46690.jpg" />
			<div className="d-flex justify-content-center">
				<Link to='/signup' className="btn btn-success rounded m-3">Signup</Link>
				<Link to='/login' className="btn btn-success rounded m-3">Login</Link>
			</div>

		</div>
	);
}; 