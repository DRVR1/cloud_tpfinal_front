import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2' // <-- IMPORTADO

export default function Login({ setLoggedIn }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const onStorage = () => setLoggedIn(Boolean(localStorage.getItem('token')))
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    async function handleSubmit(e) {
        if (e && e.preventDefault) e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Asegúrate de que el backend espera "username"
                body: JSON.stringify({ username: email, password })
            })

            // Leemos la respuesta como texto primero, sea éxito o error
            const responseBody = await res.text();
            setLoading(false)

            if (!res.ok) {
                // Caso de error (ej. 401 Unauthorized)
                let errorMessage = 'Usuario o contraseña incorrectos'; // Mensaje por defecto
                try {
                    // Intenta parsear el JSON de error de Spring
                    const errorJson = JSON.parse(responseBody);
                    if (errorJson.message && errorJson.message.includes('Bad credentials')) {
                        errorMessage = 'Usuario o contraseña incorrectos.';
                    } else if (errorJson.message) {
                        errorMessage = errorJson.message; // Usa el mensaje de Spring
                    }
                } catch (parseError) {
                    // No era JSON, pero 'responseBody' puede tener texto
                    if (responseBody) {
                        errorMessage = responseBody;
                    }
                }
                throw new Error(errorMessage); // Lanza al catch de abajo
            }

            // Caso de éxito (res.ok es true)

            // Revisa el caso "Not logged" con status 200 OK
            if (responseBody === 'Not logged') {
                throw new Error('No se pudo autenticar.'); // Lanza al catch de abajo
            }

            // ÉXITO REAL
            const token = responseBody; // El body es el token string
            localStorage.setItem('token', token)
            if (typeof setLoggedIn === 'function') setLoggedIn(true)
            navigate('/')

        } catch (err) {
            console.error('login error', err)
            setLoading(false)
            setError(err.message || 'Error en el inicio de sesión')

            // MOSTRAR SWEET ALERT
            Swal.fire({
                icon: 'error',
                title: 'Login Fallido',
                // err.message ahora tiene el mensaje de error limpio
                text: err.message,
                confirmButtonText: 'Intentar de nuevo'
            })
        }
    }

    function handleLogout() {
        localStorage.removeItem('token')
        setLoggedIn(false)
        navigate('/')
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Iniciar sesión
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            {/* Importante: El label dice Correo, pero el backend espera 'username' */}
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Correo electrónico (Username)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Contraseña
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Olvidé mi contraseña
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        No tengo una cuenta {' '}
                        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Registrarse
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}