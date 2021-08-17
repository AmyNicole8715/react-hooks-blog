import { useState, useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';

import { StateContext } from '../contexts';

export default function Login () {
    const { dispatch } = useContext(StateContext)
    const [ username, setUsername ] = useState('')
    const [ loginFailed, setLoginFailed ] = useState(false)
    const [ password, setPassword ] = useState('')
    
    const [ user, login ] = useResource((username, password) => ({      // in real world we would send password via POST data via HTTPS
        url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
        method: 'get'        
    }))

    useEffect(() => {
        if (user && user.data) {
            if (user.data.length > 0) {
                setLoginFailed(false)
                dispatch({ type: 'LOGIN', username: user.data[0].username})
            } else {
                setLoginFailed(true)
            }
        }
        if (user && user.error) {
            setLoginFailed(true)
        }
    }, [user])  // We make sure that the Effect Hook triggers whenever the user object from the Resource Hook updates

    function handlePassword (evt) {
        setPassword(evt.target.value)
    }

    function handleUsername (evt) {
        setUsername(evt.target.value)
    }

    return (
        <form onSubmit={e => { e.preventDefault(); login(username, password) }}>
            <label htmlFor="login-username">Username:</label>
            <input 
                type="text"
                value={username}
                onChange={handleUsername}
                name="login-username"
                id="login-username"
            />
            <label htmlFor="login-password">Password:</label>
            <input 
                type="password"
                value={password}
                onChange={handlePassword}
                name="login-password"
                id="login-password"
            />
            <input
                type="submit"
                value="Login"
                disabled={username.length === 0} //disables login button when username is empty
            />
            {loginFailed && <span style={{ color: 'red' }}> Invalid username or password</span>}
        </form>
    )
};