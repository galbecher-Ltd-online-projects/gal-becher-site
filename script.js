document.addEventListener('DOMContentLoaded', () => {
    // המבורגר
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // סינון פרויקטים
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
});