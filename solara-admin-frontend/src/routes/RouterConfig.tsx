import {Navigate, createBrowserRouter} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../pages/dashboard'
import {RedirectToSignIn, SignedIn, SignedOut} from '@clerk/clerk-react'
import Flashcard from "../pages/flashcard";
import {PATH_ADMIN, PATH_PUBLIC} from "./path.ts";

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
                element: <Navigate to={PATH_ADMIN.dashboard}/>
            },
            {
                path: PATH_ADMIN.dashboard,
                element: <Dashboard/>,
                handle: {
                    crumb: () => 'Dashboard'
                }
            },
            {
                path: PATH_ADMIN.flashcard,
                element: <Flashcard/>,
                handle: {
                    crumb: () => 'Flashcard'
                }
            },
            {
                path: '*',
                element: <Navigate to={PATH_PUBLIC.home}/>
            }
        ]
    }
])
