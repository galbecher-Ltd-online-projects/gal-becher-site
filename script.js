document.addEventListener('DOMContentLoaded', () => {
    // 1. תפריט המבורגר
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // מונע סגירה מיידית בגלל ה-Event של window
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // 2. סינון פרויקטים
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projects.forEach(p => {
                if (filter === 'all' || p.getAttribute('data-category') === filter) {
                    p.style.display = 'block';
                } else {
                    p.style.display = 'none';
                }
            });
        });
    });

    // 3. סגירת תפריט בלחיצה בחוץ
    window.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});