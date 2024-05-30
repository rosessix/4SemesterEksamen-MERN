import { useEffect } from "react"
import { useNavigate } from "react-router-dom" 
const MainPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        let uid = localStorage.getItem('uid')

        if (!uid) {
            navigate('/')
            return
        }

        if (uid || uid != '') {
            
        }
    }, [])
}

export default MainPage