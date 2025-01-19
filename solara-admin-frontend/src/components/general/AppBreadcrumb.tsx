import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
    title: string | JSX.Element; // Title can be a string or a JSX element
    link?: string; // Optional link for the breadcrumb item
}

interface BRProps {
    items: BreadcrumbItem[]; // Accepts an array of breadcrumb items
}

const AppBreadcrumb: React.FC<BRProps> = ({ items }) => {
    // Map the items array into the format required by the new `items` property
    const breadcrumbItems = items.map((item) => ({
        title: item.link ? <Link to={item.link}>{item.title}</Link> : item.title,
    }));

    return <Breadcrumb items={breadcrumbItems} />;
};

export default AppBreadcrumb;
