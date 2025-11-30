# Image Setup Instructions

## Required Steps to Complete the UI

You provided two images that need to be saved in the correct location:

### 1. Save the University Logo
- **Image**: picture1.png (the one you mentioned is for logo)
- **Location**: Save as `client/public/assets/logo.png`
- **Usage**: Will appear on the login page and all dashboard headers

### 2. Save the Portal Background
- **Image**: portal-background.jpg (the background image)
- **Location**: Save as `client/public/assets/portal-background.jpg`
- **Usage**: Will appear as the background on the login/portal page

## How to Save the Images

### Option 1: Manual Save
1. Open the image files you have
2. Save "picture1" as `logo.png` in the `client/public/assets/` folder
3. Save "portal-background" as `portal-background.jpg` in the `client/public/assets/` folder

### Option 2: Copy Command
If you have the images downloaded, use these commands in PowerShell:

```powershell
# Navigate to project
cd c:/Users/afroz/CodeBuddy/20251125214834

# Copy logo (replace SOURCE_PATH with actual path)
Copy-Item "SOURCE_PATH/picture1.png" "client/public/assets/logo.png"

# Copy background (replace SOURCE_PATH with actual path)
Copy-Item "SOURCE_PATH/portal-background.jpg" "client/public/assets/portal-background.jpg"
```

## After Saving Images

Once the images are saved, the application will automatically use them:
- **Login Page**: Will show the logo at the top and the background image
- **All Dashboards**: Will show "NCWU" with the logo in the header

## Verification

After saving, you should see:
```
client/public/assets/
├── logo.png
└── portal-background.jpg
```

Then restart the development server to see the changes.
