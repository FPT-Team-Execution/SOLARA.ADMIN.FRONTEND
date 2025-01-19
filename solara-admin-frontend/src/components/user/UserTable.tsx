import { useState } from "react";
import { UserDto } from "../../types/user";
import { IPageRequest, IPaginate } from "../../types/general.type";
import { useRequest } from "ahooks";
import  {userApi}  from "../../utils/axios/userApi";
import { Button, Space, Table, TableProps } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { formatDateTime } from "../../utils/funcs/datetimeHelper";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import CreateUser from "./CreateUser";
import AppTableQuery from "../general/AppTableQuery";

const UserTable = () => {
    const [users, setUsers] = useState<UserDto[] | undefined>([]);
    const [page, setPage] = useState<IPaginate<UserDto> | undefined>();
    const [query, setQuery] = useState<IPageRequest>({
        page: 1,
        size: 10,
        isAscending: false,
    });

    const updateQuery = (key: keyof IPageRequest, value: string | number | boolean) => {
        setQuery((prevQuery) => ({
            ...prevQuery,
            [key]: value,
        }));
    };

    const { loading, refresh } = useRequest(async () => {
        const response = await userApi.getUsers(query);
        setUsers(response.responseRequest?.items);
        setPage(response.responseRequest);
    }, {
        refreshDeps: [query]
    });

    const columns: TableProps<UserDto>['columns'] = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Created At',
            dataIndex: 'createdOn',
            key: 'createdOn',
            render: (datetime) => formatDateTime(datetime)
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: UserDto) => (
                <Space size="small">
                    <EditUser user={record} handleReloadTable={refresh} />
                    <DeleteUser handleReloadTable={refresh} id={record.userId} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="flex float-end space-x-2 p-4">
                <Button type="dashed" onClick={refresh} icon={<ReloadOutlined />}>
                    Reload
                </Button>
                <CreateUser handleReloadTable={refresh} />
            </div>

            <div className="flex float-start space-x-2 p-4">
                <AppTableQuery 
                    page={page} 
                    query={query} 
                    updateQuery={updateQuery}
                />
            </div>

            <div>
                <Table 
                    loading={loading} 
                    className="shadow" 
                    dataSource={users} 
                    columns={columns} 
                    pagination={false} 
                />
            </div>
        </div>
    );
};

export default UserTable;