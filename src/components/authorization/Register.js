import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState("");
    const url = 'http://localhost:3000';
    const navigate = useNavigate()


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSetPassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSetName = (event) =>{
        setName(event.target.value);
    }

    const handleRegister = async (event) => {
        event.preventDefault(); // запобігаємо перезавантаженню сторінки
        const body = { email, password, name };

        try {
            const response = await fetch(url + '/register', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                navigate('/login');
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
        <form onSubmit={handleRegister}>
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
            <input type="text" placeholder="Enter name" onChange={handleSetName} value={name}/>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;