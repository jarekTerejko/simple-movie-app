const apiKey = 'fe6ad327';
const moviesContainer = document.querySelector('#movies');

const movieSelected = (id) => {
	sessionStorage.setItem('movieID', id);
	window.location = 'movie.html';
	return false;
}

const getMovies = (searchText) => {
	console.log(searchText);

	fetch(`https://www.omdbapi.com/?s=${searchText}&apikey=${apiKey}`)
		.then(res => res.json())
		.then(res => {
			console.log(res);
			const movies = res.Search;
			let output = '';
			movies.forEach(movie => {
				output +=
					`<div class="movie-container">
                    <div class="poster-container">
                        <img src="${movie.Poster}">
                    </div>
                    <h5>${movie.Title}</h5>
                    <p>${movie.Year}</p>
                    <a onclick="movieSelected('${movie.imdbID}')" href="#" class="btn btn-primary">Details</a>
                </div>`
			});

			moviesContainer.innerHTML = output;

		})
		.catch(err => {
			console.log(err);
			const errosMSg = document.createElement('h3');
			errosMSg.classList.add('error');
			errosMSg.textContent = 'Movie not found :(';
			moviesContainer.innerHTML = '';
			moviesContainer.appendChild(errosMSg);

		})
	document.querySelector('#searchText').value = '';
}

const searchMovie = (e) => {
	e.preventDefault();
	const searchText = document.querySelector('#searchText').value;
	if (searchText !== '') {
		getMovies(searchText);
	}

}

const getMovie = () => {

	let movieID = sessionStorage.getItem('movieID');

	fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`)
		.then(res => res.json())
		.then(res => {
			console.log(res);

			const movie = res;

			let output = `
            <div class="movie-poster">
                <img src="${movie.Poster}">
            </div>
            <div class="movie-details">
            <header><h2>${movie.Title} <span>(${movie.Year})</span></h2></header>
                <ul>
                    <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Screenplay: </strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Cast: </strong>${movie.Actors}</li>
                    <li class="list-group-item"><strong>IMDb Rating: </strong>${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Runtime: </strong>${movie.Runtime}</li>
                    <li class="list-group-item"><strong>Awards: </strong>${movie.Awards}</li>
                </ul>
            </div>
            <div class="movie-plot">
                <h3>Opis:</h3>
                <p>${movie.Plot}</p>
            </div>
            <div class="btns-container">
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank">IMDb</a>
                <a href="index.html">Back</a>
            </div>
            `
			document.querySelector('.movie').innerHTML = output;
		})
		.catch(err => {
			console.log(err);
		})

}

if (document.querySelector('#searchForm') !== null) {
	document.querySelector('#searchForm').addEventListener('submit', searchMovie);
}
