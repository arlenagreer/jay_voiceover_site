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

    // Audio Player Implementation
    const audioPlayers = document.querySelectorAll('.audio-player');

    audioPlayers.forEach(player => {
        const playBtn = player.querySelector('.play-btn');
        const progressBar = player.querySelector('.track-progress');
        const timeDisplay = player.querySelector('.time-display');
        const audio = player.querySelector('audio');

        if (!audio) return;

        // Format time helper
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        // Update duration when metadata loads
        audio.addEventListener('loadedmetadata', () => {
            timeDisplay.innerText = formatTime(audio.duration);
        });

        playBtn.addEventListener('click', () => {
            // Stop other players
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player) {
                    const otherAudio = otherPlayer.querySelector('audio');
                    const otherBtn = otherPlayer.querySelector('.play-btn');
                    if (otherAudio) {
                        otherAudio.pause();
                        otherBtn.innerText = '▶';
                    }
                }
            });

            if (audio.paused) {
                audio.play();
                playBtn.innerText = '⏸';
            } else {
                audio.pause();
                playBtn.innerText = '▶';
            }
        });

        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;

            // Update time display (remaining time or current time)
            // Showing remaining time like the original design implied (or total duration)
            // Let's show current / total
            timeDisplay.innerText = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        });

        audio.addEventListener('ended', () => {
            playBtn.innerText = '▶';
            progressBar.style.width = '0%';
            timeDisplay.innerText = formatTime(audio.duration);
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
