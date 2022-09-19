import React from 'react';



const Navigation = ({ onRouteChange, isSignIn }) => {
    if (isSignIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signout')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
                {/* // route should be 'signout' but it we have define 'home' and 'signin' all other like 'signout' and 'register' will go to 'register' bcoz our app.js if-else was designed like that  */}
            </nav>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
                {/* <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer"> {route === 'home' ? 'Sign Out' : 'Sign In'}</p> */}
            </nav>
        )

    }
}

export default Navigation;


