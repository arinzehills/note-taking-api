# Note Taking API

## Overview
This is a Node.js backend service for the Notetaking App, providing API endpoints for note management, authentication, and more.

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- TypeScript

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/arinzehills/note-taking-api.git
    cd node-taking-api
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables
    ```env
    PORT=3000
    GOOGLE_APPLICATION_CREDENTIALS=path/to/serviceAccountKey.json
    ```

### Running the Server

1. To start the development server with nodemon:
    ```bash
    npm run dev
    ```

2. To build the project:
    ```bash
    npm run build
    ```

3. To start the server:
    ```bash
    npm start
    ```

### Project Structure

├── src
│ ├── controllers
│ ├── models
│ ├── routes
│ └── services
  └── utils
└── 
### Dependencies
Refer to the `package.json` file for a complete list of dependencies.
