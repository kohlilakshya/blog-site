# Interactive Blog Site

A dynamic and interactive blog web application built using Node.js and MongoDB. It implements user authentication using Passport.js and provides full CRUD (Create, Read, Update, Delete) functionality for blog posts.


## Features

- **User Authentication:** Implemented using Passport.js with Open Authentication.
- **Dynamic Blog Management:** Users can create new blogs, view all blogs, edit their own blogs, and delete their own blogs.
- **Full CRUD Operations:** The application supports complete data management for blogs, including creating, reading, updating, and deleting posts.
- **MongoDB Integration:** Blogs are stored in a dynamic MongoDB database to manage data effectively.

## Technologies Used

- **Backend:** Node.js
- **Authentication:** Passport.js (OAuth)
- **Database:** MongoDB
- **Other:** HTML, CSS, JavaScript

## How to Run

1. Clone the repository:
    ```bash
    git clone https://github.com/kohlilakshya/blog-site.git
    ```

2. Navigate to the project directory:
    ```bash
    cd blog-site
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    Create a `.env` file in the project root with the following variables:
    ```bash
    PORT=<your-port-number>
    MONGODB_URI=<your-mongodb-uri>
    CLIENT_ID=<your-google-client-id>
    CLIENT_SECRET=<your-google-client-secret>
    COOKIE_KEY=<your-cookie-key>
    ```

5. Start the application:
    ```bash
    npm start
    ```

6. Visit the application in your browser at `http://localhost:<PORT>`.

## Usage

- **Home Page:** View all published blogs.
- **Create a Blog:** Logged-in users can create a new blog post.
- **Edit/Delete Blogs:** Users can edit or delete their own posts.
- **User Authentication:** Sign in using Passport.js OAuth.
