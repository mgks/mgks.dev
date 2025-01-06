// Configuration from config.js
const region = config.region;
const identityPoolId = config.identityPoolId;
const encryptedPassword = config.encryptedPassword;
const bucketName = config.bucketName;
const cloudFrontDomain = config.cloudFrontDomain;

// Initialize the Amazon Cognito credentials provider
AWS.config.region = region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
});

// Initialize S3 client
const s3 = new AWS.S3();

// Supported video and audio file extensions
const supportedVideoFormats = ['.mp4', '.mkv', '.3gp', '.webm', '.ogg', '.ogv', '.avi', '.mov', '.wmv'];
const supportedAudioFormats = ['.mp3', '.wav', '.aac', '.flac', '.ogg', '.wma'];
const supportedSubtitleFormats = ['.srt', '.vtt', '.ass', '.ssa'];

// Global variable to store the current path/prefix
let currentPath = '';

// All items in the bucket
let allItems = [];

// Function to check the entered password
function checkPassword() {
    const enteredPassword = document.getElementById('password').value;
    const hashedPassword = CryptoJS.SHA256(enteredPassword).toString();

    if (hashedPassword === encryptedPassword) {
        document.getElementById('auth').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
        initialize();
    } else {
        document.getElementById('authMessage').textContent = 'Incorrect password!';
    }
}

// Add event listener for 'Enter' key on password field
document.getElementById('password').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
});

// Function to generate SHA-256 hash (for users to verify their password)
function generateHash(password) {
    const hash = CryptoJS.SHA256(password).toString();
    console.log("SHA-256 Hash:", hash);
    return hash;
}


const player = new Plyr('#player', {
    controls: [
        'play-large', 'play', 'progress', 'current-time', 'mute',
        'volume', 'captions', 'settings', 'fullscreen',
    ],
});

// Function to get a CloudFront URL for a given key
function getCloudFrontUrl(key) {
    return `https://${cloudFrontDomain}/${key}`;
}

// Function to get a pre-signed URL for a video (updated for CloudFront)
async function getPresignedUrl(key) {
    const cloudFrontUrl = `https://${cloudFrontDomain}/${key}`;
    return cloudFrontUrl;
}

// Function to determine file type
function getFileType(key) {
    const extension = key.substring(key.lastIndexOf('.')).toLowerCase();
    if (supportedVideoFormats.includes(extension)) {
        return 'video';
    } else if (supportedAudioFormats.includes(extension)) {
        return 'audio';
    } else if (supportedSubtitleFormats.includes(extension)) {
        return 'subtitle';
    } else {
        return 'other';
    }
}

async function loadAllItems() {
    allItems = await listAllObjects();
}

// Function to list all objects in the S3 bucket (recursive)
async function listAllObjects(prefix = '', continuationToken = null) {
    const params = {
        Bucket: bucketName,
        Prefix: prefix,
        ContinuationToken: continuationToken
    };

    const data = await s3.listObjectsV2(params).promise();

    const items = data.Contents.map(item => ({
        type: getFileType(item.Key),
        key: item.Key
    }));

    if (data.IsTruncated) {
        const nextItems = await listAllObjects(prefix, data.NextContinuationToken);
        return [...items, ...nextItems];
    } else {
        return items;
    }
}

// Function to find a thumbnail URL for a given video key
async function findThumbnailUrl(videoKey) {
    const supportedThumbnailFormats = ['.jpg', '.png', '.webp'];
    const baseKey = videoKey.substring(0, videoKey.lastIndexOf('.'));

    for (const format of supportedThumbnailFormats) {
        const thumbnailKey = baseKey + format;
        if (allItems.some(item => item.key === thumbnailKey)) {
            return getCloudFrontUrl(thumbnailKey);
        }
    }

    return null; // No thumbnail found
}

// Function to create a placeholder thumbnail
function createPlaceholder(thumbnail, videoKey) {
    const placeholder = document.createElement('div');
    placeholder.classList.add('thumbnail-placeholder');
    const firstLetter = videoKey.charAt(0).toUpperCase();
    placeholder.textContent = firstLetter;
    placeholder.style.backgroundColor = getColorForKey(videoKey);
    thumbnail.appendChild(placeholder);
}

// Function to display the video list
async function listAllVideos() {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = '';

    const videoItems = allItems.filter(item => getFileType(item.key) === 'video' || getFileType(item.key) === 'audio');

    for (const item of videoItems) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';

        const thumbnailUrl = await findThumbnailUrl(item.key);
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');

        if (thumbnailUrl) {
            const thumbnailImg = new Image();
            thumbnailImg.src = thumbnailUrl;
            thumbnailImg.onload = () => {
                thumbnail.appendChild(thumbnailImg);
            };
            thumbnailImg.onerror = () => {
                createPlaceholder(thumbnail, item.key);
            };
        } else {
            createPlaceholder(thumbnail, item.key);
        }

        link.appendChild(thumbnail);

        const title = document.createElement('div');
        title.classList.add('video-title');
        title.textContent = item.key.replace(/\.[^/.]+$/, "");
        link.appendChild(title);

        link.addEventListener('click', async () => {
            const cloudFrontUrl = getCloudFrontUrl(item.key);
            playVideo(cloudFrontUrl, item.type, item.key);
            if (config.features.enableWatchHistory) {
                updateWatchHistory(item.key, cloudFrontUrl);
            }
        });

        listItem.appendChild(link);
        videoList.appendChild(listItem);
    }
}

// Function to play a video or audio using Plyr
async function playVideo(cloudFrontUrl, fileType, videoKey) {
    document.getElementById('video-container').style.display = 'block';
    document.getElementById('search').style.display = config.features.enableSearch ? 'block' : 'none';
    document.getElementById('allVideosHeading').style.display = 'none';
    document.getElementById('watchHistoryHeading').style.display = config.features.enableWatchHistory ? 'block' : 'none';
    document.getElementById('videoList').style.display = 'none';
    document.getElementById('watchHistory').style.display = config.features.enableWatchHistory ? 'flex' : 'none';
    document.getElementById('backButton').style.display = 'inline-block';

    // Check for embedded subtitles (if enabled)
    let subtitleTracks = [];
    if (config.features.enableSubtitles) {
        subtitleTracks = await findSubtitles(videoKey);
    }

    // Use mediainfo.js to get audio track information (if enabled)
    let audioTracks = [];
    if (config.features.enableMediaInfo && config.features.enableAudioControls) {
        try {
            audioTracks = await getAudioTracks(cloudFrontUrl);
        } catch (error) {
            console.error("Error getting audio tracks:", error);
        }
    }

    const audioSelect = document.getElementById('audio-select');
    audioSelect.innerHTML = '';

    if (audioTracks.length > 1 && config.features.enableAudioControls) {
        audioTracks.forEach((track, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.text = track.label;
            audioSelect.appendChild(option);
        });

        audioSelect.addEventListener('change', (event) => {
            const selectedTrackIndex = parseInt(event.target.value);
            const currentVideoTime = player.currentTime;

            player.source = {
                type: fileType,
                sources: [{
                    src: cloudFrontUrl,
                    type: fileType === 'video' ? 'video/mp4' : 'audio/mpeg',
                }],
                tracks: subtitleTracks,
                audioTracks: audioTracks
            };

            player.currentTime = currentVideoTime;
            player.play();
        });

        document.getElementById('audio-controls').style.display = 'block';
    } else {
        document.getElementById('audio-controls').style.display = 'none';
    }

    player.source = {
        type: fileType,
        sources: [{
            src: cloudFrontUrl,
            type: fileType === 'video' ? 'video/mp4' : 'audio/mpeg',
        }],
        tracks: subtitleTracks,
        audioTracks: audioTracks
    };

    // Autoplay the video
    player.on('loadedmetadata', () => {
        player.play();
    });

    // Enter fullscreen
    player.on('play', () => {
        if (!player.fullscreen.active) {
            player.fullscreen.enter();
        }
    });

    // Add event listener for 'enterfullscreen' event
    player.on('enterfullscreen', () => {
        // Hide the close button when entering fullscreen
        document.getElementById('closePlayer').style.display = 'none';
    });

    // Add event listener for 'exitfullscreen' event
    player.on('exitfullscreen', () => {
        // Show the close button when exiting fullscreen
        document.getElementById('closePlayer').style.display = 'block';
    });
}

// Function to find subtitles for a given video key
async function findSubtitles(videoKey) {
    const subtitleTracks = [];
    const fileExtension = videoKey.substring(videoKey.lastIndexOf('.') + 1).toLowerCase();

    if (fileExtension === 'mkv' || fileExtension === 'mp4') {
        const subtitleKeys = allItems
            .filter(item => item.type === 'subtitle' && item.key.startsWith(videoKey.substring(0, videoKey.lastIndexOf('.') + 1)))
            .map(item => item.key);

        for (const key of subtitleKeys) {
            const subtitleUrl = getCloudFrontUrl(key);
            const subtitleLang = key.split('.').slice(-2, -1)[0]; // Assume language code before extension
            subtitleTracks.push({
                kind: 'captions',
                label: subtitleLang,
                srclang: subtitleLang,
                src: subtitleUrl,
                default: subtitleTracks.length === 0, // Set the first track as default
            });
        }
    }

    return subtitleTracks;
}

// Function to get audio tracks using mediainfo.js
async function getAudioTracks(cloudFrontUrl) {
    if (!config.features.enableMediaInfo) return [];
    
    const mediaInfo = await new Promise((resolve, reject) => {
        const mediainfo = new MediaInfo({ chunkSize: 1024 * 1024 * 10, format: 'object' });

        mediainfo.analyzeData(() => {
            return {
                size: 1024 * 1024 * 100,
                supply: async (chunkSize, offset) => {
                    try {
                        const response = await fetch(cloudFrontUrl, {
                            headers: {
                                Range: `bytes=${offset}-${offset + chunkSize - 1}`
                            }
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const buffer = await response.arrayBuffer();
                        return new Uint8Array(buffer);
                    } catch (error) {
                        console.error("Error fetching data for mediainfo:", error);
                        reject(error);
                    }
                }
            };
        }, (err) => {
            console.error("Error mediainfo:", err);
            reject(err);
        }).then((result) => {
            resolve(result);
        });
    });

    return mediaInfo.media.track.filter(track => track.type === 'Audio').map((track, index) => ({
        kind: 'main',
        label: track.Language || `Audio Track ${index + 1}`,
        srclang: track.Language || '',
        default: index === 0,
        value: index,
    }));
}

// Function to perform a deep search of the entire bucket
function deepSearch(searchTerm) {
    document.getElementById('videoList').style.display = 'none';
    document.getElementById('watchHistory').style.display = 'none';
    
    const filteredItems = allItems.filter(item => item.key.toLowerCase().includes(searchTerm.toLowerCase()));
    displaySearchResults(filteredItems);
}

// Function to display search results
async function displaySearchResults(results) {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = '';

    if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.textContent = 'No results found.';
        videoList.appendChild(noResults);
        return;
    }

    const resultGrid = document.createElement('ul');
    resultGrid.classList.add('video-grid');
    videoList.appendChild(resultGrid);

    for (const item of results) {
        if (item.type === 'video' || item.type === 'audio') {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';

            const thumbnailUrl = await findThumbnailUrl(item.key);

            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            if (thumbnailUrl) {
                const thumbnailImg = new Image();
                thumbnailImg.src = thumbnailUrl;
                thumbnailImg.onload = () => {
                    thumbnail.appendChild(thumbnailImg);
                };
                thumbnailImg.onerror = () => {
                    createPlaceholder(thumbnail, item.key);
                };
            } else {
                createPlaceholder(thumbnail, item.key);
            }

            link.appendChild(thumbnail);

            const title = document.createElement('div');
            title.classList.add('video-title');
            title.textContent = item.key.replace(/\.[^/.]+$/, "");
            link.appendChild(title);

            link.addEventListener('click', async () => {
                const cloudFrontUrl = await getPresignedUrl(item.key);
                if (cloudFrontUrl) {
                    playVideo(cloudFrontUrl, item.type, item.key);
                    updateWatchHistory(item.key, cloudFrontUrl);
                }
            });

            listItem.appendChild(link);
            resultGrid.appendChild(listItem);
        }
    }

    videoList.style.display = 'flex';
}

// Modify the filterVideos function to use deepSearch
function filterVideos() {
    const searchTerm = document.getElementById('search').value;
    if (searchTerm) {
        deepSearch(searchTerm);
    } else {
        listAllVideos();
    }
}

// Add event listener for search input
document.getElementById('search').addEventListener('input', filterVideos);

// Function to toggle dark mode
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const themeToggle = document.getElementById('themeToggle');
    if (document.body.classList.contains('light-mode')) {
        themeToggle.textContent = 'Dark Mode';
    } else {
        themeToggle.textContent = 'Light Mode';
    }
}

// Add event listener to the theme toggle button
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Function to get a consistent color for video placeholders
function getColorForKey(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

// Function to update watch history
function updateWatchHistory(videoKey, videoUrl) {
    if (!config.features.enableWatchHistory) return;

    let history = JSON.parse(localStorage.getItem('watchHistory')) || [];
    const watchedTime = player.currentTime;

    // Remove the video from history if it already exists
    history = history.filter(item => item.key !== videoKey);

    // Add the video to the beginning of the history
    history.unshift({ key: videoKey, url: videoUrl, time: watchedTime });

    // Limit the history to 10 items
    history = history.slice(0, 10);

    // Save the updated history
    localStorage.setItem('watchHistory', JSON.stringify(history));

    // Update the watch history display
    loadWatchHistory();
}

// Function to load and display watch history
async function loadWatchHistory() {
    if (!config.features.enableWatchHistory) return;

    const history = JSON.parse(localStorage.getItem('watchHistory')) || [];
    const watchHistoryDiv = document.getElementById('watchHistory');
    const watchHistoryHeading = document.getElementById('watchHistoryHeading');
    watchHistoryDiv.innerHTML = '';

    if (history.length > 0) {
        watchHistoryHeading.style.display = 'block';

        for (const item of history) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';

            // Add a thumbnail or placeholder
            const thumbnailUrl = await findThumbnailUrl(item.key);

            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            if (thumbnailUrl) {
                const thumbnailImg = new Image();
                thumbnailImg.src = thumbnailUrl;
                thumbnailImg.onload = () => {
                    thumbnail.appendChild(thumbnailImg);
                };
                thumbnailImg.onerror = () => {
                    createPlaceholder(thumbnail, item.key);
                };
            } else {
                createPlaceholder(thumbnail, item.key);
            }

            link.appendChild(thumbnail);

            const title = document.createElement('div');
            title.classList.add('video-title');
            title.textContent = item.key.replace(/\.[^/.]+$/, "");
            link.appendChild(title);

            // Add a progress bar
            const progressBar = document.createElement('div');
            progressBar.classList.add('progress-bar');

            // Use the item's URL directly for setting the progress bar
            if (item.url) {
                const video = document.createElement('video');
                video.src = item.url;
                video.addEventListener('loadedmetadata', () => {
                    const duration = video.duration;
                    const progress = (item.time / duration) * 100;
                    progressBar.style.width = `${progress}%`;
                });
                thumbnail.appendChild(progressBar);
            }

            link.addEventListener('click', () => {
                playVideo(item.url, getFileType(item.key), item.key);
                updateWatchHistory(item.key, item.url);
                player.currentTime = item.time || 0;
            });

            listItem.appendChild(link);
            watchHistoryDiv.appendChild(listItem);
        }
    } else {
        watchHistoryHeading.style.display = 'none';
    }
}

function closePlayer() {
    player.pause();
    player.currentTime = 0;

    document.getElementById('video-container').style.display = 'none';
    document.getElementById('search').style.display = config.features.enableSearch ? 'block' : 'none';
    document.getElementById('allVideosHeading').style.display = 'block';
    document.getElementById('videoList').style.display = 'flex';
    document.getElementById('backButton').style.display = 'none';

    if (config.features.enableWatchHistory && localStorage.getItem('watchHistory') && JSON.parse(localStorage.getItem('watchHistory')).length > 0) {
        document.getElementById('watchHistoryHeading').style.display = 'block';
        document.getElementById('watchHistory').style.display = 'flex';
    }

    const searchTerm = document.getElementById('search').value;
    if (searchTerm && config.features.enableSearch) {
        deepSearch(searchTerm);
    } else {
        listAllVideos();
    }
}

document.getElementById('backButton').addEventListener('click', () => {
    closePlayer();
});

// Initialize the application
async function initialize() {
    await loadAllItems();
    listAllVideos();
    if (config.features.enableWatchHistory) {
        loadWatchHistory();
    }
    // Hide/show elements based on feature flags
    document.getElementById('search').style.display = config.features.enableSearch ? 'block' : 'none';
    document.getElementById('watchHistoryHeading').style.display = config.features.enableWatchHistory ? 'block' : 'none';
    document.getElementById('watchHistory').style.display = config.features.enableWatchHistory ? 'flex' : 'none';
    document.getElementById('themeToggle').style.display = config.features.enableDarkMode ? 'block' : 'none';
}