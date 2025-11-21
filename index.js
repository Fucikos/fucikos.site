// Countdown timer that ends at 14:30 UTC
function updateCountdown() {
  const now = new Date();
  
  // Set target time to 14:30 UTC
  const target = new Date();
  target.setUTCHours(14, 30, 0, 0);
  
  // If target time has passed today, set it to tomorrow
  if (now >= target) {
    target.setUTCDate(target.getUTCDate() + 1);
  }
  
  // Calculate the difference in milliseconds
  const diff = target - now;
  
  if (diff <= 0) {
    document.getElementById('countdown-timer').textContent = 'Time reached!';
    return;
  }
  
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  // Format with leading zeros
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');
  
  // Update the countdown display
  document.getElementById('countdown-timer').textContent = 
    `${hoursStr}:${minutesStr}:${secondsStr}`;
}

// Update countdown immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);
