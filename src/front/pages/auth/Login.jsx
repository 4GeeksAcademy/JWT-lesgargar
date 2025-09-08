import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState({
        email: '',
        password: ''
    })
    const [badLogin, setBadLogin] = useState('') //this message wil show if login is not correct

    const onChange = (e) => {
        setInputValue((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }))
        setBadLogin('')
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('https://super-duper-trout-xggv7g9j9xwcvx44-3001.app.github.dev/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        'email': inputValue.email,
                        'password': inputValue.password
                    }
                )
            })

            const data = await response.json()

            if (response.status === 200) {
                navigate('/my-home')
            }

            if (!response.ok) {
                setBadLogin('Usuario o contraseña incorrectos')
                return
            }

        } catch (error) {
            console.log(error)
        } finally {
            setInputValue({
                email: '',
                password: '',
            })
        }


    }
    return (
        <div className="container ">
            <h4>Iniciar sesión</h4>
            {badLogin && (
                <h5 className="text-danger" >{badLogin}</h5>
            )}
            <div className="m-3 p-2 shadow">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>
                            Email
                        </label>
                        <input
                            className={`form-control`}
                            value={inputValue.email}
                            name="email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label>
                            Password
                        </label>
                        <input
                            className={`form-control`}
                            type="password"
                            value={inputValue.password}
                            name="password"
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-success" >Iniciar sesión</button>
                </form>
            </div>
            <div className="text-center">
                <h4>No tienes cuenta?</h4>
                <Link to='/signup' className="btn rounded shadow" >Crear una cuenta</Link>
            </div>
        </div>
    )
}