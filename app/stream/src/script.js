// Configuration from config.js
const region = config.region;
const identityPoolId = config.identityPoolId;
const encryptedPassword = config.encryptedPassword;
const bucketName = config.bucketName;

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

// Function to check the entered password
function checkPassword() {
    const enteredPassword = document.getElementById('password').value;
    const hashedPassword = CryptoJS.SHA256(enteredPassword).toString();

    if (hashedPassword === encryptedPassword) {
        document.getElementById('auth').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
        listAllVideos();
        loadWatchHistory();
    } else {
        document.getElementById('authMessage').textContent = 'Incorrect password!';
    }
}

// Function to generate SHA-256 hash (for users to verify their password)
function generateHash(password) {
    const hash = CryptoJS.SHA256(password).toString();
    console.log("SHA-256 Hash:", hash);
    return hash;
}

// Function to get a pre-signed URL for a video
function getPresignedUrl(key, callback) {
    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 3600
    };
    s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) {
            console.error("Error generating pre-signed URL", err);
            callback(null);
        } else {
            callback(url);
        }
    });
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

async function listAllVideos() {
    const allItems = await deepSearch('');
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = '';

    allItems.forEach(item => {
        if (getFileType(item.key) === 'video' || getFileType(item.key) === 'audio') {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';

            getPresignedUrl(item.key, (presignedUrl) => {
                if (presignedUrl) {
                    const thumbnailKey = item.key.substring(0, item.key.lastIndexOf('.')) + '.jpg';
                    getPresignedUrl(thumbnailKey, (thumbnailUrl) => {
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

                        link.addEventListener('click', () => {
                            playVideo(presignedUrl, item.type, item.key);
                            updateWatchHistory(item.key, presignedUrl);
                        });

                        listItem.appendChild(link);
                        videoList.appendChild(listItem);
                    });
                }
            });
        }
    });
}

function createPlaceholder(thumbnail, videoKey) {
    const placeholder = document.createElement('div');
    placeholder.classList.add('thumbnail-placeholder');
    const firstLetter = videoKey.charAt(0).toUpperCase();
    placeholder.textContent = firstLetter;
    placeholder.style.backgroundColor = getColorForKey(videoKey);
    thumbnail.appendChild(placeholder);
}

// Function to play a video or audio using Plyr
async function playVideo(url, fileType, videoKey) {
    document.getElementById('video-container').style.display = 'block';
    document.getElementById('search').style.display = 'none';
    document.getElementById('allVideosHeading').style.display = 'none';
    document.getElementById('watchHistoryHeading').style.display = 'none';
    document.getElementById('videoList').style.display = 'none';
    document.getElementById('watchHistory').style.display = 'none';
    document.getElementById('backButton').style.display = 'inline-block';

    // Hide the player initially
    player.style.display = 'none';

    // Check for embedded subtitles
    let subtitleTracks = [];
    const fileExtension = videoKey.substring(videoKey.lastIndexOf('.') + 1).toLowerCase();

    if (fileExtension === 'mkv' || fileExtension === 'mp4') {
        const params = {
            Bucket: bucketName,
            Prefix: videoKey.substring(0, videoKey.lastIndexOf('.') + 1),
        };

        const data = await s3.listObjectsV2(params).promise();

        data.Contents.forEach(item => {
            const key = item.Key;
            const subtitleType = getFileType(key);

            if (subtitleType === 'subtitle') {
                getPresignedUrl(key, (subtitleUrl) => {
                    if (subtitleUrl) {
                        const subtitleLang = key.split('.').slice(-2, -1)[0];
                        subtitleTracks.push({
                            kind: 'captions',
                            label: subtitleLang,
                            srclang: subtitleLang,
                            src: subtitleUrl,
                            default: subtitleTracks.length === 0,
                        });

                        // Update player source with new tracks if already set
                        if (player.source) {
                            player.source = {
                                type: fileType,
                                sources: [{
                                    src: url,
                                    type: fileType === 'video' ? 'video/mp4' : 'audio/mpeg',
                                }],
                                tracks: subtitleTracks,
                            };
                        }
                    }
                });
            }
        });
    }

    // Use mediainfo.js to get audio track information
    const mediaInfo = await new Promise((resolve) => {
        const mediainfo = new MediaInfo({ chunkSize: 1024 * 1024 * 10, format: 'object' }); // Increased chunk size to 10MB

        mediainfo.analyzeData(() => {
            return {
                size: 1024 * 1024 * 100, // Assume a maximum of 100MB needed for parsing
                supply: async (chunkSize, offset) => {
                    return new Promise((resolve, reject) => {
                        fetch(url, {
                            headers: {
                                Range: `bytes=${offset}-${offset + chunkSize - 1}`
                            }
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.arrayBuffer();
                        })
                        .then(buffer => {
                            resolve(new Uint8Array(buffer));
                        })
                        .catch(error => {
                            console.error("Error fetching data for mediainfo:", error);
                            reject(error);
                        });
                    });
                }
            };
        }, (err) => {
            console.error("Error mediainfo:", err);
        }).then((result) => {
            resolve(result);
        });
    });

    const audioTracks = mediaInfo.media.track.filter(track => track.type === 'Audio').map((track, index) => ({
        kind: 'main',
        label: track.Language || `Audio Track ${index + 1}`,
        srclang: track.Language || '',
        default: index === 0,
        value: index,
    }));

    const audioSelect = document.getElementById('audio-select');
    audioSelect.innerHTML = ''; // Clear existing options

    if (audioTracks.length > 1) {
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
                    src: url,
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
            src: url,
            type: fileType === 'video' ? 'video/mp4' : 'audio/mpeg',
        }],
        tracks: subtitleTracks,
        audioTracks: audioTracks
    };

    // Autoplay the video
    player.on('loadedmetadata', () => {
        player.style.display = 'block'; // Show the player only when loaded
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

// Function to perform a deep search of the entire bucket
async function deepSearch(searchTerm) {
    document.getElementById('videoList').style.display = 'none';
    document.getElementById('watchHistory').style.display = 'none';
    const allItems = [];

    async function listAllObjects(prefix = '', continuationToken = null) {
        const params = {
            Bucket: bucketName,
            Prefix: prefix,
            ContinuationToken: continuationToken
        };

        const data = await s3.listObjectsV2(params).promise();

        data.Contents.forEach(item => {
            allItems.push({ type: getFileType(item.Key), key: item.Key });
        });

        if (data.IsTruncated) {
            await listAllObjects(prefix, data.NextContinuationToken);
        }
    }

    await listAllObjects();

    if (searchTerm) {
        const filteredItems = allItems.filter(item => item.key.toLowerCase().includes(searchTerm.toLowerCase()));
        displaySearchResults(filteredItems);
        return [];
    } else {
        return allItems;
    }
}

// Function to display search results
function displaySearchResults(results) {
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

    results.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';

        if (item.type === 'video' || item.type === 'audio') {
            getPresignedUrl(item.key, (presignedUrl) => {
                if (presignedUrl) {
                    const thumbnailKey = item.key.substring(0, item.key.lastIndexOf('.')) + '.jpg';
                    getPresignedUrl(thumbnailKey, (thumbnailUrl) => {
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

                        link.addEventListener('click', () => {
                            playVideo(presignedUrl, item.type, item.key);
                            updateWatchHistory(item.key, presignedUrl);
                        });
                        listItem.appendChild(link);
                        resultGrid.appendChild(listItem);
                    });
                }
            });
        }
    });
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

// Initialize Plyr player
const player = new Plyr('#player');

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
function loadWatchHistory() {
    const history = JSON.parse(localStorage.getItem('watchHistory')) || [];
    const watchHistoryDiv = document.getElementById('watchHistory');
    const watchHistoryHeading = document.getElementById('watchHistoryHeading');
    watchHistoryDiv.innerHTML = '';

    if (history.length > 0) {
        watchHistoryHeading.style.display = 'block';
        history.forEach(item => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';

            // Add a thumbnail or placeholder
            const thumbnailKey = item.key.substring(0, item.key.lastIndexOf('.')) + '.jpg';
            
            getPresignedUrl(thumbnailKey, (thumbnailUrl) => {
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
                
                getPresignedUrl(item.key, (presignedUrl) => {
                    if (presignedUrl) {
                        const video = document.createElement('video');
                        video.src = presignedUrl;
                        video.addEventListener('loadedmetadata', () => {
                            const duration = video.duration;
                            const progress = (item.time / duration) * 100;
                            progressBar.style.width = `${progress}%`;
                        });
                    }
                });
                thumbnail.appendChild(progressBar);

                link.addEventListener('click', () => {
                    getPresignedUrl(item.key, (presignedUrl) => {
                        if (presignedUrl) {
                            playVideo(presignedUrl, getFileType(item.key), item.key);
                            updateWatchHistory(item.key, presignedUrl);
                            player.currentTime = item.time || 0;
                        }
                    });
                });

                listItem.appendChild(link);
                watchHistoryDiv.appendChild(listItem);
            });
        });
    } else {
        watchHistoryHeading.style.display = 'none';
    }
}

function closePlayer() {
    player.pause();
    player.currentTime = 0;

    document.getElementById('video-container').style.display = 'none';
    document.getElementById('search').style.display = 'block';
    document.getElementById('allVideosHeading').style.display = 'block';
    document.getElementById('videoList').style.display = 'flex';
    document.getElementById('backButton').style.display = 'none';

    if (localStorage.getItem('watchHistory') && JSON.parse(localStorage.getItem('watchHistory')).length > 0) {
        document.getElementById('watchHistoryHeading').style.display = 'block';
        document.getElementById('watchHistory').style.display = 'flex';
    }

    const searchTerm = document.getElementById('search').value;
    if (searchTerm) {
        deepSearch(searchTerm);
    } else {
        listAllVideos();
    }
}

document.getElementById('backButton').addEventListener('click', () => {
    closePlayer();
});