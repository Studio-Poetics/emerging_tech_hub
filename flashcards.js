// Flash Cards Data - All 52 cards from the three parts
const flashcardsData = [
    // Part 1 - Fundamentals (29 cards)
    {
        id: 1,
        category: "fundamentals",
        title: "What AI Is (and Isn't)",
        meta: "You're not talking to a brain, you're talking to patterns.",
        core: "Core Idea: AI is pattern recognition, not human thought.",
        explanation: "AI systems analyze large amounts of data and find relationships. They don't understand meaning or have intentions.",
        example: "Example: A chatbot replying to you is not reasoning; it's rearranging sentences it has learned from.",
        type: "concept"
    },
    {
        id: 2,
        category: "fundamentals",
        title: "Types of AI – Rules, ML, Generative",
        meta: "Not all \"AI\" is the same beast. Some follow recipes, others learn, and some even invent.",
        core: "Core Idea: AI comes in three broad forms.",
        explanation: "Rules-based (if–then), Machine Learning (patterns from examples), Generative AI (creates new content).",
        example: "Example: ATM (rules), spam filter (ML), ChatGPT (generative).",
        type: "concept"
    },
    {
        id: 3,
        category: "fundamentals",
        title: "Data as Fuel",
        meta: "An AI without data is an engine without petrol.",
        core: "Core Idea: Data powers all AI.",
        explanation: "The scope, size, and quality of data decide what an AI can do. No data, no intelligence.",
        example: "Example: A translation AI trained only on English–French texts won't help with Hindi.",
        type: "concept"
    },
    {
        id: 4,
        category: "fundamentals",
        title: "Data Quality – Garbage In, Garbage Out",
        meta: "If you study from torn, messy notes, your answers will be shaky. AI works the same way.",
        core: "Core Idea: Poor data leads to poor AI.",
        explanation: "Messy, incomplete, or misleading training data produces unreliable results. Data must be cleaned and validated.",
        example: "Example: If a dataset labels cats as dogs, the AI will confidently misidentify animals.",
        type: "concept"
    },
    {
        id: 5,
        category: "fundamentals",
        title: "Bias & Representation",
        meta: "An AI only knows the world it has been shown. If that world is skewed, so is the AI.",
        core: "Core Idea: AI reflects the biases of its data.",
        explanation: "If some groups or perspectives are underrepresented, AI outcomes can unfairly favor others.",
        example: "Example: A hiring AI trained mostly on male résumés may recommend men more often than women.",
        type: "concept"
    },
    {
        id: 6,
        category: "fundamentals",
        title: "Data Privacy & Consent",
        meta: "Your personal data is like your diary — would you want someone reading it without asking?",
        core: "Core Idea: AI must respect privacy.",
        explanation: "Collecting or using personal data without consent erodes trust and risks harm. An ethical AI design asks permission, anonymizes, and secures.",
        example: "Example: A health app should ask before sharing your step count or heart-rate with other companies.",
        type: "concept"
    },
    {
        id: 7,
        category: "fundamentals",
        title: "Models & Learning – Training vs Inference",
        meta: "First you learn from examples, then you apply it to the test. AI is no different.",
        core: "Core Idea: AI has two phases: learning and using.",
        explanation: "Training: Feeding data so the model discovers patterns. Inference: Using the trained model to make predictions on new data.",
        example: "Example: Train an AI on thousands of handwriting samples; it can then recognize your handwritten note.",
        type: "concept"
    },
    {
        id: 8,
        category: "fundamentals",
        title: "Human vs Machine Strengths",
        meta: "Machines don't get bored. Humans don't get replaced by copy–paste.",
        core: "Core Idea: People and AI are strong at different things.",
        explanation: "Machines bring speed, scale, and consistency. Humans bring empathy, judgment, and creativity. Together, they amplify each other.",
        example: "Example: AI can scan 10,000 x-rays in minutes; a doctor interprets the results in context.",
        type: "concept"
    },
    {
        id: 9,
        category: "fundamentals",
        title: "Automation vs Augmentation",
        meta: "Do you want AI to take over, or just lend you a hand?",
        core: "Core Idea: AI can replace tasks or assist humans.",
        explanation: "Automation: AI handles the task completely. Augmentation: AI supports the human, who remains in charge.",
        example: "Example: Automation: AI sorts invoices automatically. Augmentation: AI suggests a playlist you can still edit.",
        type: "concept"
    },
    {
        id: 10,
        category: "fundamentals",
        title: "Uncertainty & Probabilities",
        meta: "AI never says \"yes.\" It whispers: \"I'm 82% sure.\"",
        core: "Core Idea: AI works in probabilities, not certainties.",
        explanation: "Every AI prediction has a confidence level. Knowing this helps us calibrate trust without blind reliance.",
        example: "Example: A weather app saying \"70% chance of rain\" isn't lying if the sun shines — it told you rain was likely, not guaranteed.",
        type: "concept"
    },
    {
        id: 11,
        category: "fundamentals",
        title: "Model Drift & Continuous Learning",
        meta: "The world changes, but old models don't.",
        core: "Core Idea: AI becomes stale without updates.",
        explanation: "Models trained on past data lose accuracy as patterns shift. Monitoring and retraining keeps them useful.",
        example: "Example: A fraud detection AI trained on last year's scams may miss today's new tricks unless retrained.",
        type: "concept"
    },
    {
        id: 12,
        category: "fundamentals",
        title: "User Needs First",
        meta: "AI should never be a solution in search of a problem.",
        core: "Core Idea: Start with people's needs, not the technology.",
        explanation: "AI makes sense only if it solves a real task or pain point. Designing for \"AI's sake\" leads to gimmicks, not value.",
        example: "Example: A language-learning app that uses AI to give personalized feedback solves a real struggle — generic \"AI features\" won't.",
        type: "concept"
    },
    {
        id: 13,
        category: "fundamentals",
        title: "Mental Models of AI",
        meta: "Everyone carries a story of how they think AI works. Often, that story is wrong.",
        core: "Core Idea: People's assumptions shape how they use AI.",
        explanation: "Users build mental models to predict what a system can do. Misaligned expectations create confusion and frustration.",
        example: "Example: A user might believe a smart speaker \"understands\" them like a person, when in fact it only matches keywords.",
        type: "concept"
    },
    {
        id: 14,
        category: "fundamentals",
        title: "Setting Expectations",
        meta: "Overpromise magic, and disappointment is guaranteed.",
        core: "Core Idea: Good design sets realistic boundaries.",
        explanation: "Explaining what an AI can and can't do prevents misuse and builds trust. Underpromise, then delight — don't mislead.",
        example: "Example: A travel app saying \"AI suggests routes\" is better than claiming \"AI knows the best way for you,\" which creates false hope.",
        type: "concept"
    },
    {
        id: 15,
        category: "fundamentals",
        title: "Trust in AI",
        meta: "Trust takes time to earn, and seconds to lose.",
        core: "Core Idea: People must know when to rely on AI and when not to.",
        explanation: "Users calibrate trust by comparing outcomes to expectations. Consistency, transparency, and honest uncertainty build trust.",
        example: "Example: A medical tool showing confidence levels (\"85% sure\") helps a doctor decide whether to act on it or double-check.",
        type: "concept"
    },
    {
        id: 16,
        category: "fundamentals",
        title: "Explainability",
        meta: "A guess feels less mysterious when you know the \"why.\"",
        core: "Core Idea: Show users how the AI reached its conclusion.",
        explanation: "Explanations (highlighted features, reasoning steps, confidence scores) help users understand and make better decisions.",
        example: "Example: An AI that flags fraudulent transactions should show which patterns (location, time, spending spike) triggered the alert.",
        type: "concept"
    },
    {
        id: 17,
        category: "fundamentals",
        title: "Errors are Inevitable",
        meta: "Even the smartest AI gets it wrong sometimes.",
        core: "Core Idea: Failure isn't optional — design for it.",
        explanation: "Mistakes happen due to data gaps, noise, or context mismatch. Systems must plan for errors instead of pretending they don't exist.",
        example: "Example: A voice assistant misunderstanding \"call Anna\" for \"call Amma\" should allow quick correction, not leave the user stuck.",
        type: "concept"
    },
    {
        id: 18,
        category: "fundamentals",
        title: "Designing Graceful Failures",
        meta: "A clumsy failure breaks trust; a graceful one invites forgiveness.",
        core: "Core Idea: When AI errs, recovery should be easy and human-friendly.",
        explanation: "Provide fallback options, undo buttons, or clarifications. Failures handled with grace reduce frustration.",
        example: "Example: A recommender system saying \"Not what you wanted? Try again with filters\" feels better than silent wrong suggestions.",
        type: "concept"
    },
    {
        id: 19,
        category: "fundamentals",
        title: "Feedback Loops",
        meta: "Without feedback, AI stays stuck in yesterday's mistakes.",
        core: "Core Idea: Feedback improves both AI and user experience.",
        explanation: "Systems learn from explicit signals (ratings, corrections) and implicit signals (skips, time spent). Both refine the model.",
        example: "Example: A music app uses thumbs-up for clear feedback and skipped songs for subtle signals about taste.",
        type: "concept"
    },
    {
        id: 20,
        category: "fundamentals",
        title: "User Controls",
        meta: "A helpful tool should never feel like a boss.",
        core: "Core Idea: Give people levers to guide the AI.",
        explanation: "Controls like opt-outs, sensitivity sliders, and modes give users agency and reduce frustration. People trust systems they can steer.",
        example: "Example: A translation app offering a \"literal vs. natural\" slider lets users pick what works best for their task.",
        type: "concept"
    },
    {
        id: 21,
        category: "fundamentals",
        title: "Transparency – Glass Box vs Black Box",
        meta: "People trust what they can see through, not what hides behind a curtain.",
        core: "Core Idea: Transparency builds confidence.",
        explanation: "A \"glass box\" AI reveals its reasoning and limits; a \"black box\" hides them. The more visible the process, the stronger the trust.",
        example: "Example: A loan-approval AI that explains \"Your application was denied due to missing income proof\" feels fairer than a silent rejection.",
        type: "concept"
    },
    {
        id: 22,
        category: "fundamentals",
        title: "Fairness",
        meta: "If the training ground is tilted, the game will always be unfair.",
        core: "Core Idea: AI should not disadvantage certain groups.",
        explanation: "Biased data or biased design choices can amplify social inequalities. Fair AI requires checking who benefits, who is left out, and who is harmed.",
        example: "Example: A loan AI trained mostly on urban applicants may wrongly reject rural ones. Balancing the dataset makes decisions fairer.",
        type: "concept"
    },
    {
        id: 23,
        category: "fundamentals",
        title: "Inclusivity & Accessibility",
        meta: "If AI works only for some, it works for no one.",
        core: "Core Idea: Design AI for diverse users.",
        explanation: "Accessibility means considering different ages, abilities, cultures, and contexts. Inclusive AI doesn't assume a single \"normal\" user.",
        example: "Example: A voice assistant should understand multiple accents, not just one region's standard.",
        type: "concept"
    },
    {
        id: 24,
        category: "fundamentals",
        title: "Accountability",
        meta: "When AI makes a decision, someone must still answer for it.",
        core: "Core Idea: Responsibility cannot be automated.",
        explanation: "AI may execute tasks, but humans remain accountable for outcomes. Without accountability, errors can cause harm without recourse.",
        example: "Example: If a self-driving car crashes, the manufacturer and operators, not \"the AI,\" are responsible.",
        type: "concept"
    },
    {
        id: 25,
        category: "fundamentals",
        title: "Human-in-the-Loop Oversight",
        meta: "AI may be fast, but human judgment is the brake pedal.",
        core: "Core Idea: Keep humans in control of important decisions.",
        explanation: "Oversight ensures that AI suggestions are reviewed and corrected. Critical tasks require human checkpoints to avoid blind automation.",
        example: "Example: An AI medical scanner can highlight suspicious cells, but a doctor should confirm the diagnosis before treatment.",
        type: "concept"
    },
    {
        id: 26,
        category: "fundamentals",
        title: "Long-term Impact – Jobs, Ecology, Society",
        meta: "Every AI is not just a product; it's a ripple in society.",
        core: "Core Idea: Think beyond the launch.",
        explanation: "AI influences jobs, behavior, and even the planet's resources. Responsible design asks: what happens if this scales? Who wins, who loses?",
        example: "Example: A delivery drone service may reduce traffic but increase noise and surveillance — trade-offs must be weighed.",
        type: "concept"
    },
    {
        id: 27,
        category: "fundamentals",
        title: "People + AI",
        meta: "AI is most powerful not when it replaces us, but when it works with us.",
        core: "Core Idea: Collaboration is the real promise of AI.",
        explanation: "People bring creativity, judgment, and empathy. AI brings speed, memory, and scale. Together they extend each other's reach.",
        example: "Example: A writer uses AI to brainstorm draft ideas, then refines them with personal style and emotion.",
        type: "concept"
    },
    {
        id: 28,
        category: "fundamentals",
        title: "Places + AI",
        meta: "Every space changes when AI enters it.",
        core: "Core Idea: Context shapes how AI is used and experienced.",
        explanation: "Homes, schools, hospitals, and cities all use AI differently. Good design considers the social, cultural, and physical setting.",
        example: "Example: In classrooms, AI might personalize lessons. In public spaces, it might manage traffic — each with different challenges and risks.",
        type: "concept"
    },
    {
        id: 29,
        category: "fundamentals",
        title: "Machines + AI",
        meta: "When machines learn, they stop being just tools and start becoming teammates.",
        core: "Core Idea: AI enables machines to act with autonomy.",
        explanation: "Robots, vehicles, and IoT devices gain new capabilities through AI. This raises both opportunities and questions about trust and control.",
        example: "Example: A robot vacuum that learns your house layout saves time, but also collects a map of your private space.",
        type: "concept"
    },

    // Part 2 - Field Kit (16 method cards)
    {
        id: 30,
        category: "field-kit",
        title: "User Journey Mapping – Steps",
        meta: "When to Use: At the start of a project, to understand the current user experience before adding AI.",
        core: "Core Idea: Break down what a person actually does, step by step.",
        explanation: "Pick a user task (e.g., booking a train ticket). Write each step in order, from trigger to completion. Keep it human-centered: actions, decisions, feelings.",
        example: "Example: Train booking: search schedule → compare trains → select → enter details → pay → get ticket.",
        extra: "Tip: Don't jump to solutions yet. Just capture reality.",
        type: "method"
    },
    {
        id: 31,
        category: "field-kit",
        title: "User Journey Mapping – AI Opportunities",
        meta: "When to Use: After mapping a journey, to identify where AI can help.",
        core: "Core Idea: Place AI where it eases friction or adds value.",
        explanation: "Review the mapped steps. Mark slow, repetitive, or uncertain steps. Ask: Could prediction, personalization, or automation help?",
        example: "Example: In booking, AI could predict preferred times but shouldn't choose the trip for you.",
        extra: "Tip: Limit yourself to a few impactful opportunities.",
        type: "method"
    },
    {
        id: 32,
        category: "field-kit",
        title: "Wizard-of-Oz – Human Behind the Curtain",
        meta: "When to Use: Early testing, before building real AI.",
        core: "Core Idea: Pretend with people instead of code.",
        explanation: "Create a simple interface. Have a hidden human provide responses. Observe user reactions and expectations.",
        example: "Example: A teammate writes \"chatbot replies\" in real time.",
        extra: "Tip: Best for exploring early concepts quickly.",
        type: "method"
    },
    {
        id: 33,
        category: "field-kit",
        title: "Wizard-of-Oz – Fake Features",
        meta: "When to Use: To test whether a feature is valuable before building it.",
        core: "Core Idea: Mock an AI function through a fake button or output.",
        explanation: "Add a button or option labeled with the AI feature. Show a pre-made or random output when clicked. Ask users how useful it feels.",
        example: "Example: A \"Smart Sort\" button in email shows a mocked inbox order.",
        extra: "Tip: If no one clicks, you've saved weeks of work.",
        type: "method"
    },
    {
        id: 34,
        category: "field-kit",
        title: "AI Capabilities – Vision (AI Can See)",
        meta: "When to Use: Brainstorming, when thinking about sensory inputs.",
        core: "Core Idea: Vision models detect, classify, and interpret images.",
        explanation: "List what \"seeing\" could add in your context. Brainstorm uses: recognition, detection, tracking. Evaluate value vs. privacy risks.",
        example: "Example: A plant ID app from photos is useful; a \"guess your mood\" camera might feel creepy.",
        extra: "Tip: Always ask if cameras improve or intrude.",
        type: "method"
    },
    {
        id: 35,
        category: "field-kit",
        title: "AI Capabilities – Language (AI Can Read & Write)",
        meta: "When to Use: Ideating around text, speech, or conversation.",
        core: "Core Idea: Language models process and generate text.",
        explanation: "Ask: Where do users write, read, or speak? Imagine AI enhancing or automating those moments. Prototype with sample text.",
        example: "Example: A résumé tool suggesting improvements.",
        extra: "Tip: Clarity first. Don't let \"smart\" writing distort the message.",
        type: "method"
    },
    {
        id: 36,
        category: "field-kit",
        title: "AI Capabilities – Prediction (AI Can Forecast)",
        meta: "When to Use: When decisions depend on future outcomes.",
        core: "Core Idea: AI can estimate what's likely to happen.",
        explanation: "Identify repetitive decisions or patterns. Ask: Could AI predict the next step, trend, or choice? Test if that prediction saves time or stress.",
        example: "Example: Predicting delivery arrival times.",
        extra: "Tip: Predictions are never certain — show confidence levels.",
        type: "method"
    },
    {
        id: 37,
        category: "field-kit",
        title: "AI Capabilities – Generation (AI Can Create)",
        meta: "When to Use: When fresh content or ideas are needed.",
        core: "Core Idea: Generative AI produces text, images, music, or code.",
        explanation: "List creative tasks users face. Brainstorm how AI could give starting points. Keep humans as editors, not just consumers.",
        example: "Example: AI drafts a social media post; the user tweaks tone.",
        extra: "Tip: Use AI for raw material, not the final word.",
        type: "method"
    },
    {
        id: 38,
        category: "field-kit",
        title: "Impact vs Effort – Quick Wins",
        meta: "When to Use: To prioritize small but valuable ideas.",
        core: "Core Idea: Focus on high-value, low-effort features.",
        explanation: "List all possible features. Rate each for \"impact\" and \"effort.\" Pick those with high impact, low effort.",
        example: "Example: Adding AI delivery time estimates before building auto-ordering drones.",
        extra: "Tip: Start with what brings visible value fastest.",
        type: "method"
    },
    {
        id: 39,
        category: "field-kit",
        title: "Impact vs Effort – Moonshots",
        meta: "When to Use: When dreaming big and planning long-term.",
        core: "Core Idea: Explore bold ideas, even if they're hard.",
        explanation: "List your most ambitious concepts. Place them in \"high effort, high impact\". Use them to inspire long-term vision.",
        example: "Example: Fully autonomous delivery drones.",
        extra: "Tip: Moonshots spark imagination but don't confuse them with next steps.",
        type: "method"
    },
    {
        id: 40,
        category: "field-kit",
        title: "Hope Mapping – Collective Hopes",
        meta: "When to Use: Early team sessions to surface optimism.",
        core: "Core Idea: Gather what excites people about AI.",
        explanation: "Ask each person to write one hope. Cluster them into themes. Discuss patterns of optimism.",
        example: "Example: \"AI frees me from boring tasks.\"",
        extra: "Tip: Use hopes to guide your design's positive direction.",
        type: "method"
    },
    {
        id: 41,
        category: "field-kit",
        title: "Fear Mapping – Collective Fears",
        meta: "When to Use: Alongside hopes, to balance with caution.",
        core: "Core Idea: Gather worries and risks openly.",
        explanation: "Ask each person to write one fear. Cluster into categories (jobs, bias, privacy). Discuss mitigation strategies.",
        example: "Example: \"AI will replace human teachers.\"",
        extra: "Tip: Don't skip fears — they're design signals.",
        type: "method"
    },
    {
        id: 42,
        category: "field-kit",
        title: "Scenario Roleplay – User–AI Dialogue",
        meta: "When to Use: To explore interactions before coding.",
        core: "Core Idea: Act out conversations with AI.",
        explanation: "Choose a task and a user. One person plays user, another plays AI. Roleplay realistic interactions, including misunderstandings.",
        example: "Example: Testing a voice assistant for cooking: \"AI, set timer.\" → \"For how long?\" → \"10 minutes.\"",
        extra: "Tip: Pay attention to tone, not just function.",
        type: "method"
    },
    {
        id: 43,
        category: "field-kit",
        title: "Scenario Roleplay – Stakeholder Perspectives",
        meta: "When to Use: To see wider impacts.",
        core: "Core Idea: Roleplay different people affected by the AI.",
        explanation: "List stakeholders (users, bystanders, managers). Assign roles. Play out how each reacts to the AI in context.",
        example: "Example: Testing school AI: student, teacher, parent, admin.",
        extra: "Tip: Use this to reveal hidden ethical issues.",
        type: "method"
    },
    {
        id: 44,
        category: "field-kit",
        title: "Bias Brainstorm – Harmful Misuses",
        meta: "When to Use: When stress-testing ideas.",
        core: "Core Idea: Imagine worst-case uses.",
        explanation: "Ask: \"How could this tool be misused?\" List harmful scenarios. Discuss how to design guardrails.",
        example: "Example: An AI tutor that accidentally shares personal student data.",
        extra: "Tip: It's not negativity — it's prevention.",
        type: "method"
    },
    {
        id: 45,
        category: "field-kit",
        title: "Bias Brainstorm – Excluded Users",
        meta: "When to Use: When ensuring inclusivity.",
        core: "Core Idea: Ask who the AI might leave out.",
        explanation: "Imagine diverse users (ages, regions, abilities). Ask: Can they use this system? Note groups excluded and brainstorm fixes.",
        example: "Example: A voice assistant struggling with strong regional accents.",
        extra: "Tip: Design for edge cases, not just the \"average.\"",
        type: "method"
    },

    // Part 3 - Activities (7 cards)
    {
        id: 46,
        category: "activities",
        title: "Hope–Fear Workshop",
        meta: "What it is: A short reflection exercise where you capture both your hopes and your fears about AI.",
        core: "Why do it: Helps you recognize your own attitudes toward AI and see both opportunities and risks.",
        explanation: "1. Write down one thing you hope AI will bring into your life. 2. Write down one thing you fear AI might cause. 3. Place them side by side and compare.",
        example: "Example: Hope: \"AI will give me more time for creative work.\" Fear: \"AI will replace my creative work.\"",
        extra: "Reflection: Hopes and fears are often two sides of the same coin.",
        type: "activity"
    },
    {
        id: 47,
        category: "activities",
        title: "Workflow Mapping",
        meta: "What it is: A way to look at your daily routines and spot where AI might help — and where it shouldn't.",
        core: "Why do it: Helps you see AI's strengths and limits in the context of real life.",
        explanation: "1. Pick a routine you often do (e.g., cooking, studying, shopping). 2. Write out the steps. 3. Mark each step: ✔️ AI could help / ❌ should stay human.",
        example: "Example: Studying for exams: ✔️ AI suggests quiz questions. ❌ Choosing which subject excites me today.",
        extra: "Reflection: Not every step benefits from AI — some are better left human.",
        type: "activity"
    },
    {
        id: 48,
        category: "activities",
        title: "AI Superpower Design",
        meta: "What it is: A playful exercise where you invent an imaginary AI \"superpower.\"",
        core: "Why do it: Helps you imagine future possibilities without limits, then reflect on feasibility.",
        explanation: "1. Dream up a wild AI superpower (e.g., \"AI that reads dreams\"). 2. Describe how it would work and who it would help. 3. Ask yourself: could a smaller version exist today?",
        example: "Example: \"Context Shifter\" — an AI that instantly adapts apps to different cultures.",
        extra: "Reflection: Every superpower hints at a real design opportunity.",
        type: "activity"
    },
    {
        id: 49,
        category: "activities",
        title: "Wizard-of-Oz Roleplay Test",
        meta: "What it is: A way to experience a future AI feature by roleplaying it yourself.",
        core: "Why do it: Helps you understand what users expect from AI interactions.",
        explanation: "1. Pick an AI idea you have (e.g., cooking assistant). 2. Act as the \"AI\" yourself — respond to prompts as the system would. 3. Notice what feels natural, confusing, or frustrating.",
        example: "Example: A friend asks: \"AI, set a timer.\" You respond as the AI: \"For how long?\" → \"10 minutes.\"",
        extra: "Reflection: Playing AI reveals gaps in design before you build it.",
        type: "activity"
    },
    {
        id: 50,
        category: "activities",
        title: "Impact–Ethics Critique",
        meta: "What it is: A quick review of an AI idea's positive and negative sides.",
        core: "Why do it: Ensures you think about impact beyond usefulness.",
        explanation: "1. Write down one AI idea. 2. List its positive impacts. 3. List possible risks or harms.",
        example: "Example: AI nutrition coach — Positive: encourages healthier eating. Negative: may give poor advice for certain conditions.",
        extra: "Reflection: Every idea has trade-offs — the earlier you see them, the better you can design.",
        type: "activity"
    },
    {
        id: 51,
        category: "activities",
        title: "AI Fail-Safe Challenge",
        meta: "What it is: A design exercise to plan how AI should fail gracefully.",
        core: "Why do it: Because errors are inevitable, and recovery matters most.",
        explanation: "1. Imagine your AI makes a mistake. 2. Decide how it should respond (apologize, ask, offer undo). 3. Sketch or describe the fail-safe flow.",
        example: "Example: A voice assistant hears \"play rock\" as \"play Bach.\" Fail-safe: \"Did you mean rock or Bach?\"",
        extra: "Reflection: Failures are design opportunities to build trust.",
        type: "activity"
    },
    {
        id: 52,
        category: "activities",
        title: "Data Detective",
        meta: "What it is: A mini investigation into the data behind an AI idea.",
        core: "Why do it: Helps you see bias and gaps before they cause harm.",
        explanation: "1. Imagine the dataset your AI would need. 2. Ask: Who is included? Who is missing? 3. Predict how missing data might distort outcomes.",
        example: "Example: A face ID trained mostly on light-skinned faces may misrecognize darker-skinned ones.",
        extra: "Reflection: Good AI design starts with good, representative data.",
        type: "activity"
    }
];

class FlashCardApp {
    constructor() {
        this.cards = [...flashcardsData];
        this.currentCardIndex = 0;
        this.studiedCards = new Set();
        this.isFlipped = false;
        this.currentFilter = 'all';
        this.studyMode = false;
        
        this.initializeElements();
        this.loadProgress();
        this.setupEventListeners();
        this.displayCard();
        this.updateProgress();
        this.setupThemes();
    }
    
    initializeElements() {
        this.flashcard = document.getElementById('flashcard');
        this.cardNumber = document.getElementById('cardNumber');
        this.cardNumberBack = document.getElementById('cardNumberBack');
        this.cardCategory = document.getElementById('cardCategory');
        this.cardTitle = document.getElementById('cardTitle');
        this.cardMeta = document.getElementById('cardMeta');
        this.cardCore = document.getElementById('cardCore');
        this.cardExplanation = document.getElementById('cardExplanation');
        this.cardExample = document.getElementById('cardExample');
        this.cardExtra = document.getElementById('cardExtra');
        
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.markStudiedBtn = document.getElementById('markStudiedBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.studyModeBtn = document.getElementById('studyModeBtn');
        
        this.cardsStudied = document.getElementById('cardsStudied');
        this.currentStreak = document.getElementById('currentStreak');
        
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.cardGridView = document.getElementById('cardGridView');
        this.cardGrid = document.getElementById('cardGrid');
    }
    
    setupEventListeners() {
        // Card flipping
        this.flashcard.addEventListener('click', () => this.flipCard());
        
        // Navigation
        this.prevBtn.addEventListener('click', () => this.previousCard());
        this.nextBtn.addEventListener('click', () => this.nextCard());
        this.markStudiedBtn.addEventListener('click', () => this.toggleStudied());
        
        // Controls
        this.shuffleBtn.addEventListener('click', () => this.shuffleCards());
        this.resetBtn.addEventListener('click', () => this.resetProgress());
        this.studyModeBtn.addEventListener('click', () => this.toggleStudyMode());
        
        // Tab filtering
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => this.filterCards(btn.dataset.category));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    setupThemes() {
        const themeButtons = document.querySelectorAll('.theme-btn');
        const body = document.body;
        
        const savedTheme = localStorage.getItem('aiLearningTheme') || 'default';
        if (savedTheme !== 'default') {
            body.setAttribute('data-theme', savedTheme);
        }
        
        themeButtons.forEach(btn => {
            const btnTheme = btn.dataset.theme;
            if (btnTheme === savedTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        themeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const theme = this.dataset.theme;
                
                themeButtons.forEach(button => button.classList.remove('active'));
                this.classList.add('active');
                
                if (theme === 'default') {
                    body.removeAttribute('data-theme');
                    localStorage.setItem('aiLearningTheme', 'default');
                } else {
                    body.setAttribute('data-theme', theme);
                    localStorage.setItem('aiLearningTheme', theme);
                }
            });
        });
    }
    
    displayCard() {
        const card = this.cards[this.currentCardIndex];
        if (!card) return;
        
        // Update card numbers
        const cardPosition = `${this.currentCardIndex + 1}/${this.cards.length}`;
        this.cardNumber.textContent = cardPosition;
        this.cardNumberBack.textContent = cardPosition;
        
        // Update category badge
        const categoryNames = {
            'fundamentals': 'Fundamentals',
            'field-kit': 'Field Kit',
            'activities': 'Activities'
        };
        this.cardCategory.textContent = categoryNames[card.category] || card.category;
        
        // Update front content
        this.cardTitle.textContent = card.title;
        this.cardMeta.textContent = card.meta;
        
        // Update back content
        this.cardCore.textContent = card.core;
        this.cardExplanation.textContent = card.explanation;
        this.cardExample.textContent = card.example;
        
        // Update extra content if it exists
        if (card.extra) {
            this.cardExtra.textContent = card.extra;
            this.cardExtra.style.display = 'block';
        } else {
            this.cardExtra.style.display = 'none';
        }
        
        // Update studied status
        this.updateStudiedButton();
        
        // Reset flip state
        if (this.isFlipped) {
            this.flashcard.classList.remove('flipped');
            this.isFlipped = false;
        }
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentCardIndex === 0;
        this.nextBtn.disabled = this.currentCardIndex === this.cards.length - 1;
        
        // Add transition animation
        const container = document.querySelector('.flashcard-container');
        container.classList.add('transitioning');
        setTimeout(() => container.classList.remove('transitioning'), 300);
    }
    
    flipCard() {
        this.flashcard.classList.toggle('flipped');
        this.isFlipped = !this.isFlipped;
    }
    
    nextCard() {
        if (this.currentCardIndex < this.cards.length - 1) {
            this.currentCardIndex++;
            this.displayCard();
        }
    }
    
    previousCard() {
        if (this.currentCardIndex > 0) {
            this.currentCardIndex--;
            this.displayCard();
        }
    }
    
    toggleStudied() {
        const cardId = this.cards[this.currentCardIndex].id;
        
        if (this.studiedCards.has(cardId)) {
            this.studiedCards.delete(cardId);
        } else {
            this.studiedCards.add(cardId);
        }
        
        this.updateStudiedButton();
        this.updateProgress();
        this.saveProgress();
    }
    
    updateStudiedButton() {
        const cardId = this.cards[this.currentCardIndex].id;
        if (this.studiedCards.has(cardId)) {
            this.markStudiedBtn.textContent = '✓ Studied';
            this.markStudiedBtn.classList.add('studied');
        } else {
            this.markStudiedBtn.textContent = '✓ Mark as Studied';
            this.markStudiedBtn.classList.remove('studied');
        }
    }
    
    shuffleCards() {
        // Fisher-Yates shuffle
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        this.currentCardIndex = 0;
        this.displayCard();
    }
    
    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.studiedCards.clear();
            this.updateProgress();
            this.updateStudiedButton();
            this.saveProgress();
        }
    }
    
    toggleStudyMode() {
        this.studyMode = !this.studyMode;
        document.body.classList.toggle('study-mode', this.studyMode);
        this.studyModeBtn.textContent = this.studyMode ? '📖 Exit Study Mode' : '📚 Study Mode';
        
        if (this.studyMode) {
            // Filter to only unstudied cards
            this.filterToUnstudied();
        } else {
            // Restore all cards
            this.filterCards(this.currentFilter);
        }
    }
    
    filterToUnstudied() {
        this.cards = flashcardsData.filter(card => !this.studiedCards.has(card.id));
        this.currentCardIndex = 0;
        this.displayCard();
    }
    
    filterCards(category) {
        this.currentFilter = category;
        
        // Update active tab
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Filter cards
        if (category === 'all') {
            this.cards = [...flashcardsData];
        } else {
            this.cards = flashcardsData.filter(card => card.category === category);
        }
        
        this.currentCardIndex = 0;
        this.displayCard();
    }
    
    handleKeyboard(e) {
        // Prevent default behavior when typing in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousCard();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextCard();
                break;
            case ' ':
            case 'Enter':
                e.preventDefault();
                this.flipCard();
                break;
            case 's':
            case 'S':
                e.preventDefault();
                this.toggleStudied();
                break;
        }
    }
    
    updateProgress() {
        const totalCards = flashcardsData.length;
        const studiedCount = this.studiedCards.size;
        this.cardsStudied.textContent = `${studiedCount}/${totalCards}`;
        
        // Calculate streak (consecutive studied cards)
        let streak = 0;
        for (let i = 1; i <= totalCards; i++) {
            if (this.studiedCards.has(i)) {
                streak++;
            } else {
                break;
            }
        }
        this.currentStreak.textContent = streak;
    }
    
    saveProgress() {
        localStorage.setItem('flashcardsProgress', JSON.stringify([...this.studiedCards]));
    }
    
    loadProgress() {
        const saved = localStorage.getItem('flashcardsProgress');
        if (saved) {
            this.studiedCards = new Set(JSON.parse(saved));
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FlashCardApp();
});

// Add progress indicator to page
document.addEventListener('DOMContentLoaded', () => {
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'progress-indicator';
    progressIndicator.innerHTML = '<div class="progress-fill"></div>';
    
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(progressIndicator, mainContent.querySelector('.flashcard-controls'));
    
    // Update progress indicator
    function updateProgressIndicator() {
        const app = window.flashCardApp;
        if (app) {
            const progress = (app.studiedCards.size / flashcardsData.length) * 100;
            document.querySelector('.progress-fill').style.width = progress + '%';
        }
    }
    
    // Update progress indicator every second
    setInterval(updateProgressIndicator, 1000);
});