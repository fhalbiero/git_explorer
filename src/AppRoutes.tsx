import { lazy } from 'react';
import Home from './pages/Home';

const Users = lazy(() => import('./pages/Users'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const SearchUser = lazy(() => import('./pages/SearchUser'));
const Login = lazy(() => import('./pages/Login'));
const AuthProfilePage = lazy(() => import('./pages/AuthProfilePage'));
const NotFound = lazy(() => import('./pages/NotFound'));


export const AppRoutes = [
    { path: "/", component: Home, requiresAuth: false },
    { path: "/users", component: Users, requiresAuth: false },
    { path: "/users/user/:username", component: UserProfilePage, requiresAuth: false },
    { path: "/search", component: SearchUser, requiresAuth: false },
    { path: "/login", component: Login, requiresAuth: false },
    { path: "/auth-profile", component: AuthProfilePage, requiresAuth: true },
    { path: "*", component: NotFound, requiresAuth: false },
];
