import React, { useState } from 'react';

interface AccordionItem {
    title: string;
    content: string;
}

interface AccordionProps {
    accordionData: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ accordionData }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleAccordionToggle = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="menu-management accordion">
            {accordionData.map((item, index) => (
                <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${activeIndex === index ? 'active' : ''}`} type="button" onClick={() => handleAccordionToggle(index)}
                        >
                            {item.title}
                        </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}>
                        <div className="accordion-body">{item.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
