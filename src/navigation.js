//Buttons
searchFormBtn.addEventListener('click', () => {
  location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
});

headerTitle.addEventListener('click', () => {
  location.hash = '#homePage';

})
headerArrow.addEventListener('click', () => {
  location.hash = '#homePage';
})

function homePage() {
  console.log('Home!!');
  headerSection.classList.remove('header-container');
  //headerSection.style.background = '';
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  headerArrow.classList.add('inactive');
  frontpageSection.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  trendingTitle.classList.remove('inactive');

  categoriesPreviewSection.classList.remove('inactive');
  categoriesPrevTitle.classList.remove('inactive');
  categoriesPreviewList.classList.remove('inactive');
  searchFrom.classList.remove('inactive');
  searchFormInput.classList.remove('inactive');
  trendingPreviewList.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  
  getTrendingMoviesPreview();
  getCategoriesPreview();

}

function categoriesPage() {
  console.log('categories!!');

  headerSection.classList.add('header-container');
  //headerSection.style.background = '';
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.remove('inactive');
  frontpageSection.classList.add('inactive');
  headerArrow.classList.remove('inactive');
  trendingPreviewSection.classList.add('inactive');
  trendingTitle.classList.remove('inactive');

  categoriesPreviewSection.classList.remove('inactive');
  categoriesPrevTitle.classList.add('inactive');
  categoriesPreviewList.classList.add('inactive');
  searchFrom.classList.remove('inactive');
  searchFormInput.classList.remove('inactive');
  trendingPreviewList.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');


  const categoryId = location.hash.split('-')[0].substring(9);
  getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  console.log('Movie!!');
  
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = 'var(--purple-medium-3)';
  //headerSection.style.background = '';
  headerTitle.classList.remove('inactive');
  headerTitle.style.color = 'var(--purple-light-1)';
  headerArrow.classList.remove('inactive');
  frontpageSection.classList.add('inactive');
  searchFrom.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  trendingTitle.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  searchFrom.classList.add('inactive');
  trendingPreviewList.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
  movieDetailTitle.classList.remove('inactive');
  movieDetailScore.classList.remove('inactive');
  movieDetailDescription.classList.remove('inactive');

  // ['#movie', '234567']
  const [_, id] = location.hash.split('=');
  getMovieById(id);
   // Mostrar la sección de videos
   videoSection.classList.remove('inactive');
  
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  console.log({ location });
  
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }
  }


function searchPage() {
  console.log('Search!!');
  headerSection.classList.remove('header-container');
  //headerSection.style.background = '';
  headerTitle.classList.remove('inactive');
  frontpageSection.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  trendingTitle.classList.add('inactive');

  categoriesPreviewSection.classList.add('inactive');
  categoriesPrevTitle.classList.remove('inactive');
  categoriesPreviewList.classList.remove('inactive');
  searchFrom.classList.remove('inactive');
  searchFormInput.classList.remove('inactive');
  trendingPreviewList.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

 
  // ['#search', 'platzi']
  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);
}

function trendsPage() {
  console.log('TRENDS!!');

  headerSection.classList.remove('header-container');
  headerSection.style.background = '';
  headerTitle.classList.remove('inactive');
  frontpageSection.classList.remove('inactive');
  trendingPreviewSection.classList.remove('inactive');
  trendingTitle.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  categoryTitleText.classList.remove('inactive');
  categoriesPreviewList.classList.remove('inactive');
  searchFrom.classList.remove('inactive');
  searchFormInput.classList.remove('inactive');
  trendingPreviewList.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');


  getTrendingMovies();
}



  getTrendingMovies();
}

