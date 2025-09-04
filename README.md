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

There are several ways to install YouTube Shelf, depending on your browser and preference.

### Chrome

The only way to install the extension on Chrome is to load it as an unpacked extension.

1.  **Download `extension-chrome.zip`** from the latest [GitHub Release](https://github.com/ritik-ghanshani/youtube-shelf-extension/releases).
2.  **Unzip** the downloaded file into a permanent folder on your computer.
3.  Open Chrome and navigate to `chrome://extensions`.
4.  Enable **Developer mode** using the toggle in the top-right corner.
5.  Click the **Load unpacked** button.
6.  Select the unzipped folder that you created in step 2.
7.  The "YouTube Shelf" extension will now be installed.

### Firefox

You have two options for installing on Firefox.

#### Option 1: From Mozilla Add-on Store (Recommended)

This is the easiest and most secure method. The extension has been reviewed and approved by Mozilla.

1.  Visit the **[YouTube Shelf page on the Mozilla Add-on Store](https://addons.mozilla.org/firefox/addon/youtube-shelf-extension/)**. (Note: This link will be active once the first version is approved).
2.  Click the **"Add to Firefox"** button and follow the prompts.

#### Option 2: From GitHub (for the latest version)

The GitHub Release version is signed by Mozilla but may be newer than the version on the store, pending review.

1.  **Download `extension-firefox-x.x.x.xpi`** from the latest [GitHub Release](https://github.com/ritik-ghanshani/youtube-shelf-extension/releases).
2.  Open Firefox and navigate to `about:addons`.
3.  Click the gear icon (⚙️) in the top-right corner and select **Install Add-on From File...**.
4.  Select the `.xpi` file you downloaded.
5.  The "YouTube Shelf" extension will now be installed.

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