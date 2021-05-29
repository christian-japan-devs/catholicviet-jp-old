import {useContext} from 'react'
import {authContext} from '../contexts/AuthContext'


export const ReducerButtons = () => {
    const context = useContext(authContext)
    const {isAuthenticated,login,logout} = context
    return (
        <div>
            {isAuthenticated && <div>Visable</div>}
            <button onClick={()=>login("dang","dang")}>Action One</button>
            <button onClick={logout}>Action Two</button>
        </div>
    )
}