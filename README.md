# TaskFlow Frontend

Modern React frontend for TaskFlow application built with Vite.

## 🚀 Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

3. **Build for Production**
```bash
npm run build
```

## 🎨 Features

- **Modern UI**: Glass-morphism design with Tailwind CSS
- **Responsive**: Mobile-first responsive design
- **Authentication**: Login/Signup with JWT
- **Task Management**: Full CRUD operations
- **Real-time Updates**: Instant UI updates
- **Filtering**: Filter tasks by status
- **Priority System**: Visual priority indicators

## 📁 Project Structure

```
src/
├── components/        # Reusable components
│   ├── ProtectedRoute.jsx
│   ├── TaskCard.jsx
│   └── TaskForm.jsx
├── pages/            # Page components
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── Dashboard.jsx
├── context/          # React context
│   └── AuthContext.jsx
├── utils/            # Utilities
│   └── api.js
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## 🛠️ Technologies

- **Vite** - Fast build tool
- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **Lucide React** - Icon library

## 🎨 Design System

### Colors
- Primary: Blue gradient (#3b82f6 to #2563eb)
- Secondary: Purple gradient (#667eea to #764ba2)
- Background: Gradient background
- Glass Effect: Semi-transparent with backdrop blur

### Components
- Glass-morphism cards
- Smooth hover animations
- Responsive grid layouts
- Modern form inputs
- Icon-based actions