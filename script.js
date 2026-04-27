document.addEventListener('DOMContentLoaded', () => {
    // --- 1. תפריט המבורגר למובייל ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // מוסיף אפשרות לאנימציה של ה-X במובייל
        });

        // סגירת התפריט לאחר לחיצה על לינק (לשיפור חווית משתמש במובייל)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- 2. סינון פרויקטים ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && projects.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // עדכון כפתור פעיל
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projects.forEach(p => {
                    // לוגיקת סינון: אם 'הכל' נבחר או שהקטגוריה מתאימה
                    if (filter === 'all' || p.getAttribute('data-category') === filter) {
                        p.style.display = 'block';
                        // הוספת אנימציה קלה של כניסה (אופציונלי)
                        p.style.opacity = '0';
                        setTimeout(() => {
                            p.style.opacity = '1';
                            p.style.transition = 'opacity 0.4s ease';
                        }, 10);
                    } else {
                        p.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- 3. סגירת תפריט לחיצה מחוץ לאזור (אופציונלי) ---
    window.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

const images = [
    '../assets/images/projects/golda/1.png'
    // כאן תוכלי להוסיף 2.png, 3.png כשיהיו לך
];

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});