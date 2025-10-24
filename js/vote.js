// Copy Invite Link Function
function copyInviteLink() {
    const inviteLink = 'https://discord.com/oauth2/authorize?client_id=1281872745113587752&permissions=1165626332499793&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.gg%2FDqmJFqdWXy&integration_type=0&scope=bot+applications.commands+guilds.join';
    
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = inviteLink;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    document.execCommand('copy');
    
    // Remove textarea
    document.body.removeChild(textarea);
    
    // Show toast notification
    showToast('Invite link copied to clipboard!');
}

// Vote Button Click Tracking
const voteButtons = document.querySelectorAll('.btn-vote, .btn-cta[href*="top.gg"]');

voteButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Track vote button click (can be integrated with analytics)
        console.log('Vote button clicked');
    });
});

// Animate reward cards on scroll
const rewardCards = document.querySelectorAll('.reward-card');

const animateRewards = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    rewardCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
};

if (rewardCards.length > 0) {
    animateRewards();
}

// Social Share Functions
const shareButtons = document.querySelectorAll('.share-btn');

shareButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.classList.contains('discord')) {
            copyInviteLink();
        }
        // Other social shares will open in new window naturally via href
    });
});
