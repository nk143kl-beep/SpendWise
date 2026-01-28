import React from 'react';
import { useParams } from 'react-router-dom';
import './GenericPage.css';

const GenericPage = () => {
    const { pageId } = useParams();

    // Convert slug to title case (e.g., "about-us" -> "About Us")
    const title = pageId
        ? pageId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Page Not Found';

    return (
        <div className="generic-page-container">
            <div className="generic-card">
                <h1>{title}</h1>
                <p>This is the <strong>{title}</strong> page.</p>
                <p>Content for this section is coming soon.</p>

                <div className="placeholder-content">
                    <div className="line line-1"></div>
                    <div className="line line-2"></div>
                    <div className="line line-3"></div>
                </div>
            </div>
        </div>
    );
};

export default GenericPage;
