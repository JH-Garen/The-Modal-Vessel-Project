// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {
    
    const title = document.querySelector('h1');
    const bootTexts = document.querySelectorAll('.boot-text');
    const janusContainer = document.querySelector('.boot-text1');
    const buttons = document.querySelectorAll('.login-choice button, .login-choice p');
    const loginScreen = document.querySelector('.screen');
    const guestScreen = document.querySelector('.guest-screen');
    const backBtn = document.getElementById('back-btn');

    document.getElementById('guest-btn').addEventListener('click', () => {
        const terminal = document.querySelector('.terminal');

        console.log('GUEST CLICKED');
        title.classList.remove('fade-up', 'fade-down');
        bootTexts.forEach(text => text.classList.remove('fade-up', 'fade-down'));
        buttons.forEach(btn => btn.classList.remove('fade-up', 'fade-down'));
    
        void title.offsetWidth;
        void bootTexts[0].offsetWidth;

        title.classList.add('fade-up');
        console.log('Title classes:', title.classList);
        bootTexts.forEach(text => text.classList.add('fade-down'));
        buttons.forEach(btn => btn.classList.add('fade-down'));
        
        terminal.classList.add('zoom-effect');

        // After 0.75s, hide login, show guest screen
        setTimeout(() => {
            loginScreen.style.display = 'none';
            guestScreen.classList.remove('hidden');
            guestScreen.style.display = 'block';
            // Trigger guest screen fade-in
        
            guestScreen.classList.add('animate-in');

            terminal.classList.remove('zoom-effect');

            // Call it when guest screen appears
            typeWhisper("They watch you search...", 'whisper-text', 400);
        }, 750);
    });

    // The message to type
    const message = "...You should had stopped me when you had your chance, Janus...";
    
    // Get elements
    const textElement = document.getElementById('indifferent-text');
    const janusCursor = document.querySelector('.boot-text1 .cursor');
    const whisperCursor = document.querySelector('.indifferent-whisper .cursor');
    const container = document.querySelector('.boot-text1');
    
    // Typing speed (ms per character)
    const typingSpeed = 21;
    
    // When to start typing (must match CSS animation-delay)
    const startDelay = 1500; // 1.5 seconds
    
    // How long to wait after typing before fading out
    const pauseAfterTyping = 100;
    
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
                        janusCursor.style.display = 'none';
                    }, 2500); // Halfway through fade animation
                }, pauseAfterTyping);
            }
        };
        
        // Start typing
        typeWriter();
        
    }, startDelay);
    
// Back button: return to login screen
backBtn.addEventListener('click', () => {
    // Hide guest screen
    guestScreen.classList.add('hidden');
    guestScreen.style.display = 'none';
    // Show login screen
    loginScreen.style.display = 'block';
    
    container.style.opacity = '0';
    container.classList.remove('fade-out');
    textElement.textContent = '';
    janusCursor.style.display = 'inline-block';

    // Reset animations so they can run again
    title.classList.remove('fade-up');
    bootTexts.forEach(text => {
        text.classList.remove('fade-down', 'fade-out');
        void text.offsetWidth;
    });
    buttons.forEach(btn => btn.classList.remove('fade-down'));
    
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        
        let index = 0;
        const typeWriter = () => {
            if (index < message.length) {
                textElement.textContent += message.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            
            } else {
                setTimeout(() => {
                    container.classList.add('fade-out');
                    setTimeout(() => {
                        janusCursor.style.display = 'none';
                    }, 2500);
                }, pauseAfterTyping);
            }
        };
        typeWriter();
     }, 500);
});

document.querySelectorAll('.redacted').forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add('vibrate-red');
        
        // Remove class after animation completes (so it can be clicked again)
        setTimeout(() => {
            element.classList.remove('vibrate-red');
        }, 1400);
    });
});

function typeWhisper(message, elementId, delay) {
    setTimeout(() => {
        const whisperElement = document.getElementById(elementId);
        const whisperContainer = whisperElement.parentElement;

        // Make visible
        let index = 0;
        const type = () => {
            if (index < message.length) {
                whisperElement.textContent += message.charAt(index);
                index++;
                setTimeout(type, 21); // Same speed as Janus
            }
        };
        type();
    }, delay);
}
});