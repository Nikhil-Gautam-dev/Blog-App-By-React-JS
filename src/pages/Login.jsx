import React from 'react'
import { Login as LoginComponent } from '../components'
function Login() {
  return (
    <div className='py-8'>

            <LoginComponent /> {/*bhai yha jo SignupComponent h na wo Login.jsx se import kiya h */}

    </div>
  )
}

export default Login