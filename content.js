// content.js - Injects UI elements into the YouTube page

// --- GLOBAL STATE ---
let timestampUpdateTimer = null;
const UPDATE_INTERVAL = 10000; // 10 seconds

// --- SVG ICONS ---
const SHELF_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
</svg>`;

const UNSHELF_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3ea6ff" stroke="#3ea6ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark-check">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
</svg>`;

// --- BUTTON CREATION ---
function createButton(id, text, icon, onClick) {
    const button = document.createElement('button');
    button.id = id;
    button.className = 'shelf-button';
    button.innerHTML = `
        <span class="shelf-button-icon">${icon}</span>
        <span class="shelf-button-text">${text}</span>
    `;
    button.addEventListener('click', onClick);
    return button;
}

// --- INLINE (VIDEO PAGE) BUTTON LOGIC ---
async function handleShelfButtonClick(videoId) {
    const videoElement = document.querySelector('video');
    if (!videoElement) return;

    const videoData = {
        videoId: videoId,
        title: document.querySelector('h1.title.ytd-video-primary-info-renderer')?.textContent.trim() || 'Untitled Video',
        channel: document.querySelector('ytd-channel-name yt-formatted-string')?.textContent.trim() || 'Unknown Channel',
        timestamp: Math.floor(videoElement.currentTime),
        shelvedAt: Date.now()
    };

    if (videoData.title === 'Untitled Video') {
        console.error("YouTube Shelf: Could not find video title. Aborting.");
        return;
    }

    // Await the response before updating the button state
    const response = await browser.runtime.sendMessage({ type: 'ADD_VIDEO', videoData });
    if (response.success) {
        updateButtonState(true);
    }
}

async function handleUnshelfButtonClick(videoId) {
    const response = await browser.runtime.sendMessage({ type: 'REMOVE_VIDEO', videoId: videoId });
    if (response.success) {
        updateButtonState(false);
    }
}

function updateButtonState(isShelved) {
    const shelfButton = document.getElementById('shelf-btn');
    const unshelfButton = document.getElementById('unshelf-btn');
    if (shelfButton && unshelfButton) {
        shelfButton.style.display = isShelved ? 'none' : 'flex';
        unshelfButton.style.display = isShelved ? 'flex' : 'none';
    }

    // Manage the timestamp updater based on the new state
    if (isShelved) {
        startTimestampUpdater();
    } else {
        stopTimestampUpdater();
    }
}

function addShelfButtons() {
    const target = document.querySelector('#actions-inner #top-level-buttons-computed');
    if (!target || document.getElementById('shelf-btn')) return;

    const videoId = new URLSearchParams(window.location.search).get('v');
    if (!videoId) return;

    const shelfButton = createButton('shelf-btn', 'Shelf', SHELF_ICON, () => handleShelfButtonClick(videoId));
    const unshelfButton = createButton('unshelf-btn', 'Shelved', UNSHELF_ICON, () => handleUnshelfButtonClick(videoId));

    target.prepend(unshelfButton);
    target.prepend(shelfButton);

    browser.runtime.sendMessage({ type: 'CHECK_VIDEO', videoId: videoId }, (response) => {
        if (browser.runtime.lastError) {
            console.error(browser.runtime.lastError);
            return;
        }
        updateButtonState(response.isShelved);
    });
}

function removeShelfButtons() {
    const shelfBtn = document.getElementById('shelf-btn');
    const unshelfBtn = document.getElementById('unshelf-btn');
    if (shelfBtn) shelfBtn.remove();
    if (unshelfBtn) unshelfBtn.remove();
    stopTimestampUpdater(); // Also stop the timer when removing buttons
}

// --- DYNAMIC TIMESTAMP UPDATE LOGIC ---
function startTimestampUpdater() {
    if (timestampUpdateTimer) return; // Timer is already running

    const videoId = new URLSearchParams(window.location.search).get('v');
    if (!videoId) return;

    timestampUpdateTimer = setInterval(() => {
        const videoElement = document.querySelector('video');
        if (videoElement && !videoElement.paused) {
            const currentTime = Math.floor(videoElement.currentTime);
            browser.runtime.sendMessage({
                type: 'UPDATE_TIMESTAMP',
                videoId: videoId,
                timestamp: currentTime
            });
        }
    }, UPDATE_INTERVAL);
}

function stopTimestampUpdater() {
    if (timestampUpdateTimer) {
        clearInterval(timestampUpdateTimer);
        timestampUpdateTimer = null;
    }
}

// --- HEADER BUTTON & MODAL LOGIC ---
function addShelfButtonToHeader() {
    if (document.getElementById('header-shelf-btn')) return;
    const target = document.querySelector('#masthead #end');
    if (!target) return;

    const shelfButton = document.createElement('button');
    shelfButton.id = 'header-shelf-btn';
    shelfButton.className = 'shelf-header-button';
    shelfButton.title = 'Open Shelf';
    shelfButton.innerHTML = SHELF_ICON;

    shelfButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openShelfModal();
    });

    const createButton = target.querySelector('#create-button');
    if (createButton) {
        createButton.insertAdjacentElement('afterend', shelfButton);
    }
    else {
        // Fallback to prepend if create button not found
        target.prepend(shelfButton);
    }
}

function openShelfModal() {
    if (document.getElementById('shelf-modal-container')) return;

    const modalContainer = document.createElement('div');
    modalContainer.id = 'shelf-modal-container';

    const modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'shelf-modal-backdrop';
    modalBackdrop.addEventListener('click', closeShelfModal);

    const modalContent = document.createElement('div');
    modalContent.id = 'shelf-modal-content';

    const closeButton = document.createElement('button');
    closeButton.id = 'shelf-modal-close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', closeShelfModal);

    const iframe = document.createElement('iframe');
    iframe.id = 'shelf-iframe';
    iframe.src = browser.runtime.getURL('shelf.html');

    modalContent.appendChild(closeButton);
    modalContent.appendChild(iframe);
    modalContainer.appendChild(modalBackdrop);
    modalContainer.appendChild(modalContent);

    document.body.appendChild(modalContainer);
}

function closeShelfModal() {
    const modalContainer = document.getElementById('shelf-modal-container');
    if (modalContainer) {
        modalContainer.remove();
    }
}

// --- MESSAGE LISTENER FOR STATE SYNC ---
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'UPDATE_BUTTON_STATE') {
        const currentVideoIdOnPage = new URLSearchParams(window.location.search).get('v');
        if (message.videoId === currentVideoIdOnPage) {
            updateButtonState(message.isShelved);
        }
    }
});

// --- MAIN OBSERVER LOGIC ---
function runChecks() {
    addShelfButtonToHeader();

    const videoActionsTarget = document.querySelector('#actions-inner #top-level-buttons-computed');
    if (videoActionsTarget) {
        addShelfButtons();
    } else {
        removeShelfButtons();
    }
}

const observer = new MutationObserver(runChecks);
observer.observe(document.body, { childList: true, subtree: true });

runChecks();