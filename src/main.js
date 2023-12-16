const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDFjNDNjYjhiMDU4MmE5MGEzNWVlMDFkNmM4NGIxMiIsInN1YiI6IjY0YzJjNGI5NzUxMTBkMDBhZTFhYmQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OMp65hgZ4hRZ_eH11Q_qcJJklcjWPnGiDlTGz6vcKOg',
  },
});

const videosArray = [];
let videoListContainer = document.getElementById('videoList'); // Asegúrate de que 'videoList' es el ID correcto de tu contenedor de videos


// Llamada al API
function createMovies(movies, container) {
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach(category => {  
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

async function getTrendingMoviesPreview() {
  try {
    const { data } = await api.get('/trending/movie/day?language=en-US');
    const movies = data.results;
    console.log(movies);

    createMovies(movies, trendingPreviewList);
  } catch (error) {
    // Manejar errores aquí
    console.error('Error al obtener las películas:', error);
  }
}

async function getCategoriesPreview() {
  try {
    const { data } = await api.get('/genre/movie/list');
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
  } catch (error) {
    console.error('Error al obtener las películas:', error);
  }
}

async function getMoviesByCategory(id) {
  try {
    const { data } = await api.get('/discover/movie', {
      params: {
        include_adult: 'false',
        include_video: 'false',
        language: 'en-US',
        page: '1',
        with_genres: id,
      },
    });

    createMovies(data.results, genericSection);
  } catch (error) {
    // Manejar errores aquí
    console.error('Error al obtener las películas:', error);
  }
}

async function getMoviesBySearch(query) {
  try {
    const { data } =  await api.get('/search/movie', {
      params: { query, page: '1'},
    });
    const movies = data.results;

    createMovies(movies, genericSection);
  } catch(error) {
    console.error('Error al obtener las películas:', error);
  }
}

async function getTrendingMovies() {
  try {
    const { data } = await api.get('/trending/movie/day');
    const movies = data.results;

    createMovies(movies, genericSection);
  }  catch(error) {
    console.error('Error al obtener las películas:', error);
  }
}
async function getMovieById(id) {
  console.log(`Solicitando película con ID: ${id}`);

  try {
    const { data } = await api.get(`/movie/${id}`, {
      params: { language: 'en-US' },
    });

    const movie = data;
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

    console.log(movieImgUrl);
    const movieImageElement = document.getElementById('movieImage');
    movieImageElement.src = movieImgUrl;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    const movieDetailCategoriesList = document.getElementById('categories-list');
    createCategories(movie.genres, movieDetailCategoriesList);
    
    // Cambié la llamada para manejar los videos dentro de la función try
    await getMovieVideos(id);
  } catch (error) {
    // Manejar errores aquí
    console.error('Error al obtener la película por ID:', error);
  }
}
async function getMovieVideos(id) {
  try {
    const { data } = await api.get(`/movie/${id}/videos`, {
      params: { language: 'en-US' },
    });

    const videos = data.results;

    // Verificar si videos está definido y no es nulo, y si tiene al menos un elemento
    if (videos && videos.length > 0) {
      // Limite la cantidad de videos a mostrar
      const videosToShow = videos.slice(0, 2);

      // Resto del código para mostrar los videos en la interfaz
      console.log('Videos obtenidos:', videosToShow);
      displayVideos(videosToShow);
    }
  } catch (error) {
    // Manejar errores aquí
    console.error('Error al obtener los videos de la película:', error);
  }
}

function displayVideos(videos) {
  console.log('Mostrando videos en la interfaz:', videos);

  // Verificar si videos está definido y no es nulo
  if (videos && Array.isArray(videos)) {
    // Limite la cantidad de videos a mostrar
    const videosToShow = videos.slice(0, 2);

    // Resto del código para mostrar los videos en la interfaz
    console.log('Mostrando videos:', videosToShow);
    videoListContainer.innerHTML = ''; // Limpiar el contenedor de videos

    videosToShow.forEach(video => {
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('video-container');

      const videoIframe = document.createElement('iframe');
      videoIframe.classList.add('video-iframe');
      videoIframe.setAttribute('src', `https://www.youtube.com/embed/${video.key}`);
      videoIframe.setAttribute('frameborder', '0');
      videoIframe.setAttribute('allowfullscreen', 'true');

      videoContainer.appendChild(videoIframe);
      videoListContainer.appendChild(videoContainer);
    });
  } else {
    console.warn('No hay videos disponibles para mostrar.');
  }
}


