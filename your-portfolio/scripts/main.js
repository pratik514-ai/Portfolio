// Particle System
let scene, camera, renderer, particles;

function initParticles() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('particle-canvas'),
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Particle geometry
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for(let i = 0; i < 10000; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    // Particle material
    const material = new THREE.PointsMaterial({
        size: 2,
        color: new THREE.Color(0x00f3ff),
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 1000;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;
        renderer.render(scene, camera);
    }
    animate();
    
    // Resize handler
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    loadContent();
});

// Navigation Active State
function setActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setActiveNavigation();
});
//loadProjects function 
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const container = document.getElementById('projects-container');
    
    container.innerHTML = projects.map(project => `
        <div class="cyber-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-tags">
                ${project.tech?.map(t => `<span>${t}</span>`).join('') || ''}
            </div>
            ${project.date ? `<small class="project-date">Added: ${project.date}</small>` : ''}
        </div>
    `).join('');
}

// Add to initialization
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setActiveNavigation();
    loadProjects();
    loadSkills();
});

function loadSkills() {
    const skills = JSON.parse(localStorage.getItem('skills')) || [];
    const container = document.getElementById('skills-container');
    
    container.innerHTML = skills.map(skill => `
        <div class="cyber-card">
            <h3>${skill.name}</h3>
            <div class="skill-bar">
                <div class="progress" style="width: ${skill.level}%"></div>
                <span>${skill.level}%</span>
            </div>
        </div>
    `).join('');
}

// Update initialization
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setActiveNavigation();
    loadProjects();
    loadSkills();
});