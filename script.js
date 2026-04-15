document.addEventListener('DOMContentLoaded', () => {
    // המבורגר (אופציונלי אם תוסיפי בהמשך)
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

    // מודל פרויקטים
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            document.getElementById('modal-title').innerText = item.getAttribute('data-title');
            document.getElementById('modal-description').innerText = item.getAttribute('data-desc');
            document.getElementById('modal-location').innerText = item.getAttribute('data-loc');
            document.getElementById('modal-architect').innerText = item.getAttribute('data-arch');
            document.getElementById('modal-date').innerText = item.getAttribute('data-date');
            document.getElementById('modal-main-img').src = item.querySelector('img').src;

            modal.style.display = 'block';
        });
    });

    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = 'none';
    }
    
    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = 'none';
    };
});