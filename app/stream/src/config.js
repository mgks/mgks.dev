const config = {
    region: 'ap-south-1', // e.g., 'us-east-1'
    identityPoolId: 'ap-south-1:25620cd9-053d-4884-a2c4-8e982b376630',
    bucketName: 'med.stream',
    encryptedPassword: '06ac406554547be41cc7ae95461a33027f310dd1fa241c2ebecb381b30ecade8', // SHA256 encrypted
    cloudFrontDomain: 'de4yq1f0f6nkd.cloudfront.net',
    features: {
        enableAudioControls: false,
        enableSubtitles: true,
        enableMediaInfo: false,
        enableSearch: true,
        enableWatchHistory: true,
        enableDarkMode: true
    }
};