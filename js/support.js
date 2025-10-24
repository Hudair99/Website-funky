// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Discord Widget Error Handling
const discordWidget = document.querySelector('iframe[src*="discord.com/widget"]');

if (discordWidget) {
    discordWidget.addEventListener('error', () => {
        console.log('Discord widget failed to load');
        // Optionally show a fallback message
    });
}

// Auto-expand first FAQ item
if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
}
