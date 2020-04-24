import React, {useEffect, useState} from 'react';
import {useScroll} from "react-use-gesture";
import {useSpring} from "react-spring";

import {useDebounce} from "../hooks/Debounce";
import {getLatestMovies, getPopularMovies, resetResearch, searchMovies} from "../actions/movies";
import {getFavorites} from "../actions/favorites";
import {Results, ResultsScrollable, SearchForm} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {getlatestMoviesEntities, getPopularMoviesEntities, getSearchedMovies} from "../reducers/movies";
import {getFavoritesEntities} from "../reducers/favorites";

export const Movies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(getPopularMoviesEntities);
    const latestMovies = useSelector(getlatestMoviesEntities);
    const searchedMovies = useSelector(getSearchedMovies);
    const favorites = useSelector(getFavoritesEntities);
    const [state, setState] = useState({
        isSearching: false, //todo fetching movieReducer
        active: "search", // todo remove
        query: ""
    });

    const queryDebounce = useDebounce(state.query, 500);

    useEffect(() => {
        queryDebounce && dispatch(searchMovies(queryDebounce));
    }, [queryDebounce]);

    useEffect(() => {
        if (state.query === "") {
            dispatch(resetResearch());
        }
    }, [state.query])

    useEffect(() => {
        dispatch(getPopularMovies());
        dispatch(getLatestMovies());
        dispatch(getFavorites());
    }, []);

    const onTextChange = ({target: {value}}) => {
        setState({
            ...state,
            isSearching: value.length > 0,
            query: value
        });
    };

    const clamp = (value, clampAt = 30) => {
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
        <SearchForm onTextChange={onTextChange}/>
        {state.query === "" && <React.Fragment>
            <div className="lastest-movies">Films populaires</div>
            <div className="movie-list-scrollable" {...bind()}>
                <ResultsScrollable
                    isSearching={state.isSearching}
                    movies={popularMovies}
                    springStyle={style}
                    type="movie"
                />
            </div>
            <div className="show-movies">
                <div className="lastest-movies">Films à l'affiche</div>
                <div className="movie-list">
                    <Results
                        isSearching={state.isSearching}
                        movies={latestMovies}
                        type="movie"
                    />
                </div>
            </div>
        </React.Fragment>}
        {searchedMovies && state.query !== "" && <div>
            <div className="movie-list">
                <Results
                    isSearching={state.isSearching}
                    movies={searchedMovies}
                    type="movie"
                />
            </div>
        </div>}
    </div>;
};
