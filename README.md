<div>
	<h1 >🩺 MadicTrack</h1>
</div>

**MadicTrack** is a health metrics dashboard designed to display patients' lab results over time. This project emphasizes frontend development skills with a lightweight backend implementation.

![Demo 1](https://res.cloudinary.com/djlazr18b/image/upload/v1751090981/Desain_tanpa_judul_j8tsv6.jpg)

## Submission Checklist

### Core Requirements
- [x] User authentication (signup/signin) working
- [x] JWT token management
- [x] Lab results dashboard displaying all three metrics
- [x] Data visualization with appropriate charts
- [x] Add new lab result functionality
- [x] Mobile responsive design
- [x] Generated realistic mock data with irregular time intervals

### Technical Requirements
- [x] React + Vite + Tailwind CSS + TypeScript frontend
- [x] Backend API with all required endpoints
- [x] Database integration
- [x] Proper error handling throughout
- [x] Loading states for async operations
- [x] Secure token storage implementation

### Documentation
- [x] README with clear setup instructions and assumptions made

### Code Quality
- [x] Clean, well-organized code structure
- [x] TypeScript types properly defined
- [x] Components are reusable where appropriate
- [x] No console errors

### Final Steps
- [x] Project runs locally without errors
- [x] All features tested and working
- [x] Repository pushed to GitHub/GitLab
- [x] Verified setup instructions work on a clean install

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/roihan37/meditrack.git
cd MadicTrack
```

### Backend Setup
Navigate to the server folder:
```bash
cd server
npm install
```

### Database Configuration
Create a new database in your local and make sure PostgreSQL is running on your local computer. Edit config/config.json:

```json
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "MeditrackDB",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5433
  }
}
```
> ⚠️ Adjust the port number if your local PostgreSQL uses a different one.

### Run Migrations
```bash
npx sequelize-cli db:migrate
```

### Run Seeders (Optional)
If you have seed files (e.g., for users or lab results), you can run:
```bash
npx sequelize-cli db:seed:all
```

### Environment Variables
Create an .env file in the server folder of .env.example and add:
Then change the example.

Required:
`JWT_SECRET_KEY`

### Development
Run the development server:
```bash
npx nodemon app.js
```
http://localhost:3000 then we are ready on the server

### Frontend Setup
Navigate to the client folder:
```bash
cd ../client
npm install
npm run dev
```
Open http://localhost:5173 then we're ready
If you want to see an example of seeded data, log in with the email account `example@gmail.com`, password `12345678`


## 👨‍💻 Author
Built with by Roihan Salsabila









