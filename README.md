# GCalender_manager


## Tech Stack

Below is an Tech stack used in this project as follows:

- **React**: Library for building user interfaces
- **Vite**: Fast development build tool
- **Context API**: For global state management in application
- **Supabase**: Backend-as-a-service for authentication and database
- **Material-UI**: UI components library
- **React Toastify**: Notifications and alerts
- **Google Calendar API**: For creating and managing calendar events
- **Google OAuth**: For user authentication
- **Axios**: For making HTTP requests

## Features

- **Date Filter**: Filter events based on selected date ranges.
- **Search Bar**: Search for specific events.
- **Add Events to Google Calendar**: Seamlessly integrate events into your Google Calendar.
- **Dark/Light Mode**: Toggle between dark and light themes for better user experience.
- **Responsive Design**: Optimized for various screen sizes.

## Cloud Deployment

Deploy the application to cloud environment :
- **Netlify**

# React Vite Project

This is a React project bootstrapped with [Vite](https://vitejs.dev/). Follow the instructions below to set up the project locally.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (version 16 or above) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** (optional) - [Install Yarn](https://yarnpkg.com/getting-started/install)

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
# Replace <repository-url> with the actual URL of the repository
git clone https://github.com/Nishantsurve/GCalender_manager.git

# Navigate into the project directory
cd <nishants>
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Start the Development Server

Run the following command to start the development server:

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

The development server will start, and you can view the application by visiting [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

To create an optimized build for production, run:

```bash
# Using npm
npm run build

# Or using yarn
yarn build
```

The build output will be located in the `dist` directory.

### 5. Preview the Production Build

You can preview the production build locally using:

```bash
# Using npm
npm run preview

# Or using yarn
yarn preview
```

### 6. Linting and Formatting (Optional)

If the project includes linting and formatting tools (e.g., ESLint, Prettier), you can run:

```bash
# Lint the code
npm run lint

# Format the code
npm run format
```

## Project Structure

Here is an overview of the project structure:

```
├── public/         # Static assets
├── src/            # Source code
│   ├── assets/     # Images, fonts, etc.
│   ├── components/ # Reusable components
│   ├── pages/      # Page components
│   ├── App.jsx     # Main app component
│   └── main.jsx    # Entry point
├── .gitignore      # Git ignore file
├── package.json    # Project metadata and dependencies
├── vite.config.js  # Vite configuration
└── README.md       # Project documentation
```

## Scripts

Here are some common scripts you can use:

- **`npm run dev`**: Start the development server
- **`npm run build`**: Build the project for production
- **`npm run preview`**: Preview the production build
- **`npm run lint`**: Lint the code (if configured)
- **`npm run format`**: Format the code (if configured)

## License

This project is licensed under the [MIT License](LICENSE).

---

If you encounter any issues or have questions, feel free to open an issue or contact the maintainers.
