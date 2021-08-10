import { useReducer, useEffect, useState } from 'react';

import { ThemeContext } from './context';

import PostList from './post/PostList';
import CreatePost from './post/CreatePost';
import UserBar from './user/UserBar';
import Header from './Header';
import ChangeTheme from './ChangeTheme';

import appReducer from './reducers';

const defaultPosts = [
  { title: 'React Hooks', content: 'The greatest thing since sliced bread!', author: 'Tyrone Biggums' },
  { title: 'Using React Fragments', content: 'Keeping the DOM tree clean!', author: 'Tyrone Biggums' }
]



export default function App () {
  const [ theme, setTheme ] = useState({ 
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral'
  })
  const [ state, dispatch ] = useReducer(appReducer, { user:'', posts:defaultPosts })
  const { user, posts } = state
  
  useEffect (() => {
    if (user) {
      document.title = `${user} - React Hooks Blog`
    } else {
        document.title= 'React Hooks Blog'
    }
  });

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ padding: 8 }}>
        <Header text="React Hooks Blog" />
        <ChangeTheme theme={theme} setTheme={setTheme} />
        <br />
        <UserBar 
          user={user} 
          dispatch={dispatch}
        />
        <br />
        {user && <CreatePost 
          user={user} 
          posts={posts} 
          dispatch={dispatch} 
        />}
        <br />
        <hr />
        <PostList posts={posts} />
      </div>
    </ThemeContext.Provider >
  )
}