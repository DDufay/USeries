import React, {useEffect, useState} from 'react';
import { useScroll } from "react-use-gesture";
import { useSpring } from "react-spring";

import {useDebounce} from "../hooks/Debounce";
import {getLatestMovies, getPopularMovies} from "../actions/movies";
import {getFavorites} from "../actions/favorites";
import {Results, ResultsScrollable} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {getlatestMoviesEntities, getPopularMoviesEntities} from "../reducers/movies";
import {getFavoritesEntities} from "../reducers/favorites";

export const Movies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(getPopularMoviesEntities);
    const latestMovies = useSelector(getlatestMoviesEntities);
    const favorites = useSelector(getFavoritesEntities);
    const [state, setState] = useState({
        isSearching: false, //todo fetching movieReducer
        active: "search", // todo remove
        query: ""
    });

    const queryDebounce = useDebounce(state.query, 500);

    useEffect(() => {
        queryDebounce && dispatch(getPopularMovies(queryDebounce));
    }, [queryDebounce]);

    useEffect(() => {
        dispatch(getPopularMovies());
        dispatch(getLatestMovies());
        dispatch(getFavorites());
    }, []);

    const onTextChange = ({ target: { value } }) => {
        setState({
            ...state,
            isSearching: value.length > 0,
            query: value
        });
    };

    const clamp = (value: number, clampAt: number = 30) => {
        if (value > 0) {
            return value > clampAt ? clampAt : value;
        } else {
            return value < -clampAt ? -clampAt : value;
        }
    };

    const [style, set] = useSpring(() => ({
        transform: "perspective(500px) rotateY(0deg)"
    }));

    const bind = useScroll(event => {
        set({
            transform: `perspective(500px) rotateY(${
                event.scrolling ? clamp(event.delta[0]) : 0
            }deg)`
        });
    });

    return <div className="movies">
        {/*<SearchForm onTextChange={onTextChange} />*/}
        <div className="lastest-movies">Films populaires</div>
        <div className="movie-list-scrollable" {...bind()}>
            <ResultsScrollable
                isSearching={state.isSearching}
                movies={popularMovies}
                springStyle={style}
            />
        </div>
        <div className="show-movies">
            <div className="lastest-movies">Films à l'affiche</div>
            <div className="movie-list">
                <Results
                    isSearching={state.isSearching}
                    movies={latestMovies}
                />
            </div>
        </div>
    </div>;
};
