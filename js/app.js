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
    // 4. SMART PASSENGER COUNTERS
    // ==========================================================================
    const setupCounter = (label) => {
        const btnMinus = document.getElementById(`btn-minus-${label}`);
        const btnPlus = document.getElementById(`btn-plus-${label}`);
        const textVal = document.getElementById(`val-${label}`);
        const hiddenInput = document.getElementById(`input-${label}`);
        
        if (!btnMinus || !btnPlus || !textVal || !hiddenInput) return;
        
        const minVal = label === 'adults' ? 1 : 0;
        const maxVal = 99;
        
        btnMinus.addEventListener('click', () => {
            let currentVal = parseInt(hiddenInput.value) || 0;
            if (currentVal > minVal) {
                currentVal--;
                hiddenInput.value = currentVal;
                textVal.textContent = currentVal;
            }
            updateBtnStates();
        });
        
        btnPlus.addEventListener('click', () => {
            let currentVal = parseInt(hiddenInput.value) || 0;
            if (currentVal < maxVal) {
                currentVal++;
                hiddenInput.value = currentVal;
                textVal.textContent = currentVal;
            }
            updateBtnStates();
        });
        
        const updateBtnStates = () => {
            let currentVal = parseInt(hiddenInput.value) || 0;
            btnMinus.disabled = currentVal <= minVal;
            btnPlus.disabled = currentVal >= maxVal;
        };
        
        updateBtnStates();
    };
    
    setupCounter('adults');
    setupCounter('children');
    setupCounter('babies');

    // ==========================================================================
    // 5. BUDGET FORM SUBMISSION & SERIAL GENERATOR
    // ==========================================================================
    const budgetForm = document.getElementById('presupuestoForm');
    const successModal = document.getElementById('success-modal');
    const successCode = document.getElementById('success-code');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnSendWaModal = document.getElementById('btn-send-wa-modal');
    let lastGeneratedWaUrl = '';
    
    if (budgetForm) {
        budgetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get Serial Code
            let currentSerial = localStorage.getItem('jure_travel_serial');
            if (!currentSerial) {
                currentSerial = 101; // Start serial code at 101
            } else {
                currentSerial = parseInt(currentSerial) + 1;
            }
            localStorage.setItem('jure_travel_serial', currentSerial);
            
            const codeString = `VIA-${String(currentSerial).padStart(6, '0')}`;
            
            // Gather personal data
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            
            // Gather travel data
            const origen = document.getElementById('origen').value.trim();
            const destino = document.getElementById('destino').value;
            const fechaIda = document.getElementById('fecha_ida').value;
            const fechaRegreso = document.getElementById('fecha_regreso').value;
            const flexFechas = document.getElementById('flexibilidad').checked ? 'Sí' : 'No';
            
            // Trip Type logic
            let tipoViaje = "Ida y Vuelta";
            if (fechaIda && !fechaRegreso) {
                tipoViaje = "Solo Ida";
            }
            
            // Passengers
            const adultos = document.getElementById('input-adults').value;
            const ninos = document.getElementById('input-children').value;
            const bebes = document.getElementById('input-babies').value;
            
            // Services requested (Checkboxes)
            const services = [];
            document.querySelectorAll('input[name="servicios"]:checked').forEach(cb => {
                services.push(cb.value);
            });
            const servicesString = services.length > 0 ? services.join(', ') : 'Ninguno seleccionado';
            
            // Accommodation
            const categoria = document.getElementById('categoria_estrellas').value;
            const regimen = document.getElementById('regimen_comidas').value;
            
            // Budget Estimative
            const rangoPresupuesto = document.getElementById('presupuesto_estimado').value;
            const comentarios = document.getElementById('comentarios').value.trim() || 'Sin comentarios adicionales.';
            
            // Compile Date/Time
            const now = new Date();
            const dateStr = now.toLocaleDateString('es-AR');
            const timeStr = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
            
            // Assemble Structured WhatsApp Message
            const waMessage = `✈️ *SOLICITUD DE VIAJE JURE TRAVEL* ✈️\n` +
                              `📌 *Código:* ${codeString}\n` +
                              `📅 *Fecha:* ${dateStr} - ${timeStr}\n\n` +
                              `👤 *DATOS DEL PASAJERO*\n` +
                              `• *Nombre:* ${nombre} ${apellido}\n` +
                              `• *Teléfono:* ${telefono}\n` +
                              `• *Email:* ${email}\n\n` +
                              `📍 *DETALLES DEL ITINERARIO*\n` +
                              `• *Origen:* ${origen}\n` +
                              `• *Destino:* ${destino}\n` +
                              `• *Tipo:* ${tipoViaje}\n` +
                              `• *Salida:* ${fechaIda || 'No especificada'}\n` +
                              `• *Regreso:* ${fechaRegreso || 'Solo ida'}\n` +
                              `• *Flexibilidad:* ${flexFechas}\n\n` +
                              `👥 *ACOMPAÑANTES*\n` +
                              `• *Pasajeros:* ${adultos} Adulto(s), ${ninos} Niño(s), ${bebes} Bebé(s)\n\n` +
                              `🛎️ *SERVICIOS Y ALOJAMIENTO*\n` +
                              `• *Servicios:* ${servicesString}\n` +
                              `• *Hospedaje:* Categoria ${categoria} - ${regimen}\n` +
                              `• *Presupuesto:* Rango ${rangoPresupuesto}\n\n` +
                              `💬 *COMENTARIOS Y NOTAS*\n` +
                              `"${comentarios}"\n\n` +
                              `*Generado automáticamente desde Jure Travel Premium* 🌟`;
                              
            // Encode message for URL
            const encodedText = encodeURIComponent(waMessage);
            const agencyNumber = "5493812061066";
            lastGeneratedWaUrl = `https://wa.me/${agencyNumber}?text=${encodedText}`;
            
            // Show code in Success Modal
            if (successCode) successCode.textContent = codeString;
            if (successModal) successModal.classList.add('show');
            
            // Reset form
            budgetForm.reset();
            // Restore passenger counters defaults
            document.getElementById('input-adults').value = 1;
            document.getElementById('val-adults').textContent = 1;
            document.getElementById('input-children').value = 0;
            document.getElementById('val-children').textContent = 0;
            document.getElementById('input-babies').value = 0;
            document.getElementById('val-babies').textContent = 0;
            
            // Re-trigger counter btn states
            document.getElementById('btn-minus-adults').disabled = true;
            document.getElementById('btn-minus-children').disabled = true;
            document.getElementById('btn-minus-babies').disabled = true;
        });
    }
    
    // Success Modal buttons
    if (btnCloseModal && successModal) {
        btnCloseModal.addEventListener('click', () => {
            successModal.classList.remove('show');
        });
        
        // Close modal when clicking overlay
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('show');
            }
        });
    }
    
    if (btnSendWaModal) {
        btnSendWaModal.addEventListener('click', () => {
            if (lastGeneratedWaUrl) {
                window.open(lastGeneratedWaUrl, '_blank');
            }
        });
    }

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
