import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function MyHome() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/')
        }

    }, [])
    return (
        <div>
            <h1>Bienvenido a tu Home</h1>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/011/803/090/small_2x/room-inside-interior-cartoon-living-room-house-with-furniture-stairs-teenage-luxury-room-kid-or-child-home-free-vector.jpg" alt="interior del home" />
        </div>
    )
}