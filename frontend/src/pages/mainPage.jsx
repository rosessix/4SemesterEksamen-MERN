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

    }, [])

    return (
        <p>Wowzers! Du er logget ind!</p>
    )
}

export default MainPage