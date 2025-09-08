import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {

    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
        confirmPassword: ''

    })
    const [missingField, setMissingField] = useState({})
    const [msg, setMsg] = useState('')

    const errorMessage = () => {
        const messages = {}
        if (!inputValue.email.trim()) {
            messages.email = 'Por favor ingresa un correo'
        }
        if (!inputValue.password.trim() || inputValue.password.length < 6) {
            messages.password = 'Por favor ingresa una contraseña con al menos 6 caracteres'
        }
        if (inputValue.confirmPassword !== inputValue.password) {
            messages.confirmPassword = 'Las contraseñas no coinciden'
        }
        return messages
    }

    const onChange = (e) => {
        setInputValue((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }))
        if (e.target.value !== '') {
            setMissingField((prevMissing) => ({ ...prevMissing, [e.target.name]: '' })) //cleans errors
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        const errorMsg = errorMessage()
        setMissingField(errorMsg)
        if (Object.keys(errorMsg).length > 0) return;


        try {
            const response = await fetch('https://super-duper-trout-xggv7g9j9xwcvx44-3001.app.github.dev/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': inputValue.email,
                    'password': inputValue.password
                })
            })

            const data = await response.json()


            if (response.status === 200) {
                const token = data.access_token
                localStorage.setItem('token', token)
                navigate('/my-home')
            }

            if (response.status === 400) {
                setMsg('El usuario ya existe')
                return
            }



        } catch (error) {
            console.log(error)

        } finally {
            setInputValue({
                email: '',
                password: '',
                confirmPassword: ''
            })
        }


    }

    return (
        <div className="container ">
            <h4>Crear una cuenta</h4>
            <div className="m-3 p-2 shadow">
                <form onSubmit={handleSubmit} className="d-flex flex-column ">
                    <div className="mb-3">
                        <label>Correo</label>
                        <input
                            className={`form-control ${missingField.email ? 'is-invalid' : ''}`}
                            name="email"
                            type="email"
                            value={inputValue.email}
                            onChange={onChange}
                        />
                        {missingField.email && <div className="invalid-feedback">{missingField.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label>Contraseña</label>
                        <input
                            className={`form-control ${missingField.password ? 'is-invalid' : ''}`}
                            name="password"
                            type="password"
                            value={inputValue.password}
                            onChange={onChange}
                        />
                        {missingField.password && <div className="invalid-feedback">{missingField.password}</div>}
                    </div>
                    <div className="mb-3">
                        <label>Confirmar contraseña</label>
                        <input
                            className={`form-control ${missingField.confirmPassword ? 'is-invalid' : ''}`}
                            name="confirmPassword"
                            type="password"
                            value={inputValue.confirmPassword}
                            onChange={onChange}
                        />
                        {missingField.confirmPassword && <div className="invalid-feedback">{missingField.confirmPassword}</div>}
                    </div>

                    <button type="submit" className="btn btn-success">Crear cuenta</button>

                </form>

            </div>
            <div className="text-center ">
                {msg && (
                    <h3 className='text-danger'>{msg}</h3>
                )}
                <h6>Ya tengo una cuenta</h6>
                <Link to='/login' className={`${msg ? 'btn btn-success' : 'btn shadow'}`}>Iniciar sesión</Link>
            </div>
        </div>
    )
}