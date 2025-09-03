// background.js - Service Worker

const DB_NAME = 'youtube-shelf-db';
const STORE_NAME = 'shelved-videos';
const DB_VERSION = 1;

// Function to get the database connection
function getDb() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
            reject('Database error');
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                // Use 'videoId' as the key
                db.createObjectStore(STORE_NAME, { keyPath: 'videoId' });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
    });
}

// Function to broadcast state changes to relevant tabs
function broadcastUpdate(videoId, isShelved) {
    chrome.tabs.query({ url: "*://www.youtube.com/watch*" }, (tabs) => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {
                type: 'UPDATE_BUTTON_STATE',
                videoId: videoId,
                isShelved: isShelved
            }).catch(error => {
                // This will catch errors if the content script isn't ready, which is fine.
                if (error.message.includes("Could not establish connection")) {
                    // console.log(`Could not connect to tab ${tab.id}, it might be loading.`);
                } else {
                    console.error(error);
                }
            });
        });
    });
}

// Handles adding a video to the shelf
async function addVideo(videoData) {
    const db = await getDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(videoData);

        request.onsuccess = () => {
            broadcastUpdate(videoData.videoId, true);
            resolve({ success: true });
        };
        request.onerror = (event) => {
            console.error('Error adding video:', event.target.error);
            reject({ success: false, error: event.target.error });
        };
    });
}

// Handles removing a video from the shelf
async function removeVideo(videoId) {
    const db = await getDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(videoId);

        request.onsuccess = () => {
            broadcastUpdate(videoId, false);
            resolve({ success: true });
        };
        request.onerror = (event) => {
            console.error('Error removing video:', event.target.error);
            reject({ success: false, error: event.target.error });
        };
    });
}

// Checks if a video is already on the shelf
async function checkVideo(videoId) {
    const db = await getDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(videoId);

        request.onsuccess = (event) => {
            resolve({ isShelved: !!event.target.result });
        };
        request.onerror = (event) => {
             console.error('Error checking video:', event.target.error);
            reject({ success: false, error: event.target.error });
        };
    });
}

// Gets all videos from the shelf, sorted chronologically
async function getAllVideos() {
    const db = await getDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = (event) => {
            const sortedVideos = event.target.result.sort((a, b) => b.shelvedAt - a.shelvedAt);
            resolve({ success: true, videos: sortedVideos });
        };
        request.onerror = (event) => {
            console.error('Error getting all videos:', event.target.error);
            reject({ success: false, error: event.target.error });
        };
    });
}

async function updateTimestamp(videoId, timestamp) {
    const db = await getDb();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const getRequest = store.get(videoId);

        getRequest.onsuccess = (event) => {
            const videoData = event.target.result;
            if (videoData) {
                videoData.timestamp = timestamp;
                const putRequest = store.put(videoData);
                putRequest.onsuccess = () => resolve({ success: true });
                putRequest.onerror = (event) => reject({ success: false, error: event.target.error });
            } else {
                resolve({ success: false, error: 'Video not found' });
            }
        };
        getRequest.onerror = (event) => reject({ success: false, error: event.target.error });
    });
}

// Listens for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
        case 'ADD_VIDEO':
            addVideo(message.videoData).then(sendResponse);
            break;
        case 'REMOVE_VIDEO':
            removeVideo(message.videoId).then(sendResponse);
            break;
        case 'CHECK_VIDEO':
            checkVideo(message.videoId).then(sendResponse);
            break;
        case 'GET_ALL_VIDEOS':
            getAllVideos().then(sendResponse);
            break;
        case 'UPDATE_TIMESTAMP':
            updateTimestamp(message.videoId, message.timestamp).then(sendResponse);
            break;
        default:
            console.log('Unknown message type:', message.type);
    }
    // Return true to indicate that the response is sent asynchronously
    return true;
});


