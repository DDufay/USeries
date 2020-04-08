export const Serie = data => {
    return {
        id: data.id || '',
        title: data.name || '',
        date: data.first_air_date || '',
        overview: data.overview || '',
        vote: data.vote_average || '',
        picture: data.poster_path ? process.env.REACT_APP_MOVIE_DB_IMG + 'w300' + data.poster_path : process.env.PUBLIC_URL + '/placeholder.png',
    }
};
