import { Navigate, createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../pages/dashboard'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import Topic from "../pages/topic/topicPage.tsx";
import CollectionPage from "../pages/topic/collection/collectionPage.tsx"
import Flashcard from "../pages/topic/collection/exercise/flashcardPage.tsx"
import User from "../pages/user"
import { PATH_ADMIN, PATH_PUBLIC } from "./path.ts";
import AppBreadcrumb from '../components/general/AppBreadcrumb.tsx';
import { HomeOutlined } from '@ant-design/icons';

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <SignedIn>
                    <PrivateRoute />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>
        ),
        children: [
            {
                index: true,
                element: <Navigate to={PATH_ADMIN.dashboard} />
            },
            {
                path: PATH_ADMIN.dashboard,
                element: <Dashboard />,
                handle: {
                    crumb: () => 'Dashboard'
                }
            },
            {
                path: PATH_ADMIN.topic,
                element: <Topic />,
                handle: {
                    crumb: () => <AppBreadcrumb
                        items={
                            [
                                { title: (<HomeOutlined />), link: PATH_ADMIN.dashboard },
                                { title: 'Topic' }
                            ]
                        }
                    />
                }
            },
            {
                path: PATH_ADMIN.subTopics,
                element: <CollectionPage />,
                handle: {
                    crumb: () => <AppBreadcrumb
                        items={
                            [
                                { title: (<HomeOutlined />), link: PATH_ADMIN.dashboard },
                                { title: 'Topic', link: PATH_ADMIN.topic },
                                { title: 'Sub Topics' }
                            ]
                        }
                    />
                }
            },
            {
                path: PATH_ADMIN.exercise,
                element: <Flashcard />,
                handle: {
                    crumb: () => <AppBreadcrumb
                        items={
                            [
                                { title: (<HomeOutlined />), link: PATH_ADMIN.dashboard },
                                { title: 'Topic', link: PATH_ADMIN.topic },
                                { title: 'Sub Topics' },
                                { title: 'Exercises' }
                            ]
                        }
                    />
                }
            },
            {
                path: PATH_ADMIN.user,
                element: <User />,
                handle: {
                    crumb: () => 'User'
                }
            },
            {
                path: '*',
                element: <Navigate to={PATH_PUBLIC.home} />
            }
        ]
    }
])
