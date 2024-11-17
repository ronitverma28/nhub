const API_KEY = "70ffc9f537aa4b3e93cc82e32b3508be";
const baseUrl = "https://newsapi.org/v2/everything?q=";
const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Use a proxy to bypass CORS restrictions

// Event listener for initial news fetch
window.addEventListener("load", () => fetchNews("India"));

// Async function to fetch news data
async function fetchNews(query) {
    try {
        const res = await fetch(`${proxyUrl}${baseUrl}${query}&apiKey=${API_KEY}`);
        const data = await res.json();

        if (!data.articles || data.articles.length === 0) {
            document.getElementById("card-container").innerHTML = "<p>No news found.</p>";
            return;
        }

        renderNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error.message, error.stack);

        document.getElementById("card-container").innerHTML = "<p>Error fetching news. Please try again later.</p>";
    }
}

// Function to render news articles on the page
function renderNews(articles) {
    let output = "";
    articles.forEach(article => {
        if (article.urlToImage) {
            output += `
                <div class="card">
                    <div class="card-header">
                        <img src="${article.urlToImage}" alt="News Image" id="news-img">
                    </div>
                    <div class="card-content">
                        <h3 id="news-title">${article.title}</h3>
                        <h6 class="news-source" id="news-source">${article.source.name} - ${new Date(article.publishedAt).toLocaleString()}</h6>
                        <p class="news-desc" id="news-desc">${article.content || "Content not available."}</p>
                        <a href="${article.url}" target="_blank" class="read-more">Read more</a>
                    </div>
                </div>`;
        }
    });

    document.getElementById("card-container").innerHTML = output;
}

// Handle navigation item click
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// Handle search functionality
const searchText = document.getElementById("search-text");
searchText.addEventListener("input", () => {
    const query = searchText.value.trim();
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

// Reload the page
function reload() {
    window.location.reload();
}
