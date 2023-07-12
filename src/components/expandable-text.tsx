"use client"
import React, { useState } from 'react';

interface ExpandableTextProps {
    text: string;
    limit: number;
}

const ExpandableText = ({ text, limit }: ExpandableTextProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    if (text.length <= limit) {
        return <p className="text-sm text-grey-80">{text}</p>;
    }

    return (
        <p className="text-sm text-grey-80">
            {isExpanded ? text : `${text.substring(0, limit)}...`}
            <span 
                onClick={toggleExpand} 
                className="text-sm text-white cursor-pointer"
            >
                {isExpanded ? ' Read Less' : ' Read More'}
            </span>
        </p>
    );
};

export default ExpandableText;
