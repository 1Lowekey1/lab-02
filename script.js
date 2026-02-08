const photoWrapper = document.querySelector('.photo-frame-hover');
const photoFrame = document.querySelector('.frame');

if (photoWrapper && photoFrame) {
    photoWrapper.addEventListener('mouseenter', () => {
        photoFrame.style.borderColor = '#555';
    });

    photoWrapper.addEventListener('mouseleave', () => {
        photoFrame.style.borderColor = '#333';
    });
}

// Contact Form Handling
const STORAGE_KEY = 'contactSubmissions';

// Get submissions from localStorage
function getSubmissions() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Save submissions to localStorage
function saveSubmissions(submissions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Render submissions table (desktop)
function renderTable() {
    const submissions = getSubmissions();
    const tableBody = document.getElementById('submissionsTableBody');
    const clearBtn = document.getElementById('clearAllBtn');

    if (!tableBody) return;

    if (submissions.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-500">No submissions yet</td></tr>';
        if (clearBtn) clearBtn.disabled = true;
    } else {
        if (clearBtn) clearBtn.disabled = false;
        tableBody.innerHTML = submissions.map((sub, index) => `
            <tr class="border-b border-[#222] hover:bg-[#131313] transition-colors">
                <td class="py-4 px-4 text-gray-200">${sub.name || 'N/A'}</td>
                <td class="py-4 px-4 text-gray-200">${sub.contact || 'N/A'}</td>
                <td class="py-4 px-4 text-gray-200">${sub.email || 'N/A'}</td>
                <td class="py-4 px-4 text-gray-200 max-w-xs truncate" title="${sub.message || ''}">${sub.message || 'N/A'}</td>
                <td class="py-4 px-4 text-gray-400 text-sm whitespace-nowrap">${formatDate(sub.timestamp)}</td>
                <td class="py-4 px-4">
                    <button 
                        onclick="deleteSubmission(${index})"
                        class="text-red-500 hover:text-red-400 transition-colors text-sm uppercase tracking-wide"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Render submissions cards (mobile)
function renderCards() {
    const submissions = getSubmissions();
    const cardsContainer = document.getElementById('submissionsCards');
    const clearBtn = document.getElementById('clearAllBtn');

    if (!cardsContainer) return;

    if (submissions.length === 0) {
        cardsContainer.innerHTML = '<p class="text-center text-gray-500 py-8">No submissions yet</p>';
        if (clearBtn) clearBtn.disabled = true;
    } else {
        if (clearBtn) clearBtn.disabled = false;
        cardsContainer.innerHTML = submissions.map((sub, index) => `
            <div class="bg-[#0a0a0a] border border-[#333] rounded-lg p-4">
                <div class="space-y-3">
                    <div>
                        <p class="text-xs text-gray-600 uppercase tracking-wide mb-1">Name</p>
                        <p class="text-gray-200">${sub.name || 'N/A'}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-600 uppercase tracking-wide mb-1">Contact</p>
                        <p class="text-gray-200">${sub.contact || 'N/A'}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-600 uppercase tracking-wide mb-1">Email</p>
                        <p class="text-gray-200 break-all">${sub.email || 'N/A'}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-600 uppercase tracking-wide mb-1">Message</p>
                        <p class="text-gray-200">${sub.message || 'N/A'}</p>
                    </div>
                    <div class="flex justify-between items-center pt-2 border-t border-[#333]">
                        <p class="text-xs text-gray-500">${formatDate(sub.timestamp)}</p>
                        <button 
                            onclick="deleteSubmission(${index})"
                            class="text-red-500 hover:text-red-400 transition-colors text-sm uppercase tracking-wide"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Render both views
function renderSubmissions() {
    renderTable();
    renderCards();
}

// Delete a submission
function deleteSubmission(index) {
    if (confirm('Are you sure you want to delete this submission?')) {
        const submissions = getSubmissions();
        submissions.splice(index, 1);
        saveSubmissions(submissions);
        renderSubmissions();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Photo frame hover effect
    const photoWrapper = document.querySelector('.photo-frame-hover');
    const photoFrame = document.querySelector('.frame');

    if (photoWrapper && photoFrame) {
        photoWrapper.addEventListener('mouseenter', () => {
            photoFrame.style.borderColor = '#555';
        });

        photoWrapper.addEventListener('mouseleave', () => {
            photoFrame.style.borderColor = '#333';
        });
    }

    // Clear all submissions button handler
    const clearBtn = document.getElementById('clearAllBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all submissions? This cannot be undone.')) {
                localStorage.removeItem(STORAGE_KEY);
                renderSubmissions();
            }
        });
    }

    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            console.log('Form submitted!');

            // Get form elements
            const nameEl = document.getElementById('name');
            const contactEl = document.getElementById('contactNumber');
            const emailEl = document.getElementById('email');
            const messageEl = document.getElementById('message');

            console.log('Name element:', nameEl);
            console.log('Contact element:', contactEl);
            console.log('Email element:', emailEl);
            console.log('Message element:', messageEl);

            // Validate all elements exist
            if (!nameEl || !contactEl || !emailEl || !messageEl) {
                console.error('Form elements not found.');
                alert('Error: Form fields not found.');
                return;
            }

            // Check if .value exists on each element
            console.log('Name value type:', typeof nameEl.value);
            console.log('Contact value type:', typeof contactEl.value);
            console.log('Email value type:', typeof emailEl.value);
            console.log('Message value type:', typeof messageEl.value);

            // Get values with extra safety
            const nameValue = nameEl.value;
            const contactValue = contactEl.value;
            const emailValue = emailEl.value;
            const messageValue = messageEl.value;

            console.log('Raw values:', {
                name: nameValue,
                contact: contactValue,
                email: emailValue,
                message: messageValue
            });

            // Only trim if value exists
            const name = (nameValue !== undefined && nameValue !== null) ? nameValue.trim() : '';
            const contact = (contactValue !== undefined && contactValue !== null) ? contactValue.trim() : '';
            const email = (emailValue !== undefined && emailValue !== null) ? emailValue.trim() : '';
            const message = (messageValue !== undefined && messageValue !== null) ? messageValue.trim() : '';

            console.log('Trimmed values:', { name, contact, email, message });

            // Validate data
            if (!name || !contact || !email || !message) {
                console.log('Validation failed - empty fields');
                alert('Please fill in all fields.');
                return;
            }

            const formData = {
                name: name,
                contact: contact,
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            };

            console.log('Saving form data:', formData);

            const submissions = getSubmissions();
            submissions.unshift(formData);
            saveSubmissions(submissions);
            renderSubmissions();

            // Reset form
            e.target.reset();

            // Show success message
            alert('Message sent successfully!');
        });
    } else {
        console.error('Contact form not found!');
    }

    // Initial render on page load
    renderSubmissions();
});