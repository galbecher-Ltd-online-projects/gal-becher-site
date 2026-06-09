document.addEventListener('DOMContentLoaded', () => {
    
    // 1. תפריט המבורגר מותאם למובייל (תיקון באגים ופעפוע)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); 
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // סגירת תפריט בלחיצה בחוץ
    window.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // סגירת תפריט אוטומטית כשלוחצים על קישור כלשהו מתוכו
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // 2. מנגנון סינון פרויקטים + תמיכה ב-AOS
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projects.forEach(p => {
                const category = p.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    p.style.display = 'block';
                    p.classList.add('aos-animate'); 
                } else {
                    p.style.display = 'none';
                    p.classList.remove('aos-animate');
                }
            });

            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });

    // 3. חלון צף (Modal) לנגן הווידאו של ה-Hero
    const openVideoBtn = document.getElementById('openVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const promoVideo = document.getElementById('promoVideo');

    if (openVideoBtn && videoModal && closeVideoBtn && promoVideo) {
        openVideoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            videoModal.style.display = 'flex';
            promoVideo.play();
        });

        const closeModal = () => {
            videoModal.style.display = 'none';
            promoVideo.pause();
            promoVideo.currentTime = 0; 
        };

        closeVideoBtn.addEventListener('click', closeModal);

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        });
    }

    // 4. טעינת נתונים דינמית מקובץ אודות (about-data.json)
    fetch('about-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('שגיאה בטעינת קובץ אודות');
            }
            return response.json();
        })
        .then(data => {
            const companyContainer = document.getElementById('company-paragraphs');
            if (companyContainer && data.company_story && data.company_story.paragraphs) {
                companyContainer.innerHTML = ''; 
                data.company_story.paragraphs.forEach(paragraphText => {
                    const p = document.createElement('p');
                    p.innerHTML = paragraphText;
                    companyContainer.appendChild(p);
                });
            }

            const visionTitle = document.getElementById('about-vision-title');
            const visionText = document.getElementById('about-vision-text');
            if (visionTitle && visionText && data.vision) {
                visionTitle.textContent = data.vision.title;
                visionText.textContent = data.vision.text; 
            }

            const galTitle = document.getElementById('about-gal-title');
            const galText = document.getElementById('about-gal-text');
            if (galTitle && data.about_gal) {
                galTitle.textContent = data.about_gal.title;
            }
            if (galText && data.about_gal) {
                galText.textContent = data.about_gal.text;
            }
            
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => console.error('שגיאה בטעינת הנתונים:', error));
});