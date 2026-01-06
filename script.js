// Minimal JavaScript for Bento Portfolio

// Initialize Lucide Icons
lucide.createIcons();

// Console Greeting
console.log(
    "%c System Online: Abhishek's Portfolio ",
    "background: #10b981; color: #000; font-weight: bold; padding: 4px; border-radius: 4px;"
);

// Copy Email Functionality
const copyBtn = document.querySelector('.copy-btn');
const emailText = document.querySelector('.email-copy span').innerText;

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i data-lucide="check"></i> Copied';
            lucide.createIcons(); // Re-render check icon

            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                lucide.createIcons();
            }, 2000);
        });
    });
}

// "Ask AI" Input Mock
const aiInput = document.querySelector('.ai-input-box input');
if (aiInput) {
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const val = aiInput.value;
            aiInput.value = "Processing...";
            setTimeout(() => {
                aiInput.value = "System Request: Contact Abhishek for API Access.";
            }, 1000);
        }
    });
}