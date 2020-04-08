import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";

import {getMovieDetail} from "../reducers/movies";
import {getMovieDetailsById, getMovieVideoById} from "../actions/movies";
import moment from "moment";
import {MovieDetailItem} from "./MovieDetailItem";

export const MovieDetail = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const id = parseInt(params.id, 10);
    const movie = useSelector(getMovieDetail);

    //todo remove
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        dispatch(getMovieDetailsById(id));
        dispatch(getMovieVideoById(id));
    }, [id]);
    
    return  <div className="serie-detail">
        <div
            className="picture"
            style={{
                backgroundImage: `url(${movie.picture})`,
                backgroundSize: "cover",
            }}
        />
        <div className="serie-detail-description">
            <div className="actions">
                <div className="flex justify-space-between">
                    <div>
                        <Link to="/">
                            <i className="fas fa-arrow-left" />
                        </Link>
                    </div>
                    <div className={`like${ liked ? '-active' : '' }`}>
                        {liked
                            ? <i className="fas fa-heart" onClick={() => setLiked(!liked)} />
                            : <i className="far fa-heart" onClick={() => setLiked(!liked)} />
                        }
                    </div>
                </div>
            </div>
            <div className="serie-title">{movie.title}</div>
            <div className="serie-seasons">
                {(movie.runtime / 60).toFixed(2).split('.').join('h')}. {moment(movie.date).format('D MMM Y')}
            </div>
            <div className="serie-stars">
                {/*todo loop */}
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
            </div>
            <div className="white-block">
                <MovieDetailItem movie={movie} />
            </div>
        </div>
    </div>;
};
