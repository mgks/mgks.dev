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
const supportedVideoFormats = ['.mp4', '.mkv', '.3gp'];
const supportedAudioFormats = ['.mp3'];

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
function getPresignedUrl(key) {
    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 3600 // URL expires in 1 hour (adjust as needed)
    };
    return s3.getSignedUrl('getObject', params);
}

// Function to determine file type
function getFileType(key) {
    const extension = key.substring(key.lastIndexOf('.')).toLowerCase();
    if (supportedVideoFormats.includes(extension)) {
        return 'video';
    } else if (supportedAudioFormats.includes(extension)) {
        return 'audio';
    } else {
        return 'other';
    }
}

// Function to list all videos and create list items
async function listAllVideos() {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = '';
    const allItems = await deepSearch('');
    const folders = {};

    allItems.forEach(item => {
        if (item.type === 'folder') {
            folders[item.key] = {
                items: []
            };
        } else if (item.type === 'video' || item.type === 'audio') {
            // Assuming folders are listed before files
            const folderKey = item.key.substring(0, item.key.lastIndexOf('/') + 1);
            if (!folders[folderKey]) {
                folders[folderKey] = {
                    items: []
                };
            }
            folders[folderKey].items.push(item);
        }
    });

    // Function to create and append a video item element
    function appendVideoItem(item) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';

        // Check for a thumbnail in the same folder
        const thumbnailKey = item.key.substring(0, item.key.lastIndexOf('.')) + '.jpg';
        const thumbnailUrl = getPresignedUrl(thumbnailKey);
        const thumbnailImg = new Image();

        thumbnailImg.onload = () => {
            // Thumbnail exists, display it
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            thumbnail.appendChild(thumbnailImg);
            link.appendChild(thumbnail);
        };

        thumbnailImg.onerror = () => {
            // Thumbnail does not exist, generate a placeholder
            const placeholder = document.createElement('div');
            placeholder.classList.add('thumbnail');
            const firstLetter = item.key.split('/').pop().charAt(0).toUpperCase();
            placeholder.textContent = firstLetter;
            placeholder.style.backgroundColor = getRandomColor();
            link.appendChild(placeholder);
        };

        thumbnailImg.src = thumbnailUrl; // Set the source to trigger onload/onerror

        const title = document.createElement('div');
        title.classList.add('video-title');
        title.textContent = item.key.split('/').pop();
        link.appendChild(title);

        link.addEventListener('click', () => {
            const presignedUrl = getPresignedUrl(item.key);
            playVideo(presignedUrl, item.type);
            updateWatchHistory(item.key, presignedUrl);
        });

        listItem.appendChild(link);
        videoList.appendChild(listItem);
    }

    for (const folderKey in folders) {
        if (folderKey !== '') {
            const folderItem = document.createElement('li');
            const folderLink = document.createElement('a');
            folderLink.href = '#';
            folderLink.classList.add('folder');

            // Add a folder icon or placeholder
            const folderIcon = document.createElement('div');
            folderIcon.classList.add('thumbnail');
            folderIcon.textContent = '📁'; // Folder icon
            folderLink.appendChild(folderIcon);

            const folderTitle = document.createElement('div');
            folderTitle.classList.add('video-title');
            folderTitle.textContent = folderKey.replace(/\/$/, '');
            folderLink.appendChild(folderTitle);

            folderLink.addEventListener('click', () => listVideos(folderKey));
            folderItem.appendChild(folderLink);
            videoList.appendChild(folderItem);

            // Now list the files within this folder
            folders[folderKey].items.forEach(item => {
                appendVideoItem(item);
            });
        } else {
            // Handle files in the root folder
            folders[folderKey].items.forEach(item => {
                appendVideoItem(item);
            });
        }
    }
}

// Function to play a video or audio using Plyr
function playVideo(url, fileType) {
    document.getElementById('video-container').style.display = 'block';
    player.source = {
        type: fileType,
        sources: [
            {
                src: url,
                type: fileType === 'video' ? 'video/mp4' : 'audio/mpeg', // Adjust MIME type if needed
            },
        ],
    };
}

// Function to perform a deep search of the entire bucket
async function deepSearch(searchTerm) {
    const allItems = [];

    async function listAllObjects(prefix = '', continuationToken = null) {
        const params = {
            Bucket: bucketName,
            Delimiter: '/',
            Prefix: prefix,
            ContinuationToken: continuationToken
        };

        const data = await s3.listObjectsV2(params).promise();

        data.CommonPrefixes.forEach(folder => {
            allItems.push({ type: 'folder', key: folder.Prefix });
        });

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
        videoList.innerHTML = '<li>No results found.</li>';
        return;
    }

    results.forEach(item => {
        const itemName = item.key;
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';

        if (item.type === 'folder') {
            link.classList.add('folder');
            link.textContent = `[Folder] ${itemName}`;
            link.addEventListener('click', () => {
                listVideos(item.key);
            });
        } else if (item.type === 'video' || item.type === 'audio') {
            const presignedUrl = getPresignedUrl(item.key);
            
            // Check for a thumbnail in the same folder
            const thumbnailKey = item.key.substring(0, item.key.lastIndexOf('.')) + '.jpg';
            const thumbnailUrl = getPresignedUrl(thumbnailKey);
            const thumbnailImg = new Image();

            thumbnailImg.onload = () => {
                // Thumbnail exists, display it
                const thumbnail = document.createElement('div');
                thumbnail.classList.add('thumbnail');
                thumbnail.appendChild(thumbnailImg);
                link.appendChild(thumbnail);
            };

            thumbnailImg.onerror = () => {
                // Thumbnail does not exist, generate a placeholder
                const placeholder = document.createElement('div');
                placeholder.classList.add('thumbnail');
                const firstLetter = item.key.split('/').pop().charAt(0).toUpperCase();
                placeholder.textContent = firstLetter;
                placeholder.style.backgroundColor = getRandomColor();
                link.appendChild(placeholder);
            };

            thumbnailImg.src = thumbnailUrl; // Set the source to trigger onload/onerror

            const title = document.createElement('div');
            title.classList.add('video-title');
            title.textContent = itemName.split('/').pop();
            link.appendChild(title);

            link.addEventListener('click', () => {
                playVideo(presignedUrl, item.type);
                updateWatchHistory(item.key, presignedUrl);
            });
        }

        listItem.appendChild(link);
        videoList.appendChild(listItem);
    });
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
    document.body.classList.toggle('dark-mode');
    const themeToggle = document.getElementById('themeToggle');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Light Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }
}

// Add event listener to the theme toggle button
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Function to get a random color for video placeholders
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Updated function to list videos and create list items
async function listVideos(prefix = '') {
    currentPath = prefix;

    // Back button logic
    const backButton = document.getElementById('backButton');
    if (prefix === '') {
        backButton.style.display = 'none';
    } else {
        backButton.style.display = 'inline-block';
        backButton.onclick = () => {
            const parentPath = prefix.substring(0, prefix.lastIndexOf('/', prefix.length - 2) + 1);
            listVideos(parentPath);
        };
    }

    document.getElementById('search').value = '';
    filterVideos();
}

// Function to update watch history
function updateWatchHistory(videoKey, videoUrl) {
    let history = JSON.parse(localStorage.getItem('watchHistory')) || [];

    // Remove the video from history if it already exists
    history = history.filter(item => item.key !== videoKey);

    // Add the video to the beginning of the history
    history.unshift({ key: videoKey, url: videoUrl });

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
            const thumbnailUrl = getPresignedUrl(thumbnailKey);
            const thumbnailImg = new Image();

            thumbnailImg.onload = () => {
                const thumbnail = document.createElement('div');
                thumbnail.classList.add('thumbnail');
                thumbnail.appendChild(thumbnailImg);
                link.appendChild(thumbnail);
            };

            thumbnailImg.onerror = () => {
                const placeholder = document.createElement('div');
                placeholder.classList.add('thumbnail');
                const firstLetter = item.key.split('/').pop().charAt(0).toUpperCase();
                placeholder.textContent = firstLetter;
                placeholder.style.backgroundColor = getRandomColor();
                link.appendChild(placeholder);
            };

            thumbnailImg.src = thumbnailUrl;

            const title = document.createElement('div');
            title.classList.add('video-title');
            title.textContent = item.key.split('/').pop();
            link.appendChild(title);

            link.addEventListener('click', () => {
                playVideo(item.url, getFileType(item.key));
                updateWatchHistory(item.key, item.url);
            });

            listItem.appendChild(link);
            watchHistoryDiv.appendChild(listItem);
        });
    } else {
        watchHistoryHeading.style.display = 'none';
    }
}