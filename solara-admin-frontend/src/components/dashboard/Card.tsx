import React from "react";

interface CardProps {
    title: string;
    value: number | string;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
    return (
        <div
            style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                flex: 1,
                textAlign: "center"
            }}
        >
            <h3>{title}</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
        </div>
    );
};

export default Card;
