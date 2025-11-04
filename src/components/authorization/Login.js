import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const url = 'http://localhost:3000';
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSetPassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault(); // запобігаємо перезавантаженню сторінки
        const body = { email, password };

        try {
            const response = await fetch(url + '/login', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setIsAuthenticated(true);  // позначаємо успішний логін
                const name = await response.json()
                localStorage.setItem("name", name.user);
                navigate('/all');
            } else {
                setEmail('');
                setPassword('');
                alert('Login failed');
            }
        } catch (error) {
            setEmail('');
            setPassword('');
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                value={email}
                placeholder="Enter email"
                onChange={handleEmailChange}
                required
            />
            <input
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={handleSetPassword}
                required
            />
            <button type="submit">Log-in</button>
        </form>
    );
}

export default Login;