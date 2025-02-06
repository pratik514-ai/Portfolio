// Data Management
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let skills = JSON.parse(localStorage.getItem('skills')) || [];


// Add Project
document.getElementById('add-project')?.addEventListener('click', () => {
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-desc').value;
    const tech = document.getElementById('project-tech').value.split(',').map(t => t.trim());
    
    if (title && description) {
        const newProject = {
            id: Date.now(),
            title,
            description,
            tech,
            date: new Date().toLocaleDateString()
        };
        
        projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
    }
});
//add-skill handler 
document.getElementById('add-skill')?.addEventListener('click', () => {
    const name = document.getElementById('skill-name').value;
    const level = document.getElementById('skill-level').value;
    const category = document.getElementById('skill-category').value;
    
    if (name && level) {
        const newSkill = {
            id: Date.now(),
            name,
            level: parseInt(level),
            category,
            date: new Date().toLocaleDateString()
        };
        
        skills.push(newSkill);
        localStorage.setItem('skills', JSON.stringify(skills));
        renderSkills();
    }
});


// Render Projects
function renderProjects() {
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
        projectsList.innerHTML = projects.map(project => `
            <div class="data-item">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <small>Added: ${project.date}</small>
                <button onclick="deleteProject(${project.id})">Delete</button>
            </div>
        `).join('');
    }
}

// Render Skills
function renderSkills() {
    const skillsList = document.getElementById('skills-list');
    if (skillsList) {
        skillsList.innerHTML = skills.map(skill => `
            <div class="data-item">
                <h3>${skill.name}</h3>
                <p>Level: ${skill.level}%</p>
                <small>Added: ${skill.date}</small>
                <button onclick="deleteSkill(${skill.id})">Delete</button>
            </div>
        `).join('');
    }
}

// Delete Project
window.deleteProject = function(id) {
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(projects));
    renderProjects();
};

// Delete Skill
window.deleteSkill = function(id) {
    skills = skills.filter(s => s.id !== id);
    localStorage.setItem('skills', JSON.stringify(skills));
    renderSkills();
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderSkills();
});
