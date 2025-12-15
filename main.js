// Fungsi untuk Animasi Counter (Sederhana)
function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Kecepatan animasi (semakin kecil, semakin cepat)

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Hitung langkah animasi
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10); // Update setiap 10ms
            } else {
                counter.innerText = target; // Pastikan angka akhir tepat
            }
        };

        // Gunakan Intersection Observer untuk memulai animasi saat elemen terlihat
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    obs.unobserve(entry.target); // Hentikan observasi setelah animasi dimulai
                }
            });
        }, { threshold: 0.5 }); // Mulai animasi ketika 50% elemen terlihat

        observer.observe(counter);
    });
}

// Fungsi untuk Inisialisasi Slider Otomatis dengan Fade
function initImageSlider() {
    // --- GANTI ARRAY INI DENGAN PATH FOTO DOKUMENTASI ANDA ---
    const imagePaths = [
        '/assets/dokum/Audiensi Bakesbangpol DKI Jakarta.jpg',
        '/assets/dokum/Audiensi BPBD Provinsi.jpg',
        '/assets/dokum/Audiensi Dinas Pendidikan 2025.jpg',
        '/assets/dokum/Dokumentasi Bimbel Akses 1.jpg',
        '/assets/dokum/akses2.jpg',
        '/assets/dokum/FMKD Jakarta Raya Youth Gathering Vol 1.jpg',
        '/assets/dokum/FMKD Youth Gathering Vol. 2.jpg',
        '/assets/dokum/Kehadiran Rakernas Fokri.jpg',
        '/assets/dokum/Kunjungan Kerja Antara heritage.jpg',
        '/assets/dokum/Kunjungan kerja BEM Polteknaker 2024.jpg',
        '/assets/dokum/Kunjungan Kerja STIS.jpg',
        '/assets/dokum/kunjungan polteknaker.jpg',
        '/assets/dokum/Pembukaan Booth FMKD Jakarta Raya di Edufair Dinas Pendidikan.jpg',
        '/assets/dokum/Penandatanganan MoU.jpg',
        '/assets/dokum/PTK Expo FMKD Jakarta Raya.jpg',
        '/assets/dokum/Webinar FMKD Jakarta Raya 2025.png',
        // Tambahkan path gambar lainnya di sini
    ];
    // --- SAMPAI SINI ---

    const sliderElement = document.querySelector('.slider');
    const indicatorsContainer = document.getElementById('indicators');

    if (!sliderElement || !indicatorsContainer) {
        console.error('Slider elements not found.');
        return;
    }

    let currentIndex = 0;
    let slideInterval;

    // Fungsi untuk membuat slider dan indikator
    function renderSlider() {
        sliderElement.innerHTML = ''; // Kosongkan konten sebelumnya
        indicatorsContainer.innerHTML = ''; // Kosongkan indikator sebelumnya

        imagePaths.forEach((path, index) => {
            const img = document.createElement('img');
            img.src = path;
            img.alt = Dokumentasi Kegiatan ${index + 1};
            img.loading = 'lazy';
            if (index === 0) {
                img.classList.add('active'); // Tampilkan gambar pertama
            }
            sliderElement.appendChild(img);

            const indicator = document.createElement('div');
            indicator.classList.add('slider-indicator');
            if (index === 0) {
                indicator.classList.add('active');
            }
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    // Fungsi untuk pindah ke slide tertentu
    function goToSlide(index) {
        if (index < 0) index = imagePaths.length - 1;
        if (index >= imagePaths.length) index = 0;

        // Sembunyikan gambar saat ini
        const currentImg = sliderElement.children[currentIndex];
        const currentIndicator = indicatorsContainer.children[currentIndex];
        if (currentImg) currentImg.classList.remove('active');
        if (currentIndicator) currentIndicator.classList.remove('active');

        // Tampilkan gambar target
        const targetImg = sliderElement.children[index];
        const targetIndicator = indicatorsContainer.children[index];
        if (targetImg) targetImg.classList.add('active');
        if (targetIndicator) targetIndicator.classList.add('active');

        currentIndex = index;
        resetSlideInterval(); // Reset timer saat pengguna mengklik indikator
    }

    // Fungsi untuk pindah ke slide berikutnya
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Fungsi untuk memulai interval otomatis
    function startSlideInterval() {
        // Ganti gambar setiap 5 detik tampil + 1 detik transisi = 6000ms (6 detik total)
        slideInterval = setInterval(nextSlide, 6000);
    }

    // Fungsi untuk menghentikan dan memulai ulang interval
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    // Inisialisasi
    renderSlider();
    startSlideInterval();
}

// Lazy Loading Gambar
function initLazyLoading() {
    const images = document.querySelectorAll("img[loading='lazy']");

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // img.src = img.dataset.src; // Jika menggunakan placeholder
                    // img.srcset = img.dataset.srcset; // Jika menggunakan srcset
                    img.classList.remove("lazy");
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback jika Intersection Observer tidak didukung
        const preloadImages = () => {
            images.forEach(img => {
                img.src = img.src; // Trigger load
                img.classList.remove("lazy");
            });
        };
        window.addEventListener("load", preloadImages);
    }
}

// Smooth Scrolling untuk anchor link
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset untuk header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Jalankan semua fungsi setelah DOM selesai dimuat
document.addEventListener("DOMContentLoaded", function() {
    animateCounter();
    initImageSlider(); // Tambahkan inisialisasi slider
    initLazyLoading();
    initSmoothScrolling();
});
