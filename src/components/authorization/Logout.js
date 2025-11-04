import { useNavigate } from "react-router-dom";

function LogOut ({setIsAuthenticated}) {

    const url = "http://localhost:3000/";
    const navigate = useNavigate()

    const handlLogOut = async (event) => {

        event.preventDefault();

        localStorage.removeItem('name');
        
        const response = await fetch (url + "log_out", {
            credentials:"include",
            method:"POST"
        })

        if (response.ok){
            setIsAuthenticated(false)
            navigate('/login');
        }
    }

    return (
        <form onSubmit={handlLogOut}>
            <p>Are you sure you want to log-out?</p>
            <button type="submit">Log-out</button>
        </form>
    )
}

export default LogOut;