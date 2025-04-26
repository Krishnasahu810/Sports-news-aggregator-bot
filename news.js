const newsContainer = document.getElementById('newsContainer');
const searchInput   = document.getElementById('searchInput');

async function fetchNews(query = '') {
  const apiKey = 'pub_82715bacdfcc77427cfe845cae00e1397ebfd'; // your Newsdata.io key
  const url    = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&language=en&q=${encodeURIComponent(query)}`;
  const res    = await fetch(url);
  const data   = await res.json();
  return data.results || [];
}

async function renderNews(query) {
  newsContainer.innerHTML = '<div class="loader">Loading news...</div>';
  const articles = await fetchNews(query);
  newsContainer.innerHTML = '';
  for (let art of articles) {
    const summary = art.description || art.content || 'No content';
    const card    = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <h2>${art.title}</h2>
      <p>${summary.length > 200 ? summary.slice(0,200) + '...' : summary}</p>
      <a href="${art.link}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(card);
  }
}

searchInput.addEventListener('input', () => {
  renderNews(searchInput.value);
});

// initial load
renderNews();
