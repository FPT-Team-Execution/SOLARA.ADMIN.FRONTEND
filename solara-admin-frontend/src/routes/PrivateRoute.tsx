import BaseLayout from '../layouts/BaseLayout'
import {Outlet} from "react-router-dom";

export default function PrivateRoute() {

    return (
        <BaseLayout>
            <Outlet />
        </BaseLayout>
    )
}
