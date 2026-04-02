// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {
    
    // The message to type
    const message = "...You should had stopped me when you had your chance, Janus...";
    
    // Get elements
    const textElement = document.getElementById('indifferent-text');
    const cursorElement = document.querySelector('.cursor');
    const container = document.querySelector('.boot-text1');
    
    // Typing speed (ms per character)
    const typingSpeed = 100;
    
    // When to start typing (must match CSS animation-delay)
    const startDelay = 4000; // 4 seconds
    
    // How long to wait after typing before fading out
    const pauseAfterTyping = 1500;
    
    // Start the effect after delay
    setTimeout(() => {
        // Make container visible (but text still empty)
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        
        // Start typing
        let index = 0;
        
        const typeWriter = () => {
            if (index < message.length) {
                // Add one character
                textElement.textContent += message.charAt(index);
                index++;
                
                // Schedule next character
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Typing complete! Wait, then fade out
                setTimeout(() => {
                    // Add fade-out class
                    container.classList.add('fade-out');
                    
                    // Optional: Hide cursor when fading
                    setTimeout(() => {
                        cursorElement.style.display = 'none';
                    }, 2500); // Halfway through fade animation
                }, pauseAfterTyping);
            }
        };
        
        // Start typing
        typeWriter();
        
    }, startDelay);
});