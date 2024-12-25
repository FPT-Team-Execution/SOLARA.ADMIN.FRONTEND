import { Navigate, createBrowserRouter, useParams } from 'react-router-dom'
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
import FlashcardsTable from '../components/flashcard/FlashcardsTable.tsx';
import MainLayout from '../layouts/MainLayout';
import ExerciseTypePage from '../pages/exerciseType/ExerciseTypePage';
import LearningPackagePage from '../pages/learningPackage/LearningPackagePage';

const FlashcardsView = () => {
    const { subTopicId } = useParams();
    return <FlashcardsTable subTopicId={subTopicId || ''} />;
};

const ExerciseBreadcrumb = () => {
    const { topicId } = useParams();
    return <AppBreadcrumb
        items={[
            { title: (<HomeOutlined />), link: PATH_ADMIN.dashboard },
            { title: 'Topic', link: PATH_ADMIN.topic },
            { title: 'Sub Topics', link: `${PATH_ADMIN.subTopics}?topicId=${topicId}` },
            { title: 'Exercises' }
        ]}
    />;
};

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
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
                path: `${PATH_ADMIN.exercise}/:topicId/:subTopicId`,
                element: <Flashcard />,
                handle: {
                    crumb: () => <ExerciseBreadcrumb />
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
                path: `${PATH_ADMIN.exercise}/:topicId/:subTopicId/flashcards`,
                element: <FlashcardsView />
            },
            {
                path: 'exercise-types',
                element: <ExerciseTypePage />
            },
            {
                path: '/learning-packages',
                element: <LearningPackagePage />,
            },
            {
                path: '*',
                element: <Navigate to={PATH_PUBLIC.home} />
            }
        ]
    }
])
