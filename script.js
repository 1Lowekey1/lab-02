    // ── Navbar scroll effect ──────────────────────────────────────────
        const navbar = document.getElementById('navbar');
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-[#0a0a0a]', 'border-b', 'border-[#1a1a1a]', 'py-6');
                navbar.classList.remove('py-8');
            } else {
                navbar.classList.remove('bg-[#0a0a0a]', 'border-b', 'border-[#1a1a1a]', 'py-6');
                navbar.classList.add('py-8');
            }

            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        });

        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        // ── Active nav link on scroll ─────────────────────────────────────
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(sec => {
                if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
            });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        });

        // ── Mobile menu toggle ────────────────────────────────────────────
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileLinks = document.querySelectorAll('.mobile-nav');
        let menuOpen = false;

        menuToggle.addEventListener('click', () => {
            menuOpen = !menuOpen;
            mobileMenu.style.maxHeight = menuOpen ? mobileMenu.scrollHeight + 'px' : '0';
            mobileMenu.style.opacity  = menuOpen ? '1' : '0';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuOpen = false;
                mobileMenu.style.maxHeight = '0';
                mobileMenu.style.opacity   = '0';
            });
        });

        // ── Photo frame hover ─────────────────────────────────────────────
        const photoWrapper = document.querySelector('.photo-frame-hover');
        const photoFrame   = document.querySelector('.frame');
        if (photoWrapper && photoFrame) {
            photoWrapper.addEventListener('mouseenter', () => photoFrame.style.borderColor = '#555');
            photoWrapper.addEventListener('mouseleave', () => photoFrame.style.borderColor = '#333');
        }

        // ── Contact Form & localStorage ───────────────────────────────────
        const STORAGE_KEY = 'contactSubmissions';

        function getSubmissions() {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        }

        function saveSubmissions(subs) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
        }

        function formatDate(str) {
            return new Date(str).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        }

        function renderTable() {
            const subs    = getSubmissions();
            const tbody   = document.getElementById('submissionsTableBody');
            const clearBtn = document.getElementById('clearAllBtn');
            if (!tbody) return;

            if (subs.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-600 text-sm">No submissions yet</td></tr>';
                if (clearBtn) clearBtn.disabled = true;
                return;
            }

            if (clearBtn) clearBtn.disabled = false;
            tbody.innerHTML = subs.map((s, i) => `
                <tr class="border-b border-[#222] hover:bg-[#131313] transition-colors">
                    <td class="py-4 px-4 text-sm text-gray-200">${s.name || 'N/A'}</td>
                    <td class="py-4 px-4 text-sm text-gray-200">${s.contactNumber || 'N/A'}</td>
                    <td class="py-4 px-4 text-sm text-gray-200">${s.email || 'N/A'}</td>
                    <td class="py-4 px-4 text-sm text-gray-200 max-w-xs truncate" title="${s.message || ''}">${s.message || 'N/A'}</td>
                    <td class="py-4 px-4 text-xs text-gray-500 whitespace-nowrap">${formatDate(s.timestamp)}</td>
                    <td class="py-4 px-4">
                        <button onclick="deleteSubmission(${i})" class="text-red-500 hover:text-red-400 transition-colors text-xs uppercase tracking-wide">Delete</button>
                    </td>
                </tr>`).join('');
        }

        function renderCards() {
            const subs    = getSubmissions();
            const cards   = document.getElementById('submissionsCards');
            const clearBtn = document.getElementById('clearAllBtn');
            if (!cards) return;

            if (subs.length === 0) {
                cards.innerHTML = '<p class="text-center text-gray-600 text-sm py-8">No submissions yet</p>';
                if (clearBtn) clearBtn.disabled = true;
                return;
            }

            if (clearBtn) clearBtn.disabled = false;
            cards.innerHTML = subs.map((s, i) => `
                <div class="bg-[#0a0a0a] border border-[#333] rounded-lg p-4 space-y-3">
                    <div><p class="text-xs text-gray-600 uppercase tracking-wide mb-1">Name</p><p class="text-sm text-gray-200">${s.name || 'N/A'}</p></div>
                    <div><p class="text-xs text-gray-600 uppercase tracking-wide mb-1">Contact</p><p class="text-sm text-gray-200">${s.contactNumber || 'N/A'}</p></div>
                    <div><p class="text-xs text-gray-600 uppercase tracking-wide mb-1">Email</p><p class="text-sm text-gray-200 break-all">${s.email || 'N/A'}</p></div>
                    <div><p class="text-xs text-gray-600 uppercase tracking-wide mb-1">Message</p><p class="text-sm text-gray-200">${s.message || 'N/A'}</p></div>
                    <div class="flex justify-between items-center pt-2 border-t border-[#333]">
                        <p class="text-xs text-gray-500">${formatDate(s.timestamp)}</p>
                        <button onclick="deleteSubmission(${i})" class="text-red-500 hover:text-red-400 transition-colors text-xs uppercase tracking-wide">Delete</button>
                    </div>
                </div>`).join('');
        }

        function renderSubmissions() { renderTable(); renderCards(); }

        window.deleteSubmission = function(index) {
            if (confirm('Delete this submission?')) {
                const subs = getSubmissions();
                subs.splice(index, 1);
                saveSubmissions(subs);
                renderSubmissions();
            }
        };

        document.addEventListener('DOMContentLoaded', () => {
            const clearBtn = document.getElementById('clearAllBtn');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    if (confirm('Delete all submissions? This cannot be undone.')) {
                        localStorage.removeItem(STORAGE_KEY);
                        renderSubmissions();
                    }
                });
            }

            const form = document.getElementById('contactForm');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();

                    const nameEl    = document.getElementById('name');
                    const contactEl = document.getElementById('contactNumber');
                    const emailEl   = document.getElementById('email');
                    const msgEl     = document.getElementById('message');

                    if (!nameEl || !contactEl || !emailEl || !msgEl) {
                        alert('Error: Form fields not found.');
                        return;
                    }

                    const name    = (nameEl.value    || '').trim();
                    const contact = (contactEl.value || '').trim();
                    const email   = (emailEl.value   || '').trim();
                    const message = (msgEl.value     || '').trim();

                    if (!name || !contact || !email || !message) {
                        alert('Please fill in all fields.');
                        return;
                    }

                    const subs = getSubmissions();
                    subs.unshift({ name, contactNumber: contact, email, message, timestamp: new Date().toISOString() });
                    saveSubmissions(subs);
                    renderSubmissions();
                    form.reset();
                    alert('Message sent successfully!');
                });
            }

            renderSubmissions();
        });