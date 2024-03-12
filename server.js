const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Store profiles and projects in memory for the sake of this example
let profiles = [];
let projects = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To parse JSON payload from project creation form
app.use(express.static('public'));

// Profile creation endpoint
app.post('/create_profile', (req, res) => {
    const { fullName, emailAddress, role, profileDescription } = req.body;
    profiles.push({ fullName, emailAddress, role, profileDescription });
    res.redirect('/'); // Redirects back to the landing page after profile creation
});

// Handle project creation
app.post('/create_project', (req, res) => {
    const { projectName, projectDescription, organisation, universityName, courseRelated, businessName, projectCoordinator } = req.body;
    
    let newProject = {
        projectName,
        projectDescription,
        organisation,
        projectCoordinator
    };

    if (organisation === 'university') {
        newProject.universityName = universityName;
        newProject.courseRelated = courseRelated;
    } else if (organisation === 'business') {
        newProject.businessName = businessName;
    }

    projects.push(newProject);

    res.redirect('/'); // Redirect back to the landing page after project creation
});

// Endpoint to get all projects
app.get('/all_projects', (req, res) => {
    res.json(projects);
});

app.get('/matches', (req, res) => {
    // Your matching algorithm goes here
    // For example, use a text analysis library to compare descriptions and find matches

    // Let's say you've calculated the matches and stored them in an array called `matches`
    // Each match could be an object with 'profileName' and 'projectName'

    let matches = calculateMatches(profiles, projects); // You'll need to write this function

    res.json(matches);
});

// Endpoint to get all profiles
app.get('/all_linkers', (req, res) => {
    res.json(profiles);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



