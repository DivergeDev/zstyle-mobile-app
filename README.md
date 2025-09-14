# ZStyle Mobile App

A React Native mobile application built with Expo, featuring modern UI components, internationalization, and robust development tooling.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- EAS CLI: `npm install -g eas-cli`

### Installation

```bash
npm install
```

### Development Setup

#### For Windows/Android Development

1. **Install Android Studio** and set up Android SDK
2. **Configure environment variables** for Android development
3. **Start the development server**:
   ```bash
   npm run start
   ```

#### Using Expo Go (Recommended for Quick Testing)

1. Install Expo Go on your Android device
2. Run the development server: `npm run start`
3. Scan the QR code with Expo Go

#### Using Development Builds

For a better development experience with native modules:

1. **Login to Expo**:
   ```bash
   eas login
   ```

2. **Build development version for Android**:
   ```bash
   npm run build:android:sim  # For emulator
   npm run build:android:dev  # For physical device
   ```

3. **Install the build** on your device/emulator
4. **Start development server**: `npm run start`

### Platform-Specific Commands

```bash
# Android
npm run android              # Run on connected Android device/emulator
npm run build:android:sim    # Build for Android emulator
npm run build:android:dev    # Build for Android device
npm run build:android:preview # Build preview APK
npm run build:android:prod   # Build production APK

# iOS (requires macOS)
npm run ios                  # Run on connected iOS device/simulator
npm run build:ios:sim        # Build for iOS simulator
npm run build:ios:dev        # Build for iOS device
npm run build:ios:preview    # Build preview IPA
npm run build:ios:prod       # Build production IPA

# Web
npm run web                  # Start web development server
npm run bundle:web           # Build for web deployment
npm run serve:web            # Serve built web app
```

## Deployment

### TestFlight (iOS) - Requires macOS

1. **Ensure you have a Mac** with Xcode installed
2. **Configure app store credentials**:
   ```bash
   eas credentials
   ```

3. **Build for TestFlight**:
   ```bash
   npm run build:ios:prod
   ```

4. **Submit to TestFlight**:
   ```bash
   eas submit --platform ios
   ```

### Google Play (Android)

1. **Build production APK/AAB**:
   ```bash
   npm run build:android:prod
   ```

2. **Submit to Google Play Console**:
   - Upload the generated APK/AAB file
   - Configure store listing, screenshots, and release notes
   - Publish to internal testing, beta, or production

## Project Structure

```
app/
├── components/          # Reusable UI components
├── screens/            # App screens
├── navigators/         # Navigation configuration
├── services/           # API and external services
├── context/            # React contexts
├── theme/              # Styling and theming
├── i18n/               # Internationalization
├── utils/              # Utility functions
└── config/             # App configuration

assets/
├── icons/              # Icon assets
└── images/             # Image assets
```

## Available Scripts

```bash
npm run start              # Start Expo development server
npm run android            # Run on Android
npm run ios                # Run on iOS
npm run web                # Run on web
npm run test               # Run tests
npm run test:watch         # Run tests in watch mode
npm run lint               # Run ESLint
npm run compile            # Type check with TypeScript
npm run align-deps         # Fix dependency versions
```

## Technologies Used

- **React Native** with Expo
- **TypeScript** for type safety
- **NativeWind** for styling (Tailwind CSS for React Native)
- **React Navigation** for navigation
- **React Hook Form** for form management
- **i18next** for internationalization
- **MMKV** for local storage
- **Expo AV** for audio/video
- **Expo Speech** for text-to-speech

## Testing

```bash
npm run test               # Run Jest tests
npm run test:maestro       # Run Maestro E2E tests
```

## Contributing

1. Follow the existing code style
2. Run `npm run lint` before committing
3. Add tests for new features
4. Update documentation as needed

## Community

- [Infinite Red Ignite](https://github.com/infinitered/ignite) - The boilerplate this app is based on
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs)
