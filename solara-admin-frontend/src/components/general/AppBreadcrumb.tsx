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

const AppBreadcrumb: React.FC<BRProps> = ({ items }) => (
    <Breadcrumb>
        {items.map((item, index) => (
            <Breadcrumb.Item key={index}>
                {item.link ? <Link to={item.link}>{item.title}</Link> : item.title}
            </Breadcrumb.Item>
        ))}
    </Breadcrumb>
);

export default AppBreadcrumb;
