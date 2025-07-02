// Rule-based chatbot trả lời tự động, không cần AI, không cần backend
const chatbotReplies = [
  'Xin chào! Tôi có thể giúp gì cho bạn?',
  'Cảm ơn bạn đã liên hệ The Kas. Bạn cần tư vấn về sản phẩm, dịch vụ hay tuyển dụng?',
  'Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất!',
  'Bạn vui lòng để lại số điện thoại hoặc email để được hỗ trợ nhanh hơn nhé!',
  'Bạn muốn tìm hiểu về board game, sự kiện hay hợp tác kinh doanh?'
];

function getBotReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes('chào') || msg.includes('hello')) return 'Chào bạn! Tôi là trợ lý The Kas.';
  if (msg.includes('sản phẩm') || msg.includes('board game')) return 'Bạn muốn biết thêm về sản phẩm board game nào?';
  if (msg.includes('giá') || msg.includes('bao nhiêu')) return 'Bạn vui lòng cho biết tên sản phẩm để tôi báo giá nhé!';
  if (msg.includes('tuyển dụng') || msg.includes('việc làm')) return 'Bạn quan tâm vị trí tuyển dụng nào tại The Kas?';
  if (msg.includes('liên hệ') || msg.includes('contact')) return 'Bạn có thể liên hệ qua email: hello@thekas.vn hoặc số điện thoại: 038 236 8625.';
  // Random câu trả lời mẫu
  return chatbotReplies[Math.floor(Math.random() * chatbotReplies.length)];
}

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
                // Hiển thị tin nhắn người dùng
                const msgDiv = document.createElement('div');
                msgDiv.className = 'my-2 text-right';
                msgDiv.innerHTML = `<span class='inline-block bg-[#149D8D] text-white px-3 py-2 rounded-xl max-w-[70%]'>${msg}</span>`;
                chatMessages.appendChild(msgDiv);
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Trả lời tự động bằng rule-based
                setTimeout(() => {
                  const aiReply = getBotReply(msg);
                  const aiDiv = document.createElement('div');
                  aiDiv.className = 'my-2 text-left';
                  aiDiv.innerHTML = `<span class='inline-block bg-white text-black px-3 py-2 rounded-xl max-w-[70%]'>${aiReply}</span>`;
                  chatMessages.appendChild(aiDiv);
                  chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 600);
            }
        });
    }
})(); 