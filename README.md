# Background Maker (With Mathematical Patterns)

## Overview

This is a web application that allows users to generate background patterns based on mathematical formulas such as spirals, grids, and fractals. Users can customize the patterns by adjusting parameters like color, density, and size, and then download them as PNG images. 

The project is built using the following technologies:

- **Frontend**: HTML, CSS, Bootstrap 5, jQuery, EJS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose for data modeling)
- **Canvas/SVG**: Used for rendering patterns on the front-end
- **Image Export**: Save patterns as PNG images
- **Authentication**: User registration and login with role-based access control (RBAC)

## Features

- **User Authentication**: Users can sign up, log in, and save generated patterns. 
- **Pattern Generation**: Choose from various mathematical patterns (spirals, grids, fractals).
- **Customizable Patterns**: Adjust parameters like color, density, and size.
- **Export Patterns**: Download generated patterns as PNG images.
- **Responsive UI**: The app is mobile-friendly and responsive.

## Installation

### Prerequisites

- Node.js and npm
- MongoDB account (for database)

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/background-maker.git
    cd background-maker
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following:

    ```
    MONGO_URI=your_mongo_connection_string
    SESSION_SECRET=your_session_secret
    ```

    Replace `your_mongo_connection_string` with your MongoDB connection URL.

4. **Run the application**:

    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:4000`.

## Usage

- **Login/Registration**: After logging in, users can generate patterns and save them.
- **Pattern Generation**: Select the pattern type (spiral, grid, or fractal), adjust parameters (color, size, density), and click "Generate Pattern."
- **Export Image**: After generating the pattern, click "Save Pattern" to download it as a PNG image.

## Authentication

- Users must log in to generate and save patterns.
- User authentication is handled via Express sessions.
- The app uses role-based access control (RBAC), with the default user role being a "regular user." 

### Example Routes:
- **POST `/login`**: Logs in a user and starts a session.
- **POST `/register`**: Registers a new user.
- **POST `/pattern/generate-pattern`**: Saves the generated pattern to the database.
- **GET `/logout`**: Logs out the user and ends the session.

## Backend Logic

- The backend handles user authentication, storing patterns in MongoDB, and generating patterns using mathematical formulas.
- The `pattern.js` file contains the logic for rendering and saving the generated patterns. Though it's not used directly in the frontend, it serves as the foundation for backend pattern creation. In the future, this logic could be applied directly to the frontend for better performance.

## Files and Directories

- **`/public/uploads/`**: Stores the saved pattern images on the server.
- **`/routes/pattern.js`**: Handles the logic for pattern generation and saving patterns to the database.
- **`/views/`**: Contains EJS templates for rendering the front-end.
- **`/models/Pattern.js`**: Mongoose model for storing pattern information in the database.
  
## Future Enhancements

- Add more pattern types such as fractals.
- Implement a more interactive UI for advanced pattern customization.
- Improve the backend logic to support on-the-fly pattern generation without storing it server-side.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Pattern Monster](https://pattern.monster/) for inspiration on pattern generation.
- [Bootstrap 5](https://getbootstrap.com/) for responsive UI components.

---

This `README.md` serves as a comprehensive guide for setting up, using, and understanding the project. It also includes sections for future enhancements and relevant acknowledgements.
