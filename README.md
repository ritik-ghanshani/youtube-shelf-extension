# YouTube Shelf Chrome Extension

A simple Chrome extension to save YouTube videos to a local, in-browser shelf for later viewing, including the ability to resume from a specific timestamp. This extension was "vibe coded" with Gemini.

## Features

*   **Save Videos Locally:** Add YouTube videos to your personal shelf directly from the video page.
*   **Timestamp Saving:** Automatically saves the current timestamp when you shelf a video, allowing you to resume watching exactly where you left off.
*   **Dynamic Timestamp Updates:** If you're watching a shelved video, its timestamp will automatically update every 10 seconds while playing, ensuring your progress is always saved.
*   **Seamless Integration:**
    *   A "Shelf" button appears next to the like/dislike buttons on YouTube video pages.
    *   Access your full shelf via a dedicated icon button in the YouTube header (next to notifications).
*   **In-Browser Shelf:** View all your shelved videos in a clean, YouTube-like interface within a modal overlay.
*   **Local Storage:** All data is stored securely in your browser's IndexedDB; no cloud sync or external APIs are used.

## Installation

### For Chrome (Load Unpacked)

1.  **Download the latest `extension.zip`** from the [Releases page](https://github.com/ritik-ghanshani/youtube-shelf-extension/releases).
2.  **Unzip** the downloaded file.
3.  **Open Chrome Extensions Page:**
    *   Open Google Chrome.
    *   Type `chrome://extensions` in the address bar and press Enter.
4.  **Enable Developer Mode:**
    *   In the top-right corner of the Extensions page, toggle on the "Developer mode" switch.
5.  **Load Unpacked:**
    *   Click the "Load unpacked" button that appears.
    *   A file dialog will open. Navigate to the directory where you unzipped the extension.
    *   Select the entire unzipped folder and click "Select Folder" (or "Open").
6.  **Verify Installation:**
    *   The "YouTube Shelf" extension should now appear in your list of installed extensions.
    *   You might see a warning about "Developer mode extensions". This is normal for unpacked extensions.

### For Firefox

#### Install from Mozilla Add-ons (Recommended)

The easiest and recommended way to install the extension for Firefox is directly from the Mozilla Add-ons (AMO) website:

1.  Go to the [YouTube Shelf Add-on page on AMO](https://addons.mozilla.org/firefox/addon/youtube-shelf-extension/) (Note: You'll need to replace this with the actual AMO link once published).
2.  Click the "Add to Firefox" button.
3.  Follow the prompts to install the extension.

#### Manual Installation (from GitHub Release)

If you prefer to install manually, or for testing purposes:

1.  **Download the latest `extension.xpi`** from the [Releases page](https://github.com/ritik-ghanshani/youtube-shelf-extension/releases).
2.  **Open Firefox Add-ons Page:**
    *   Open Mozilla Firefox.
    *   Type `about:addons` in the address bar and press Enter.
3.  **Install Add-on From File:**
    *   Click the gear icon (⚙️) in the top-right corner of the Add-ons Manager page.
    *   Select "Install Add-on From File...".
    *   Navigate to and select the downloaded `extension.xpi` file.
4.  **Verify Installation:**
    *   The "YouTube Shelf" extension should now appear in your list of installed extensions.

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