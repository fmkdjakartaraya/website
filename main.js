document.addEventListener("DOMContentLoaded", function() {
    
    // ---------------------------------------------------------
    // 1. INITIALIZE AOS ANIMATION
    // ---------------------------------------------------------
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true, offset: 100, duration: 800, easing: 'ease-out-cubic',
        });
    }

    // ---------------------------------------------------------
    // 2. MOBILE MENU (HAMBURGER)
    // ---------------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ---------------------------------------------------------
    // 3. STATS COUNTER
    // ---------------------------------------------------------
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.getAttribute('data-target');
                const duration = 2000; 
                const increment = target / (duration / 16);
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.innerText = target;
                        clearInterval(timer);
                    } else {
                        el.innerText = Math.ceil(current);
                    }
                }, 16);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));

    // ---------------------------------------------------------
    // 4. IMAGE SLIDER (FULL FEATURE: ARROWS, SWIPE, PAUSE)
    // ---------------------------------------------------------
    
    // DATA GAMBAR LENGKAP
    const imagePaths = [
        'assets/dokum/Audiensi Bakesbangpol DKI Jakarta.jpg',
        'assets/dokum/Audiensi BPBD Provinsi.jpg',
        'assets/dokum/Audiensi Dinas Pendidikan 2025.jpg',
        'assets/dokum/Dokumentasi Bimbel Akses 1.jpg',
        'assets/dokum/akses2.jpg',
        'assets/dokum/FMKD Jakarta Raya Youth Gathering Vol 1.jpg',
        'assets/dokum/FMKD Youth Gathering Vol. 2.jpg',
        'assets/dokum/Kehadiran Rakernas Fokri.jpg',
        'assets/dokum/Kunjungan Kerja Antara heritage.jpg',
        'assets/dokum/Kunjungan kerja BEM Polteknaker 2024.jpg',
        'assets/dokum/Kunjungan Kerja STIS.jpg',
        'assets/dokum/kunjungan polteknaker.jpg',
        'assets/dokum/Pembukaan Booth FMKD Jakarta Raya di Edufair Dinas Pendidikan.jpg',
        'assets/dokum/Penandatanganan MoU.jpg',
        'assets/dokum/PTK Expo FMKD Jakarta Raya.jpg',
        'assets/dokum/Webinar FMKD Jakarta Raya 2025.png',
        'assets/dokum/FMKD-2025.jpeg',
        'assets/dokum/PTK-EXPO2025.jpeg',
        'assets/dokum/Upacara Hari Bela Negara Badan Kesatuan Bangsa Dan Politik DKI Jakarta.jpeg',
        'assets/dokum/Rapat Koordinasi Persiapan Upacara Hari Bela Negara Badan Kesatuan Bangsa Dan Politik DKI Jakarta.jpeg'
    ];

    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderContainer = document.querySelector('.slider');
    const indicatorsContainer = document.getElementById('indicators');

    if (sliderContainer && indicatorsContainer && imagePaths.length > 0) {
        
        // A. BERSIHKAN CONTAINER
        sliderContainer.innerHTML = '';
        indicatorsContainer.innerHTML = '';

        // B. RENDER GAMBAR & DOTS
        imagePaths.forEach((path, index) => {
            // Gambar
            const img = document.createElement('img');
            img.src = path;
            img.alt = `Dokumentasi ${index + 1}`;
            if (index === 0) img.classList.add('active');
            sliderContainer.appendChild(img);

            // Indikator Dot
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetTimer();
            });
            indicatorsContainer.appendChild(dot);
        });

        // C. BUAT TOMBOL NAVIGASI (PANAH)
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-btn prev-btn';
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>'; // Pake FontAwesome
        prevBtn.ariaLabel = "Slide Sebelumnya";

        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-btn next-btn';
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>'; // Pake FontAwesome
        nextBtn.ariaLabel = "Slide Berikutnya";

        sliderWrapper.appendChild(prevBtn);
        sliderWrapper.appendChild(nextBtn);

        // D. LOGIC SLIDER
        const slides = document.querySelectorAll('.slider img');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        let slideInterval;

        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            // Logic looping (kalau -1 jadi terakhir, kalau lebih jadi 0)
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        function startTimer() {
            slideInterval = setInterval(nextSlide, 4000); // 4 Detik
        }

        function resetTimer() {
            clearInterval(slideInterval);
            startTimer();
        }

        // Event Listener Tombol
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        // E. FITUR SWIPE (TOUCHSCREEN HP)
        let touchStartX = 0;
        let touchEndX = 0;

        sliderWrapper.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        sliderWrapper.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide(); // Geser Kiri -> Next
                resetTimer();
            }
            if (touchEndX > touchStartX + 50) {
                prevSlide(); // Geser Kanan -> Prev
                resetTimer();
            }
        }

        // F. FITUR PAUSE ON HOVER (Berhenti pas kursor nempel)
        sliderWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderWrapper.addEventListener('mouseleave', startTimer);

        // Mulai
        startTimer();
    }
});
