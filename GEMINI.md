# Gemini context file for YouTube Shelf Chrome Extension

## Project Summary:
This is a Chrome extension named "YouTube Shelf". Its purpose is to save YouTube videos to a local, in-browser IndexedDB, allowing users to resume watching from a specific timestamp.

## Key Features Implemented:
- **Video Saving:** "Shelf" button on video page to add/remove videos.
- **Timestamp Saving:** Saves current video timestamp.
- **Dynamic Timestamp Updates:** Automatically updates timestamp every 10 seconds while a shelved video is playing.
- **Shelf Access:** Icon button in YouTube header opens a modal with the list of shelved videos.
- **Local Storage:** Uses IndexedDB for local storage.
- **SPA Navigation Handling:** Robustly handles in-page navigation on YouTube.
- **Automated Releases:** A full CI/CD pipeline is implemented using GitHub Actions.

## Release Process:
The project uses an automated release process based on Git tags. To create and publish a new release:

1.  Ensure all your changes are committed on the `main` branch.
2.  Create a new Git tag with the desired semantic version number (e.g., `v1.0.1`, `v1.1.0`).
    ```bash
    git tag v1.1.0
    ```
3.  Push the tag to the remote repository.
    ```bash
    git push origin v1.1.0
    ```
Pushing a new tag will automatically trigger the `Create Extension Release` workflow, which will:
-   Set the version in `manifest.json` from the tag.
-   Create a GitHub Release with the packaged Chrome extension (`.zip`) and the signed Firefox add-on (`.xpi`).
-   Submit the signed add-on to the Firefox Add-on Store.

## Current State:
- All core features are implemented and confirmed working.
- UI elements (buttons, modal) are integrated and functional.
- A fully automated CI/CD pipeline is set up for creating releases and publishing to the Firefox Add-on Store.
- The release process is managed via Git tags.