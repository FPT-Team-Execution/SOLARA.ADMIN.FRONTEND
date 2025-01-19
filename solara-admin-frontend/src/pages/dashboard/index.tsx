import { useEffect, useState } from "react";
import { userApi } from "../../utils/axios/userApi";
import { UserDto} from "../../types/user";
import { completionApi, CompletionDto } from "../../utils/axios/completionApi";
import Charts from "../../components/dashboard/Charts";

const Dashboard = () => {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [completions, setCompletions] = useState<CompletionDto[]>([]);

    useEffect(() => {
        // Fetch Users
        userApi.getUsers({ size: 100000, page: 1 }).then((data) => {
            setUsers(data.responseRequest?.items || []);
        });

        // Fetch Completions
        completionApi.getCompletions({ size: 100000, page: 1 }).then((data) => {
            setCompletions(data.responseRequest?.items || []);
        });
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <Charts users={users} completions={completions} />
        </div>
    );
};

export default Dashboard;
