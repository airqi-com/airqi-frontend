![image](https://github.com/user-attachments/assets/d4b4ce5a-f643-457d-8765-7a046f7605a7)

## 🚀 Getting Started

Follow these steps to get up and running with the project:

### 1. Prerequisites

Make sure you have the following installed:

- **Node.js 18+**
- **npm** or **yarn**

### 2. Clone the Repository

```bash
git clone https://github.com/yourusername/air-quality-monitoring.git
```

### 3. Install Dependencies

Install the required dependencies for the project:

```bash
npm install
# or if you're using yarn
yarn install
```

### 4. Start the Development Server

Run the development server to start the app locally:

```bash
npm run dev
# or if you're using yarn
yarn dev
```

Once the server is up, you can access the app at [http://localhost:3000](http://localhost:3000).

### 5. Authentication

To log in to the system, use the following credentials:

- **Email**: `admin@example.com`
- **Password**: `admin`

You’ll be redirected to the main dashboard where you can view the air quality, track hazards, and more!

---

## 🐳 Docker Deployment

To deploy the application using Docker, follow these steps:

1. **Build the Docker Image**

```bash
docker-compose build
```

2. **Run the Container**

```bash
docker-compose up -d
```

This will run the application in the background using Docker. You can now access it at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

The project is organized into the following folders:

```
src/
├── components/     # Reusable UI components (buttons, cards, etc.)
├── hooks/          # Custom React hooks for logic abstraction
├── pages/          # Route components (Home, Dashboard, etc.)
├── services/       # API services for data fetching
├── types/          # TypeScript type definitions (models, interfaces)
├── mocks/          # Mock data for development and testing
└── utils/          # Utility functions (helpers, formatters)
```

Each folder follows the principle of **separation of concerns**, keeping things modular and easy to maintain.

---

## 📡 API Integration

The application interacts with a RESTful API that provides key features:

- **Air quality data**: Get real-time air quality levels for different locations.
- **User authentication**: Secure login with JWT-based authentication.
- **Hazard reporting**: Users can report hazardous air conditions.
- **Route optimization**: Calculate optimal routes considering air quality using A* pathfinding.

The backend API is built in **NestJS** and provides a robust structure for handling data efficiently.
