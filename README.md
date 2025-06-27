<div align="center">
	<h1 align="center">🩺 MadicTrack</h1>
  <p align="center">
    <span>React Framework, Auth, Tailwind CSS, shadcn/ui</span>
    <br />
  </p>
</div>

**MadicTrack** is a health metrics dashboard designed to display patients' lab results over time. This project emphasizes frontend development skills with a lightweight backend implementation.


## Submission Checklist

### Core Requirements
- [x] User authentication (signup/signin) working
- [x] JWT token management
- [ ] Lab results dashboard displaying all three metrics
- [ ] Data visualization with appropriate charts
- [ ] Add new lab result functionality
- [ ] Mobile responsive design
- [ ] Generated realistic mock data with irregular time intervals

### Technical Requirements
- [ ] React + Vite + Tailwind CSS + TypeScript frontend
- [ ] Backend API with all required endpoints
- [ ] Database integration
- [ ] Proper error handling throughout
- [ ] Loading states for async operations
- [ ] Secure token storage implementation

### Documentation
- [ ] README with clear setup instructions and assumptions made

### Code Quality
- [ ] Clean, well-organized code structure
- [ ] TypeScript types properly defined
- [ ] Components are reusable where appropriate
- [ ] No console errors

### Final Steps
- [ ] Project runs locally without errors
- [ ] All features tested and working
- [ ] Repository pushed to GitHub/GitLab
- [ ] `admin@orthonyx.com` is added as a member in the GitHub/GitLab repository
- [ ] Verified setup instructions work on a clean install

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
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
Create a .env file from .env.example and add:
Then change the examples.

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
If you want to see an example of seeded data, log in with the email account `example@gmail.com`, password `tasik123`
