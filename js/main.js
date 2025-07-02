// Navigation Active State Handler
let setActiveNav; // Declare globally

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    // Function to set active navigation
    setActiveNav = function(activePage) {
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === activePage) {
                link.classList.add('active');
                link.classList.remove('text-[#149D8D]/70');
                link.classList.add('text-[#149D8D]');
            } else {
                link.classList.remove('active');
                link.classList.remove('text-[#149D8D]');
                link.classList.add('text-[#149D8D]/70');
            }
        });
    };
    // Add click handlers to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const page = this.getAttribute('data-page');
            
            // Handle links with actual URLs (external links or HTML files)
            if (this.href.includes('.html') || this.href.includes('http')) {
                // Let the browser handle the navigation naturally
                return;
            }
            
            // Handle in-page navigation
            if (page) {
                e.preventDefault();
                setActiveNav(page);
                
                // Add smooth animation effect
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
                // Initialize with home page active (current state)
            // Only set if no other page has been set
            if (typeof window.currentPage === 'undefined') {
                setActiveNav('home');
            }
});

// Hamburger menu cho mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Chat bubble logic
(function() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatIcon = document.getElementById('chat-icon');
    const closeIcon = document.getElementById('close-icon');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatToggle) {
        chatToggle.addEventListener('click', function() {
            const isOpen = !chatWindow.classList.contains('hidden');
            chatWindow.classList.toggle('hidden');
            // Ẩn/hiện toàn bộ nút chat bubble khi mở/đóng modal
            if (!isOpen) {
                chatToggle.style.display = 'none';
                chatInput.focus();
            } else {
                chatToggle.style.display = 'flex';
                chatToggle.classList.add('animate-pulse');
            }
        });
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatWindow.classList.add('hidden');
            chatToggle.style.display = 'flex';
            chatToggle.classList.add('animate-pulse');
        });
    }
    
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const msg = chatInput.value.trim();
            if (msg) {
                const msgDiv = document.createElement('div');
                msgDiv.className = 'my-2 text-right';
                msgDiv.innerHTML = `<span class='inline-block bg-[#149D8D] text-white px-3 py-2 rounded-xl max-w-[70%]'>${msg}</span>`;
                chatMessages.appendChild(msgDiv);
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });
    }
})(); 