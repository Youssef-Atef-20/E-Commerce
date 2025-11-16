import {Navigate} from 'react-router-dom'

const Protected = ({children}) => {
    const isAuth = localStorage.getItem("isAuth")
    return isAuth ? children : <Navigate to={"/signup"} replace/>
}

export default Protected