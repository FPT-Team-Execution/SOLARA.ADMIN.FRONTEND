import { Navigate, Outlet } from 'react-router-dom'
import {getLocalStorage} from "../utils/localStorage/helper.ts";

export default function AuthRoute() {
    const token = getLocalStorage('token')
    return token ? <Navigate replace to='/dashboard' /> : <Outlet />
}
