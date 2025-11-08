// Index page JavaScript functionality
// Theme and animation controls for the Fucikos website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the page
  initializeTheme();
  initializeFloatingLeaves();
  initializeLogoEffects();
  initializeRandomFooterMessage();
});

function initializeTheme() {
  const htmlEl = document.documentElement;
  // Force dark mode (autumn evening theme) always
  htmlEl.setAttribute('data-theme', 'dark');
}

function initializeFloatingLeaves() {
  // Add CSS for falling animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fall {
      to {
        transform: translateY(100vh) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);

  // Create leaves periodically
  setInterval(createFloatingLeaf, 3000);
}

function initializeLogoEffects() {
  const logo = document.querySelector('.logo');
  const audio = document.getElementById('logo-click-sound');
  let clickCount = 0;
  
  if (logo) {
    logo.addEventListener('click', function() {
      clickCount++;
      
      // Play audio
      if (audio) {
        audio.currentTime = 0; // Reset to beginning
        audio.play().catch(function(error) {
          console.log('Audio playback failed:', error);
        });
      }
      
      // Create particle effect
      createParticleEffect(this);
      
      // Subtle foreshadowing: Show Doakes image after 4th click
      if (clickCount === 4) {
        showDoakesForeshadowing();
      }
      
      // Easter egg: Play Doakes video after 10 clicks
      if (clickCount === 10) {
        playDoakesVideo();
      }
    });
  }
}

// Add some floating autumn leaves animation
function createFloatingLeaf() {
  const leaf = document.createElement('div');
  leaf.innerHTML = ['🍁', '🍂', '🌿'][Math.floor(Math.random() * 3)];
  leaf.style.position = 'fixed';
  leaf.style.left = Math.random() * 100 + 'vw';
  leaf.style.top = '-50px';
  leaf.style.fontSize = (Math.random() * 20 + 15) + 'px';
  leaf.style.opacity = Math.random() * 0.7 + 0.3;
  leaf.style.pointerEvents = 'none';
  leaf.style.zIndex = '-1';
  leaf.style.animation = `fall ${Math.random() * 3 + 7}s linear infinite`;
  
  document.body.appendChild(leaf);
  
  setTimeout(() => {
    if (leaf.parentNode) {
      document.body.removeChild(leaf);
    }
  }, 10000);
}

// Logo particle effect
function createParticleEffect(element) {
  const particles = ['🍂', '🍁', '🌟', '✨', '🦃', '🥧', '🌽', '💫'];
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Add burst effect to logo
  element.classList.add('logo-burst');
  setTimeout(() => element.classList.remove('logo-burst'), 300);
  
  // Create 8 particles
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    
    // Random spread angle
    const angle = (360 / 8) * i + Math.random() * 45 - 22.5;
    const distance = 80 + Math.random() * 70;
    
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.setProperty('--angle', angle + 'deg');
    particle.style.setProperty('--distance', distance + 'px');
    
    // Update animation to use custom properties
    particle.style.animation = `particle-shoot-${i} 1.5s ease-out forwards`;
    
    // Create unique animation for each particle
    const keyframes = `
      @keyframes particle-shoot-${i} {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) rotate(0deg) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) 
                    translate(${Math.cos(angle * Math.PI / 180) * distance}px, 
                            ${Math.sin(angle * Math.PI / 180) * distance - 100}px) 
                    rotate(360deg) scale(0.3);
        }
      }
    `;
    
    // Add keyframes to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet);
      }
    }, 1500);
  }
}

function showDoakesForeshadowing() {
  // Get logo position to place Doakes nearby
  const logo = document.querySelector('.logo');
  const logoRect = logo.getBoundingClientRect();
  
  // Create subtle Doakes image that pokes out
  const foreshadowImg = document.createElement('img');
  foreshadowImg.src = 'images/Doakes.png';
  foreshadowImg.style.cssText = `
    position: fixed;
    top: ${logoRect.top + (logoRect.height / 2) - 30}px;
    left: ${logoRect.left - 40}px;
    width: 60px;
    height: 60px;
    opacity: 0;
    z-index: 1000;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
    transition: all 0.5s ease-in-out;
    pointer-events: none;
    object-fit: cover;
    transform: translateX(-20px);
  `;
  
  document.body.appendChild(foreshadowImg);
  
  // Peek out animation - slide in and fade in
  setTimeout(() => {
    foreshadowImg.style.opacity = '0.8';
    foreshadowImg.style.transform = 'translateX(0px)';
  }, 100);
  
  // Peek back and fade out after 2.5 seconds
  setTimeout(() => {
    foreshadowImg.style.opacity = '0';
    foreshadowImg.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      if (foreshadowImg.parentNode) {
        foreshadowImg.parentNode.removeChild(foreshadowImg);
      }
    }, 500);
  }, 2500);
}

function playDoakesVideo() {
  // Create full-screen overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
  `;
  
  // Create hint text
  const hintText = document.createElement('div');
  hintText.textContent = 'Type his name to escape...(sorry phone users)';
  hintText.style.cssText = `
    position: absolute;
    bottom: 30px;
    right: 30px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    font-family: Arial, sans-serif;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  `;
  
  // Create video element
  const video = document.createElement('video');
  video.src = 'videos/Doakes.mp4';
  video.autoplay = true;
  video.controls = false;
  video.style.cssText = `
    width: 80vw;
    height: 80vh;
    object-fit: contain;
    border: 20px solid black;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.8);
  `;
  
  // Track typed characters for "doakes" escape sequence
  let typedSequence = '';
  
  // Make it unclosable - disable right-click and common keyboard shortcuts
  overlay.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
  
  overlay.addEventListener('keydown', function(e) {
    // Prevent escape, F11, Alt+F4, etc. (but allow letter keys)
    if (e.key === 'Escape' || e.key === 'F11' || 
        (e.altKey && e.key === 'F4') || 
        (e.ctrlKey && (e.key === 'w' || e.key === 'W'))) {
      e.preventDefault();
    }
    
    // Track typing for "doakes" escape sequence
    if (e.key.length === 1) { // Only single character keys
      typedSequence += e.key.toLowerCase();
      
      // Keep only last 6 characters (length of "doakes")
      if (typedSequence.length > 6) {
        typedSequence = typedSequence.slice(-6);
      }
      
      // Check if user typed "doakes"
      if (typedSequence === 'doakes') {
        document.body.removeChild(overlay);
      }
    }
  });
  
  // Make overlay focusable to capture keyboard events
  overlay.setAttribute('tabindex', '0');
  
  overlay.appendChild(video);
  overlay.appendChild(hintText);
  document.body.appendChild(overlay);
  
  // Focus the overlay to capture keyboard events
  overlay.focus();
  
  // Show hint text after 3 seconds
  setTimeout(() => {
    hintText.style.opacity = '1';
  }, 3000);
  
  // Play video when it's ready
  video.addEventListener('canplay', function() {
    video.play().catch(function(error) {
      console.log('Video playback failed:', error);
    });
  });
  
  // Auto-close overlay when video ends
  video.addEventListener('ended', function() {
    if (overlay.parentNode) {
      document.body.removeChild(overlay);
    }
  });
}

function initializeRandomFooterMessage() {
  // Array of random messages with their rarity
  const messages = [
    { text: '🌾 Harvesting great deals since 2025 🌾', weight: 40 },
    { text: '🍂 Autumn vibes bringing you the best finds 🍂', weight: 40 },
    { text: '🦃 Gobbling up savings this season 🦃', weight: 19 },
    { text: '✨ You found the secret message! Lucky you! ✨', weight: 1 } // 1 in 100 chance
  ];
  
  // Create weighted array for selection
  const weightedMessages = [];
  messages.forEach(message => {
    for (let i = 0; i < message.weight; i++) {
      weightedMessages.push(message.text);
    }
  });
  
  // Select random message
  const randomMessage = weightedMessages[Math.floor(Math.random() * weightedMessages.length)];
  
  // Create and insert the message element
  const footer = document.querySelector('footer');
  if (footer) {
    const messageElement = document.createElement('div');
    messageElement.className = 'footer-message';
    messageElement.textContent = randomMessage;
    
    // Insert at the beginning of the footer
    footer.insertBefore(messageElement, footer.firstChild);
  }
}