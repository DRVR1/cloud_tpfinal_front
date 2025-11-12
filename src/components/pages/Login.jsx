import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

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
        console.log('handleSubmit called', { email, password })
        setError(null)
        setLoading(true)
        try {
            const res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password })
            })
            console.log('fetch response', res)
            setLoading(false)
            if (!res.ok) {
                const txt = await res.text().catch(() => '')
                throw new Error(txt || 'Error en el inicio de sesión')
            }
            const token = await res.text()
            localStorage.setItem('token', token)
            if (typeof setLoggedIn === 'function') setLoggedIn(true)
            navigate('/')
        } catch (err) {
            console.error('login error', err)
            setLoading(false)
            setError(err.message || 'Error en el inicio de sesión')
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
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Correo electrónico
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
