/**
 * JURE TRAVEL - PREMIUM INTERACTIVE APPLICATION LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SPLASH SCREEN (WITH SESSION MEMORY)
    // ==========================================================================
    const splash = document.getElementById('splash-screen');
    const splashPhrase = document.getElementById('splash-phrase');
    
    const phrases = [
        "Tu próxima aventura comienza aquí.",
        "Descubrí destinos inolvidables.",
        "Creamos experiencias, no solo viajes.",
        "Explorá el mundo sin límites."
    ];
    
    if (splash) {
        const hasSplashPlayed = sessionStorage.getItem('jure_splash_played');
        
        if (hasSplashPlayed === 'true') {
            // Skip splash on sub-sequent page loads in same session
            splash.style.display = 'none';
        } else {
            // Select random travel phrase
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            if (splashPhrase) {
                splashPhrase.textContent = randomPhrase;
            }
            
            // Wait, then fade out
            setTimeout(() => {
                splash.classList.add('fade-out');
                // Remove entirely after transition completes
                setTimeout(() => {
                    splash.style.display = 'none';
                    sessionStorage.setItem('jure_splash_played', 'true');
                }, 800);
            }, 2800); // 2.8 seconds display time
        }
    }

    // ==========================================================================
    // 2. STICKY HEADER & FLOATING CTA SCROLL EFFECT
    // ==========================================================================
    const header = document.querySelector('.site-header');
    const quoteFloat = document.getElementById('quote-float-widget');
    
    window.addEventListener('scroll', () => {
        // Sticky Header scroll trigger
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Quote Float Widget scroll trigger (>300px)
        if (quoteFloat) {
            if (window.scrollY > 300) {
                quoteFloat.classList.remove('quote-float-hidden');
                quoteFloat.classList.add('quote-float-visible');
            } else {
                quoteFloat.classList.add('quote-float-hidden');
                quoteFloat.classList.remove('quote-float-visible');
            }
        }
    });

    // ==========================================================================
    // 3. MOBILE MENU NAVIGATION
    // ==========================================================================
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            menuBtn.classList.toggle('open');
            
            // Prevent body scroll when menu is active on mobile
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'initial';
            }
        });
        
        // Close menu when clicking navigation links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuBtn.classList.remove('open');
                document.body.style.overflow = 'initial';
            });
        });

        // Close menu when clicking outside of navbar
        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('active') && !mainNav.contains(e.target) && !menuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                menuBtn.classList.remove('open');
                document.body.style.overflow = 'initial';
            }
        });
    }

    // ==========================================================================
    // 4. BUDGET LOGIC MOVED TO EXTERNAL MODULE
    // ==========================================================================
    // The budget logic is now handled entirely by the external application:
    // https://presupuestojuretravel.netlify.app/

    // ==========================================================================
    // 6. WHATSAPP INTELIGENTE WIDGET FLOATING PANEL
    // ==========================================================================
    const waBtn = document.getElementById('wa-btn');
    const waPanel = document.getElementById('wa-panel');
    
    if (waBtn && waPanel) {
        waBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            waPanel.classList.toggle('show');
        });
        
        // Close panel when clicking elsewhere on the page
        document.addEventListener('click', (e) => {
            if (waPanel.classList.contains('show') && !waPanel.contains(e.target) && !waBtn.contains(e.target)) {
                waPanel.classList.remove('show');
            }
        });
    }

    // ==========================================================================
    // 7. TOAST NOTIFICATION AND ALIAS COPY WRAPPER
    // ==========================================================================
    const createToast = (text) => {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${text}</span>`;
        
        container.appendChild(toast);
        
        // Trigger show class with small delay for animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 50);
        
        // Clear and destroy toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400); // matches transition time
        }, 3000);
    };
    
    // Bind digital card copying actions globally
    window.copyAlias = (aliasName, aliasValue) => {
        navigator.clipboard.writeText(aliasValue).then(() => {
            createToast(`¡Alias ${aliasName} (${aliasValue}) copiado al portapapeles! ✅`);
        }).catch(err => {
            console.error('Error al copiar el alias: ', err);
            // Fallback default alert in case clipboard API fails
            alert(`Copiado: ${aliasValue}`);
        });
    };

    // ==========================================================================
    // 8. FAQS ACCORDION LOGIC
    // ==========================================================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const card = question.parentElement;
            const answer = question.nextElementSibling;
            
            // Check if card is currently active
            const isActive = card.classList.contains('active');
            
            // Close all other FAQs first (Single expand accordion mode)
            document.querySelectorAll('.faq-card').forEach(otherCard => {
                otherCard.classList.remove('active');
                otherCard.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Toggle active card
            if (!isActive) {
                card.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ==========================================================================
    // 9. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once visible, we can unobserve if we want static animation
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // triggers slightly before entering screen center
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }
});
