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

// Function to check the entered password
function checkPassword() {
    const enteredPassword = document.getElementById('password').value;
    const hashedPassword = CryptoJS.SHA256(enteredPassword).toString();

    if (hashedPassword === encryptedPassword) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('video-container').style.display = 'block';
        document.querySelector('.container').style.display = 'block';
        listVideos(); // Load videos after successful authentication
    } else {
        document.getElementById('authMessage').textContent = 'Incorrect password!';
    }
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

// Function to list videos and create list items
async function listVideos(prefix = '') {
    const params = {
        Bucket: bucketName,
        Delimiter: '/',
        Prefix: prefix
    };

    try {
        const data = await s3.listObjectsV2(params).promise();

        const videoList = document.getElementById('videoList');
        videoList.innerHTML = ''; // Clear existing list

        // Display folders
        data.CommonPrefixes.forEach(folder => {
            const folderName = folder.Prefix.replace(prefix, '').replace(/\/$/, '');
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = folderName;
            link.classList.add('folder');
            link.addEventListener('click', () => {
                listVideos(folder.Prefix); // List videos in subfolder
            });
            listItem.appendChild(link);
            videoList.appendChild(listItem);
        });

        // Display videos
        data.Contents.forEach(item => {
            if (item.Key.endsWith('.mp4')) {
                const videoName = item.Key.replace(prefix, '');
                const presignedUrl = getPresignedUrl(item.Key);
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = videoName;
                link.addEventListener('click', () => {
                    playVideo(presignedUrl);
                });
                listItem.appendChild(link);
                videoList.appendChild(listItem);
            }
        });
    } catch (err) {
        console.error("Error listing videos:", err);
    }
}

// Function to play a video using Plyr
function playVideo(url) {
    player.source = {
        type: 'video',
        sources: [
            {
                src: url,
                type: 'video/mp4',
            },
        ],
    };
}

// Function to filter videos by search term
function filterVideos() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const videoItems = document.querySelectorAll('#videoList li');

    videoItems.forEach(item => {
        const videoName = item.textContent.toLowerCase();
        if (videoName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize Plyr player
const player = new Plyr('#player');

// Add event listener for search input
document.getElementById('search').addEventListener('input', filterVideos);