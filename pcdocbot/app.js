// PC Care Bot Application JavaScript

class PCCareBot {
    constructor() {
        this.currentProblem = null;
        this.conversationState = 'initial';
        this.userResponses = [];
        this.loadProblemDatabase();
        this.init();
    }

    init() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.typingIndicator = document.getElementById('typingIndicator');

        // Event listeners
        this.sendBtn.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });

        // Wait for DOM to be ready then attach event listeners
        setTimeout(() => {
            this.attachEventListeners();
        }, 100);

        // Welcome message
        this.addBotMessage(this.getWelcomeMessage());
    }

    attachEventListeners() {
        // Quick start buttons
        const quickBtns = document.querySelectorAll('.quick-btn');
        quickBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const problemId = e.target.dataset.problem;
                this.handleQuickStart(problemId);
            });
        });

        // Diagnostic tool buttons
        const toolBtns = document.querySelectorAll('.tool-btn');
        toolBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const toolId = e.target.dataset.tool;
                this.handleDiagnosticTool(toolId);
            });
        });
    }

    loadProblemDatabase() {
        this.problemDatabase = {
            "commonProblems": [
                {
                    "id": "no_power",
                    "title": "Computer Won't Turn On",
                    "symptoms": ["no lights", "no fan noise", "no display", "dead computer", "won't turn on", "no power", "not starting", "doesn't start"],
                    "category": "hardware",
                    "solutions": [
                        {
                            "step": 1,
                            "instruction": "Check if power cable is securely connected to both wall outlet and computer",
                            "safety": "Ensure hands are dry before handling electrical connections"
                        },
                        {
                            "step": 2,
                            "instruction": "Try a different power outlet or test outlet with another device",
                            "safety": null
                        },
                        {
                            "step": 3,
                            "instruction": "If using a power strip, try connecting directly to wall outlet",
                            "safety": null
                        },
                        {
                            "step": 4,
                            "instruction": "Check if power supply unit (PSU) switch is turned ON (usually on back of computer)",
                            "safety": "Turn off computer before checking PSU switch"
                        },
                        {
                            "step": 5,
                            "instruction": "Test power supply with PSU tester or replace with known working PSU",
                            "safety": "Disconnect power cable before opening computer case. Never open PSU itself."
                        }
                    ],
                    "prevention": "Use surge protector, avoid power overloads, ensure proper ventilation"
                },
                {
                    "id": "overheating",
                    "title": "Computer Overheating",
                    "symptoms": ["unexpected shutdown", "very hot computer", "loud fans", "thermal throttling", "overheating", "hot", "fan noise", "burning smell"],
                    "category": "hardware",
                    "solutions": [
                        {
                            "step": 1,
                            "instruction": "Check if computer fans are running and not obstructed",
                            "safety": "Turn off computer before checking fans"
                        },
                        {
                            "step": 2,
                            "instruction": "Clean dust from fans, vents, and internal components using compressed air",
                            "safety": "Power off and unplug computer. Use short bursts of compressed air."
                        },
                        {
                            "step": 3,
                            "instruction": "Ensure proper ventilation around computer (6+ inches clearance)",
                            "safety": null
                        },
                        {
                            "step": 4,
                            "instruction": "Check CPU thermal paste and consider replacement if dried out",
                            "safety": "This requires disassembling CPU cooler. Consider professional help if inexperienced."
                        },
                        {
                            "step": 5,
                            "instruction": "Install additional case fans or upgrade CPU cooler if needed",
                            "safety": "Ensure compatible mounting and power connections"
                        }
                    ],
                    "prevention": "Regular cleaning every 3-6 months, maintain good airflow, monitor temperatures"
                },
                {
                    "id": "blue_screen",
                    "title": "Blue Screen of Death (BSOD)",
                    "symptoms": ["blue screen error", "system crash", "automatic restart", "stop error", "bsod", "blue screen", "crash", "restart"],
                    "category": "software",
                    "solutions": [
                        {
                            "step": 1,
                            "instruction": "Note the error code and message on the blue screen",
                            "safety": null
                        },
                        {
                            "step": 2,
                            "instruction": "Boot into Safe Mode by pressing F8 during startup",
                            "safety": "Make sure to save any important work before troubleshooting"
                        },
                        {
                            "step": 3,
                            "instruction": "Run System File Checker: Open Command Prompt as admin and type 'sfc /scannow'",
                            "safety": null
                        },
                        {
                            "step": 4,
                            "instruction": "Check for recent hardware or software changes and undo if possible",
                            "safety": null
                        },
                        {
                            "step": 5,
                            "instruction": "Update or rollback recently installed drivers",
                            "safety": "Create system restore point before driver changes"
                        },
                        {
                            "step": 6,
                            "instruction": "Run memory diagnostic tool to check for RAM issues",
                            "safety": null
                        }
                    ],
                    "prevention": "Keep drivers updated, avoid overclocking, use quality RAM, regular system updates"
                },
                {
                    "id": "slow_performance",
                    "title": "Slow Computer Performance",
                    "symptoms": ["slow startup", "laggy programs", "frozen applications", "long loading times", "slow", "laggy", "freezing", "performance", "running slow"],
                    "category": "software",
                    "solutions": [
                        {
                            "step": 1,
                            "instruction": "Check Task Manager for high CPU/memory usage applications",
                            "safety": null
                        },
                        {
                            "step": 2,
                            "instruction": "Disable unnecessary startup programs in Task Manager > Startup tab",
                            "safety": null
                        },
                        {
                            "step": 3,
                            "instruction": "Run Disk Cleanup to remove temporary files and free up space",
                            "safety": null
                        },
                        {
                            "step": 4,
                            "instruction": "Defragment hard drive (not needed for SSDs)",
                            "safety": "Don't defragment SSD drives as it can reduce lifespan"
                        },
                        {
                            "step": 5,
                            "instruction": "Scan for malware using Windows Defender or reputable antivirus",
                            "safety": null
                        },
                        {
                            "step": 6,
                            "instruction": "Add more RAM or upgrade to SSD if budget allows",
                            "safety": "Ensure compatibility before purchasing hardware"
                        }
                    ],
                    "prevention": "Regular maintenance, avoid unnecessary software, keep storage space available"
                },
                {
                    "id": "wifi_issues",
                    "title": "Wi-Fi Connection Problems",
                    "symptoms": ["no internet", "wifi not connecting", "slow internet", "connection drops", "network", "internet", "wifi", "connectivity"],
                    "category": "network",
                    "solutions": [
                        {
                            "step": 1,
                            "instruction": "Check if Wi-Fi is enabled on your device",
                            "safety": null
                        },
                        {
                            "step": 2,
                            "instruction": "Restart your router by unplugging for 30 seconds, then plug back in",
                            "safety": null
                        },
                        {
                            "step": 3,
                            "instruction": "Forget and reconnect to your Wi-Fi network",
                            "safety": null
                        },
                        {
                            "step": 4,
                            "instruction": "Update Wi-Fi adapter drivers in Device Manager",
                            "safety": null
                        },
                        {
                            "step": 5,
                            "instruction": "Reset network settings using 'netsh winsock reset' in Command Prompt",
                            "safety": "Run Command Prompt as administrator"
                        },
                        {
                            "step": 6,
                            "instruction": "Check router settings and consider changing Wi-Fi channel",
                            "safety": null
                        }
                    ],
                    "prevention": "Keep drivers updated, maintain router firmware, check for interference"
                },
                {
                    "id": "hard_drive_failure",
                    "title": "Hard Drive Problems",
                    "symptoms": ["clicking sounds", "slow file access", "disk errors", "files disappearing", "hard drive", "disk", "storage", "clicking noise"],
                    "category": "hardware",
                    "solutions": [
                        {
                            "step": 1,
                            "instruction": "IMMEDIATELY backup important data if drive is still accessible",
                            "safety": "Do not continue using failing drive for important data"
                        },
                        {
                            "step": 2,
                            "instruction": "Run CHKDSK utility to scan and fix disk errors",
                            "safety": null
                        },
                        {
                            "step": 3,
                            "instruction": "Check SMART status using CrystalDiskInfo or similar tool",
                            "safety": null
                        },
                        {
                            "step": 4,
                            "instruction": "Check data and power cable connections",
                            "safety": "Power off computer before checking connections"
                        },
                        {
                            "step": 5,
                            "instruction": "If SMART shows failure, replace drive immediately",
                            "safety": "Professional data recovery may be needed for important data"
                        }
                    ],
                    "prevention": "Regular backups, monitor SMART status, avoid physical shocks, proper ventilation"
                }
            ]
        };
    }

    getWelcomeMessage() {
        return `Hello! 👋 I'm your PC Care Bot, here to help you diagnose and solve computer problems.

I can assist you with:
• **Hardware issues** (power, overheating, components)
• **Software problems** (crashes, performance, errors)
• **Network connectivity** issues
• **System diagnostics** and maintenance

You can either:
1. **Click a quick start button** on the left for common problems
2. **Type your specific issue** in the chat below
3. **Use diagnostic tools** to gather system information

What computer problem can I help you solve today?`;
    }

    handleUserInput() {
        const input = this.userInput.value.trim();
        if (!input) return;

        this.addUserMessage(input);
        this.userInput.value = '';
        
        this.showTyping();
        setTimeout(() => {
            this.processUserInput(input);
            this.hideTyping();
        }, 800);
    }

    handleQuickStart(problemId) {
        const problem = this.problemDatabase.commonProblems.find(p => p.id === problemId);
        if (problem) {
            this.currentProblem = problem;
            this.addUserMessage(`Help with: ${problem.title}`);
            
            setTimeout(() => {
                this.addBotMessage(`I'll help you with **${problem.title}**. Let me provide you with step-by-step solutions.`);
                setTimeout(() => {
                    this.provideSolution(problem);
                }, 500);
            }, 300);
        }
    }

    handleDiagnosticTool(toolId) {
        const toolMessages = {
            'system-info': `Here's how to gather system information:

**Windows System Information:**
1. Press Windows key + R
2. Type "msinfo32" and press Enter
3. This shows your system specifications, hardware, and software details

**Alternative method:**
1. Right-click "This PC" or "Computer"
2. Select "Properties"
3. View basic system information

This information is helpful for troubleshooting hardware compatibility and software issues.`,

            'temperature': `Here's how to check your computer's temperature:

**Using Built-in Tools:**
1. BIOS/UEFI: Restart and enter BIOS (usually F2, F12, or Delete key)
2. Look for "Hardware Monitor" or "PC Health" section

**Free Software Options:**
• **HWiNFO64**: Comprehensive hardware monitoring
• **Core Temp**: Specifically for CPU temperature
• **GPU-Z**: For graphics card temperature

**Safe Temperature Ranges:**
• CPU: Under 80°C under load
• GPU: Under 85°C under load
• Hard drives: Under 50°C

If temperatures exceed these, your computer may need cleaning or better cooling.`,

            'memory': `Here's how to test your computer's memory (RAM):

**Windows Memory Diagnostic:**
1. Press Windows key + R
2. Type "mdsched.exe" and press Enter
3. Choose "Restart now and check for problems"
4. Computer will restart and test memory automatically

**MemTest86 (More thorough):**
1. Download from memtest86.com
2. Create bootable USB drive
3. Boot from USB and run extended test

**Signs of Memory Problems:**
• Blue screens (BSOD)
• Random crashes
• System freezing
• Programs closing unexpectedly
• Slow performance

Memory issues require professional diagnosis or replacement.`,

            'disk-health': `Here's how to check your hard drive health:

**Windows Check Disk:**
1. Open File Explorer
2. Right-click on drive (usually C:)
3. Select Properties > Tools > Check

**Command Line Method:**
1. Open Command Prompt as administrator
2. Type: chkdsk C: /f /r
3. Press Y when prompted, restart computer

**SMART Status Check:**
• Download CrystalDiskInfo (free)
• Install and run to see drive health status
• Look for warnings or errors

**Warning Signs:**
• Clicking or grinding noises
• Slow file access
• Frequent errors
• Files disappearing

⚠️ **Important:** Backup important data immediately if you suspect drive failure!`
        };

        this.addBotMessage(toolMessages[toolId] || 'Diagnostic tool information not available.');
    }

    processUserInput(input) {
        const matchedProblem = this.matchProblemFromInput(input);
        
        if (matchedProblem) {
            this.currentProblem = matchedProblem;
            this.addBotMessage(`I found a match for your problem: **${matchedProblem.title}**`);
            setTimeout(() => {
                this.provideSolution(matchedProblem);
            }, 1000);
        } else {
            this.handleUnknownProblem(input);
        }
    }

    matchProblemFromInput(input) {
        const lowercaseInput = input.toLowerCase();
        
        return this.problemDatabase.commonProblems.find(problem => {
            return problem.symptoms.some(symptom => 
                lowercaseInput.includes(symptom.toLowerCase())
            );
        });
    }

    handleUnknownProblem(input) {
        const response = `I understand you're experiencing: "${input}"

Let me help you narrow down the issue. What type of problem best describes your situation?`;

        this.addBotMessage(response);
        
        // Add diagnostic questions as clickable options
        setTimeout(() => {
            this.addDiagnosticChoices([
                "Hardware problem (fans, lights, sounds, power)",
                "Software problem (programs, crashes, errors)",
                "Network/Internet connectivity problem",
                "Performance problem (slow, freezing)",
                "I need more help to identify the problem"
            ]);
        }, 500);
    }

    addDiagnosticChoices(choices) {
        const choicesHtml = choices.map(choice => 
            `<button class="choice-btn" onclick="window.pcBot.handleChoice('${choice.replace(/'/g, "\\'")}')">
                ${choice}
            </button>`
        ).join('');
        
        const choicesContainer = `<div class="choice-buttons">${choicesHtml}</div>`;
        this.addBotMessage("", choicesContainer);
    }

    handleChoice(choice) {
        this.addUserMessage(choice);
        
        this.showTyping();
        setTimeout(() => {
            this.processChoice(choice);
            this.hideTyping();
        }, 800);
    }

    processChoice(choice) {
        const lowercaseChoice = choice.toLowerCase();
        
        if (lowercaseChoice.includes('hardware')) {
            this.currentProblem = this.problemDatabase.commonProblems.find(p => p.id === 'no_power');
            this.addBotMessage("For hardware problems, let's start with power issues - the most common hardware problem:");
            setTimeout(() => this.provideSolution(this.currentProblem), 1000);
        } else if (lowercaseChoice.includes('software')) {
            this.currentProblem = this.problemDatabase.commonProblems.find(p => p.id === 'blue_screen');
            this.addBotMessage("For software problems, let's check for system crashes and errors:");
            setTimeout(() => this.provideSolution(this.currentProblem), 1000);
        } else if (lowercaseChoice.includes('network') || lowercaseChoice.includes('internet')) {
            this.currentProblem = this.problemDatabase.commonProblems.find(p => p.id === 'wifi_issues');
            this.addBotMessage("For network problems, here are the most effective solutions:");
            setTimeout(() => this.provideSolution(this.currentProblem), 1000);
        } else if (lowercaseChoice.includes('performance') || lowercaseChoice.includes('slow')) {
            this.currentProblem = this.problemDatabase.commonProblems.find(p => p.id === 'slow_performance');
            this.addBotMessage("For performance issues, here's how to speed up your computer:");
            setTimeout(() => this.provideSolution(this.currentProblem), 1000);
        } else if (lowercaseChoice.includes('solved') || lowercaseChoice.includes('thank')) {
            this.addBotMessage("Great! I'm glad I could help solve your computer problem. 🎉\n\nIs there anything else I can help you with today?");
        } else if (lowercaseChoice.includes('need more help')) {
            this.addBotMessage("No problem! Let's try a different approach. Can you describe the specific symptoms you're seeing? For example:\n\n• What error messages appear?\n• When does the problem occur?\n• What sounds does your computer make?\n• How does the problem affect your work?");
        } else if (lowercaseChoice.includes('persists') || lowercaseChoice.includes('no')) {
            this.addBotMessage("I understand the problem is still occurring. Let's try some advanced solutions:\n\n1. **Create a system restore point** first for safety\n2. **Boot into Safe Mode** to isolate the issue\n3. **Check Windows Event Viewer** for error logs\n4. **Run hardware diagnostics** from your computer manufacturer\n\nIf these don't work, you may need professional technical support. Would you like me to explain any of these steps in detail?");
        } else {
            this.addBotMessage("Thank you for the information. Let me provide some general troubleshooting steps that often resolve computer issues:\n\n• **Restart your computer** (solves 60% of problems)\n• **Check all cable connections**\n• **Update your drivers and Windows**\n• **Scan for malware**\n• **Free up disk space**\n\nWould any of these be helpful to try first?");
        }
    }

    provideSolution(problem) {
        let solutionHtml = `## ${problem.title} - Solutions\n\nHere are the step-by-step solutions:\n\n`;
        
        const stepsHtml = problem.solutions.map(solution => {
            let stepHtml = `<div class="solution-step">
                <span class="step-number">Step ${solution.step}:</span>
                ${solution.instruction}`;
            
            if (solution.safety) {
                stepHtml += `<div class="safety-warning">${solution.safety}</div>`;
            }
            
            stepHtml += '</div>';
            return stepHtml;
        }).join('');

        const preventionHtml = `<div class="prevention-tips">
            <h4>🛡️ Prevention Tips:</h4>
            <p>${problem.prevention}</p>
        </div>`;

        this.addBotMessage(solutionHtml, stepsHtml + preventionHtml);
        
        // Add follow-up options
        setTimeout(() => {
            this.addBotMessage("Did this help solve your problem?");
            this.addDiagnosticChoices([
                "Yes, problem solved! Thank you!",
                "Partially helped, need more assistance",
                "No, the problem persists",
                "Start new diagnosis for different problem"
            ]);
        }, 2000);
    }

    addUserMessage(text) {
        const messageHtml = `
            <div class="message message--user">
                <div class="message-avatar message-avatar--user">👤</div>
                <div class="message-content message-content--user">${text}</div>
            </div>
        `;
        this.chatMessages.insertAdjacentHTML('beforeend', messageHtml);
        this.scrollToBottom();
    }

    addBotMessage(text, htmlContent = null) {
        const content = htmlContent ? (this.formatBotMessage(text) + htmlContent) : this.formatBotMessage(text);
        const messageHtml = `
            <div class="message message--bot">
                <div class="message-avatar message-avatar--bot">🤖</div>
                <div class="message-content message-content--bot">${content}</div>
            </div>
        `;
        this.chatMessages.insertAdjacentHTML('beforeend', messageHtml);
        this.scrollToBottom();
    }

    formatBotMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>')
            .replace(/^## (.*$)/gm, '<h3>$1</h3>')
            .replace(/^• (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*?<\/li>\s*)+/gs, '<ul>$&</ul>');
    }

    showTyping() {
        this.typingIndicator.classList.remove('hidden');
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.classList.add('hidden');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
}

// Initialize the bot when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.pcBot = new PCCareBot();
});