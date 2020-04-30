import React from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import { animated } from "react-spring";
import { isEmpty } from 'lodash';

import {postEntity} from "../api/Database";
import {Collections} from "../api/Collections";
import {useDispatch, useSelector} from "react-redux";
import {getFavoritesEntities} from "../reducers/favorites";
import {deleteFavorite, getFavorites} from "../actions/favorites";
import {signOut} from "../api/Auth";

export const Header = ({ currentUser }) => {
    const location = useLocation();

    const onLogout = () => {
        signOut();
        window.location.reload();
    };

    return (
        <header>
            <span>USeries</span>
            <div className="nav">
                <Link to="/" className={`nav-item${location.pathname === '/' ? '-active' : ''}`}>
                    <i className="fas fa-film" /> &nbsp; <span className="menu-item">Films</span>
                </Link>
                <Link to="/series" className={`nav-item${location.pathname === '/series' ? '-active' : ''}`}>
                    <i className="fas fa-video" /> &nbsp; <span className="menu-item">Séries</span>
                </Link>
                {/*<Link to="/groups" className={`nav-item${location.pathname === '/groups' ? '-active' : ''}`}>*/}
                {/*    <i className="fas fa-comments" /> &nbsp; Groupes*/}
                {/*</Link>*/}
            </div>
            {isEmpty(currentUser)
                ?
                <div>
                    <Link className="nav-item" to="/login">
                        <i className="fas fa-sign-in-alt" aria-hidden="true"/> &nbsp; <span className="menu-item">Connexion</span>
                    </Link>
                    <Link className="nav-item" to="/register">
                        <i className="fas fa-user-plus" aria-hidden="true"/> &nbsp; <span className="menu-item">Inscription</span>
                    </Link>
                </div>
                : <div className="flex">
                    <Link className="nav-item" to="/profile">
                        <i className="fas fa-user" aria-hidden="true"/> &nbsp; <span className="menu-item">profil</span>
                    </Link>
                    <div onClick={onLogout} className="logout">
                        <i className="fas fa-sign-out-alt" aria-hidden="true"/> &nbsp; <span className="menu-item">Déconnexion</span>
                    </div>
                </div>
            }
        </header>
    );
};

const FavoriteBtn = ({ toggleFavorite, movie }) => {
    const favorites = useSelector(getFavoritesEntities);
    const dispatch = useDispatch();
    const isFavorite = !!favorites.find(favorite => favorite.id === movie.id);

    return (
        <button className={`${isFavorite ? '' : 'not-'}favorite`} onClick={() => {
            toggleFavorite();
            if (isFavorite) {
                dispatch(deleteFavorite(movie, favorites));
            } else {
                postEntity(Collections.favorites, movie);
                dispatch(getFavorites());
            }
        }}>
            <i className={`${isFavorite ? 'fas' : 'far'} fa-star`} />
            &nbsp; <span>{isFavorite ? 'Remove' : 'Add Favorites'}</span>
        </button>
    );
};

const Result = ({ movie, type }) => {
    return (
        <div className="movie">
            <Link to={`${type}/${movie.id}`}>
                <div
                    className="poster"
                    style={{
                        backgroundImage: `url(${movie.picture})`,
                        backgroundSize: "cover"
                    }}
                />
            </Link>
            <div className="movie-detail">
                <a target="_blank" href="#">
                    {movie.title}
                </a><br/>
                <div className="flex justify-space-between">
                    <div className="vote-rate">{movie.date.slice(0,4)}</div>
                    <div className="vote-rate"><i className="fas fa-star" /> {movie.vote}</div>
                </div>
            </div>
            {/*<FavoriteBtn activeLink={activeLink} movie={movie} />*/}
        </div>
    );
};

const SearchForm = ({ onTextChange, value, onClear }) => {
    return (
        <div className="search">
            <div>
                <input
                    type="text"
                    id="title"
                    placeholder="Search movie title..."
                    value={value}
                    onChange={onTextChange}
                />
                <div onClick={onClear} className="btn btn-danger">
                    <i className="fas fa-times" />
                </div>
            </div>
            <p className="error" />
        </div>
    );
};

const Results = ({ movies, type }) => {
    if (movies.length === 0) {
        return <p>No results :(</p>;
    }

    return movies.map((movie, key) => {
        return <Result key={key} movie={movie} type={type} />;
    });
};

const ResultsScrollable = ({ movies, springStyle, type }) => {
    if (movies.length === 0) {
        return <p>No results :(</p>;
    }

    return movies.map((movie, key) => {
        return <animated.div className="movie" key={key} style={springStyle}>
            <Link to={`${type}/${movie.id}`}>
                <div
                    className="poster"
                    style={{
                        backgroundImage: `url(${movie.picture})`,
                        backgroundSize: "cover"
                    }}
                />
            </Link>
            <div className="movie-detail">
                <a target="_blank" href="#">
                    {movie.title}
                </a><br/>
                <div className="flex justify-space-between">
                    <div className="vote-rate">{movie.date.slice(0,4)}</div>
                    <div className="vote-rate"><i className="fas fa-star" /> {movie.vote}</div>
                </div>
            </div>
        </animated.div>;
    });
};
export { Results, ResultsScrollable, SearchForm };
