import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Avatar from 'react-avatar';

import {getCurrentUser} from "../reducers/users";
import {ProfileTabsEnum} from "../Enum/ProfileTabsEnum";

export const Profile = () => {
    const user = useSelector(getCurrentUser);
    const [activeLink, setActiveLink] = useState('movies');

    return <div className="profile">
        <div className="profile-background" />
        <div className="avatar flex flex--column">
            <Avatar name={user.email} round />
            <div className="email">{user.email}</div>
        </div>

        <div className="flex">
            <div className="tabs">
                {ProfileTabsEnum.map(link => {
                    return <div className={`tab ${activeLink === link.key ? 'tab-active' : ''}`} key={link.key}
                                onClick={() => setActiveLink(link.key)}>
                        {link.label}
                    </div>;
                })}
            </div>
        </div>
        <div className="coming-soon">
            En cours de développement...
        </div>
    </div>;
};
