import React from 'react'
import { Link } from 'react-router'

const AuthLayout = (props) => {
    const { children, titlePage, type } = props
    return (
        <div className="flex justify-center min-h-screen items-center ">
            <div className="w-full max-w-xs">
                <h1 className="text-3xl font-bold mb-2 text-blue-600">{titlePage}</h1>
                <p className="font-medium text-slate-500 mb-6">
                    Wellcome, please enter your details
                </p>
                {children}

                <p className="text-center text-sm mt-5">
                    {type === 'login' ? "Don't have an acconut? " : "Already have an account? "}
                    {type === 'login' && (<Link to='/register' className="font-bold text-blue-600">Register</Link>)}
                    {type === 'register' && (<Link to='/login' className="font-bold text-blue-600">Login</Link>)}
                </p>
            </div>
        </div>
    )
}

export default AuthLayout