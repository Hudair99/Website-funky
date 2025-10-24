// Command Search Functionality
const searchInput = document.getElementById('commandSearch');
const commandCards = document.querySelectorAll('.command-card');
const noResults = document.getElementById('noResults');
const filterButtons = document.querySelectorAll('.filter-btn');
const commandCategories = document.querySelectorAll('.command-category');

// Search Commands
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let hasResults = false;

        commandCards.forEach(card => {
            const commandName = card.querySelector('.command-name').textContent.toLowerCase();
            const commandDesc = card.querySelector('.command-desc').textContent.toLowerCase();
            const commandAttr = card.getAttribute('data-command').toLowerCase();

            if (commandName.includes(searchTerm) || 
                commandDesc.includes(searchTerm) || 
                commandAttr.includes(searchTerm)) {
                card.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide categories based on visible cards
        commandCategories.forEach(category => {
            const visibleCards = category.querySelectorAll('.command-card[style="display: block;"], .command-card:not([style*="display"])');
            if (searchTerm && visibleCards.length === 0) {
                category.style.display = 'none';
            } else {
                category.style.display = 'block';
            }
        });

        // Show no results message
        if (noResults) {
            noResults.style.display = hasResults ? 'none' : 'block';
        }
    });
}

// Filter Commands by Category
if (filterButtons) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Show/hide categories
            commandCategories.forEach(categoryEl => {
                if (category === 'all') {
                    categoryEl.style.display = 'block';
                } else {
                    const categoryName = categoryEl.getAttribute('data-category');
                    categoryEl.style.display = categoryName === category ? 'block' : 'none';
                }
            });

            // Reset search
            if (searchInput) {
                searchInput.value = '';
            }

            // Show all command cards
            commandCards.forEach(card => {
                card.style.display = 'block';
            });

            // Hide no results
            if (noResults) {
                noResults.style.display = 'none';
            }
        });
    });
}

// Copy Command Functionality
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const commandToCopy = button.getAttribute('data-copy');
        
        // Create temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = commandToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // Select and copy
        textarea.select();
        document.execCommand('copy');
        
        // Remove textarea
        document.body.removeChild(textarea);
        
        // Show toast notification
        showToast(`Copied: ${commandToCopy}`);
        
        // Animate button
        button.style.transform = 'scale(1.3)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    });
});

// Keyboard Navigation for Command Search
if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.blur();
        }
    });
}

// Focus search on Ctrl/Cmd + K
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
    }
});
