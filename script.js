// Wait for the DOM to be fully loaded before running any scripts
        document.addEventListener('DOMContentLoaded', function() {
        
            // --- Mobile Menu Functionality ---
            const mobileNav = document.getElementById('mobile-nav');
            const overlay = document.getElementById('overlay');
            const hamburger = document.querySelector('.hamburger');
            const closeBtn = document.querySelector('.close-btn');
            
            function toggleMobileMenu() {
                mobileNav.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
            }

            hamburger.addEventListener('click', toggleMobileMenu);
            closeBtn.addEventListener('click', toggleMobileMenu);
            overlay.addEventListener('click', toggleMobileMenu);


            // --- Navigation Link Functionality ---
            const allNavLinks = document.querySelectorAll('nav a, .mobile-nav a, a.btn[href^="#"]');

            allNavLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            targetElement.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }
                        if (mobileNav.classList.contains('active')) {
                            toggleMobileMenu();
                        }
                    }
                });
            });


            // --- AI Analysis Functionality ---
            const analyzeButton = document.getElementById('analyze-btn');

            async function analyzeProfile() {
                const buttonText = document.getElementById('analyze-btn-text');
                const loadingSpinner = document.getElementById('loading-spinner');
                const aiResultDiv = document.getElementById('ai-analysis-result');
                const aiResultText = document.getElementById('ai-result-text');
                const aboutMeTextElement = document.getElementById('about-me-text');
                
                analyzeButton.disabled = true; 
                buttonText.textContent = 'Analyzing...';
                loadingSpinner.classList.remove('hidden');
                aiResultDiv.style.display = 'none';
                aiResultText.innerText = '';

                try {
                    // ============================ IMPORTANT ============================
                    // PASTE THE API KEY YOU GENERATED FROM GOOGLE AI STUDIO HERE
                    const apiKey = "AIzaSyA5tXDbwb8ILhivY2eurBJYDI21R1Vvt3c";
                    // =================================================================

                    if (apiKey === "PASTE_YOUR_GOOGLE_AI_API_KEY_HERE") {
                        throw new Error("Please replace the placeholder API Key with your real key from Google AI Studio.");
                    }

                    const currentAboutMe = aboutMeTextElement.innerText;
                    const prompt = `Rewrite and refine the following professional self-description for a portfolio website. Make it concise, impactful, and suitable for a business or creative role. Ensure the output is text only, without any HTML code or formatting. The text to analyze is: "${currentAboutMe}"`;
                    
                    const payload = { 
                        contents: [{ role: "user", parts: [{ text: prompt }] }] 
                    };

                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`API Error: ${errorData.error.message}`);
                    }

                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0) {
                        const text = result.candidates[0].content.parts[0].text;
                        aiResultText.innerText = text;
                    } else {
                        aiResultText.innerText = 'Analysis complete, but no suggestion was returned. This may be due to a safety filter.';
                    }
                    aiResultDiv.style.display = 'block';

                } catch (error) {
                    console.error('Full Error:', error);
                    aiResultText.innerText = `An error occurred: ${error.message}`;
                    aiResultDiv.style.display = 'block';
                } finally {
                    analyzeButton.disabled = false;
                    buttonText.textContent = 'Analyze Profile with AI ✨';
                    loadingSpinner.classList.add('hidden');
                }
            }
            
            // Attach the analyzeProfile function to the button click
            if (analyzeButton) {
                analyzeButton.addEventListener('click', analyzeProfile);
            }
        });