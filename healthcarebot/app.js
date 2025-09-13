// Healthcare Bot Application Logic

// Application Data
const healthData = {
  "physicalSymptoms": {
    "headache": {
      "remedies": [
        {
          "name": "Ginger Tea",
          "ingredients": ["Fresh ginger root (1 inch)", "Hot water (1 cup)", "Honey (optional)"],
          "preparation": "Slice fresh ginger, steep in boiling water for 10-15 minutes, add honey if desired",
          "usage": "Drink warm, 2-3 times daily",
          "benefits": "Anti-inflammatory properties help reduce headache pain",
          "safety": "Generally safe, avoid if on blood thinners"
        },
        {
          "name": "Peppermint Oil",
          "ingredients": ["Peppermint oil (2-3 drops)", "Carrier oil (1 tsp)"],
          "preparation": "Mix peppermint oil with carrier oil",
          "usage": "Massage gently on temples and forehead",
          "benefits": "Menthol provides cooling effect and pain relief",
          "safety": "Test on small skin area first, avoid near eyes"
        },
        {
          "name": "Hydration",
          "ingredients": ["Water", "Electrolytes"],
          "preparation": "Plain water or add pinch of salt and lemon",
          "usage": "Drink 8-10 glasses throughout day",
          "benefits": "Dehydration is common cause of headaches",
          "safety": "Safe for everyone unless fluid restricted by doctor"
        }
      ]
    },
    "fever": {
      "remedies": [
        {
          "name": "Cool Compress",
          "ingredients": ["Cold water", "Clean cloth"],
          "preparation": "Soak cloth in cold water, wring out excess",
          "usage": "Apply to forehead, wrists for 10-15 minutes",
          "benefits": "Helps cool body temperature",
          "safety": "Safe for all ages, change cloth frequently"
        },
        {
          "name": "Ginger Garlic Tea",
          "ingredients": ["Fresh ginger (1 inch)", "Garlic (2 cloves)", "Hot water (1 cup)"],
          "preparation": "Boil ginger and crushed garlic in water for 10 minutes",
          "usage": "Drink warm, 2-3 times daily",
          "benefits": "Anti-viral and anti-inflammatory properties",
          "safety": "May interact with blood thinners"
        },
        {
          "name": "Rest and Fluids",
          "ingredients": ["Water", "Herbal teas", "Clear broths"],
          "preparation": "Keep fluids at room temperature or slightly warm",
          "usage": "Drink frequently, rest in cool room",
          "benefits": "Prevents dehydration, aids recovery",
          "safety": "Essential for all fever cases"
        }
      ]
    },
    "stomach_ache": {
      "remedies": [
        {
          "name": "Ginger Tea",
          "ingredients": ["Fresh ginger (1 inch)", "Hot water (1 cup)"],
          "preparation": "Grate ginger, steep in hot water 10 minutes",
          "usage": "Sip slowly when warm",
          "benefits": "Reduces nausea and inflammation",
          "safety": "Safe for most people, may affect blood clotting"
        },
        {
          "name": "Peppermint Tea",
          "ingredients": ["Dried peppermint leaves (1 tsp)", "Hot water (1 cup)"],
          "preparation": "Steep peppermint in hot water 5-10 minutes",
          "usage": "Drink warm, 2-3 times daily",
          "benefits": "Antispasmodic properties calm stomach muscles",
          "safety": "Avoid if have acid reflux"
        },
        {
          "name": "BRAT Diet",
          "ingredients": ["Bananas", "Rice", "Applesauce", "Toast"],
          "preparation": "Prepare foods plainly without added fats",
          "usage": "Eat small portions throughout day",
          "benefits": "Easy to digest, helps firm stool",
          "safety": "Safe for most digestive issues"
        }
      ]
    },
    "sore_throat": {
      "remedies": [
        {
          "name": "Salt Water Gargle",
          "ingredients": ["Salt (1/2 tsp)", "Warm water (1 cup)"],
          "preparation": "Dissolve salt completely in warm water",
          "usage": "Gargle 30 seconds, repeat 3-4 times daily",
          "benefits": "Reduces inflammation and kills bacteria",
          "safety": "Safe for ages 6+, don't swallow"
        },
        {
          "name": "Honey Lemon Tea",
          "ingredients": ["Honey (1 tbsp)", "Lemon juice (1 tbsp)", "Warm water (1 cup)"],
          "preparation": "Mix honey and lemon in warm water",
          "usage": "Sip slowly, 3-4 times daily",
          "benefits": "Honey has antibacterial properties, lemon adds vitamin C",
          "safety": "No honey for children under 1 year"
        }
      ]
    },
    "cough": {
      "remedies": [
        {
          "name": "Honey",
          "ingredients": ["Pure honey (1-2 tsp)"],
          "preparation": "Use raw, unprocessed honey",
          "usage": "Take directly or mix with warm water",
          "benefits": "Coats throat, reduces cough reflex",
          "safety": "Not for children under 1 year"
        },
        {
          "name": "Steam Inhalation",
          "ingredients": ["Hot water", "Large bowl", "Towel"],
          "preparation": "Pour hot water in bowl, lean over with towel over head",
          "usage": "Inhale steam 10-15 minutes, 2-3 times daily",
          "benefits": "Loosens mucus, soothes airways",
          "safety": "Keep safe distance to avoid burns"
        }
      ]
    }
  },
  "mentalHealthSymptoms": {
    "anxiety": {
      "remedies": [
        {
          "name": "Chamomile Tea",
          "ingredients": ["Dried chamomile flowers (1 tsp)", "Hot water (1 cup)"],
          "preparation": "Steep chamomile in hot water 5-10 minutes",
          "usage": "Drink 1-2 cups daily, especially evening",
          "benefits": "Contains apigenin which binds to brain receptors reducing anxiety",
          "safety": "May interact with blood thinners, avoid if allergic to ragweed"
        },
        {
          "name": "Lavender Aromatherapy",
          "ingredients": ["Lavender essential oil (3-4 drops)", "Diffuser or tissue"],
          "preparation": "Add oil to diffuser or drop on tissue",
          "usage": "Inhale scent for 10-15 minutes as needed",
          "benefits": "Promotes relaxation and reduces stress hormones",
          "safety": "Don't apply undiluted to skin, keep away from pets"
        },
        {
          "name": "Deep Breathing Exercise",
          "ingredients": ["Quiet space", "Comfortable position"],
          "preparation": "Sit or lie comfortably in quiet area",
          "usage": "Breathe in 4 counts, hold 4, exhale 6 counts. Repeat 10 times",
          "benefits": "Activates parasympathetic nervous system, reduces anxiety",
          "safety": "Safe for everyone, stop if feeling dizzy"
        }
      ]
    },
    "mild_depression": {
      "remedies": [
        {
          "name": "St. John's Wort Tea",
          "ingredients": ["Dried St. John's Wort (1 tsp)", "Hot water (1 cup)"],
          "preparation": "Steep herb in hot water 10 minutes",
          "usage": "1-2 cups daily for several weeks",
          "benefits": "May help improve mood and reduce mild depression symptoms",
          "safety": "Consult doctor first, interacts with many medications, increases sun sensitivity"
        },
        {
          "name": "Exercise Routine",
          "ingredients": ["Comfortable clothes", "Safe environment"],
          "preparation": "Choose activities you enjoy - walking, dancing, yoga",
          "usage": "30 minutes daily, 5 days per week",
          "benefits": "Releases endorphins, improves mood naturally",
          "safety": "Start slowly, consult doctor if health conditions exist"
        },
        {
          "name": "Omega-3 Rich Foods",
          "ingredients": ["Fatty fish", "Walnuts", "Flax seeds", "Chia seeds"],
          "preparation": "Include in regular meals",
          "usage": "2-3 servings per week",
          "benefits": "Support brain health and mood regulation",
          "safety": "Generally safe, check for fish allergies"
        }
      ]
    },
    "stress": {
      "remedies": [
        {
          "name": "Ashwagandha Tea",
          "ingredients": ["Ashwagandha powder (1/2 tsp)", "Warm milk or water (1 cup)"],
          "preparation": "Mix powder in warm liquid, stir well",
          "usage": "Once daily, preferably evening",
          "benefits": "Adaptogen that helps body manage stress, may lower cortisol",
          "safety": "Avoid if pregnant, breastfeeding, or on immunosuppressants"
        },
        {
          "name": "Meditation Practice",
          "ingredients": ["Quiet space", "Timer"],
          "preparation": "Find comfortable seated position",
          "usage": "5-20 minutes daily, focus on breath",
          "benefits": "Reduces stress hormones, improves emotional regulation",
          "safety": "Safe for everyone, start with short sessions"
        }
      ]
    },
    "insomnia": {
      "remedies": [
        {
          "name": "Valerian Root Tea",
          "ingredients": ["Dried valerian root (1 tsp)", "Hot water (1 cup)"],
          "preparation": "Steep root in hot water 15 minutes",
          "usage": "1 cup 30 minutes before bedtime",
          "benefits": "Natural sedative properties, improves sleep quality",
          "safety": "May interact with sleep medications, start with small amounts"
        },
        {
          "name": "Sleep Hygiene Routine",
          "ingredients": ["Dark room", "Cool temperature", "Comfortable bedding"],
          "preparation": "Create consistent bedtime environment",
          "usage": "Same routine nightly, avoid screens 1 hour before bed",
          "benefits": "Trains body's natural sleep-wake cycle",
          "safety": "Safe for everyone, crucial for good sleep"
        }
      ]
    }
  },
  "emergencySymptoms": [
    "chest pain",
    "difficulty breathing",
    "severe headache with vision changes",
    "high fever over 103°F",
    "severe abdominal pain",
    "thoughts of self-harm",
    "difficulty speaking or walking",
    "severe allergic reaction"
  ],
  "safetyDisclaimer": "IMPORTANT: These home remedies are for mild symptoms only. Always consult a healthcare professional for persistent, severe, or worsening symptoms. Seek immediate medical attention for emergencies. Do not use these remedies as a substitute for professional medical advice, diagnosis, or treatment.",
  "conversationStarters": [
    "What symptoms are you experiencing today?",
    "Are you dealing with physical discomfort or emotional concerns?",
    "How long have you been experiencing these symptoms?",
    "Have you tried any remedies before?",
    "On a scale of 1-10, how would you rate your discomfort?"
  ]
};

// Application State
let currentSession = {
  messages: [],
  symptoms: [],
  currentCategory: null,
  conversationActive: false
};

// DOM Elements
let sections = {};

// Initialize DOM elements after page load
function initializeDOMElements() {
  sections = {
    welcome: document.getElementById('welcomeSection'),
    categories: document.getElementById('symptomCategories'),
    selection: document.getElementById('symptomSelection'),
    chat: document.getElementById('chatSection'),
    remedy: document.getElementById('remedySection')
  };
}

// Navigation Functions
function showSection(sectionName) {
  console.log('Showing section:', sectionName);
  Object.values(sections).forEach(section => {
    if (section) section.classList.add('hidden');
  });
  if (sections[sectionName]) {
    sections[sectionName].classList.remove('hidden');
  }
}

function showWelcome() {
  console.log('Showing welcome');
  showSection('welcome');
  resetSession();
}

function showSymptomCategories() {
  console.log('Showing symptom categories');
  showSection('categories');
}

function showSymptomSelection(category) {
  console.log('Showing symptom selection for:', category);
  const categoryTitle = document.getElementById('categoryTitle');
  const symptomList = document.getElementById('symptomList');
  
  if (!categoryTitle || !symptomList) {
    console.error('Category elements not found');
    return;
  }
  
  currentSession.currentCategory = category;
  
  if (category === 'physical') {
    categoryTitle.textContent = 'Select Physical Symptoms';
    populateSymptoms(Object.keys(healthData.physicalSymptoms), symptomList);
  } else if (category === 'mental') {
    categoryTitle.textContent = 'Select Mental Health Symptoms';
    populateSymptoms(Object.keys(healthData.mentalHealthSymptoms), symptomList);
  }
  
  showSection('selection');
}

function populateSymptoms(symptoms, container) {
  console.log('Populating symptoms:', symptoms);
  container.innerHTML = '';
  
  symptoms.forEach(symptom => {
    const button = document.createElement('button');
    button.className = 'symptom-btn';
    button.textContent = formatSymptomName(symptom);
    button.onclick = () => selectSymptom(symptom, button);
    container.appendChild(button);
  });
  
  // Add continue button
  const continueBtn = document.createElement('button');
  continueBtn.className = 'btn btn--primary btn--full-width';
  continueBtn.textContent = 'Get Remedies';
  continueBtn.style.marginTop = '20px';
  continueBtn.onclick = showSelectedRemedies;
  container.appendChild(continueBtn);
}

function selectSymptom(symptom, button) {
  console.log('Selecting symptom:', symptom);
  if (currentSession.symptoms.includes(symptom)) {
    currentSession.symptoms = currentSession.symptoms.filter(s => s !== symptom);
    button.classList.remove('selected');
  } else {
    currentSession.symptoms.push(symptom);
    button.classList.add('selected');
  }
}

function selectCategory(category) {
  console.log('Category selected:', category);
  showSymptomSelection(category);
}

// Chat Functions
function startChat() {
  console.log('Starting chat');
  showSection('chat');
  currentSession.conversationActive = true;
  
  if (currentSession.messages.length === 0) {
    initializeChat();
  }
}

function initializeChat() {
  console.log('Initializing chat');
  addBotMessage("Hello! I'm HealthBot, your natural remedy assistant. I'm here to help you find home remedies for mild symptoms. Please remember that these suggestions are not a substitute for professional medical advice.");
  
  setTimeout(() => {
    const randomStarter = healthData.conversationStarters[Math.floor(Math.random() * healthData.conversationStarters.length)];
    addBotMessage(randomStarter);
  }, 1500);
}

function addMessage(content, isUser = false, isEmergency = false) {
  const messagesContainer = document.getElementById('chatMessages');
  if (!messagesContainer) {
    console.error('Chat messages container not found');
    return;
  }
  
  const messageDiv = document.createElement('div');
  
  if (isEmergency) {
    messageDiv.className = 'message emergency';
  } else {
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
  }
  
  messageDiv.innerHTML = content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  currentSession.messages.push({
    content,
    isUser,
    isEmergency,
    timestamp: new Date()
  });
}

function addBotMessage(content) {
  addMessage(content, false);
}

function addUserMessage(content) {
  addMessage(content, true);
}

function addEmergencyMessage(content) {
  addMessage(content, false, true);
  showEmergencyModal();
}

function showTypingIndicator() {
  const messagesContainer = document.getElementById('chatMessages');
  if (!messagesContainer) return;
  
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = `
    <span>HealthBot is typing</span>
    <div class="typing-dots">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function sendMessage() {
  console.log('Sending message');
  const input = document.getElementById('chatInput');
  if (!input) {
    console.error('Chat input not found');
    return;
  }
  
  const message = input.value.trim();
  
  if (!message) return;
  
  addUserMessage(message);
  input.value = '';
  
  // Check for emergency symptoms
  if (checkEmergencySymptoms(message)) {
    addEmergencyMessage("⚠️ The symptoms you've described may require immediate medical attention. Please contact emergency services or visit the nearest emergency room.");
    return;
  }
  
  // Process message and generate response
  setTimeout(() => {
    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      processUserMessage(message);
    }, 1500);
  }, 500);
}

function sendQuickMessage(message) {
  console.log('Sending quick message:', message);
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = message;
    sendMessage();
  }
}

function processUserMessage(message) {
  const lowerMessage = message.toLowerCase();
  
  // Simple keyword matching for symptoms
  const detectedSymptoms = detectSymptoms(lowerMessage);
  
  if (detectedSymptoms.length > 0) {
    currentSession.symptoms = [...new Set([...currentSession.symptoms, ...detectedSymptoms])];
    provideRemedyRecommendations(detectedSymptoms);
  } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    addBotMessage("You're welcome! Remember to consult with a healthcare professional if symptoms persist or worsen. Is there anything else I can help you with?");
  } else if (lowerMessage.includes('how are you') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    addBotMessage("Hello! I'm doing well and ready to help you with natural remedies. What symptoms are you experiencing today?");
  } else {
    addBotMessage("I understand you're looking for help. Could you please describe your specific symptoms? For example, you might say 'I have a headache' or 'I feel anxious'.");
  }
}

function detectSymptoms(message) {
  const symptoms = [];
  const symptomKeywords = {
    'headache': ['headache', 'head pain', 'migraine'],
    'fever': ['fever', 'high temperature', 'hot', 'feverish'],
    'stomach_ache': ['stomach ache', 'stomach pain', 'belly pain', 'nausea', 'upset stomach'],
    'sore_throat': ['sore throat', 'throat pain', 'throat hurt'],
    'cough': ['cough', 'coughing'],
    'anxiety': ['anxious', 'anxiety', 'worried', 'panic', 'nervous'],
    'mild_depression': ['depressed', 'depression', 'sad', 'down', 'hopeless'],
    'stress': ['stressed', 'stress', 'overwhelmed'],
    'insomnia': ['insomnia', 'cannot sleep', 'trouble sleeping', 'sleepless']
  };
  
  for (const [symptom, keywords] of Object.entries(symptomKeywords)) {
    if (keywords.some(keyword => message.includes(keyword))) {
      symptoms.push(symptom);
    }
  }
  
  return symptoms;
}

function checkEmergencySymptoms(message) {
  const lowerMessage = message.toLowerCase();
  return healthData.emergencySymptoms.some(emergency => 
    lowerMessage.includes(emergency.toLowerCase())
  );
}

function provideRemedyRecommendations(symptoms) {
  if (symptoms.length === 0) return;
  
  const remedyText = generateRemedyText(symptoms[0]);
  addBotMessage(remedyText);
  
  setTimeout(() => {
    addBotMessage("Would you like detailed instructions for any of these remedies, or do you have other symptoms to discuss?");
  }, 2000);
}

function generateRemedyText(symptom) {
  const isPhysical = healthData.physicalSymptoms[symptom];
  const isMental = healthData.mentalHealthSymptoms[symptom];
  
  const remedies = isPhysical ? healthData.physicalSymptoms[symptom].remedies : 
                   isMental ? healthData.mentalHealthSymptoms[symptom].remedies : [];
  
  if (remedies.length === 0) return "I'm sorry, I don't have specific remedies for that symptom.";
  
  let text = `For ${formatSymptomName(symptom)}, I recommend these natural remedies:\n\n`;
  
  remedies.forEach((remedy, index) => {
    text += `${index + 1}. **${remedy.name}**\n`;
    text += `• ${remedy.benefits}\n`;
    text += `• How to use: ${remedy.usage}\n\n`;
  });
  
  text += "⚠️ **Safety Note**: " + healthData.safetyDisclaimer;
  
  return text;
}

// Remedy Display Functions
function showSelectedRemedies() {
  console.log('Showing selected remedies for:', currentSession.symptoms);
  if (currentSession.symptoms.length === 0) {
    alert('Please select at least one symptom');
    return;
  }
  
  displayRemedies(currentSession.symptoms);
  showSection('remedy');
}

function displayRemedies(symptoms) {
  const remedyContent = document.getElementById('remedyContent');
  if (!remedyContent) {
    console.error('Remedy content container not found');
    return;
  }
  
  remedyContent.innerHTML = '';
  
  symptoms.forEach(symptom => {
    const isPhysical = healthData.physicalSymptoms[symptom];
    const isMental = healthData.mentalHealthSymptoms[symptom];
    
    const remedies = isPhysical ? healthData.physicalSymptoms[symptom].remedies : 
                     isMental ? healthData.mentalHealthSymptoms[symptom].remedies : [];
    
    if (remedies.length > 0) {
      const symptomSection = createSymptomRemedySection(symptom, remedies);
      remedyContent.appendChild(symptomSection);
    }
  });
}

function createSymptomRemedySection(symptom, remedies) {
  const section = document.createElement('div');
  section.innerHTML = `
    <h2 style="margin-bottom: 20px; color: var(--color-text);">
      Natural Remedies for ${formatSymptomName(symptom)}
    </h2>
  `;
  
  remedies.forEach(remedy => {
    const remedyCard = createRemedyCard(remedy);
    section.appendChild(remedyCard);
  });
  
  return section;
}

function createRemedyCard(remedy) {
  const card = document.createElement('div');
  card.className = 'remedy-card';
  
  card.innerHTML = `
    <div class="remedy-header">
      <h3 class="remedy-title">${remedy.name}</h3>
    </div>
    <div class="remedy-body">
      <div class="remedy-section-item">
        <div class="remedy-section-title">🌿 Ingredients:</div>
        <div class="remedy-ingredients">
          <ul>
            ${remedy.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <div class="remedy-section-item">
        <div class="remedy-section-title">📋 Preparation:</div>
        <p>${remedy.preparation}</p>
      </div>
      
      <div class="remedy-section-item">
        <div class="remedy-section-title">💊 Usage:</div>
        <p>${remedy.usage}</p>
      </div>
      
      <div class="remedy-section-item">
        <div class="remedy-section-title">✨ Benefits:</div>
        <p>${remedy.benefits}</p>
      </div>
      
      <div class="remedy-section-item">
        <div class="remedy-section-title">⚠️ Safety Information:</div>
        <div class="remedy-safety">
          ${remedy.safety}
        </div>
      </div>
    </div>
  `;
  
  return card;
}

// Emergency Modal Functions
function showEmergencyModal() {
  console.log('Showing emergency modal');
  const modal = document.getElementById('emergencyModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeEmergencyModal() {
  console.log('Closing emergency modal');
  const modal = document.getElementById('emergencyModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Utility Functions
function formatSymptomName(symptom) {
  return symptom.replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
}

function resetSession() {
  console.log('Resetting session');
  currentSession = {
    messages: [],
    symptoms: [],
    currentCategory: null,
    conversationActive: false
  };
  
  const chatMessages = document.getElementById('chatMessages');
  if (chatMessages) {
    chatMessages.innerHTML = '';
  }
}

// Global function attachments for HTML onclick handlers
window.startChat = startChat;
window.showSymptomCategories = showSymptomCategories;
window.showWelcome = showWelcome;
window.selectCategory = selectCategory;
window.sendMessage = sendMessage;
window.sendQuickMessage = sendQuickMessage;
window.showSelectedRemedies = showSelectedRemedies;
window.closeEmergencyModal = closeEmergencyModal;

// Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Initializing HealthBot');
  
  // Initialize DOM elements
  initializeDOMElements();
  
  // Chat input enter key
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
  
  // Close modal on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeEmergencyModal();
    }
  });
  
  // Initialize the application
  showWelcome();
  console.log('HealthBot initialized successfully');
});