// Personal AI Assistant for Lok Adhithya G
class PersonalAIAssistant {
    constructor() {
        this.messages = [];
        this.theme = 'light'; // Default to light theme
        
        // Application data from provided JSON
        this.appData = {
            personalInfo: {
                basicDetails: {
                    fullName: "Lok Adhithya G",
                    email: "lok.adhithya@gmail.com", 
                    phone: "+91-9487791281",
                    linkedin: "lokadhithya",
                    linkedinUrl: "https://www.linkedin.com/in/lokadhithya/",
                    linkedinRecentActivity: "https://www.linkedin.com/in/lokadhithya/recent-activity/all/",
                    dateOfBirth: {
                        raw: "29/07/2005",
                        formatted: "29 July 2005",
                        day: 29,
                        month: "July", 
                        year: 2005,
                        age: 20
                    }
                },
                education: {
                    current: {
                        degree: "B.E. - CSE - Specialization with AI & Robotics",
                        institution: "Satyabhama Institute of Science & Technology",
                        cgpa: "7.9",
                        status: "Pursuing",
                        location: "Chennai, India",
                        specialization: "Artificial Intelligence & Robotics"
                    },
                    twelfthStandard: {
                        level: "12th STD (HSC)",
                        institution: "Ramana Vidyalaya",
                        percentage: "73.6%"
                    },
                    tenthStandard: {
                        level: "10th STD (SSC)", 
                        institution: "Ramana Vidyalaya",
                        percentage: "75.6%"
                    }
                },
                certifications: [
                    {
                        name: "PCAP - Certified Associate Python Programmer",
                        issuer: "OpenEDG Python Institute",
                        issueDate: "Jun 2025",
                        credentialId: "ID 04PS.WV.4LC5SMsJ",
                        category: "Programming"
                    },
                    {
                        name: "PCEP - Certified Entry-Level Python Programmer",
                        issuer: "OpenEDG Python Institute", 
                        issueDate: "Mar 2024",
                        category: "Programming"
                    },
                    {
                        name: "Accenture Nordics - Software Engineering Job Simulation",
                        issuer: "Forage",
                        issueDate: "Aug 2025",
                        credentialId: "ID 4HPS.WV.4LC5SMsJ",
                        category: "Software Engineering"
                    },
                    {
                        name: "Deloitte Australia - Cyber Job Simulation", 
                        issuer: "Forage",
                        issueDate: "Aug 2025",
                        credentialId: "ID 24ehsSJPhh_pvcaF",
                        category: "Cybersecurity"
                    },
                    {
                        name: "Top 10% Machine Learning Simulation Coder",
                        issuer: "edument",
                        issueDate: "Aug 2025",
                        credentialId: "ID QUC520B.DCRSVC",
                        category: "Machine Learning"
                    },
                    {
                        name: "Industrial Program on Cyber Security, Ethical Hacking",
                        issuer: "iSooja",
                        issueDate: "2024",
                        category: "Cybersecurity"
                    }
                ]
            }
        };

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing Personal AI Assistant...');
        this.initializeElements();
        this.setupEventListeners();
        this.initializeTheme();
        this.showWelcomeScreen();
        
        // Focus on input after short delay
        setTimeout(() => {
            if (this.messageInput) {
                this.messageInput.focus();
                console.log('Input focused');
            }
        }, 500);
        
        console.log('Personal AI Assistant initialized successfully');
    }

    initializeElements() {
        // Main elements
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.themeToggle = document.getElementById('themeToggle');
        this.clearChatBtn = document.getElementById('clearChatBtn');
        
        console.log('Elements initialized');
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Send functionality
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Send button clicked');
                this.handleSend();
            });
        }
        
        if (this.messageInput) {
            this.messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    console.log('Enter key pressed');
                    this.handleSend();
                }
            });

            this.messageInput.addEventListener('input', () => {
                this.updateSendButton();
                this.autoResizeTextarea();
            });
        }

        // Query buttons - use event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('query-btn') || e.target.classList.contains('suggestion-chip')) {
                e.preventDefault();
                const query = e.target.dataset.query;
                console.log('Query button clicked:', query);
                this.executeQuery(query);
            }
        });

        // Controls
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => {
                console.log('Sidebar toggle clicked');
                this.toggleSidebar();
            });
        }

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                console.log('Theme toggle clicked');
                this.toggleTheme();
            });
        }

        if (this.clearChatBtn) {
            this.clearChatBtn.addEventListener('click', () => {
                console.log('Clear chat clicked');
                this.clearChat();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (this.messageInput) this.messageInput.focus();
            }
        });
        
        console.log('Event listeners set up successfully');
    }

    showWelcomeScreen() {
        if (this.welcomeScreen) {
            this.welcomeScreen.classList.remove('hidden');
            console.log('Welcome screen shown');
        }
    }

    hideWelcomeScreen() {
        if (this.welcomeScreen) {
            this.welcomeScreen.classList.add('hidden');
            console.log('Welcome screen hidden');
        }
    }

    executeQuery(query) {
        console.log('Executing query:', query);
        if (this.messageInput) {
            this.messageInput.value = query;
            this.updateSendButton();
            this.autoResizeTextarea();
        }
        // Small delay to allow UI to update
        setTimeout(() => {
            this.handleSend();
        }, 100);
    }

    handleSend() {
        if (!this.messageInput) {
            console.error('Message input not found');
            return;
        }
        
        const query = this.messageInput.value.trim();
        if (!query) {
            console.log('Empty query, not sending');
            return;
        }

        console.log('Handling send for:', query);

        // Hide welcome screen
        this.hideWelcomeScreen();

        // Add user message
        this.addMessage(query, 'user');
        
        // Clear input
        this.messageInput.value = '';
        this.updateSendButton();
        this.autoResizeTextarea();

        // Show typing indicator
        this.showTypingIndicator();

        // Process query and respond
        setTimeout(() => {
            this.processQuery(query);
        }, 800 + Math.random() * 1200); // Random delay between 0.8-2s for realistic feel
    }

    processQuery(query) {
        const response = this.generateResponse(query);
        this.hideTypingIndicator();
        this.addMessage(response, 'assistant');
    }

    generateResponse(query) {
        const lowerQuery = query.toLowerCase();
        
        // LinkedIn post/activity queries
        if (this.isLinkedInQuery(lowerQuery)) {
            return `**LinkedIn Posts & Recent Activity**

For Lok Adhithya G's most current LinkedIn posts and activities, please visit his recent activity page:

🔗 **[View Recent LinkedIn Activity](${this.appData.personalInfo.basicDetails.linkedinRecentActivity})**

**What you'll typically find on his LinkedIn:**
• Professional certification achievements
• Learning milestones and course completions
• Industry insights and AI/ML discussions
• Project updates and technical experiments
• Career development progress
• Educational achievements and academic updates

**LinkedIn Profile:** [${this.appData.personalInfo.basicDetails.linkedinUrl}](${this.appData.personalInfo.basicDetails.linkedinUrl})

You can find all his latest posts, comments, and professional updates at the links above.`;
        }
        
        // Date of birth queries
        if (this.isDateOfBirthQuery(lowerQuery)) {
            const dob = this.appData.personalInfo.basicDetails.dateOfBirth;
            return `Lok Adhithya G was born on **${dob.formatted}**. He is currently ${dob.age} years old.`;
        }
        
        // Contact details queries
        if (this.isContactQuery(lowerQuery)) {
            const details = this.appData.personalInfo.basicDetails;
            return `**Contact Information for Lok Adhithya G:**

• **Email:** ${details.email}
• **Phone:** ${details.phone}
• **LinkedIn:** [${details.linkedinUrl}](${details.linkedinUrl})

Feel free to reach out to him through any of these channels!`;
        }
        
        // Education queries
        if (this.isEducationQuery(lowerQuery)) {
            const edu = this.appData.personalInfo.education;
            return `**Education Details:**

**Current Studies:**
• **Degree:** ${edu.current.degree}
• **Institution:** ${edu.current.institution}
• **Location:** ${edu.current.location}
• **CGPA:** ${edu.current.cgpa}
• **Status:** ${edu.current.status}
• **Specialization:** ${edu.current.specialization}

**Previous Education:**
• **12th Standard:** ${edu.twelfthStandard.percentage} from ${edu.twelfthStandard.institution}
• **10th Standard:** ${edu.tenthStandard.percentage} from ${edu.tenthStandard.institution}`;
        }
        
        // CGPA specific query
        if (this.isCGPAQuery(lowerQuery)) {
            return `Lok Adhithya G maintains a **CGPA of ${this.appData.personalInfo.education.current.cgpa}** in his B.E. Computer Science Engineering program at Satyabhama Institute of Science & Technology.`;
        }
        
        // Certification queries
        if (this.isCertificationQuery(lowerQuery)) {
            if (lowerQuery.includes('pcap')) {
                return this.getPCAPCertificationDetails();
            }
            return this.getAllCertifications();
        }
        
        // Career goals/objectives queries
        if (this.isCareerQuery(lowerQuery)) {
            return `**Career Objectives & Goals:**

Lok Adhithya G is pursuing a specialization in **AI & Robotics** with a focus on:

• **Technical Expertise:** Developing strong programming skills, particularly in Python
• **Specialization Focus:** Artificial Intelligence and Robotics applications
• **Professional Growth:** Building practical experience through job simulations and certifications
• **Industry Preparation:** Gaining hands-on experience with real-world projects

**Key Skills & Interests:**
• Python Programming (PCAP & PCEP certified)
• Machine Learning and AI algorithms
• Cybersecurity and Ethical Hacking
• Software Engineering practices
• Continuous learning and skill development

His certification achievements in programming, cybersecurity, and job simulations demonstrate his commitment to building a strong foundation for a career in technology.`;
        }
        
        // Background/general info queries
        if (this.isBackgroundQuery(lowerQuery)) {
            return `**About Lok Adhithya G:**

Lok Adhithya G is a dedicated technology student currently pursuing his Bachelor of Engineering in Computer Science with a specialization in AI & Robotics. Here's an overview:

**Personal Details:**
• **Age:** 20 years old (born ${this.appData.personalInfo.basicDetails.dateOfBirth.formatted})
• **Location:** Chennai, India

**Academic Journey:**
• Currently studying at Satyabhama Institute of Science & Technology
• Maintaining a strong academic performance with CGPA of 7.9
• Focused on AI & Robotics specialization

**Professional Development:**
• 6+ professional certifications including Python programming
• Completed job simulations with major companies (Accenture, Deloitte)
• Active on LinkedIn sharing professional achievements and learning milestones

**Key Strengths:**
• Strong foundation in programming languages
• Commitment to continuous learning
• Practical experience through simulations and projects
• Focus on emerging technologies like AI and cybersecurity`;
        }
        
        // Programming languages query
        if (this.isProgrammingLanguagesQuery(lowerQuery)) {
            return `**Programming Languages & Technical Skills:**

Based on his certifications and specialization, Lok Adhithya G has demonstrated proficiency in:

**Primary Languages:**
• **Python** - PCAP & PCEP certified (Advanced level)
  - Data structures and algorithms
  - Object-oriented programming
  - Machine learning applications

**Technical Areas:**
• **Machine Learning** - Top 10% performance in ML simulation coding
• **Software Engineering** - Accenture job simulation experience  
• **Cybersecurity** - Industrial program certification and Deloitte simulation
• **AI & Robotics** - Current specialization focus

**Development Skills:**
• Programming fundamentals and best practices
• Problem-solving and algorithmic thinking
• Software development methodologies
• Technical documentation and code review

His PCAP certification particularly demonstrates advanced Python programming capabilities, while his job simulations show practical application of software engineering principles.`;
        }
        
        // Default response for unmatched queries
        return this.getDefaultResponse(query);
    }

    isLinkedInQuery(query) {
        const linkedinKeywords = [
            'linkedin', 'recent posts', 'latest posts', 'recent activity', 'latest activity',
            'posts', 'updates', 'recent linkedin', 'linkedin posts', 'linkedin activity',
            'social media', 'professional updates', 'recent updates', 'latest linkedin'
        ];
        return linkedinKeywords.some(keyword => query.includes(keyword));
    }

    isDateOfBirthQuery(query) {
        const dobKeywords = ['date of birth', 'dob', 'born', 'birthday', 'birth date', 'age'];
        return dobKeywords.some(keyword => query.includes(keyword));
    }

    isContactQuery(query) {
        const contactKeywords = ['contact', 'email', 'phone', 'reach', 'get in touch', 'contact details', 'contact info'];
        return contactKeywords.some(keyword => query.includes(keyword));
    }

    isEducationQuery(query) {
        const educationKeywords = ['education', 'study', 'college', 'university', 'institution', 'school', 'degree', 'academic'];
        return educationKeywords.some(keyword => query.includes(keyword));
    }

    isCGPAQuery(query) {
        const cgpaKeywords = ['cgpa', 'gpa', 'grades', 'academic performance', 'marks'];
        return cgpaKeywords.some(keyword => query.includes(keyword));
    }

    isCertificationQuery(query) {
        const certKeywords = ['certification', 'certificate', 'certified', 'pcap', 'pcep', 'credential', 'qualification'];
        return certKeywords.some(keyword => query.includes(keyword));
    }

    isCareerQuery(query) {
        const careerKeywords = ['career', 'goal', 'objective', 'aspiration', 'future', 'plan', 'ambition', 'technical skills'];
        return careerKeywords.some(keyword => query.includes(keyword));
    }

    isBackgroundQuery(query) {
        const backgroundKeywords = ['background', 'about', 'tell me', 'who is', 'introduction', 'overview', 'profile'];
        return backgroundKeywords.some(keyword => query.includes(keyword));
    }

    isProgrammingLanguagesQuery(query) {
        const progKeywords = ['programming', 'languages', 'coding', 'technical skills', 'python', 'programming skills'];
        return progKeywords.some(keyword => query.includes(keyword));
    }

    getPCAPCertificationDetails() {
        const pcapCert = this.appData.personalInfo.certifications.find(cert => cert.name.includes('PCAP'));
        const pcepCert = this.appData.personalInfo.certifications.find(cert => cert.name.includes('PCEP'));
        
        return `**Python Certification Details:**

**PCAP - Certified Associate Python Programmer:**
• **Issuer:** ${pcapCert.issuer}
• **Issue Date:** ${pcapCert.issueDate}
• **Credential ID:** ${pcapCert.credentialId}
• **Category:** ${pcapCert.category}

**PCEP - Certified Entry-Level Python Programmer:**
• **Issuer:** ${pcepCert.issuer}
• **Issue Date:** ${pcepCert.issueDate}
• **Category:** ${pcepCert.category}

These certifications demonstrate his strong foundation and advanced skills in Python programming, covering object-oriented programming, data structures, algorithms, and best practices.`;
    }

    getAllCertifications() {
        const certs = this.appData.personalInfo.certifications;
        let response = `**Professional Certifications (${certs.length} Total):**\n\n`;
        
        certs.forEach((cert, index) => {
            response += `**${index + 1}. ${cert.name}**\n`;
            response += `• **Issuer:** ${cert.issuer}\n`;
            response += `• **Issue Date:** ${cert.issueDate}\n`;
            if (cert.credentialId) {
                response += `• **Credential ID:** ${cert.credentialId}\n`;
            }
            response += `• **Category:** ${cert.category}\n\n`;
        });
        
        response += `**Key Achievements:**\n`;
        response += `• Python Programming certifications (PCAP & PCEP)\n`;
        response += `• Software Engineering job simulation with Accenture\n`;
        response += `• Cybersecurity simulation with Deloitte Australia\n`;
        response += `• Top 10% performance in Machine Learning coding\n`;
        response += `• Industrial certification in Cybersecurity & Ethical Hacking`;
        
        return response;
    }

    getDefaultResponse(query) {
        return `I'd be happy to help you learn about Lok Adhithya G! I have information about:

**Available Topics:**
• Personal information (date of birth, contact details)
• Education (current studies, academic performance)
• Certifications (6+ professional certifications)
• Career goals and technical skills
• LinkedIn profile and recent activities

**Popular Queries:**
• "What is his date of birth?"
• "Where does he study?"
• "What certifications does he have?"
• "Show his recent LinkedIn posts"
• "What are his career goals?"
• "What are his contact details?"

Feel free to ask about any of these topics, and I'll provide detailed information!`;
    }

    addMessage(content, sender) {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const message = {
            id: messageId,
            content,
            sender,
            timestamp: new Date()
        };

        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
        
        console.log('Added message:', messageId, sender);
    }

    renderMessage(message) {
        if (!this.chatMessages) {
            console.error('Chat messages container not found');
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender}`;
        messageElement.dataset.messageId = message.id;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = message.sender === 'user' ? '👤' : '🤖';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = this.formatMessageContent(message.content);

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = this.formatTime(message.timestamp);

        bubble.appendChild(content);
        bubble.appendChild(time);

        messageElement.appendChild(avatar);
        messageElement.appendChild(bubble);

        this.chatMessages.appendChild(messageElement);
        console.log('Message rendered:', message.id);
    }

    formatMessageContent(content) {
        // Convert markdown-style formatting to HTML
        content = content.replace(/^### (.+)$/gm, '<h4>$1</h4>');
        content = content.replace(/^## (.+)$/gm, '<h3>$1</h3>');
        content = content.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
        content = content.replace(/^• (.+)$/gm, '<li>$1</li>');
        
        // Convert markdown links to HTML links with target="_blank"
        content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Group consecutive list items
        content = content.replace(/(<li>.*?<\/li>)(\s*<li>.*?<\/li>)*/gs, '<ul>$&</ul>');
        content = content.replace(/<\/ul>\s*<ul>/g, '');
        
        // Convert line breaks
        content = content.replace(/\n\n/g, '</p><p>');
        content = content.replace(/\n/g, '<br>');
        content = '<p>' + content + '</p>';
        
        // Clean up extra paragraph tags
        content = content.replace(/<p><\/p>/g, '');
        content = content.replace(/<p>(<h[3-4]>)/g, '$1');
        content = content.replace(/(<\/h[3-4]>)<\/p>/g, '$1');
        content = content.replace(/<p>(<ul>)/g, '$1');
        content = content.replace(/(<\/ul>)<\/p>/g, '$1');
        
        return content;
    }

    showTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.classList.remove('hidden');
            console.log('Typing indicator shown');
        }
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.classList.add('hidden');
            console.log('Typing indicator hidden');
        }
    }

    toggleSidebar() {
        if (this.sidebar) {
            this.sidebar.classList.toggle('open');
            console.log('Sidebar toggled');
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        this.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        
        this.updateThemeIcon(newTheme);
        console.log('Theme toggled to:', newTheme);
    }

    initializeTheme() {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
        this.theme = savedTheme;
        this.updateThemeIcon(savedTheme);
        console.log('Theme initialized to:', savedTheme);
    }

    updateThemeIcon(theme) {
        const icon = document.getElementById('themeIcon');
        if (!icon) return;
        
        if (theme === 'dark') {
            icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
        } else {
            icon.innerHTML = `
                <circle cx="12" cy="12" r="5"/>
                <g stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </g>
            `;
        }
    }

    clearChat() {
        this.messages = [];
        if (this.chatMessages) {
            // Keep welcome screen but clear messages
            const welcomeScreen = this.chatMessages.querySelector('.welcome-screen');
            this.chatMessages.innerHTML = '';
            if (welcomeScreen) {
                this.chatMessages.appendChild(welcomeScreen);
                this.showWelcomeScreen();
            }
        }
        this.hideTypingIndicator();
        console.log('Chat cleared');
    }

    updateSendButton() {
        if (this.messageInput && this.sendBtn) {
            const hasContent = this.messageInput.value.trim().length > 0;
            this.sendBtn.disabled = !hasContent;
        }
    }

    autoResizeTextarea() {
        if (this.messageInput) {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        }
    }

    scrollToBottom() {
        if (this.chatMessages) {
            setTimeout(() => {
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            }, 100);
        }
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Personal AI Assistant...');
    window.personalAIAssistant = new PersonalAIAssistant();
});