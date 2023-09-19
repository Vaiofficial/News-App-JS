const API_KEY = "f17dda9260a843d7887ea8af2260d5a2"
const url = "https://newsapi.org/v2/everything?q="


//jaise hi load hoga india ki news ko show karega.

const keywords = ["technology", "sports", "entertainment", "health", "india", "kohli", "rahul gandhi", "modi", "southindia", "bollywood", "hollywood", "tollywood", "engineering", "upsc", "stock market"];

const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)]; //we will get random number between array length-1 only.
// fetchNews(randomKeyword);
window.addEventListener('load', () => fetchNews(randomKeyword));



function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    // news jo hai vo ak server par hai so time lg skta hai so uske badle mai promise return ho jygi jiske upar hum await kar skte hai.
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles); //api ke andar jo article hai usko uthana hai.
}


function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = '';
    //jab window load hoga to api call hogi and 100+ articles agr aate hai to , jab jab baar load karenge vo niche baar baar cards bnte jynge so isse vo chij handle hogi , jab load karenge to starting mai empty hoga , phir aayga 100 , phir load karenge to next 100 and aisa chalenga.


    articles.forEach(article => {
        if (!article.urlToImage) return;//jis article mai image hi available nahi hai usse show nahi karenge because ui kharab hoga.
        const cardClone = newsCardTemplate.content.cloneNode(true);//template ke andar jitne bhi components hai like div and all sabhi ko clone kar lenge and store karenge ak variable mai.
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);//jo main k andar card container hai vha append kar rhe hai sabhi template ko.
    });
}

// A function for filling data into a template.

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} : ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

// navbar mai jo link hai usme click karenge to color show hoga means jis link mai hai vo active show hoga.

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}


//user search button 
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})