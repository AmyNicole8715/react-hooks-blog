import React, { useContext } from 'react';


import CreatePost from '../post/CreatePost';
import UserBar from '../user/UserBar';
import Header from '../Header';
import ChangeTheme from '../ChangeTheme';
import { StateContext, ThemeContext } from '../contexts';

export default function HeaderBar({setTheme}) {
    const theme = useContext(ThemeContext)

    const { state } = useContext(StateContext)
    const { user } = state

    return (
        <div>
            <Header text="React Hooks Blog" />
            <ChangeTheme theme={theme} setTheme={setTheme} />
            <br />
            {/* lazy loading indicator to prevent needless render of UserBar before user has logged in*/}
            <React.Suspense fallback={"Loading..."}> 
                <UserBar />
             </React.Suspense>
            <br />
            {user && <CreatePost />}
        </div>
    )
}