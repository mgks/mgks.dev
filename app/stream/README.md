# Private Video Streaming Service

This project is a simple, self-hosted private video streaming service built using:

*   **HTML**
*   **CSS**
*   **JavaScript**
*   **AWS S3** (for video storage)
*   **AWS Cognito** (for temporary credentials)
*   **Plyr** (for the video player)

## Features

*   **Password Protection:** A basic password check to restrict access (using SHA-256 hashing).
*   **Folder Structure:** Organizes videos into folders and subfolders.
*   **Search:** Filter videos by name.
*   **Responsive Design:** Adapts to different screen sizes (mobile-friendly).
*   **Light and Dark Mode:** Toggle between light and dark themes.
*   **Lightweight:** Designed to be relatively lightweight for use on devices like Android TV.

## Prerequisites

*   An AWS account
*   An S3 bucket to store your videos
*   A Cognito Identity Pool with an unauthenticated role that has read-only access to your S3 bucket

## Setup

1. **Configure AWS:**
    *   Create an S3 bucket and upload your videos, organizing them into folders if desired.
    *   Create a Cognito Identity Pool.
    *   Enable access to unauthenticated identities in your Cognito Identity Pool.
    *   Grant the unauthenticated role in your Cognito Identity Pool read-only access (`s3:GetObject` and `s3:ListBucket`) to your S3 bucket.

2. **Update `config.js`:**
    *   Replace the placeholder values in `config.js` with your:
        *   `region`
        *   `identityPoolId`
        *   `bucketName`
        *   `encryptedPassword`

## Password Hashing

To generate the SHA-256 hash of your desired password, you can use the following function in your browser's developer console:

1. Open your browser's developer console (usually by pressing F12).
2. Go to the "Console" tab.
3. Paste the following code and press Enter:

    ```javascript
    function generateHash(password) {
        const hash = CryptoJS.SHA256(password).toString();
        console.log("SHA-256 Hash:", hash);
        return hash;
    }
    ```

4. Call the function with your desired password:

    ```javascript
    generateHash("your_password"); // Replace "your_password" with your actual password
    ```

5. Copy the generated SHA-256 hash and paste it into the `encryptedPassword` field in your `config.js` file.

## Usage

1. Open the URL where you hosted the files in a web browser.
2. Enter the correct password on the authentication page.
3. Browse the list of videos and folders.
4. Click on a video to play it.
5. Use the search bar to filter videos.
6. Click the "Toggle Theme" button to switch between light and dark mode.

## Security Considerations

*   **Authentication:** The password protection in this project is very basic. For a production-level application, you should implement a robust authentication system (e.g., using AWS Cognito User Pools or a custom backend).
*   **IAM Permissions:** Make sure the IAM role associated with your Cognito Identity Pool has the most restrictive permissions possible.
*   **HTTPS:** Always serve the application over HTTPS to encrypt traffic.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.