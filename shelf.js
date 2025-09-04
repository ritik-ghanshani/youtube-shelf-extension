// shelf.js - Logic for the shelf page

document.addEventListener('DOMContentLoaded', () => {
    loadVideos();
});

const REMOVE_ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
</svg>`;

function formatTimestamp(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const parts = [];
    if (h > 0) parts.push(h);
    parts.push(m.toString().padStart(h > 0 ? 2 : 1, '0'));
    parts.push(s.toString().padStart(2, '0'));
    return parts.join(':');
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.dataset.videoId = video.videoId;

    const thumbnailUrl = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
    const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}&t=${video.timestamp}s`;

    card.innerHTML = `
        <div class="thumbnail-container">
            <a href="${videoUrl}" target="_blank" rel="noopener noreferrer">
                <img src="${thumbnailUrl}" class="thumbnail" alt="Video thumbnail">
                <span class="timestamp">${formatTimestamp(video.timestamp)}</span>
            </a>
        </div>
        <div class="video-info">
            <a href="${videoUrl}" target="_blank" rel="noopener noreferrer" class="video-title">${video.title}</a>
            <p class="video-channel">${video.channel}</p>
        </div>
        <div class="video-actions">
            <button class="remove-btn" title="Remove from shelf">
                ${REMOVE_ICON_SVG}
            </button>
        </div>
    `;

    card.querySelector('.remove-btn').addEventListener('click', async (e) => {
        e.stopPropagation();
        const response = await browser.runtime.sendMessage({ type: 'REMOVE_VIDEO', videoId: video.videoId });
        if (response.success) {
            card.remove();
            checkEmptyState();
        }
    });

    return card;
}

async function loadVideos() {
    const response = await browser.runtime.sendMessage({ type: 'GET_ALL_VIDEOS' });
    const videoList = document.getElementById('video-list');
    
    // Clear previous content
    videoList.innerHTML = ''; 

    if (response.videos && response.videos.length > 0) {
        response.videos.forEach(video => {
            const card = createVideoCard(video);
            videoList.appendChild(card);
        });
    }
    
    checkEmptyState();
}

function checkEmptyState() {
    const videoList = document.getElementById('video-list');
    const emptyState = document.getElementById('empty-state');
    if (videoList.children.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}