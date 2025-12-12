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

// Lazy Loading Gambar
document.addEventListener("DOMContentLoaded", function() {
    // Jalankan fungsi animasi counter
    animateCounter();
    
    // Lazy Loading Gambar (Opsional, jika Anda tetap ingin menggunakannya)
    const images = document.querySelectorAll("img[loading='lazy']");
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Smooth Scrolling untuk anchor link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});