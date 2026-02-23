// ===== LOGO LOADER =====
var LOGO_SRC = "https://res.cloudinary.com/drlg1t6pk/image/upload/v1771854440/1_1_p0yx8f.png";

function setLogos() {
  // 1. Set src on all existing img[alt="MSEED"]
  document.querySelectorAll('img[alt="MSEED"]').forEach(function (img) {
    img.src = LOGO_SRC;
    img.style.display = 'block';
  });

  // 2. If navbar-logo has no img, inject one (replace any text node)
  var navLogo = document.querySelector('.navbar-logo');
  if (navLogo) {
    var navImg = navLogo.querySelector('img');
    if (!navImg) {
      navLogo.innerHTML = '<img src="' + LOGO_SRC + '" alt="MSEED" style="height:44px;width:auto;object-fit:contain;">';
    } else {
      navImg.src = LOGO_SRC;
      navImg.style.height = '44px';
      navImg.style.width = 'auto';
      navImg.style.objectFit = 'contain';
    }
  }

  // 3. Splash logo
  var splashLogo = document.querySelector('.splash-logo');
  if (splashLogo) {
    var splashImg = splashLogo.querySelector('img');
    if (!splashImg) {
      var newImg = document.createElement('img');
      newImg.src = LOGO_SRC;
      newImg.alt = 'MSEED';
      newImg.style.cssText = 'width:280px;height:auto;object-fit:contain;';
      splashLogo.insertBefore(newImg, splashLogo.firstChild);
    } else {
      splashImg.src = LOGO_SRC;
    }
  }

  // 4. Footer brand logo
  var footerBrand = document.querySelector('.footer-brand');
  if (footerBrand) {
    var footerImg = footerBrand.querySelector('img');
    if (!footerImg) {
      var fImg = document.createElement('img');
      fImg.src = LOGO_SRC;
      fImg.alt = 'MSEED';
      fImg.style.cssText = 'height:48px;width:auto;object-fit:contain;margin-bottom:16px;';
      footerBrand.insertBefore(fImg, footerBrand.firstChild);
    } else {
      footerImg.src = LOGO_SRC;
    }
  }
}

// Run on DOM ready + after page transitions
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setLogos);
} else {
  setLogos();
}
// Also re-run after any navigation (for SPA-style page switches)
var _origNavigate = window.navigate;
window.addEventListener('DOMContentLoaded', function () {
  setTimeout(setLogos, 100);
});

// ===== NAVIGATION =====
const pages = ['portal', 'mseed', 'college-student', 'institution', 'junior', 'junior-student', 'school-inst'];
function navigate(page) {
  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.remove('active');
  });
  ['mseed-portal-select', 'junior-portal-select'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  if (page === 'portal') {
    document.getElementById('page-portal').classList.add('active');
  } else if (page === 'mseed') {
    document.getElementById('page-mseed').classList.add('active');
    document.getElementById('mseed-portal-select').style.display = 'block';
  } else if (page === 'college-student') {
    document.getElementById('page-college-student').classList.add('active');
    showTab('home');
  } else if (page === 'institution') {
    document.getElementById('page-institution').classList.add('active');
    showInstTab('services');
  } else if (page === 'junior') {
    document.getElementById('page-junior').classList.add('active');
    document.getElementById('junior-portal-select').style.display = 'block';
  } else if (page === 'junior-student') {
    document.getElementById('page-junior-student').classList.add('active');
    showJrTab('jrhome');
  } else if (page === 'school-inst') {
    document.getElementById('page-school-inst').classList.add('active');
    showSchTab('schservices');
  }
  window.scrollTo(0, 0);
}

// ===== TAB SYSTEM =====
let autoEnrollTimer = null;
let autoEnrollShown = false;

function triggerAutoEnroll() {
  if (autoEnrollShown) return;
  autoEnrollShown = true;
  const form = document.getElementById('auto-enroll-step-form');
  const success = document.getElementById('auto-enroll-step-success');
  if (form) form.classList.remove('hidden');
  if (success) success.classList.add('hidden');
  openModal('modal-auto-enroll');
}

function showTab(tab) {
  if (tab !== 'home' && autoEnrollTimer) {
    clearTimeout(autoEnrollTimer);
  }

  document.querySelectorAll('#page-college-student .tab-content').forEach(t => {
    t.classList.add('hidden');
  });
  document.querySelectorAll('#page-college-student .nav-link').forEach(l => l.classList.remove('active'));

  const target = document.getElementById('tab-' + tab);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('#page-college-student .nav-link').forEach(l => {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + tab + "'")) l.classList.add('active');
  });

  if (tab === 'home') {
    if (!autoEnrollShown) {
      if (autoEnrollTimer) clearTimeout(autoEnrollTimer);
      autoEnrollTimer = setTimeout(triggerAutoEnroll, 60000);
    }
    renderHomeCourses();
    renderPlacementSection();
    // Always re-init carousel fresh on home tab
    setTimeout(initHeroCarousel, 80);
    animateStats();
  }
  if (tab === 'courses') {
    currentCourseFilter = 'all';
    renderCourses();
  }
  if (tab === 'resources') renderResources();
  if (tab === 'games') renderGames();
  if (tab === 'precourses') {
    currentPreCourseFilter = 'all';
    renderPreCourses();
  }
  if (tab === 'resources') renderResources();

  window.scrollTo(0, 0);
}

function showInstTab(tab) {
  document.querySelectorAll('#page-institution .inst-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('#page-institution .nav-link').forEach(l => l.classList.remove('active'));
  const target = document.getElementById('inst-tab-' + tab);
  if (target) target.classList.add('active');
  document.querySelectorAll('#page-institution .nav-link').forEach(l => {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + tab + "'")) l.classList.add('active');
  });
  window.scrollTo(0, 0);
}

function showJrTab(tab) {
  document.querySelectorAll('#page-junior-student .jrtab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('#page-junior-student .nav-link').forEach(l => l.classList.remove('active'));
  const target = document.getElementById('jrtab-' + tab);
  if (target) target.classList.remove('hidden');
  document.querySelectorAll('#page-junior-student .nav-link').forEach(l => {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + tab + "'")) l.classList.add('active');
  });
  if (tab === 'jrcourses') renderJrCourses('all');
  window.scrollTo(0, 0);
}

function showSchTab(tab) {
  document.querySelectorAll('#page-school-inst .schtab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('#page-school-inst .nav-link').forEach(l => l.classList.remove('active'));
  const target = document.getElementById('schtab-' + tab);
  if (target) target.classList.remove('hidden');
  document.querySelectorAll('#page-school-inst .nav-link').forEach(l => {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + tab + "'")) l.classList.add('active');
  });
  window.scrollTo(0, 0);
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}
function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.add('hidden');
}

// ===== SPLASH =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash) {
      splash.classList.add('fade-out');
      setTimeout(() => splash.remove(), 800);
    }
  }, 2500);
});

// ===== STATS ANIMATION =====
let statsAnimated = false;
function animateStats() {
  if (statsAnimated) return;
  statsAnimated = true;
  const targets = [
    { id: 'stat1', end: 50000, suffix: '+' },
    { id: 'stat2', end: 85, suffix: '%' },
    { id: 'stat3', end: 200, suffix: '+' },
    { id: 'stat4', end: 80, suffix: '+' },
    { id: 'stat5', end: 500, suffix: '+' }
  ];
  targets.forEach(({ id, end, suffix }) => {
    const el = document.getElementById(id);
    if (!el) return;
    let start = 0;
    const duration = 1800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      el.textContent = (start >= 1000 ? Math.round(start / 1000) + 'K' : Math.round(start)) + suffix;
      if (start >= end) clearInterval(timer);
    }, 16);
  });
}

// ===== FREE COURSES DATA =====
const freeCourses = [
  { title: 'Web Dev Foundations', emoji: '🌐', desc: 'HTML, CSS & basic JavaScript — build your first webpage. Zero to deployed in 2 weeks.', duration: '2 Weeks', level: 'Beginner', depts: ['free', 'cse', 'it'], isFree: true },
  { title: 'Python Basics', emoji: '🐍', desc: 'Learn Python syntax, loops, functions, and basic projects. The best first programming language.', duration: '2 Weeks', level: 'Beginner', depts: ['free', 'cse', 'it'], isFree: true },
  { title: 'Resume Writing 101', emoji: '📄', desc: "Craft an ATS-ready resume from scratch. Understand keywords, formatting, and the do's and don'ts.", duration: '1 Week', level: 'Beginner', depts: ['free', 'cse', 'it', 'ece', 'eee', 'mech'], isFree: true },
  { title: 'Excel for Beginners', emoji: '📊', desc: 'Master Excel basics — formulas, charts, pivot tables. Essential for any career path.', duration: '1 Week', level: 'Beginner', depts: ['free', 'cse', 'it', 'mech', 'eee'], isFree: true },
];

// ===== MAIN COURSES DATA =====
const mainCourses = [
  { title: 'Web Development', depts: ['cse', 'it'], emoji: '🌐', desc: 'Full-stack mastery using modern frameworks.', duration: '12 Weeks', level: 'Intermediate' },
  { title: 'Cyber Security', depts: ['cse', 'it'], emoji: '🛡️', desc: 'Ethical hacking and network defense strategies.', duration: '10 Weeks', level: 'Advanced' },
  { title: 'UI & UX', depts: ['cse', 'it'], emoji: '🎨', desc: 'User-centric design and prototyping with Figma.', duration: '8 Weeks', level: 'Beginner' },
  { title: 'Networking & CCNA', depts: ['cse', 'it', 'ece'], emoji: '🔌', desc: 'Cisco certified network associate training.', duration: '10 Weeks', level: 'Intermediate' },
  { title: 'IoT', depts: ['cse', 'it'], emoji: '📡', desc: 'Connecting the physical world with smart devices.', duration: '12 Weeks', level: 'Intermediate' },
  { title: 'Deep Learning & Gen AI', depts: ['cse', 'it'], emoji: '🤖', desc: 'Neural networks and Large Language Models.', duration: '14 Weeks', level: 'Advanced' },
  { title: 'Data Analytics & Science', depts: ['cse', 'it'], emoji: '📊', desc: 'Statistical modeling and big data insights.', duration: '16 Weeks', level: 'Advanced' },
  { title: 'Cloud Computing', depts: ['cse', 'it'], emoji: '☁️', desc: 'AWS/Azure infrastructure and deployment.', duration: '10 Weeks', level: 'Intermediate' },
  { title: 'AI & ML', depts: ['cse', 'it'], emoji: '🧠', desc: 'Foundational machine learning algorithms.', duration: '12 Weeks', level: 'Intermediate' },
  { title: 'Antenna Design', depts: ['ece'], emoji: '📡', desc: 'RF engineering and electromagnetic simulation.', duration: '10 Weeks', level: 'Advanced' },
  { title: 'Embedded Systems', depts: ['ece'], emoji: '📟', desc: 'Microcontroller programming and architecture.', duration: '12 Weeks', level: 'Intermediate' },
  { title: 'PCB Design & Fab', depts: ['ece'], emoji: '📐', desc: 'Hardware design and manufacturing processes.', duration: '8 Weeks', level: 'Beginner' },
  { title: 'Robotics', depts: ['ece', 'mech'], emoji: '🤖', desc: 'Mechatronics and automated system design.', duration: '14 Weeks', level: 'Intermediate' },
  { title: 'IoT & Energy Monitoring', depts: ['eee'], emoji: '🔋', desc: 'Smart metering and grid power management.', duration: '10 Weeks', level: 'Intermediate' },
  { title: 'BMS', depts: ['eee'], emoji: '🏢', desc: 'Building Management Systems & Automation.', duration: '8 Weeks', level: 'Beginner' },
  { title: 'Electrical Safety', depts: ['eee'], emoji: '⚠️', desc: 'Compliance and safety standards for industry.', duration: '6 Weeks', level: 'Beginner' },
  { title: 'EV Technology', depts: ['eee', 'mech'], emoji: '⚡', desc: 'Electric vehicle powertrain and battery tech.', duration: '12 Weeks', level: 'Advanced' },
  { title: 'Industrial Automation', depts: ['eee', 'mech'], emoji: '🏭', desc: 'PLC, SCADA, and manufacturing workflows.', duration: '10 Weeks', level: 'Advanced' },
  { title: 'Power Electronics', depts: ['eee'], emoji: '⚡', desc: 'Power conversion and semiconductor devices.', duration: '12 Weeks', level: 'Advanced' },
  { title: 'Smart Grid Tech', depts: ['eee'], emoji: '🌐', desc: 'Modern power distribution and networking.', duration: '10 Weeks', level: 'Intermediate' },
  { title: '3D Printing', depts: ['mech'], emoji: '🖨️', desc: 'Additive manufacturing and rapid prototyping.', duration: '8 Weeks', level: 'Beginner' },
  { title: 'CAD, CAM, CAE', depts: ['mech'], emoji: '📐', desc: 'Computer-aided design and engineering analysis.', duration: '16 Weeks', level: 'Intermediate' },
  { title: 'CNC Programming', depts: ['mech'], emoji: '⚙️', desc: 'Precision manufacturing and toolpathing.', duration: '10 Weeks', level: 'Intermediate' },
  { title: 'EV Design & Dynamics', depts: ['mech'], emoji: '🏎️', desc: 'Vehicle dynamics and structural chassis design.', duration: '14 Weeks', level: 'Advanced' },
];

// ===== BUNDLE COURSES DATA =====
const bundleCourses = [
  { title: 'Full Stack Developer Bundle', emoji: '🚀', courses: ['Web Development', 'Cloud Computing', 'UI & UX', 'Cyber Security'], desc: 'End-to-end web development — from design to deployment. Perfect for CSE/IT students targeting product companies.', duration: '40 Weeks', level: 'Intermediate', originalPrice: '₹24,000', bundlePrice: '₹14,999', depts: ['bundle', 'cse', 'it'], isFree: false, isBundle: true },
  { title: 'Data Analyst Pro Bundle', emoji: '📊', courses: ['Data Analytics & Science', 'AI & ML', 'Deep Learning & Gen AI'], desc: 'Complete data career path from analytics to AI. Ideal for students targeting analytics, fintech, and product roles.', duration: '32 Weeks', level: 'Advanced', originalPrice: '₹18,000', bundlePrice: '₹10,999', depts: ['bundle', 'cse', 'it'], isFree: false, isBundle: true },
  { title: 'EV & Automation Bundle', emoji: '⚡', courses: ['EV Technology', 'Industrial Automation', 'CAD, CAM, CAE'], desc: 'Future-ready mechanical & EEE bundle for students targeting EV, manufacturing, and automation industries.', duration: '32 Weeks', level: 'Advanced', originalPrice: '₹16,000', bundlePrice: '₹9,999', depts: ['bundle', 'mech', 'eee'], isFree: false, isBundle: true },
  { title: 'Cyber & Network Security Bundle', emoji: '🛡️', courses: ['Cyber Security', 'Networking & CCNA', 'Cloud Computing', 'IoT'], desc: 'Comprehensive security and infrastructure bundle. Perfect for students eyeing cybersecurity and networking roles.', duration: '38 Weeks', level: 'Advanced', originalPrice: '₹20,000', bundlePrice: '₹12,999', depts: ['bundle', 'cse', 'it', 'ece'], isFree: false, isBundle: true },
  { title: 'Embedded & Hardware Bundle', emoji: '📟', courses: ['Embedded Systems', 'PCB Design & Fab', 'IoT', 'Robotics'], desc: 'Complete hardware stack for ECE students. Covers embedded, PCB, IoT, and robotics from beginner to job-ready.', duration: '44 Weeks', level: 'Intermediate', originalPrice: '₹22,000', bundlePrice: '₹13,999', depts: ['bundle', 'ece'], isFree: false, isBundle: true },
  { title: 'Smart Power Systems Bundle', emoji: '🔋', courses: ['Power Electronics', 'Smart Grid Tech', 'IoT & Energy Monitoring', 'EV Technology'], desc: 'Future-ready EEE bundle targeting smart grid, power electronics, and sustainable energy industries.', duration: '40 Weeks', level: 'Advanced', originalPrice: '₹20,000', bundlePrice: '₹12,499', depts: ['bundle', 'eee'], isFree: false, isBundle: true },
];

const courses = [...freeCourses, ...mainCourses, ...bundleCourses];

// ===== COURSE FILTER & RENDER =====
let currentCourseFilter = 'all';

function filterCourses(dept, btn) {
  currentCourseFilter = dept;
  document.querySelectorAll('.dept-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCourses();
}

function renderCourses() {
  const el = document.getElementById('all-courses');
  if (!el) return;

  let filtered = courses;
  if (currentCourseFilter === 'bundle') {
    filtered = courses.filter(c => c.depts && c.depts.includes('bundle'));
  } else if (currentCourseFilter === 'free') {
    filtered = courses.filter(c => c.isFree);
  } else if (currentCourseFilter !== 'all') {
    filtered = courses.filter(c => c.depts && c.depts.includes(currentCourseFilter) && !c.isFree && !c.isBundle);
  }

  el.innerHTML = filtered.map(c => {
    const bgStyle = c.isFree
      ? 'background:linear-gradient(135deg,#1a2420,var(--green))'
      : c.isBundle
        ? 'background:linear-gradient(135deg,#0a1628,#004d36)'
        : 'background:linear-gradient(135deg,var(--green),#00c98c)';

    const badge = c.isFree
      ? '<span class="free-badge">🆓 FREE</span>'
      : c.isBundle
        ? '<span class="dept-tag">📦 Bundle</span>'
        : '';

    const priceRow = c.isBundle
      ? `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
           <span style="font-size:13px;text-decoration:line-through;color:var(--grey-light)">${c.originalPrice}</span>
           <span style="font-size:16px;font-weight:900;color:var(--green)">${c.bundlePrice}</span>
         </div>
         <div style="font-size:11px;color:var(--grey-mid);margin-bottom:6px">Includes: ${c.courses ? c.courses.join(' · ') : ''}</div>`
      : '';

    const btnLabel = c.isFree ? '🎓 Enroll Free →' : c.isBundle ? '📦 Get Bundle →' : 'Enroll Now →';
    const btnClass = c.isFree ? 'btn btn-outline' : 'btn btn-primary';
    const btnAction = c.isFree
      ? `showToast('🎓 Enrolling in ${c.title.replace(/'/g, '')} — Free!','success')`
      : `openEnrollModal('${c.title.replace(/'/g, '')}')`;

    return `
      <div class="course-card">
        <div class="course-card-img" style="${bgStyle}">
          <span>${c.emoji}</span>
          ${badge}
        </div>
        <div class="course-card-body">
          <h3>${c.title}</h3>
          ${priceRow}
          <p>${c.desc}</p>
          <div class="course-meta">
            <span class="duration">⏱ ${c.duration}</span>
            <span class="course-level level-${(c.level || 'beginner').toLowerCase()}">${c.level}</span>
          </div>
          <div style="display:flex; gap:8px; margin-top:16px;">
            <button class="btn btn-outline" style="flex:1; justify-content:center; font-size:13px; padding: 10px 0;" onclick="openSyllabusModal('${c.title.replace(/'/g, "\\'")}', ${c.isFree})">Syllabus</button>
            <button class="${btnClass}" style="flex:1; justify-content:center; font-size:13px; padding: 10px 0;" onclick="${btnAction}">${btnLabel}</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderHomeCourses() {
  const home = document.getElementById('home-courses');
  if (!home || home.children.length > 0) return;
  const featured = [
    ...courses.filter(c => c.isFree).slice(0, 1),
    ...courses.filter(c => !c.isFree && !c.isBundle).slice(0, 2),
  ];
  home.innerHTML = featured.map(c => `
    <div class="course-card">
      <div class="course-card-img" style="${c.isFree ? 'background:linear-gradient(135deg,#1a2420,var(--green))' : 'background:linear-gradient(135deg,var(--green),#00c98c)'}">
        <span>${c.emoji}</span>
        ${c.isFree ? '<span class="free-badge">🆓 FREE</span>' : ''}
      </div>
      <div class="course-card-body">
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="course-meta">
          <span class="duration">⏱ ${c.duration}</span>
          <span class="course-level level-${(c.level || 'beginner').toLowerCase()}">${c.level}</span>
        </div>
        <div style="display:flex; gap:8px; margin-top:16px;">
          <button class="btn btn-outline" style="flex:1; justify-content:center; font-size:13px; padding: 10px 0;"
            onclick="openSyllabusModal('${c.title.replace(/'/g, "\\'")}', ${c.isFree})">
            Syllabus
          </button>
          <button class="${c.isFree ? 'btn btn-outline' : 'btn btn-primary'}" style="flex:1; justify-content:center; font-size:13px; padding: 10px 0;"
            onclick="${c.isFree ? `showToast('🎓 Enrolled free!','success')` : `openEnrollModal('${c.title.replace(/'/g, "\\'")}')`}">
            ${c.isFree ? '🎓 Enroll Free →' : 'Enroll Now →'}
          </button>
        </div>
      </div>
    </div>`).join('');
}

// ===== SYLLABUS MODAL =====
let currentSyllabusCourse = '';
let currentSyllabusIsFree = false;

function openSyllabusModal(courseName, isFree) {
  currentSyllabusCourse = courseName;
  currentSyllabusIsFree = isFree;
  const modal = document.getElementById('modal-syllabus');
  const title = document.getElementById('syllabus-title');
  const content = document.getElementById('syllabus-roadmap-inject');

  if (title) title.textContent = courseName;

  let roadmapHTML = '<div class="program-timeline">';
  for (let i = 1; i <= 6; i++) {
    roadmapHTML += `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <h4>Module ${i}: ${['Fundamentals', 'Core Concepts', 'Advanced Techniques', 'Real-world Application', 'Project Work', 'Final Assessment'][i - 1]}</h4>
        <p style="color:var(--grey-mid); font-size:14px; margin-top:6px; line-height: 1.6;">Detailed breakdown of everything covered in this section. Includes hands-on exercises, quizzes, and practical assignments to build your skills step-by-step.</p>
      </div>
    `;
  }
  roadmapHTML += '</div>';
  roadmapHTML += '<div style="height: 120px; display:flex; align-items:center; justify-content:center; color:var(--grey-light); font-size:12px;">End of Syllabus</div>';

  if (content) content.innerHTML = roadmapHTML;

  const scrollArea = document.getElementById('syllabus-content');
  if (scrollArea) {
    scrollArea.scrollTop = 0;
    scrollArea.dataset.autoTriggered = '';
  }

  if (modal) modal.classList.remove('hidden');
}

function checkSyllabusScroll(el) {
  if (!el) return;
  const scrollPercentage = el.scrollTop / (el.scrollHeight - el.clientHeight);
  if (scrollPercentage > 0.5) {
    if (!el.dataset.autoTriggered) {
      el.dataset.autoTriggered = 'true';
      setTimeout(() => { triggerSyllabusEnroll(); }, 400);
    }
  }
}

function triggerSyllabusEnroll() {
  closeModal('modal-syllabus');
  if (currentSyllabusIsFree) {
    showToast('🎓 Enrolling in ' + currentSyllabusCourse + ' — Free!', 'success');
  } else {
    openEnrollModal(currentSyllabusCourse);
  }
}

// ===== RESOURCES =====
const resources = [
  { icon: '📄', title: 'Ultimate Resume Templates Pack', desc: '12 ATS-optimized resume templates for different industries and experience levels', type: 'PDF', size: '2.4 MB' },
  { icon: '💡', title: 'Interview Questions Bank – 2024', desc: '500+ interview questions with model answers for technical and HR rounds', type: 'PDF', size: '4.1 MB' },
  { icon: '🔢', title: 'Aptitude Mastery Workbook', desc: 'Quantitative, logical reasoning and verbal ability practice with solutions', type: 'PDF', size: '3.8 MB' },
  { icon: '💼', title: 'LinkedIn Profile Optimization Guide', desc: 'Step-by-step guide to create a recruiter-magnetic LinkedIn profile', type: 'PDF', size: '1.2 MB' },
  { icon: '🗣️', title: 'GD Topics with Analysis – 2024', desc: '100 current affairs GD topics with key points and structuring framework', type: 'PDF', size: '2.1 MB' },
  { icon: '📊', title: 'Excel for Working Professionals', desc: '100 formulas, pivot tables, dashboards and data visualization with practice files', type: 'PDF', size: '5.3 MB' },
  { icon: '🤖', title: 'AI Tools for Career Growth', desc: 'How to use ChatGPT, Canva AI, Copilot and more to stand out in your job search', type: 'PDF', size: '1.8 MB' },
  { icon: '📧', title: 'Professional Email Templates', desc: '50 ready-to-use email templates for job applications, follow-ups and networking', type: 'PDF', size: '0.8 MB' },
];

function renderResources() {
  const el = document.getElementById('resources-list');
  if (!el || el.children.length > 0) return;
  el.innerHTML = resources.map(r => `
    <div class="resource-card">
      <div class="resource-icon">${r.icon}</div>
      <div class="resource-info"><h4>${r.title}</h4><p>${r.desc}</p></div>
      <div class="resource-meta">
        <span class="pdf-badge">${r.type} · ${r.size}</span>
        <button class="btn btn-outline" style="padding:8px 16px;font-size:13px" onclick="showToast('📥 Downloading: ${r.title.split(' ').slice(0, 3).join(' ')}...','success')">Download</button>
      </div>
    </div>`).join('');
}

// ===== PRE-RECORDED COURSES =====
const preCoursesData = [...freeCourses, ...mainCourses];
let currentPreCourseFilter = 'all';

function filterPreCourses(dept, btn) {
  currentPreCourseFilter = dept;
  document.querySelectorAll('#precourse-dept-filter .dept-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderPreCourses();
}

function renderPreCourses() {
  const el = document.getElementById('all-precourses');
  if (!el) return;

  let filtered = preCoursesData;
  if (currentPreCourseFilter === 'free') {
    filtered = preCoursesData.filter(c => c.isFree);
  } else if (currentPreCourseFilter !== 'all') {
    filtered = preCoursesData.filter(c => c.depts && c.depts.includes(currentPreCourseFilter));
  }

  el.innerHTML = filtered.map(c => {
    const badge = c.isFree ? '<span class="free-badge">🆓 FREE</span>' : '';
    const safeTitle = c.title ? c.title.replace(/'/g, "\\'") : '';

    return `
      <div class="course-card">
        <div class="course-card-video" style="position:relative; width:100%; height:180px; background:#000; border-radius: var(--radius) var(--radius) 0 0; overflow:hidden;">
          <video controls preload="none"
            style="width: 100%; height: 100%; object-fit: cover; outline: none;"
            onended="openEnrollModal('${safeTitle}')"
            controlsList="nodownload">
            <source src="CLOUDINARY_VIDEO_LINK" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          ${c.isFree ? '<div style="position:absolute; top:12px; right:12px; z-index:2; pointer-events:none;">' + badge + '</div>' : ''}
          <div style="position:absolute; top:12px; left:12px; z-index:2; font-size:24px; pointer-events:none;">${c.emoji || ''}</div>
        </div>
        <div class="course-card-body">
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
          <div class="course-meta">
            <span class="duration">⏱ ${c.duration}</span>
            <span class="course-level level-${(c.level || 'beginner').toLowerCase()}">${c.level}</span>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ===== GAMES =====
const games = [
  { icon: '🎯', title: 'Career Quiz Blitz', hook: 'Play to Get OFF Price', desc: 'Test your knowledge of career terms, industries and workplace scenarios in this fast-paced quiz.', badge: 'Knowledge', action: "openModal('modal-quiz')" },
  { icon: '🏆', title: 'Mock Interview', desc: 'Kick Out the Fear. Practice answering tough interview questions with our chat-style interviewer.', badge: 'Practice', action: "openModal('modal-interview')" },
  { icon: '⚡', title: 'Aptitude Speed Challenge', desc: 'Solve quantitative reasoning problems against the clock. Track your speed and accuracy.', badge: 'Math & Logic', action: "openModal('modal-aptitude')" },
];

function renderGames() {
  const el = document.getElementById('games-list');
  if (!el || el.children.length > 0) return;
  el.innerHTML = games.map(g => `
    <div class="game-card">
      <div class="game-card-img" style="background:linear-gradient(135deg,rgba(0,177,123,0.12),var(--milk-dark))">${g.icon}</div>
      <div class="game-card-body">
        <div class="game-badge">🎮 ${g.badge}</div>
        <h3 style="margin-bottom: ${g.hook ? '4px' : '8px'}">${g.title}</h3>
        ${g.hook ? `<div style="font-size:12px; font-weight:700; color:var(--green); margin-bottom:8px; animation: pulse 2s infinite;">🔥 ${g.hook}</div>` : ''}
        <p>${g.desc}</p>
        <button class="btn btn-primary" style="width:100%;justify-content:center;font-size:13px" onclick="${g.action}">Play Now →</button>
      </div>
    </div>`).join('');
}

// ===== PLACEMENT SECTION =====
const placementStudents = [
  { name: 'Priya Ramesh', initials: 'PR', dept: 'B.Tech CSE, 2024', linkedin: 'https://linkedin.com/in/priyaramesh', photo: '', before: 'Struggling to get interview calls with a generic resume. No idea about ATS systems.', after: 'Placed at TCS as Software Developer with ₹7.5 LPA after MSEED ATS training.', company: 'TCS', salary: '7.5 LPA' },
  { name: 'Arjun Suresh', initials: 'AS', dept: 'B.E. ECE, 2024', linkedin: 'https://linkedin.com/in/arjunsuresh', photo: '', before: 'No internship experience. Weak in aptitude. Failed 3 placement drives.', after: 'Cleared Infosys and Wipro drives. Joined Infosys as Systems Engineer – ₹6.5 LPA.', company: 'Infosys', salary: '6.5 LPA' },
  { name: 'Sneha Krishnan', initials: 'SK', dept: 'MBA Finance, 2024', linkedin: 'https://linkedin.com/in/snehakrishnan', photo: '', before: 'No LinkedIn presence. Resume had zero keywords. Rejected in HR rounds.', after: 'Optimized profile with MSEED. Now at HDFC Bank as Relationship Manager – ₹8 LPA.', company: 'HDFC Bank', salary: '8 LPA' },
  { name: 'Karthik Selvam', initials: 'KS', dept: 'B.Tech Mech, 2023', linkedin: 'https://linkedin.com/in/karthikselvam', photo: '', before: 'Only knew core subjects. No idea about industry tools like CAD/CAM for jobs.', after: 'Completed EV + CAD bundle. Placed at Ola Electric as Design Engineer – ₹9.2 LPA.', company: 'Ola Electric', salary: '9.2 LPA' },
  { name: 'Divya Nair', initials: 'DN', dept: 'B.Sc Computer Science, 2024', linkedin: 'https://linkedin.com/in/divyanair', photo: '', before: 'From arts background. No technical skills. Felt lost about IT career path.', after: 'Completed Web Dev + Cloud bundle. Now at Freshworks as Associate Developer – ₹7 LPA.', company: 'Freshworks', salary: '7 LPA' },
  { name: 'Rahul Murugan', initials: 'RM', dept: 'B.E. EEE, 2024', linkedin: 'https://linkedin.com/in/rahulmurugan', photo: '', before: 'Low CGPA (6.1). No certifications. Thought placement was impossible.', after: 'MSEED skill training gave him the edge. Placed at Zoho Corp – ₹10.5 LPA.', company: 'Zoho', salary: '10.5 LPA' },
];

function renderPlacementSection() {
  const el = document.getElementById('placement-grid');
  if (!el || el.children.length > 0) return;
  el.innerHTML = placementStudents.map(s => `
    <div class="placement-card">
      <div class="pc-header">
        <div class="pc-avatar">
          ${s.photo ? `<img src="${s.photo}" alt="${s.name}">` : s.initials}
        </div>
        <div class="pc-info">
          <div class="pc-name">
            ${s.name}
            <a href="${s.linkedin}" target="_blank" rel="noopener" class="pc-linkedin">in</a>
          </div>
          <div class="pc-dept">${s.dept}</div>
        </div>
      </div>
      <div class="pc-story">
        <div class="pc-before"><span class="pc-label">Before</span><span>${s.before}</span></div>
        <div class="pc-arrow-row">↓</div>
        <div class="pc-after"><span class="pc-label">After</span><span>${s.after}</span></div>
      </div>
      <div class="pc-footer">
        <div class="pc-logos">
          <span class="pc-mseed-badge">MSEED</span>
          <span class="pc-company-logo">${s.company}</span>
        </div>
        <div>
          <div class="pc-salary-num">${s.salary}</div>
          <div class="pc-salary-label">Package</div>
        </div>
      </div>
    </div>`).join('');
}

// ===== HERO CAROUSEL — FIXED =====
// ✅ Auto-play only (no manual arrows/dots)
// ✅ translateX bug fixed (no space between value and %)
// ✅ Re-initialises fresh every time home tab is shown
// ✅ Touch/swipe support retained

let hcCurrent = 0;
const HC_TOTAL = 3;
const HC_INTERVAL = 5000;
let hcTimer = null;
let hcProgressInterval = null;
let hcProgress = 0;

function hcGoTo(index) {
  hcCurrent = ((index % HC_TOTAL) + HC_TOTAL) % HC_TOTAL;
  const track = document.getElementById('hc-track');
  if (track) track.style.transform = `translateX(-${hcCurrent * 100}%)`;
  resetHcProgress();
}

function hcNext() { hcGoTo(hcCurrent + 1); }

function resetHcProgress() {
  clearInterval(hcProgressInterval);
  hcProgress = 0;
  const fill = document.getElementById('hc-progress');
  if (fill) fill.style.width = '0%';
  hcProgressInterval = setInterval(() => {
    hcProgress += 100 / (HC_INTERVAL / 100);
    if (fill) fill.style.width = Math.min(hcProgress, 100) + '%';
    if (hcProgress >= 100) clearInterval(hcProgressInterval);
  }, 100);
}

function startHcAuto() {
  clearInterval(hcTimer);
  hcTimer = setInterval(hcNext, HC_INTERVAL);
}

function initHeroCarousel() {
  // Always destroy previous instance and start fresh
  clearInterval(hcTimer);
  clearInterval(hcProgressInterval);
  hcCurrent = 0;

  const track = document.getElementById('hc-track');
  if (!track) return;
  track.style.transform = 'translateX(0%)';

  resetHcProgress();
  startHcAuto();

  // Swipe support (attach only once)
  const wrap = document.querySelector('.hero-carousel-wrap');
  if (wrap && !wrap.dataset.swipeReady) {
    wrap.dataset.swipeReady = '1';
    let touchStartX = 0;
    wrap.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) hcNext();
    });
  }
}

// ===== ATS CHECKER =====
function setATSMode(mode) {
  const checker = document.getElementById('ats-checker');
  const builder = document.getElementById('ats-builder');
  const tabChecker = document.getElementById('ats-tab-checker');
  const tabBuilder = document.getElementById('ats-tab-builder');
  if (checker) checker.style.display = mode === 'checker' ? 'block' : 'none';
  if (builder) builder.style.display = mode === 'builder' ? 'block' : 'none';
  if (tabChecker) tabChecker.className = mode === 'checker' ? 'btn btn-primary' : 'btn btn-outline';
  if (tabBuilder) tabBuilder.className = mode === 'builder' ? 'btn btn-primary' : 'btn btn-outline';
}

function simulateUpload() {
  const uploadSection = document.getElementById('ats-upload-section');
  const loading = document.getElementById('ats-loading');
  const results = document.getElementById('ats-results');
  if (uploadSection) uploadSection.classList.add('hidden');
  if (loading) loading.classList.remove('hidden');
  if (results) results.classList.add('hidden');
  setTimeout(() => {
    if (loading) loading.classList.add('hidden');
    if (results) results.classList.remove('hidden');
    const insights = [
      { type: 'good', icon: '✅', title: 'Strong Action Verbs Detected', text: 'Your resume uses 8+ quantified achievement statements — great for ATS and human reviewers.' },
      { type: 'good', icon: '✅', title: 'Clean, Parseable Format', text: 'Single-column layout with standard fonts ensures smooth parsing by ATS systems.' },
      { type: 'warn', icon: '⚠️', title: 'Missing Key Skill Keywords', text: 'Add skills like "Agile", "Scrum", "REST API" or "Cloud Platforms" based on target JD.' },
      { type: 'warn', icon: '⚠️', title: 'Summary Section Too Generic', text: 'Tailor your professional summary to include role-specific keywords from job descriptions.' },
      { type: 'bad', icon: '❌', title: 'No LinkedIn Profile URL', text: 'Include your LinkedIn URL to increase recruiter engagement by 40%.' },
    ];
    const insightsList = document.getElementById('ats-insights-list');
    if (insightsList) insightsList.innerHTML = insights.map(i => `
      <div class="insight-item">
        <div class="insight-icon ${i.type}">${i.icon}</div>
        <div class="insight-text"><h4>${i.title}</h4><p>${i.text}</p></div>
      </div>`).join('');
    const keywords = [
      { name: 'Technical Skills', score: 78 }, { name: 'Soft Skills', score: 65 },
      { name: 'Industry Keywords', score: 54 }, { name: 'Role-Specific Terms', score: 82 },
      { name: 'Quantified Achievements', score: 91 }
    ];
    const keywordBars = document.getElementById('keyword-bars');
    if (keywordBars) keywordBars.innerHTML = keywords.map(k => `
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
          <span>${k.name}</span>
          <span style="font-weight:700;color:${k.score >= 70 ? 'var(--green)' : k.score >= 50 ? '#F57F17' : '#c62828'}">${k.score}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${k.score}%;background:${k.score >= 70 ? 'linear-gradient(90deg,var(--green),#00c98c)' : k.score >= 50 ? 'linear-gradient(90deg,#F57F17,#FFB74D)' : 'linear-gradient(90deg,#e53935,#ef5350)'}"></div></div>
      </div>`).join('');
  }, 3500);
}

// ===== RESUME BUILDER =====
let currentStep = 2;
function goBuilderStep(step) {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById('builder-step-' + i);
    if (el) el.classList.add('hidden');
  }
  const target = document.getElementById('builder-step-' + step);
  if (target) target.classList.remove('hidden');
  currentStep = step;
  const steps = document.querySelectorAll('.builder-step');
  steps.forEach((s, i) => {
    s.className = 'builder-step';
    if (i + 1 < step) s.classList.add('done');
    else if (i + 1 === step) s.classList.add('active');
  });
}

function updatePreview() {
  const val = id => document.getElementById(id)?.value || '';
  const el = id => document.getElementById(id);
  const fname = val('rb-fname'), lname = val('rb-lname');
  if (el('prev-name')) el('prev-name').textContent = (fname || lname) ? `${fname} ${lname}`.trim() : 'Your Name';
  if (el('prev-contact')) el('prev-contact').textContent = [val('rb-email'), val('rb-phone'), val('rb-linkedin')].filter(Boolean).join(' | ') || 'email | phone | linkedin';
  if (el('prev-summary')) el('prev-summary').textContent = val('rb-summary') || 'Your professional summary will appear here...';
  if (el('prev-edu')) el('prev-edu').innerHTML = `<strong>${val('rb-college') || 'Your University'}</strong> – ${val('rb-degree') || 'Your Degree'}`;
  if (el('prev-cgpa')) el('prev-cgpa').textContent = val('rb-cgpa') || 'CGPA';
  if (el('prev-year')) el('prev-year').textContent = val('rb-year') || 'Year';
  if (el('prev-exp')) el('prev-exp').innerHTML = `<strong>${val('rb-company') || 'Company'}</strong> – ${val('rb-role') || 'Role'}`;
  if (el('prev-dates')) el('prev-dates').textContent = (val('rb-from') || val('rb-to')) ? `${val('rb-from')} – ${val('rb-to')}` : 'Dates';
  if (el('prev-achievements')) el('prev-achievements').textContent = val('rb-achievements');
  if (el('prev-skills')) el('prev-skills').textContent = val('rb-skills') || 'Technical & soft skills appear here';
  if (el('prev-certs')) el('prev-certs').textContent = val('rb-certs');
}

// ===== QUIZ GAME =====
const deptQuestions = {
  cse: [
    { q: "What does API stand for?", opts: ["Application Programming Interface", "Advanced Program Integration", "Applied Process Integration", "Automated Programming Interface"], ans: 0 },
    { q: "Which data structure uses LIFO?", opts: ["Queue", "Stack", "Tree", "Graph"], ans: 1 },
    { q: "What is the time complexity of binary search?", opts: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], ans: 2 },
  ],
  it: [
    { q: "What is a primary key?", opts: ["A unique identifier for a record", "A key used for encryption", "A foreign key reference", "A table index"], ans: 0 },
    { q: "Which protocol is used for secure web traffic?", opts: ["HTTP", "FTP", "HTTPS", "SMTP"], ans: 2 },
    { q: "What does DNS do?", opts: ["Resolves IP addresses to names", "Resolves domain names to IP addresses", "Secures network traffic", "Encrypts databases"], ans: 1 },
  ],
  ece: [
    { q: "What is an operational amplifier?", opts: ["A logic gate", "A voltage amplifier", "A digital counter", "A memory cell"], ans: 1 },
    { q: "What does VLSI stand for?", opts: ["Very Low Scale Integration", "Very Large Scale Integration", "Voltage Logic Signal Interface", "Variable Length Signal Input"], ans: 1 },
    { q: "Which of these is a microcontroller?", opts: ["Pentium 4", "Intel Core i7", "8051", "ARM Cortex-A78"], ans: 2 },
  ],
  eee: [
    { q: "What is the unit of electrical resistance?", opts: ["Volts", "Amperes", "Ohms", "Watts"], ans: 2 },
    { q: "What does a transformer do?", opts: ["Converts AC to DC", "Converts DC to AC", "Steps up or steps down AC voltage", "Stores electrical energy"], ans: 2 },
    { q: "According to Ohm's law, V = ?", opts: ["I/R", "R/I", "IR", "I^2R"], ans: 2 },
  ],
  mech: [
    { q: "What is the study of fluids in motion?", opts: ["Thermodynamics", "Fluid Dynamics", "Statics", "Kinematics"], ans: 1 },
    { q: "Which thermodynamic cycle describes a steam engine?", opts: ["Otto cycle", "Diesel cycle", "Rankine cycle", "Brayton cycle"], ans: 2 },
    { q: "What is stress?", opts: ["Force per unit Area", "Mass per unit Volume", "Change in length per unit length", "Work per unit time"], ans: 0 },
  ]
};

let quizState = { currentQ: 0, score: 0, dept: null, questions: [], timer: null, timeLeft: 10 };

function startQuizForDept(dept) {
  quizState.dept = dept;
  quizState.questions = deptQuestions[dept] || deptQuestions['cse'];
  quizState.currentQ = 0;
  quizState.score = 0;
  document.getElementById('quiz-step-dept').classList.add('hidden');
  document.getElementById('quiz-step-questions').classList.remove('hidden');
  loadNextQuizQuestion();
}

function loadNextQuizQuestion() {
  if (quizState.currentQ >= quizState.questions.length) return finishQuiz();
  quizState.timeLeft = 10;
  document.getElementById('quiz-timer').textContent = quizState.timeLeft;
  document.getElementById('q-current').textContent = quizState.currentQ + 1;
  document.getElementById('q-total').textContent = quizState.questions.length;
  const progressPct = ((quizState.currentQ) / quizState.questions.length) * 100;
  document.getElementById('quiz-progress-bar').style.width = `${progressPct}%`;
  const qObj = quizState.questions[quizState.currentQ];
  document.getElementById('quiz-question').textContent = qObj.q;
  const optsContainer = document.getElementById('quiz-options');
  optsContainer.innerHTML = '';
  qObj.opts.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline';
    btn.style.cssText = 'width:100%; justify-content:flex-start; text-align:left; border-color:var(--grey-pale); color:var(--dark); font-weight:500; padding:12px 16px;';
    btn.textContent = opt;
    btn.onclick = () => checkQuizAnswer(idx, btn);
    optsContainer.appendChild(btn);
  });
  clearInterval(quizState.timer);
  quizState.timer = setInterval(() => {
    quizState.timeLeft--;
    document.getElementById('quiz-timer').textContent = quizState.timeLeft;
    if (quizState.timeLeft <= 0) { clearInterval(quizState.timer); checkQuizAnswer(-1, null); }
  }, 1000);
}

function checkQuizAnswer(selectedIdx, btnElement) {
  clearInterval(quizState.timer);
  const qObj = quizState.questions[quizState.currentQ];
  const buttons = document.getElementById('quiz-options').querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);
  if (selectedIdx === qObj.ans) {
    quizState.score++;
    if (btnElement) { btnElement.style.background = 'rgba(0,177,123,0.1)'; btnElement.style.borderColor = 'var(--green)'; btnElement.style.color = 'var(--green)'; }
  } else {
    if (btnElement) { btnElement.style.background = 'rgba(255,59,48,0.1)'; btnElement.style.borderColor = '#FF3B30'; btnElement.style.color = '#FF3B30'; }
    buttons[qObj.ans].style.borderColor = 'var(--green)'; buttons[qObj.ans].style.color = 'var(--green)';
  }
  setTimeout(() => { quizState.currentQ++; loadNextQuizQuestion(); }, 1000);
}

function finishQuiz() {
  document.getElementById('quiz-step-questions').classList.add('hidden');
  document.getElementById('quiz-step-result').classList.remove('hidden');
  const scaledScore = Math.round((quizState.score / quizState.questions.length) * 25);
  document.getElementById('quiz-final-score').textContent = scaledScore;
}

function redirectQuizToCourses() {
  closeModal('modal-quiz');
  showTab('courses');
  const filterBtn = document.querySelector(`.dept-btn[onclick*="'${quizState.dept}'"]`);
  if (filterBtn) filterBtn.click();
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('hidden');
    if (id === 'modal-quiz') {
      document.getElementById('quiz-step-dept').classList.remove('hidden');
      document.getElementById('quiz-step-questions').classList.add('hidden');
      document.getElementById('quiz-step-result').classList.add('hidden');
    }
    if (id === 'modal-interview') {
      document.getElementById('interview-step-dept').classList.remove('hidden');
      document.getElementById('interview-step-chat').classList.add('hidden');
      document.getElementById('interview-step-result').classList.add('hidden');
      clearInterviewTimer();
    }
    if (id === 'modal-aptitude') {
      document.getElementById('aptitude-step-intro').classList.remove('hidden');
      document.getElementById('aptitude-step-challenge').classList.add('hidden');
      document.getElementById('aptitude-footer').classList.add('hidden');
      clearAptitudeTimer();
    }
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('hidden');
    if (id === 'modal-quiz') clearInterval(quizState.timer);
    if (id === 'modal-interview') clearInterviewTimer();
    if (id === 'modal-aptitude') clearAptitudeTimer();
  }
}

// ===== MOCK INTERVIEW =====
const interviewData = {
  cse: ["Tell me about a time you debugged a complex issue.", "Explain the difference between REST and GraphQL.", "How do you handle state in a React application?"],
  it: ["What is your process for troubleshooting a network issue?", "How do you ensure data security in a web application?", "Describe a time you worked with a cloud platform."],
  ece: ["Explain how a multiplexer works.", "What challenges have you faced in PCB design?", "How would you optimize power consumption in a circuit?"],
  eee: ["Describe the function of a relay.", "How do you analyze a power distribution system?", "Explain the principle of electromagnetic induction."],
  mech: ["What are the key considerations in material selection?", "How do you approach a thermal analysis problem?", "Describe a CAD project you worked on recently."]
};

let intState = { dept: null, qIndex: 0, timer: null, timeLeft: 300, messages: [] };

function startInterviewForDept(dept) {
  intState.dept = dept;
  intState.qIndex = 0;
  intState.timeLeft = 300;
  intState.messages = [];
  document.getElementById('interview-step-dept').classList.add('hidden');
  document.getElementById('interview-step-chat').classList.remove('hidden');
  const chatArea = document.getElementById('interview-chat-area');
  chatArea.innerHTML = '';
  startInterviewTimer();
  appendInterviewMessage('bot', `Hi! I'm your mock interviewer for ${dept.toUpperCase()}. Let's get started. ${interviewData[dept][0]}`);
}

function appendInterviewMessage(sender, text) {
  const chatArea = document.getElementById('interview-chat-area');
  const msgDiv = document.createElement('div');
  msgDiv.style.cssText = `max-width: 85%; padding: 12px 16px; border-radius: 12px; font-size: 14px; line-height: 1.5; ${sender === 'user' ? 'align-self:flex-end; background:var(--green); color:#fff;' : 'align-self:flex-start; background:#fff; color:var(--dark); border:1px solid var(--grey-pale);'}`;
  msgDiv.textContent = text;
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function handleInterviewKeyPress(e) {
  if (e.key === 'Enter') sendInterviewMessage();
}

function sendInterviewMessage() {
  const input = document.getElementById('interview-input');
  const text = input.value.trim();
  if (!text) return;
  appendInterviewMessage('user', text);
  input.value = '';
  intState.qIndex++;
  setTimeout(() => botInterviewReply(), 800);
}

function botInterviewReply() {
  const questions = interviewData[intState.dept] || interviewData['cse'];
  if (intState.qIndex < questions.length) {
    appendInterviewMessage('bot', `Good point. Next question: ${questions[intState.qIndex]}`);
  } else {
    appendInterviewMessage('bot', "Thank you! That concludes our mock interview. Generating feedback...");
    setTimeout(() => finishInterview(), 1500);
  }
}

function startInterviewTimer() {
  clearInterval(intState.timer);
  intState.timer = setInterval(() => {
    intState.timeLeft--;
    const m = Math.floor(intState.timeLeft / 60).toString().padStart(2, '0');
    const s = (intState.timeLeft % 60).toString().padStart(2, '0');
    document.getElementById('interview-timer').textContent = `${m}:${s}`;
    if (intState.timeLeft <= 0) finishInterview();
  }, 1000);
}

function clearInterviewTimer() { clearInterval(intState.timer); }

function finishInterview() {
  clearInterviewTimer();
  document.getElementById('interview-step-chat').classList.add('hidden');
  document.getElementById('interview-step-result').classList.remove('hidden');
  setTimeout(() => {
    if (!document.getElementById('modal-interview').classList.contains('hidden')) {
      redirectInterviewToCourses();
    }
  }, 4000);
}

function redirectInterviewToCourses() {
  closeModal('modal-interview');
  showTab('courses');
}

// ===== APTITUDE CHALLENGE =====
const aptitudeQuestions = [
  { q: "If a train 120m long passes a telegraph pole in 6 seconds, what is its speed?", ans: "72 km/hr", exp: "Speed = Distance/Time = 120/6 = 20 m/s. Convert to km/hr: 20 * (18/5) = 72 km/hr." },
  { q: "What is the next number in the series: 2, 6, 12, 20, 30, ...?", ans: "42", exp: "Differences are 4, 6, 8, 10. Next difference is 12. So, 30 + 12 = 42." },
  { q: "A can do a piece of work in 10 days and B can do it in 15 days. How long will they take together?", ans: "6 days", exp: "A's 1 day work = 1/10. B's 1 day work = 1/15. Together = 1/10 + 1/15 = 1/6. Total = 6 days." },
  { q: "If 15% of x is 45, what is x?", ans: "300", exp: "0.15 * x = 45 => x = 45 / 0.15 = 300." },
  { q: "Find the average of first 5 multiples of 3.", ans: "9", exp: "Multiples: 3, 6, 9, 12, 15. Average = 45/5 = 9." }
];

let aptTimer = null;
let aptTimeLeft = 600;

function startAptitudeChallenge() {
  document.getElementById('aptitude-step-intro').classList.add('hidden');
  document.getElementById('aptitude-step-challenge').classList.remove('hidden');
  const qArea = document.getElementById('aptitude-q-area');
  qArea.innerHTML = '';
  aptitudeQuestions.forEach((item, idx) => {
    const card = document.createElement('div');
    card.style.cssText = 'background:#fff; border:1px solid var(--grey-pale); border-radius:12px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.02);';
    card.innerHTML = `
      <div style="font-size:12px; color:var(--grey-mid); font-weight:700; margin-bottom:8px;">Question ${idx + 1}</div>
      <p style="font-size:15px; font-weight:600; margin-bottom:16px;">${item.q}</p>
      <div style="background:rgba(0,177,123,0.05); padding:12px; border-radius:8px; border-left:3px solid var(--green);">
        <div style="font-size:13px; font-weight:700; color:var(--green); margin-bottom:4px;">Answer: ${item.ans}</div>
        <div style="font-size:13px; color:var(--grey-mid);">${item.exp}</div>
      </div>`;
    qArea.appendChild(card);
  });
  document.getElementById('aptitude-footer').classList.remove('hidden');
  aptTimeLeft = 600;
  clearInterval(aptTimer);
  aptTimer = setInterval(() => {
    aptTimeLeft--;
    const m = Math.floor(aptTimeLeft / 60).toString().padStart(2, '0');
    const s = (aptTimeLeft % 60).toString().padStart(2, '0');
    document.getElementById('aptitude-timer').textContent = `${m}:${s}`;
    if (aptTimeLeft <= 0) clearAptitudeTimer();
  }, 1000);
}

function clearAptitudeTimer() { clearInterval(aptTimer); }

// ===== ENROLL MODAL =====
function openEnrollModal(courseName) {
  const form = document.getElementById('enroll-step-form');
  const success = document.getElementById('enroll-step-success');
  if (form) form.classList.remove('hidden');
  if (success) success.classList.add('hidden');
  const courseInput = document.getElementById('en-course');
  if (courseInput && courseName && courseName !== 'General') courseInput.value = courseName;
  openModal('modal-enroll');
}

function submitAutoEnrolment() {
  const name = document.getElementById('ae-name')?.value?.trim();
  const email = document.getElementById('ae-email')?.value?.trim();
  const phone = document.getElementById('ae-phone')?.value?.trim();
  if (!name || !email || !phone) { showToast('Please fill in Name, Email and Phone!', 'error'); return; }
  silentWhatsAppTrigger(name, email, phone);
  const form = document.getElementById('auto-enroll-step-form');
  const success = document.getElementById('auto-enroll-step-success');
  if (form) form.classList.add('hidden');
  if (success) success.classList.remove('hidden');
}

function silentWhatsAppTrigger(name, email, phone) {
  console.log('Sending background notification for', name, email, phone);
}

function submitEnrolment() {
  const name = document.getElementById('en-name')?.value?.trim();
  const dept = document.getElementById('en-dept')?.value?.trim();
  const course = document.getElementById('en-course')?.value?.trim();
  const phone = document.getElementById('en-phone')?.value?.trim();
  const email = document.getElementById('en-email')?.value?.trim();
  if (!name || !phone || !email) { showToast('Please fill in Name, Phone and Email!', 'error'); return; }
  const data = { studentName: name, department: dept || 'Not specified', domainCourse: course || 'Not specified', mobileNumber: phone, emailId: email };
  try { sendToWhatsApp(data); } catch (error) { }
  const form = document.getElementById('enroll-step-form');
  const success = document.getElementById('enroll-step-success');
  if (form) form.classList.add('hidden');
  if (success) success.classList.remove('hidden');
}

function sendToWhatsApp(data) {
  console.log('Sending to WhatsApp securely in background:', data);
}

// ===== JUNIOR COURSES =====
const jrCourses = [
  { title: 'Scratch Programming', grade: 'primary', emoji: '🐱', desc: 'Visual block-based coding with Scratch — create games and animations!', duration: '6 weeks' },
  { title: 'Curious Science Lab', grade: 'primary', emoji: '🔬', desc: 'Fun science experiments and STEM discovery activities for curious minds.', duration: '8 weeks' },
  { title: 'Story Telling & Drama', grade: 'primary', emoji: '🎭', desc: 'Creative writing, storytelling and dramatic expression for young learners.', duration: '4 weeks' },
  { title: 'Python for Teens', grade: 'middle', emoji: '🐍', desc: 'Introduction to Python programming with fun mini-projects and games.', duration: '10 weeks' },
  { title: 'Public Speaking & Debate', grade: 'middle', emoji: '🎤', desc: 'Overcome stage fear and master the art of persuasive communication.', duration: '8 weeks' },
  { title: 'Financial Literacy Jr.', grade: 'middle', emoji: '💰', desc: 'Money, savings, budgeting and basic investment concepts for teens.', duration: '6 weeks' },
  { title: 'Web Design Basics', grade: 'secondary', emoji: '🌐', desc: 'HTML, CSS and simple JavaScript to create your first website.', duration: '10 weeks' },
  { title: 'Career Discovery Program', grade: 'secondary', emoji: '🗺️', desc: 'Explore 50+ career paths with aptitude tests and industry interactions.', duration: '8 weeks' },
  { title: 'Leadership & Entrepreneurship', grade: 'secondary', emoji: '🚀', desc: 'Business thinking, team leadership and mini startup challenge.', duration: '10 weeks' },
  { title: 'Advanced Python & Data', grade: 'senior', emoji: '📊', desc: 'Data analysis, visualization and intro to machine learning concepts.', duration: '12 weeks' },
  { title: 'Communication for Campus', grade: 'senior', emoji: '🎯', desc: 'Interview prep, GD skills and professional communication for college readiness.', duration: '8 weeks' },
  { title: 'Digital Marketing Basics', grade: 'senior', emoji: '📱', desc: 'Social media, content creation and digital marketing fundamentals.', duration: '8 weeks' },
];

function renderJrCourses(filter) {
  const el = document.getElementById('jr-courses-list');
  if (!el) return;
  const filtered = filter === 'all' ? jrCourses : jrCourses.filter(c => c.grade === filter);
  el.innerHTML = filtered.map(c => `
    <div class="course-card">
      <div class="course-card-img" style="background:linear-gradient(135deg,var(--green),#00c98c)">
        <span>${c.emoji}</span>
        <span class="dept-tag">${c.grade.charAt(0).toUpperCase() + c.grade.slice(1)}</span>
      </div>
      <div class="course-card-body">
        <h3>${c.title}</h3><p>${c.desc}</p>
        <div class="course-meta"><span class="duration">⏱ ${c.duration}</span><span class="course-level level-beginner">Jr. Program</span></div>
        <div style="display:flex; gap:8px; margin-top:16px;">
          <button class="btn btn-outline" style="flex:1; justify-content:center; font-size:13px; padding: 10px 0;"
            onclick="openSyllabusModal('${c.title.replace(/'/g, "\\'")}', true)">Syllabus</button>
          <button class="btn btn-primary" style="flex:1; justify-content:center; font-size:13px; padding: 10px 0;"
            onclick="showToast('Enrolling in ${c.title.replace(/'/g, '')}! 🌱','success')">Join Program →</button>
        </div>
      </div>
    </div>`).join('');
}

function filterGrades(grade, btn) {
  document.querySelectorAll('#grade-filter .dept-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderJrCourses(grade);
}

// ===== TOAST =====
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden', 'hide');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.classList.add('hidden'), 400);
  }, 3500);
}

// ===== PROMO STRIP =====
const promoTexts = [
  "🎯 Try our Free Trial Tutorial Courses today! →",
  "🎥 Access 50+ Pre-Recorded Video Courses! →",
  "⚡ Master new skills at your own pace! →",
  "⭐ Start your free trial tutorial now! →"
];
let currentPromoIdx = 0;

function initPromoStrip() {
  const content = document.getElementById('promo-strip-content');
  if (!content) return;
  setInterval(() => {
    content.classList.add('fade-out');
    setTimeout(() => {
      currentPromoIdx = (currentPromoIdx + 1) % promoTexts.length;
      content.innerHTML = `<span>${promoTexts[currentPromoIdx]}</span>`;
      content.classList.remove('fade-out');
    }, 400);
  }, 4000);
}

// ===== DOMContentLoaded =====
document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  renderHomeCourses();
  initPromoStrip();
});


// ============================================================
//  YOUTUBE FLOATING GALLERY — Add to script.js
//  Paste this block at the END of script.js (before last line)
// ============================================================

// ── Current playing video ──
let ytCurrentVid = '';
let ytCurrentTitle = '';

// ── Open modal ──
function openYTModal(videoId, title, tag) {
  ytCurrentVid = videoId;
  ytCurrentTitle = title;

  // Set iframe src with autoplay
  const iframe = document.getElementById('yt-iframe');
  if (iframe) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;
  }

  // Set title + tag in modal header
  const titleEl = document.getElementById('yt-modal-title');
  const tagEl = document.getElementById('yt-modal-tag');
  if (titleEl) titleEl.textContent = title;
  if (tagEl) tagEl.textContent = tag;

  // Show modal
  const overlay = document.getElementById('yt-modal');
  if (overlay) {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  // GSAP micro: modal box bounce in
  if (window.gsap) {
    gsap.fromTo('.yt-modal-box',
      { scale: 0.88, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
    );
  }
}

// ── Close modal ──
function closeYTModal(event, force) {
  // Close only if clicking overlay bg OR force=true (X button)
  if (!force && event && event.target !== document.getElementById('yt-modal')) return;

  const iframe = document.getElementById('yt-iframe');
  if (iframe) iframe.src = ''; // stop video

  const overlay = document.getElementById('yt-modal');
  if (overlay) {
    if (window.gsap) {
      gsap.to('.yt-modal-box', {
        scale: 0.9, opacity: 0, y: 20, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          overlay.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });
    } else {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }
}

// ── Open in YouTube directly ──
function openYTDirect() {
  if (ytCurrentVid) {
    window.open(`https://youtu.be/1KSdvJZ6zcU=${ytCurrentVid}`, '_blank', 'noopener,noreferrer');
  }
}

// ── Bind click events on all .yt-card elements ──
function initYTGallery() {
  document.querySelectorAll('.yt-card').forEach(card => {
    card.addEventListener('click', function () {
      const vid = this.dataset.vid;
      const title = this.dataset.title;
      const tag = this.querySelector('.yt-tag')?.textContent || 'Video';

      // If no real video ID yet — show toast
      if (!vid || vid.startsWith('VIDEO_ID')) {
        showToast('🎬 Video coming soon — stay tuned!', '');
        return;
      }

      openYTModal(vid, title, tag);

      // GSAP: card click ripple
      if (window.gsap) {
        gsap.timeline()
          .to(this, { scale: 0.93, duration: 0.1, ease: 'power1.in' })
          .to(this, { scale: 1.0, duration: 0.4, ease: 'back.out(2)' });
      }
    });

    // GSAP hover tilt
    if (window.gsap) {
      card.addEventListener('mouseenter', function (e) {
        gsap.to(this, {
          rotateY: 6,
          rotateX: -4,
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      card.addEventListener('mouseleave', function () {
        gsap.to(this, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto'
        });
      });

      // Follow mouse for 3D tilt
      card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        gsap.to(this, {
          rotateY: dx * 10,
          rotateX: -dy * 10,
          duration: 0.2,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      });
    }
  });

  // Keyboard close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeYTModal(null, true);
  });
}

// ── GSAP entrance stagger when home tab loads ──
function animateYTGalleryEntrance() {
  if (!window.gsap) return;
  const cards = document.querySelectorAll('.yt-card');
  if (!cards.length) return;

  gsap.fromTo(cards,
    { opacity: 0, y: 32, scale: 0.88, rotateZ: -3 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateZ: 0,
      duration: 0.65,
      ease: 'back.out(1.7)',
      stagger: 0.12,
      delay: 0.3
    }
  );
}

// ── Init on DOM ready ──
document.addEventListener('DOMContentLoaded', () => {
  initYTGallery();
  // GSAP CDN load (if not already in HTML head)
  if (!window.gsap) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    script.onload = () => {
      console.log('GSAP loaded');
      initYTGallery(); // re-bind with GSAP now available
    };
    document.head.appendChild(script);
  }
});

// ── Hook into showTab to trigger entrance anim ──
const _ytOrigShowTab = window.showTab || function () { };
// We patch showTab after it's defined — safe override
setTimeout(() => {
  const originalShowTab = showTab;
  window.showTab = function (tab) {
    originalShowTab(tab);
    if (tab === 'home') {
      setTimeout(animateYTGalleryEntrance, 200);
    }
  };
}, 0);