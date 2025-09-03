# YouTube Shelf Chrome Extension

A simple Chrome extension to save YouTube videos to a local, in-browser shelf for later viewing, including the ability to resume from a specific timestamp.

## Features

*   **Save Videos Locally:** Add YouTube videos to your personal shelf directly from the video page.
*   **Timestamp Saving:** Automatically saves the current timestamp when you shelf a video, allowing you to resume watching exactly where you left off.
*   **Dynamic Timestamp Updates:** If you're watching a shelved video, its timestamp will automatically update every 10 seconds while playing, ensuring your progress is always saved.
*   **Seamless Integration:**
    *   A "Shelf" button appears next to the like/dislike buttons on YouTube video pages.
    *   Access your full shelf via a dedicated icon button in the YouTube header (next to notifications).
*   **In-Browser Shelf:** View all your shelved videos in a clean, YouTube-like interface within a modal overlay.
*   **Local Storage:** All data is stored securely in your browser's IndexedDB; no cloud sync or external APIs are used.

## Installation (Load Unpacked Extension)

Since this extension is not published on the Chrome Web Store, you'll need to load it as an "unpacked" extension.

1.  **Download/Clone the Repository:**
    *   Clone this repository to your local machine:
        ```bash
        git clone https://github.com/your-username/youtube-shelf-extension.git
        ```
    *   Or, download the ZIP file and extract it.

2.  **Open Chrome Extensions Page:**
    *   Open Google Chrome.
    *   Type `chrome://extensions` in the address bar and press Enter.

3.  **Enable Developer Mode:**
    *   In the top-right corner of the Extensions page, toggle on the "Developer mode" switch.

4.  **Load Unpacked:**
    *   Click the "Load unpacked" button that appears.
    *   A file dialog will open. Navigate to the directory where you cloned/extracted the `youtube-shelf-extension` folder.
    *   Select the entire `youtube-shelf-extension` folder and click "Select Folder" (or "Open").

5.  **Verify Installation:**
    *   The "YouTube Shelf" extension should now appear in your list of installed extensions.
    *   You might see a warning about "Developer mode extensions". This is normal for unpacked extensions.

## Usage

### On a YouTube Video Page:

1.  Navigate to any YouTube video page.
2.  You will see a "Shelf" button (or "Shelved" if already saved) next to the like/dislike buttons below the video player.
3.  Click the "Shelf" button to add the video to your shelf. It will automatically save the current timestamp.
4.  If the video is already shelved, the button will say "Shelved". Clicking it will remove the video from your shelf.
5.  While watching a shelved video, the timestamp will automatically update every 10 seconds.

### Accessing Your Shelf:

1.  On any YouTube page, look for a new bookmark icon in the top-right header, near the notifications bell.
2.  Click this icon.
3.  A modal overlay will appear, displaying all your shelved videos.
4.  From the shelf, you can click on a video to resume watching it from its saved timestamp, or click the "Remove" button to delete it from your shelf.
5.  Close the modal by clicking the 'X' button or clicking outside the modal.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
