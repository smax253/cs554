import React from 'react';
const renderLinks = (type, innerLinkArray) => {
    const components = innerLinkArray.map((link) => {
        return (
            <li key={link.getId()}>
                <a href={`/${type}/${link.getId()}`}>{link.getName()}</a>
            </li>
        );
    });
    return <ul>{components}</ul>;
};

export default renderLinks;
