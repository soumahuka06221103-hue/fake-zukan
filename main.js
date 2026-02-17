document.addEventListener('DOMContentLoaded', () => {
    // Current page determination
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    // Check if we are on index.html (Article List)
    if (page === 'index.html' || page === '') {
        renderArticles();
    } else if (page === 'fake.html') {
        renderFakes();
    } else if (page === 'fake-detail.html') {
        renderFakeDetail();
    } else if (page === 'article.html') {
        renderArticleDetail();
    }
});

function renderArticles() {
    const container = document.getElementById('article-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Check if MOCK_DATA exists
    if (typeof MOCK_DATA === 'undefined' || !MOCK_DATA.articles) {
        container.innerHTML = '<p>No data found.</p>';
        return;
    }

    MOCK_DATA.articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <span class="card-date">${article.date} / ${article.category}</span>
            <h3 class="card-title">
                <a href="article.html?id=${encodeURIComponent(article.id)}">${article.title}</a>
            </h3>
            <p class="card-summary">${article.content.substring(0, 60)}...</p>
        `;
        container.appendChild(card);
    });
}

function renderFakes() {
    const container = document.getElementById('fake-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (typeof MOCK_DATA === 'undefined' || !MOCK_DATA.fakes) {
        container.innerHTML = '<p>No data found.</p>';
        return;
    }

    MOCK_DATA.fakes.forEach(fake => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="fake-id">#${fake.id}</div>
            <span class="card-date">${fake.date}</span>
            <h3 class="card-title">
                <a href="fake-detail.html?id=${fake.id}">${fake.title}</a>
            </h3>
            <div class="tags">
                ${fake.tags.map(tag => `<span style="font-size:0.8rem; color:var(--text-secondary); margin-right:5px;">#${tag}</span>`).join('')}
            </div>
        `;
        container.appendChild(card);
    });
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function renderFakeDetail() {
    const id = getQueryParam('id');
    const container = document.getElementById('detail-content');
    if (!container) return;
    
    const fake = MOCK_DATA.fakes.find(f => f.id === id);
    if (fake) {
        document.title = `${fake.title} | Fake Zukan`; // Update page title
        
        container.innerHTML = `
            <div class="fake-header">
                <span class="fake-id" style="font-size: 1.2rem;">#${fake.id}</span>
                <span class="card-date">${fake.date}</span>
            </div>
            <h1 class="text-cyan">${fake.title}</h1>
            <div class="tags mt-4">
                 ${fake.tags.map(tag => `<span style="background:var(--card-bg); padding:4px 8px; border-radius:4px; margin-right:8px; border:1px solid var(--border-color);">#${tag}</span>`).join('')}
            </div>
            <hr style="border-color:var(--border-color); margin: 2rem 0;">
            <div class="content">
                <p><strong>Summary:</strong><br>${fake.summary}</p>
                <br>
                <p><strong>Details:</strong><br>${fake.details}</p>
            </div>
            <a href="fake.html" class="btn mt-4">戻る (Back)</a>
        `;
    } else {
        container.innerHTML = '<p>指定されたIDのデータは見つかりませんでした。</p><a href="fake.html" class="btn">戻る</a>';
    }
}

function renderArticleDetail() {
    const id = getQueryParam('id');
    const container = document.getElementById('article-content');
    if (!container) return;
    
    // Note: ID for articles might contain slashes "2026/01/12/...", so we need to be careful matching.
    // In this simple mock, we match exactly.
    const article = MOCK_DATA.articles.find(a => a.id === id);
    
    if (article) {
        document.title = `${article.title} | Zukan Editor`;
        
        container.innerHTML = `
            <span class="card-date">${article.date} / ${article.category}</span>
            <h1 style="color:var(--text-primary); margin-bottom:1rem;">${article.title}</h1>
            <hr style="border-color:var(--border-color); margin: 2rem 0;">
            <div class="content" style="line-height:1.8;">
                ${article.content}
            </div>
            <div style="margin-top:2rem;">
               <a href="index.html" class="btn">Homeへ戻る</a>
            </div>
        `;
    } else {
         container.innerHTML = '<p>記事が見つかりませんでした。</p><a href="index.html" class="btn">Homeへ戻る</a>';
    }
}
