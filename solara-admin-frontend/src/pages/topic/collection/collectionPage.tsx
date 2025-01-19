import { useNavigate, useSearchParams } from 'react-router-dom';
import CollectionsTable from '../../../components/collection/CollectionsTable'
import { PATH_ADMIN } from '../../../routes/path';
import { useEffect } from 'react';

const CollectionPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const topicId = searchParams.get('topicId');

    useEffect(() => {
        if (!topicId) { // Kiểm tra nếu topicId là null, undefined hoặc rỗng
            navigate(PATH_ADMIN.topic);
        }
    }, [topicId, navigate]);

    return (
        <div>
            <CollectionsTable topicId={topicId!}></CollectionsTable>
        </div>
    )
}

export default CollectionPage
