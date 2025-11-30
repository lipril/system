# Image Setup Instructions

## Required Images

You need to save the two images you provided into the correct locations:

### 1. University Logo (picture1)
- **Save as:** `client/public/assets/logo.png`
- **Image:** The circular university seal with "North China University of Water Resources and Electric Power" text
- **Usage:** Displayed on login page and dashboard headers

### 2. Portal Background (portal background)
- **Save as:** `client/public/assets/portal-bg.jpg`
- **Image:** The beautiful university campus building with lake view
- **Usage:** Background image for the login/portal page

## How to Save:

1. Create the assets folder if it doesn't exist:
   ```bash
   mkdir -p client/public/assets
   ```

2. Save the two images you provided:
   - Save picture1 (logo) as: `client/public/assets/logo.png`
   - Save portal background as: `client/public/assets/portal-bg.jpg`

3. The images are already referenced in the Login.tsx component

## Image Paths in Code:
- Logo: `/assets/logo.png`
- Background: `/assets/portal-bg.jpg`
