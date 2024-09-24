function startCountdown() {
    // Selected future date (e.g., December 31, 2024, 00:00:00)
    const selectedDate = new Date('2024-12-31T00:00:00');

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = selectedDate - currentDate;

    // Convert milliseconds to seconds
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    
    // Total seconds in a non-leap year (365 days)
    let totalSeconds = differenceInSeconds + 15033600;// 365 * 24 * 60 * 60; // 31,536,000 seconds
  
    function updateCountdown() {
      if (totalSeconds <= 0) {
        clearInterval(interval);
        return;
      }
  
      const digits = totalSeconds.toString().padStart(8, '0').split(''); // Convert seconds to string and pad with zeros
  
      // Update each digit in the odometer, but in reverse order (right to left)
      for (let i = 0; i < digits.length; i++) {
        // Reverse the order by assigning the last digit of totalSeconds to the rightmost odometer (digit-0)
        updateOdometer(`digit-${7 - i}`, digits[i]);
      }
  
      totalSeconds--; // Decrease by 1 second
    }
  
    function updateOdometer(id, value) {
      const odometer = document.getElementById(id);
      odometer.innerHTML = ''; // Clear existing digits
  
      let digitContainer = document.createElement('div');
      digitContainer.className = 'digit';
  
      for (let i = 0; i < 10; i++) {
        let span = document.createElement('span');
        span.innerHTML = i;
        digitContainer.appendChild(span);
      }
  
      digitContainer.style.transform = `translateY(-${value * 80}px)`; // Move to the correct digit
      odometer.appendChild(digitContainer);
    }
  
    updateCountdown(); // Initialize the first update
    const interval = setInterval(updateCountdown, 1000); // Update every second
  }
  
  // Start the countdown
  startCountdown();
  