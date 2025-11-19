document.addEventListener('DOMContentLoaded', () => {
    // Form Submission Handler
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate network request
            setTimeout(() => {
                submitBtn.innerText = 'Message Sent!';
                submitBtn.style.backgroundColor = 'var(--accent-green)';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // Audio Player Simulation
    const audioPlayers = document.querySelectorAll('.audio-player');
    
    audioPlayers.forEach(player => {
        const playBtn = player.querySelector('.play-btn');
        const progressBar = player.querySelector('.track-progress');
        let isPlaying = false;
        let progress = 0;
        let interval;

        playBtn.addEventListener('click', () => {
            // Stop other players
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player) {
                    const otherBtn = otherPlayer.querySelector('.play-btn');
                    const otherBar = otherPlayer.querySelector('.track-progress');
                    otherBtn.innerText = '▶';
                    // Reset other players if needed, or just pause them
                    // For simplicity, we won't reset progress of others, just visual pause
                }
            });

            isPlaying = !isPlaying;
            
            if (isPlaying) {
                playBtn.innerText = '⏸';
                interval = setInterval(() => {
                    progress += 1;
                    if (progress > 100) {
                        progress = 0;
                        isPlaying = false;
                        playBtn.innerText = '▶';
                        clearInterval(interval);
                    }
                    progressBar.style.width = `${progress}%`;
                }, 100);
            } else {
                playBtn.innerText = '▶';
                clearInterval(interval);
            }
        });
    });

    // Add simple scroll reveal animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .hero__content, .section h2').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
