/* ============================================
   SCRIPT — Proposta Teste × Flow
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // INTERSECTION OBSERVER — Scroll Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger siblings
                const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
                const siblingIndex = Array.from(siblings).indexOf(entry.target);
                const delay = siblingIndex * 100;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });

    // ========================================
    // NAVBAR — Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleNavbarScroll = () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========================================
    // SMOOTH SCROLL — Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetEl.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // PRICING CARDS — Hover Tilt
    // ========================================
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            card.style.transform = card.classList.contains('pricing-featured')
                ? `scale(1.04) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
                : `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = card.classList.contains('pricing-featured')
                ? 'scale(1.04)'
                : '';
        });
    });

    // ========================================
    // COUNTER ANIMATION — Stats
    // ========================================
    const animateCounter = (el, target, suffix = '') => {
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.round(current) + suffix;
        }, 30);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent.trim();
                    if (text.includes('+')) {
                        animateCounter(stat, parseInt(text), '+');
                    } else if (text.includes('%')) {
                        animateCounter(stat, parseInt(text), '%');
                    } else if (text.includes('h')) {
                        animateCounter(stat, parseInt(text), 'h');
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ========================================
    // IMPACT NUMBERS — Counter
    // ========================================
    const impactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.impact-number');
                numbers.forEach(num => {
                    const text = num.textContent.trim();
                    if (text.includes('%')) {
                        animateCounter(num, parseInt(text), '%');
                    } else {
                        animateCounter(num, parseInt(text), '');
                    }
                });
                impactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const impactSection = document.querySelector('.impact-items');
    if (impactSection) {
        impactObserver.observe(impactSection);
    }
    // ========================================
    // SPA vs MULTI-PAGE TOGGLE
    // ========================================
    const toggleSpa = document.getElementById('toggleSpa');
    const toggleMulti = document.getElementById('toggleMulti');
    const panelSpa = document.getElementById('panelSpa');
    const panelMulti = document.getElementById('panelMulti');

    if (toggleSpa && toggleMulti) {
        const switchPanel = (type) => {
            if (type === 'spa') {
                toggleSpa.classList.add('active');
                toggleMulti.classList.remove('active');
                panelSpa.classList.add('active');
                panelMulti.classList.remove('active');
            } else {
                toggleMulti.classList.add('active');
                toggleSpa.classList.remove('active');
                panelMulti.classList.add('active');
                panelSpa.classList.remove('active');
            }
        };

        toggleSpa.addEventListener('click', () => switchPanel('spa'));
        toggleMulti.addEventListener('click', () => switchPanel('multi'));
    }

    // ========================================
    // MULTI-PAGE TAB AUTO-CYCLE
    // ========================================
    const multiTabs = document.querySelectorAll('.tab-btn');
    const multiPages = document.querySelectorAll('.multi-page');
    const multiUrlText = document.querySelector('.multi-url-text');
    const urlMap = { home: 'teste.com.br', servicos: 'teste.com.br/servicos', sobre: 'teste.com.br/sobre', contato: 'teste.com.br/contato' };
    let multiCycleIndex = 0;
    let multiAutoInterval = null;

    const switchMultiPage = (pageName) => {
        multiPages.forEach(p => p.classList.remove('multi-active'));
        multiTabs.forEach(t => t.classList.remove('tab-active'));

        const targetPage = document.querySelector(`.page-${pageName}`);
        const targetTab = document.querySelector(`.tab-btn[data-page="${pageName}"]`);
        if (targetPage) targetPage.classList.add('multi-active');
        if (targetTab) targetTab.classList.add('tab-active');
        if (multiUrlText && urlMap[pageName]) multiUrlText.textContent = urlMap[pageName];
    };

    if (multiTabs.length > 0) {
        multiTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const page = tab.dataset.page;
                switchMultiPage(page);
                // Reset auto-cycle on manual click
                clearInterval(multiAutoInterval);
                multiCycleIndex = Array.from(multiTabs).indexOf(tab);
                startMultiCycle();
            });
        });

        const pageNames = ['home', 'servicos', 'sobre', 'contato'];
        const startMultiCycle = () => {
            multiAutoInterval = setInterval(() => {
                multiCycleIndex = (multiCycleIndex + 1) % pageNames.length;
                switchMultiPage(pageNames[multiCycleIndex]);
            }, 2000);
        };
        startMultiCycle();
    }
    // ========================================
    // HUB DEMO — Instagram → Hub Cycling
    // ========================================
    const hubScreens = document.querySelectorAll('.hub-screen');
    const hubDots = document.querySelectorAll('.hub-version-dot');
    const hubStepLabel = document.getElementById('hubStepLabel');
    const labels = ['Instagram da Teste', 'Hub Compacto', 'Hub Visual com Banners'];
    let hubScreenIndex = 0;
    let hubCycleTimer = null;

    const switchHubScreen = (index) => {
        hubScreens.forEach(s => s.classList.remove('hub-screen-active'));
        hubDots.forEach(d => d.classList.remove('hub-vdot-active'));

        if (hubScreens[index]) hubScreens[index].classList.add('hub-screen-active');
        if (hubDots[index]) hubDots[index].classList.add('hub-vdot-active');
        if (hubStepLabel) hubStepLabel.textContent = labels[index] || '';

        // Restart cursor animation when Instagram screen appears
        if (index === 0) {
            const cursor = document.getElementById('igCursor');
            if (cursor) {
                cursor.style.animation = 'none';
                cursor.offsetHeight; // force reflow
                cursor.style.animation = '';
            }
        }
    };

    if (hubScreens.length > 0) {
        // Manual dot clicks
        hubDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.dataset.screen);
                hubScreenIndex = idx;
                switchHubScreen(idx);
                clearInterval(hubCycleTimer);
                startHubCycle();
            });
        });

        // Auto-cycle: Instagram 3.5s → Compact 3.5s → Visual 3.5s → loop
        const startHubCycle = () => {
            hubCycleTimer = setInterval(() => {
                hubScreenIndex = (hubScreenIndex + 1) % 3;
                switchHubScreen(hubScreenIndex);
            }, 3500);
        };
        startHubCycle();
    }

});

