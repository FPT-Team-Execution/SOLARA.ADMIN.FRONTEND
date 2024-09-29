import BaseLayout from '../layouts/BaseLayout';
import {Outlet, useNavigate} from "react-router-dom";
import {useRequest} from "ahooks";
import {useClerk, useUser} from "@clerk/clerk-react";
import {PATH_PUBLIC} from "./path.ts";
import {notification} from "antd";
import {NoPermission} from "../utils/message/helper.ts";

export default function PrivateRoute() {
    const {user} = useUser();
    const {signOut} = useClerk();
    const navigate = useNavigate();

    useRequest(
        async () => {
            // Check if user exist with role Admin
            if (!user || user.publicMetadata.role !== "Admin") {
                notification.error({
                    message: 'Error',
                    description: NoPermission()
                })
                await signOut();
                navigate(PATH_PUBLIC.home);
            }
        },
        {
            onError(e) {
                signOut().then(() => navigate(PATH_PUBLIC.home));
                console.error(e);
            },
            // Config calling
            refreshDeps: [user], // Call back when user change
            manual: !user // Call only when user exist
        }
    );

    // Hiển thị layout cho các route con
    return (
        <>
            {
                user !== null && user!.publicMetadata.role === "Admin"
                    ?
                    (
                        <BaseLayout>
                            <Outlet/>
                        </BaseLayout>
                    )
                    :
                    (
                        <></>
                    )
            }
        </>
    );
}
