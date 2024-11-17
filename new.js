// import myarticle from "./assets.js";

const API_KEY = "70ffc9f537aa4b3e93cc82e32b3508be";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        // console.log(res);
        const data = await res.json();

        if (!data.articles || data.articles.length === 0) {
            document.getElementById("card-container").innerHTML = "<p>No news found.</p>";
            return;
        }

        let output = "";
        data.articles.forEach(element => {
            if (element.urlToImage) {
                output += `
                <div class="card">
                    <div class="card-header">
                        <img src="${element.urlToImage}" alt="News Image" id="news-img">
                    </div>
                    <div class="card-content">
                        <h3 id="news-title">${element.title}</h3>
                        <h6 class="news-source" id="news-source">${element.source.name} ${element.publishedAt}</h6>
                        <p class="news-desc" id="news-desc">${element.content}</p>
                    </div>
                </div>`;
            }
        });

        document.getElementById("card-container").innerHTML = output;
    } catch (error) {
        console.error("Error fetching news:", error);
        document.getElementById("card-container").innerHTML = "<p>Error fetching news.</p>";
    }
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

function reload() {
    window.location.reload();
}

// const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchText.addEventListener('input', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});

// let value = myarticle.articles;
// value.forEach(element => {
//     if(element.urlToImage != null){
//         console.log(element);
//     }
// });
// // console.log(value);