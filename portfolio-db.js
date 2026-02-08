const db = require('./db.js');

function getProjects() {
    return db.projects;
}

function getAbout() {
    return db.about;
}

function getImg() {
    return db.img;
}

function getContacts() {
    return db.contacts;
}

function searchProject(title) {
    return db.projects.find((project) => {
        project.title === title
    })
}

module.exports = {
    getProjects,
    getAbout,
    getImg,
    getContacts,
    searchProject
}