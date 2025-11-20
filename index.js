// Index page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeBazaarCountdown();
});

function initializeTheme() {
  const htmlEl = document.documentElement;
  htmlEl.setAttribute('data-theme', 'dark');
}

// Bazaar countdown timer to 14:30 UTC
function initializeBazaarCountdown() {
  function updateCountdown() {
    const now = new Date();
    
    // Target time is 14:30 UTC
    const targetHour = 14;
    const targetMinute = 30;
    
    // Calculate target time for today
    let targetTime = new Date();
    targetTime.setUTCHours(targetHour, targetMinute, 0, 0);
    
    // If we've passed 16:00 UTC today, target tomorrow's 16:00 UTC
    if (now > targetTime) {
      targetTime.setUTCDate(targetTime.getUTCDate() + 1);
    }
    
    // Calculate time difference
    const diff = targetTime - now;
    
    // Convert to hours, minutes, seconds
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Format with leading zeros
    const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update the display
    const timerElement = document.getElementById('countdown-timer');
    if (timerElement) {
      timerElement.textContent = formatted;
    }
  }
  
  // Update immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

}
