import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import { isEmpty } from 'lodash';

import {getSerieDetailsById, getSerieVideoBySerieId} from "../actions/series";
import {getSerieDetails} from "../reducers/series";
import {SerieDetailItem} from "./SerieDetailItem";
import {SerieTabsEnum} from "../Enum/SerieTabsEnum";
import {SerieSeasonItem} from "./SerieSeasonItem";

export const SerieDetail = () => {
    const [activeLink, setActiveLink] = useState('detail');
    const dispatch = useDispatch();
    const params = useParams();
    const id = parseInt(params.id, 10);
    const serie = useSelector(getSerieDetails);

    //todo remove
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        dispatch(getSerieDetailsById(id));
        dispatch(getSerieVideoBySerieId(id));
    }, [id]);

    const onLike = () => {
        setLiked(!liked);
    };

    return  <div className="serie-detail">
        <div
            className="picture"
            style={{
                backgroundImage: `url(${serie.picture})`,
                backgroundSize: "cover",
            }}
        />
        <div className="serie-detail-description">
            <div className="actions">
                <div className="flex justify-space-between">
                    <div>
                        <Link to="/series">
                            <i className="fas fa-arrow-left"></i>
                        </Link>
                    </div>
                    <div className={`like${ liked ? '-active' : '' }`}>
                        {liked
                            ? <i className="fas fa-heart" onClick={onLike} />
                            : <i className="far fa-heart" onClick={() => setLiked(!liked)} />
                        }
                    </div>
                </div>
            </div>
            <div className="serie-title">{serie.title}</div>
            <div className="serie-seasons">{serie.numberOfSeasons} saisons {serie.numberOfEpisodes} épisodes</div>
            <div className="serie-stars">
                {/*todo loop */}
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
            </div>
            <div className="white-block">
                <div className="tabs">
                    {SerieTabsEnum.map(link => {
                        return <div className={`tab ${activeLink === link.key ? 'tab-active' : ''}`} key={link.key} onClick={() => setActiveLink(link.key)}>
                            {link.label}
                        </div>;
                    })}
                </div>
                {activeLink === 'detail' && <SerieDetailItem serie={serie} />}
                {activeLink === 'season' && <SerieSeasonItem serie={serie} />}
            </div>
        </div>
    </div>;
};
