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
        listVideos(); // Load videos after successful authentication
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

// Function to list videos and create list items
async function listVideos(prefix = '') {
    const params = {
        Bucket: bucketName,
        Delimiter: '/',
        Prefix: prefix
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        currentPath = prefix;

        const videoList = document.getElementById('videoList');
        videoList.innerHTML = ''; // Clear existing list

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

        // Display folders
        data.CommonPrefixes.forEach(folder => {
            const folderName = folder.Prefix.replace(prefix, '').replace(/\/$/, '');
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = `[Folder] ${folderName}`;
            link.classList.add('folder');
            link.addEventListener('click', () => {
                listVideos(folder.Prefix);
            });
            listItem.appendChild(link);
            videoList.appendChild(listItem);
        });

        // Separate lists for videos and audio files
        const videoFiles = [];
        const audioFiles = [];

        data.Contents.forEach(item => {
            const fileType = getFileType(item.Key);

            if (fileType === 'video' || fileType === 'audio') {
                const itemName = item.Key.replace(prefix, '');
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = itemName;

                if (fileType === 'video') {
                    link.addEventListener('click', () => {
                        const presignedUrl = getPresignedUrl(item.Key);
                        playVideo(presignedUrl, 'video');
                    });
                    videoFiles.push(listItem);
                } else if (fileType === 'audio') {
                    link.addEventListener('click', () => {
                        const presignedUrl = getPresignedUrl(item.Key);
                        playVideo(presignedUrl, 'audio');
                    });
                    audioFiles.push(listItem);
                }

                listItem.appendChild(link);
            }
        });

        // Display video files
        if (videoFiles.length > 0) {
            videoList.appendChild(document.createElement('hr'));
            const videoHeading = document.createElement('h3');
            videoHeading.textContent = 'Videos';
            videoList.appendChild(videoHeading);
            videoFiles.forEach(item => videoList.appendChild(item));
        }

        // Display audio files
        if (audioFiles.length > 0) {
            videoList.appendChild(document.createElement('hr'));
            const audioHeading = document.createElement('h3');
            audioHeading.textContent = 'Audio';
            videoList.appendChild(audioHeading);
            audioFiles.forEach(item => videoList.appendChild(item));
        }
    } catch (err) {
        console.error("Error listing videos:", err);
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

    const filteredItems = allItems.filter(item => item.key.toLowerCase().includes(searchTerm.toLowerCase()));

    displaySearchResults(filteredItems);
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
        link.textContent = itemName;
    
        if (item.type === 'folder') {
            link.classList.add('folder');
            link.addEventListener('click', () => {
                listVideos(item.key);
            });
        } else if (item.type === 'video' || item.type === 'audio') {
            link.addEventListener('click', () => {
                const presignedUrl = getPresignedUrl(item.key);
                playVideo(presignedUrl, item.type);
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
        listVideos(currentPath);
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