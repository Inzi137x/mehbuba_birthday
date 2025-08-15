// Birthday Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Birthday website loaded!');
    
    // Initialize all components
    initVideoPlayer();
    initPhotoFrames();
    initAnimations();
    initUploadForms();
    
    // Create additional floating elements
    createFloatingElements();
    
    // Add click events for interactive elements
    addInteractiveEvents();
});

// Video Player Initialization
function initVideoPlayer() {
    const video = document.getElementById('birthdayVideo');
    if (video) {
        // Set video attributes for better mobile support
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');
        
        // Handle video load errors gracefully
        video.addEventListener('error', function() {
            console.log('Video failed to load');
            const videoContainer = video.parentElement;
            videoContainer.innerHTML = `
                <div class="video-placeholder">
                    <i class="fas fa-video fa-5x mb-3" style="color: #ff6b9d;"></i>
                    <h4>Upload Your Special Video</h4>
                    <p>Share a beautiful moment together</p>
                </div>
            `;
            videoContainer.style.cssText = `
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 300px;
                background: linear-gradient(135deg, #ff6b9d20, #ffd93d20);
                border-radius: 15px;
                text-align: center;
                color: #666;
            `;
        });
        
        // Auto-play with user interaction fallback
        video.addEventListener('loadedmetadata', function() {
            const playPromise = video.pause();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.log('Auto-play prevented:', error);
                    // Show play button overlay
                    showPlayButton(video);
                });
            }
        });
    }
}

// Show play button overlay for videos that can't auto-play
function showPlayButton(video) {
    const playButton = document.createElement('div');
    playButton.className = 'video-play-button';
    playButton.innerHTML = '<i class="fas fa-play-circle fa-4x"></i>';
    playButton.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(255, 255, 255, 0.9);
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    `;
    
    playButton.addEventListener('click', function() {
        video.play();
        playButton.remove();
    });
    
    playButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translate(-50%, -50%) scale(1.1)';
    });
    
    playButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    video.parentElement.style.position = 'relative';
    video.parentElement.appendChild(playButton);
}

// Photo Frames Initialization
function initPhotoFrames() {
    const photos = document.querySelectorAll('.photo-container img');
    
    photos.forEach((photo, index) => {
        // Add loading state
        photo.addEventListener('loadstart', function() {
            this.style.opacity = '0.5';
        });
        
        // Handle successful load
        photo.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        });
        
        // Handle load errors
        photo.addEventListener('error', function() {
            console.log(`Photo ${index + 1} failed to load, using placeholder`);
            this.style.opacity = '1';
        });
        
        // Add hover effects
        photo.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
        });
    });
}

// Enhanced Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Observe all sections
    const sections = document.querySelectorAll('.video-section, .photo-section, .letter-section, .decorations-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .video-section, .photo-section, .letter-section, .decorations-section {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .hero-section {
            animation: heroFadeIn 2s ease forwards;
        }
        
        @keyframes heroFadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Upload Forms Enhancement
function initUploadForms() {
    const uploadForms = document.querySelectorAll('.upload-form');
    
    uploadForms.forEach(form => {
        const fileInput = form.querySelector('input[type="file"]');
        const submitButton = form.querySelector('button[type="submit"]');
        
        // File selection feedback
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const fileName = this.files[0].name;
                const fileSize = (this.files[0].size / 1024 / 1024).toFixed(2);
                
                // Update button text to show selected file
                submitButton.innerHTML = `
                    <i class="fas fa-upload"></i> Upload "${fileName}" (${fileSize}MB)
                `;
                submitButton.style.fontSize = '0.9rem';
                
                // Add preview for images
                if (this.files[0].type.startsWith('image/')) {
                    showImagePreview(this.files[0], form);
                }
            }
        });
        
        // Form submission feedback
        form.addEventListener('submit', function() {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
            submitButton.disabled = true;
        });
    });
}

// Image Preview Function
function showImagePreview(file, form) {
    const reader = new FileReader();
    reader.onload = function(e) {
        // Remove existing preview
        const existingPreview = form.querySelector('.image-preview');
        if (existingPreview) {
            existingPreview.remove();
        }
        
        // Create preview element
        const preview = document.createElement('div');
        preview.className = 'image-preview mt-2';
        preview.innerHTML = `
            <img src="${e.target.result}" alt="Preview" style="
                width: 100px; 
                height: 100px; 
                object-fit: cover; 
                border-radius: 10px;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                border: 2px solid #ff6b9d;
            ">
            <small class="d-block mt-1 text-muted">Preview</small>
        `;
        
        form.appendChild(preview);
    };
    reader.readAsDataURL(file);
}

// Create Additional Floating Elements
function createFloatingElements() {
    // Add floating birthday balloons
    createFloatingBalloons();
    
    // Add sparkle effects
    createSparkleEffect();
    
    // Add floating birthday icons
    createFloatingIcons();
}

function createFloatingBalloons() {
    const balloons = document.createElement('div');
    balloons.className = 'floating-balloons';
    balloons.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Create balloon elements
    for (let i = 0; i < 5; i++) {
        const balloon = document.createElement('div');
        balloon.innerHTML = '🎈';
        balloon.style.cssText = `
            position: absolute;
            font-size: 2rem;
            animation: floatBalloon ${8 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        balloons.appendChild(balloon);
    }
    
    // Add balloon animation styles
    const balloonStyle = document.createElement('style');
    balloonStyle.textContent = `
        @keyframes floatBalloon {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(balloonStyle);
    document.body.appendChild(balloons);
}

function createSparkleEffect() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    sparkleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    `;
    
    // Create sparkle function
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 1rem;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkle 3s linear forwards;
        `;
        
        sparkleContainer.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 3000);
    }
    
    // Add sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% { 
                transform: scale(0) rotate(0deg); 
                opacity: 1; 
            }
            50% { 
                transform: scale(1) rotate(180deg); 
                opacity: 1; 
            }
            100% { 
                transform: scale(0) rotate(360deg); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    document.body.appendChild(sparkleContainer);
    
    // Create sparkles periodically
    setInterval(createSparkle, 2000);
}

function createFloatingIcons() {
    const icons = ['🎂', '🎉', '🎊', '💕', '🌹', '🎁'];
    const iconContainer = document.createElement('div');
    iconContainer.className = 'floating-icons';
    iconContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
    `;
    
    icons.forEach((icon, index) => {
        const iconElement = document.createElement('div');
        iconElement.innerHTML = icon;
        iconElement.style.cssText = `
            position: absolute;
            font-size: 1.5rem;
            left: ${(index + 1) * 15}%;
            animation: floatIcon ${10 + Math.random() * 5}s linear infinite;
            animation-delay: ${index * 2}s;
        `;
        iconContainer.appendChild(iconElement);
    });
    
    // Add icon animation
    const iconStyle = document.createElement('style');
    iconStyle.textContent = `
        @keyframes floatIcon {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% {
                transform: translateY(-50px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(iconStyle);
    document.body.appendChild(iconContainer);
}

// Interactive Events
function addInteractiveEvents() {
    // Click to create hearts effect
    document.addEventListener('click', function(e) {
        createClickHeart(e.pageX, e.pageY);
    });
    
    // Sticker click effects
    const stickers = document.querySelectorAll('.sticker');
    stickers.forEach(sticker => {
        sticker.addEventListener('click', function(e) {
            e.stopPropagation();
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'bounce 1s ease-in-out';
            }, 10);
        });
    });
    
    // Section title hover effects
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.textShadow = '0 0 20px rgba(233, 30, 99, 0.5)';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.1)';
        });
    });
}

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 1000;
        animation: heartPop 1s ease-out forwards;
        transform: translate(-50%, -50%);
    `;
    
    // Add heart pop animation if not exists
    if (!document.querySelector('#heartPopAnimation')) {
        const heartStyle = document.createElement('style');
        heartStyle.id = 'heartPopAnimation';
        heartStyle.textContent = `
            @keyframes heartPop {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.2);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0) translateY(-50px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(heartStyle);
    }
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 1000);
}

// Window resize handler
window.addEventListener('resize', function() {
    // Adjust video dimensions if needed
    const video = document.getElementById('birthdayVideo');
    if (video) {
        video.style.width = '100%';
        video.style.height = 'auto';
    }
});

// Smooth scroll for any anchor links (if added later)
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hash) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Console birthday message
console.log(`
🎉🎂 Happy Birthday Mehbuba Rahman! 🎂🎉
💕 This website was made with love! 💕
✨ May your day be filled with joy and happiness! ✨
`);
