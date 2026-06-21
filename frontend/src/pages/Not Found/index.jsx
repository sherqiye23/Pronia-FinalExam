import Helmet from 'react-helmet'
import { useNavigate } from 'react-router'

export default function NotFound() {
    let navigate = useNavigate()
    return (
        <>
            <Helmet>
                <title>404 not found - Pronia</title>
            </Helmet>
            <div className='not-found'>
                <h1>404 not found😞</h1>
                <button onClick={() => navigate("/")}>Back to Home</button>
            </div>
        </>
    )
}
