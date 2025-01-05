// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-south-1'; // e.g., 'us-east-1'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-south-1:25620cd9-053d-4884-a2c4-8e982b376630',
});

// Initialize S3 client
const s3 = new AWS.S3();

// Your bucket name
const bucketName = 'med.stream';

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
function listVideos() {
  const params = {
    Bucket: bucketName
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error("Error listing videos:", err);
      return;
    }

    const videoList = document.getElementById('videoList');

    data.Contents.forEach(item => {
      // Only process .mp4 files (or other video extensions you want to support)
      if (item.Key.endsWith('.mp4')) { 
        const presignedUrl = getPresignedUrl(item.Key);
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        link.href = '#';
        link.textContent = item.Key;
        link.addEventListener('click', () => {
          playVideo(presignedUrl);
        });

        listItem.appendChild(link);
        videoList.appendChild(listItem);
      }
    });
  });
}

// Function to play a video using Plyr
function playVideo(url) {
  const player = new Plyr('#player');
  player.source = {
    type: 'video',
    sources: [
      {
        src: url,
        type: 'video/mp4', // Assuming MP4 format
      },
    ],
  };
}

// List videos on page load
document.addEventListener('DOMContentLoaded', () => {
    listVideos();
});