
/*
 <div class="movie">
          <section class="section">
          <img
           src="https://image.tmdb.org/t/p/w500/rZd0y1X1Gw4t5B3f01Qzj8DYY66.jpg"
           alt=""
           data-movie-id="557"
           />
           <img
           src="https://image.tmdb.org/t/p/w500/rjbNpRMoVvqHmhmksbokcyCr7wn.jpg"
           alt=""
           data-movie-id="429617"
           />

          </section>
          <div class="content">
          <p id="content-close">X</p>
              
          </div>
      </div> 
*/

// selecting elements from the DOM
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const moviesSearchable = document.querySelector('#movies-searchable');
const moviesContainer = document.querySelector("#movies-container");



function movieSelection(movies) {
    const section = document.createElement('section');
    section.classList = 'section';

    movies.map((movie) => {
        if (movie.poster_path){
            const img = document.createElement('img');
            img.src = IMAGE_URL + movie.poster_path;
            img.setAttribute('data-movie-id', movie.id);
            
            section.appendChild(img);
        }

    })
    return section;
}
function createMovieContainer(movies, title ='') {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const header = document.createElement('h2');
    header.innerHTML = title;

    const content = document.createElement('div');
    content.classList = 'content';

    const contentClose = `<p id="content-close">X</p>`;

    content.innerHTML = contentClose;

    const section = movieSelection(movies);

    movieElement.appendChild(header);
    movieElement.appendChild(section);
    movieElement.appendChild(content);
    return movieElement;

}

function renderSearchMovies(data) {
    // Data.results []
    moviesSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    moviesSearchable.appendChild(movieBlock);
}

function renderMovies(data) {
    // Data.results []
    const title = data.results;
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    moviesContainer.appendChild(movieBlock);
}



function handleError(error) {
    console.log('Error:', error);
}


buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;
    searchMovie(value);
/*  const path = '/search/movie';
    const newUrl = generateUrl(path) + '&query=' + value;

    fetch(newUrl)
    .then((res) => res.json())
    .then(renderSearchMovies)
    .catch((error) => {
        console.log('Error:', error);
    }); */

    inputElement.value = '';
    console.log('value:', value);
}

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

function createVideoTemplate(data, content) {
             //TODO
            //Display movies videos
            content.innerHTML = '<p id="content-close">X</p>';
            console.log('videos:', data);
            const videos = data.results;
            const length = videos.length > 4 ? 4 : videos.length;
            const iframeContainer = document.createElement('div');


            for (let i = 0; i < length; i++) {
                const video = videos[i]; // video
                const iframe = createIframe(video);
                iframeContainer.appendChild(iframe);
                content.appendChild(iframeContainer);

            }
}

//event delegation
document.onclick = function(event) {

    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
        
        const movieId = target.dataset.movieId;
        console.log('movieId:', movieId);

        const section = event.target.parentElement; // section
        const content = section.nextElementSibling; // content
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
        //fetch for videos
        fetch(url)
        .then((res) => res.json())
        .then((data) => createVideoTemplate(data, content))
       
        .catch((error) => {
         console.log('Error:', error);
        });

    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
    
}

searchMovie('Spiderman');
getUpcomingMovies();
topRatedMovies();
getPopular();
