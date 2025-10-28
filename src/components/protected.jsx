import {Navigate} from 'react-router-dom'

const Protected = (children) => {
    const isAuth = localStorage.getItem("isAuth")
    return isAuth ? children : <Navigate to={"/SignUp"} replace/>
}

export default Protected