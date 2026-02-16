const db = require('./portfolio-db.js');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/media', express.static(path.join(__dirname, 'media')));

app.get('/', (req, res) => {
    try {
        res.render('pages/index', {
            projects: db.getProjects(),
            about: db.getAbout(),
            img: db.getImg(),
            contacts: db.getContacts()
        });
    } catch (err) {
        console.error("Error in: ", err);
        res.status(500).render('pages/error', {
            error: 500,
            message: "Internal server error"
        });
    }
});

app.get('/project/:title', (req, res) => {
    try {
        const projectTitle = req.params.title;
        const project = db.searchProject(projectTitle);
        if (project) {
            res.render('pages/project', {
                project: project
            });
        } else {
            console.error("Project not found");
            res.status(404).render('pages/error', {
                error: 404,
                message: "Project not found"
            });
        }
    } catch (err) {
        console.error("Error in: ", err);
        res.status(500).render('pages/error', {
            error: 500,
            message: "Internal server error"
        });
    }
});

app.use((req, res) => {
    console.error("Page not found");
    res.status(404).render('pages/error', {
        error: 404,
        message: "Page not found"
    });
});

app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});