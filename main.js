const API_KEY = "f17dda9260a843d7887ea8af2260d5a2"
const url  = "https://newsapi.org/v2/everything?q="

window.addEventListener('load' , ()=>fetchNews("india"));

async function fetchNews(query)
{
    // news jo hai vo ak server par hai so time lg skta hai so uske badle mai promise return ho jygi jiske upar hum await kar skte hai.
    const res  = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles); //api ke andar jo article hai usko uthana hai.
}


function bindData(articles)
{
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = ''; 
    //jab window load hoga to api call hogi and 100+ articles agr aate hai to , jab jab baar load karenge vo niche baar baar cards bnte jynge so isse vo chij handle hogi , jab load karenge to starting mai empty hoga , phir aayga 100 , phir load karenge to next 100 and aisa chalenga.


    articles.forEach(article => {
        if(!article.urlToImage) return;//jis article mai image hi available nahi hai usse show nahi karenge because ui kharab hoga.
        const cardClone = newsCardTemplate.content.cloneNode(true);//template ke andar jitne bhi components hai like div and all sabhi ko clone kar lenge and store karenge ak variable mai.
        fillDataInCard(cardClone , article);
        cardsContainer.appendChild(cardClone);//jo main k andar card container hai vha append kar rhe hai sabhi template ko.
    });
}

// A function for filling data into a template.

function fillDataInCard(cardClone , article)
{
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US" , {
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} : ${date}`;
}