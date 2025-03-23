# Blog Website

A full-stack blog website built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication (register/login)
- Create, read, update, and delete blog posts
- Responsive design with Material-UI
- Image support for posts
- Markdown support for post content

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blog-website
```

2. Install dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Environment Variables:
   - Create a `.env` file in the server directory
   - Add the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Run the application:
```bash
# Run backend
cd server
npm start

# Run frontend (in a new terminal)
cd client
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.