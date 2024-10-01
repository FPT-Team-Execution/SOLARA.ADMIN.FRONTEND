import BaseLayout from '../layouts/BaseLayout';
import {Outlet, useNavigate} from "react-router-dom";
import {useRequest} from "ahooks";
import {useAuth, useClerk, useUser} from "@clerk/clerk-react";
import {PATH_PUBLIC} from "./path.ts";
import {notification} from "antd";
import {messageHelper} from "../utils/message/helper.ts";
import {setJwtLocalStorage} from "../utils/localStorage/helper.ts";
import React from "react";

export default function PrivateRoute(): React.JSX.Element {
    const {user} = useUser();
    const {getToken} = useAuth();
    const {signOut} = useClerk();
    const navigate = useNavigate();

    useRequest(
        async (): Promise<void> => {
            // Check if user exist with role Admin
            if (!user || user.publicMetadata.role !== "Admin") {
                notification.error({
                    message: 'Error',
                    description: messageHelper.noPermission()
                })
                await signOut();
                navigate(PATH_PUBLIC.home);
                return;
            }

            const token: string | null = await getToken({template: 'Solara'});
            setJwtLocalStorage(token)

            notification.success({
                message: 'Success',
                description: messageHelper.loginSuccess()
            })
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