import {Navigate, createBrowserRouter} from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import Dashboard from '../pages/dashboard'

import {RedirectToSignIn, SignedIn, SignedOut} from '@clerk/clerk-react'

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <SignedIn>
                    <PrivateRoute/>
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn/>
                </SignedOut>
            </>
        ),
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard'/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>,
                handle: {
                    crumb: () => 'Dashboard'
                }
            },
            {
                path: '*',
                element: <Navigate to='/'/>
            }
        ]
    }
])
