import { Row, Col, Button, Input, Typography, Select, Space } from 'antd';
import { IPageRequest, IPaginate } from '../../types/general.type';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
// import { TopicDto } from '../../types/topic.type';
const { Option } = Select;
const { Text } = Typography;

interface IProps<T> {
    page?: IPaginate<T>
    query: IPageRequest
    updateQuery: (key: keyof IPageRequest, value: string | number | boolean) => void
}

const sortOptions = [
    { value: "", label: "None" },
    { value: "CreatedOn", label: "Created Date" },
    { value: "UpdatedOn", label: "Updated Date" }
];

const AppTableQuery = <T,>(props: IProps<T>) => {
    const { page, query, updateQuery } = props;

    const handleSortToggle = () => {
        updateQuery('isAscending', !query.isAscending);
    };

    return (
        <Row gutter={[16, 16]}>

            {/* Sort */}
            <Col className='flex flex-col'>
                <Text strong>Sort By:</Text>
                <Space>
                    <Select
                        style={{ width: '150px' }}
                        value={query.orderOn}
                        defaultValue=""
                        onChange={(value) => updateQuery('orderOn', value)}
                    >
                        {sortOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                    <Button 
                        onClick={handleSortToggle}
                        icon={query.isAscending ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                        type={query.orderOn ? "primary" : "default"}
                        disabled={!query.orderOn}
                    >
                        {query.isAscending ? 'ASC' : 'DESC'}
                    </Button>
                </Space>
            </Col>

            {/* Page Size */}
            <Col className="flex flex-col">
                <Text strong>Page Size:</Text>
                <Select
                    value={query.size}
                    onChange={(value) => updateQuery('size', value as number)}
                >
                    <Option value={10}>10</Option>
                    <Option value={25}>25</Option>
                    <Option value={50}>50</Option>
                    <Option value={100}>100</Option>
                </Select>
            </Col>

            {/* Pagination */}
            <Col className='flex flex-col'>
                <Text strong>Page:</Text>

                <div className='space-x-1'>
                    <Button
                        onClick={() => updateQuery('page', query.page - 1)}
                        disabled={query.page <= 1}
                        icon={'-'}
                    >
                    </Button>
                    <Input
                        className='w-12 text-center'
                        value={query.page}
                        readOnly
                    />
                    <Button
                        onClick={() => updateQuery('page', query.page + 1)}
                        disabled={query.page == page?.totalPages}
                        icon={'+'}>
                    </Button>
                </div>

            </Col>

            {/* Total Items */}
            <Col className='flex flex-col'>
                <Text strong>Total Items:</Text>

                <div>
                    <Input
                        className='w-12 text-center'
                        value={page?.total}
                        readOnly
                    />
                </div>

            </Col>

            {/* Total Pages */}
            <Col className='flex flex-col'>
                <Text strong>Total Pages:</Text>

                <div>
                    <Input
                        className='w-12 text-center'
                        value={page?.totalPages}
                        readOnly
                    />
                </div>

            </Col>

        </Row>
    );
};

export default AppTableQuery;
