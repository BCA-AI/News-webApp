const AIP_KEY='a7b3073c7e604e8fb592ef74a4a3cdc9';

const newscontainer = document.getElementById('newsContainer');
const status = document.getElementById('status');
const heading = document.getElementById('heading');

const categorybuttons = document.querySelectorAll('.categories button');


async function fetchNews(category = 'general') {
    status.textContent = 'Loading....';
    newscontainer.innerHTML = '';
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${AIP_KEY}`);
        const data = await response.json();
        if (data.status === 'ok') {
            displayNews(data.articles);
            status.textContent = '';
        } else {
            status.textContent = 'Error fetching news';
        }
    } catch (error) {
        status.textContent = 'Error fetching news';
    }
}

function displayNews(articles) {
    newscontainer.innerHTML = '';
    if(articles.length === 0) {
        newscontainer.innerHTML = 'No news articles found.';
        return;
    }
    status.textContent = '';
    articles.forEach(article => {
        const image=article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/150';
        const title=article.title ? article.title : 'No title available';
        const description=article.description ? article.description : 'No description available';
        const url=article.url ? article.url : '#';
        const card = document.createElement('article');
        card.classList.add('news-card');
        
        const img=document.createElement('img');
        img.src=image;
        img.alt=title;
        
        const cardContent=document.createElement('div');
        cardContent.classList.add('news-content');

        const heading=document.createElement('h3');
        heading.textContent = title;

        const desc=document.createElement('p');
        desc.textContent = description;

        const link=document.createElement('a');
        link.href=url;
        link.textContent='Read more';
        link.target='_blank';

        link.innerText = 'Read more ->';
        cardContent.append(heading, desc, link);
        card.append(img, cardContent);
        newscontainer.appendChild(card);
    });
}

categorybuttons.forEach(button => {
    button.addEventListener('click', () => {
        categorybuttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.category;
        fetchNews(category);
    });
});

fetchNews();