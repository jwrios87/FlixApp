
// API Key
const API_KEY = '622608af1d13cd2a76947466f1ca9114';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const url = "https://api.themoviedb.org/3/search/movie?api_key=622608af1d13cd2a76947466f1ca9114";

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=622608af1d13cd2a76947466f1ca9114`;
    return url;

}

function requestMovies(url, onComplete, onError){
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function searchMovie(value) {
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;

    requestMovies(url, renderSearchMovies, handleError);
}

function getUpcomingMovies() {
    const path = '/movie/upcoming';
    const url = generateUrl(path);
 
   const render = renderMovies.bind({title:'Upcoming Movies'});

    requestMovies(url, render, handleError);
}

function topRatedMovies() {
    const path = '/movie/top_rated';
    const url = generateUrl(path);

    const render = renderMovies.bind({title:'Top Rated Movies'});

    requestMovies(url, render, handleError);
}

function getPopular() {
    const path = '/movie/popular';
    const url = generateUrl(path);

    const render = renderMovies.bind({title:'Most Popular Movies'});

    requestMovies(url, render, handleError);
}

