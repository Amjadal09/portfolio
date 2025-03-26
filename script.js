document.addEventListener('DOMContentLoaded', () => {

    // --- تحديث سنة الحقوق تلقائياً ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- تأثيرات التمرير (Scroll Reveal) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // اختياري: إيقاف المراقبة بعد ظهور العنصر مرة واحدة
                // observer.unobserve(entry.target);
            } else {
                 // اختياري: إزالة الكلاس لإعادة التأثير عند العودة للأعلى
                 // entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // نسبة ظهور العنصر في الشاشة لتشغيل التأثير (10%)
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- تحديد رابط التنقل النشط عند التمرير ---
    const sections = document.querySelectorAll('section[id]'); // كل الأقسام التي لها ID
    const navLinks = document.querySelectorAll('#navbar ul li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // نأخذ ارتفاع شريط التنقل في الاعتبار
            const sectionHeight = section.clientHeight;
            const navHeight = document.getElementById('navbar')?.offsetHeight || 0;

            // التحقق إذا كان التمرير الحالي ضمن حدود القسم (مع الأخذ بالاعتبار ارتفاع الناف بار)
            if (pageYOffset >= (sectionTop - navHeight - 50)) { // نطرح 50 بكسل إضافية كهامش
                current = section.getAttribute('id');
            }
        });

         // إذا لم يتم تحديد قسم (مثل أعلى الصفحة)، نعتبر hero هو الحالي
        if (current === '' && pageYOffset < window.innerHeight / 2) {
             current = 'hero';
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            // التحقق مما إذا كان رابط الـ href يطابق القسم الحالي
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // --- تغيير خلفية شريط التنقل عند التمرير لأسفل ---
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) { // بعد تمرير 50 بكسل
                navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)'; // أكثر عتامة
                 navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.backgroundColor = 'rgba(30, 30, 30, 0.9)'; // العودة للشفافية الافتراضية
                navbar.style.boxShadow = 'none';
            }
        }

    });
    // --- START: Interactive Glitch Effect ---
const glitchTitle = document.querySelector('#hero h1.glitch');

if (glitchTitle) {
    glitchTitle.addEventListener('mouseenter', () => {
        glitchTitle.classList.add('glitch-intensified');
    });

    glitchTitle.addEventListener('mouseleave', () => {
        // تأخير بسيط قبل إزالة الكلاس ليعطي انطباعًا أفضل
        setTimeout(() => {
             glitchTitle.classList.remove('glitch-intensified');
        }, 200); // 200ms delay
    });
}
// --- END: Interactive Glitch Effect ---
// --- START: Custom Cursor Logic ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // تحريك النقطة مباشرة (تستخدم transform لتجنب إعادة الحساب المكلفة)
        cursorDot.style.transform = `translate(${posX - cursorDot.offsetWidth / 2}px, ${posY - cursorDot.offsetHeight / 2}px)`;

        // تحريك الإطار بتأخير بسيط (يمكن استخدام requestAnimationFrame لأداء أفضل للحركات المعقدة)
        // الطريقة البسيطة باستخدام transform:
         cursorOutline.style.transform = `translate(${posX - cursorOutline.offsetWidth / 2}px, ${posY - cursorOutline.offsetHeight / 2}px)`;

        // طريقة بديلة باستخدام top/left مع transition في CSS:
        // cursorOutline.style.left = `${posX}px`;
        // cursorOutline.style.top = `${posY}px`;
    });

    // تحديد العناصر التفاعلية
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .tool-item, .timeline-content, input[type="submit"]');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-link-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-link-hover');
        });
    });

} else {
    console.warn("Custom cursor elements not found. Disabling custom cursor.");
    // إذا لم تجد العناصر، أعد المؤشر الافتراضي
    document.body.style.cursor = 'auto';
}
// --- END: Custom Cursor Logic ---

// --- START: Preloader Logic ---
const preloader = document.getElementById('preloader');

if (preloader) {
    window.addEventListener('load', () => {
        // تأخير بسيط قبل الإخفاء لإعطاء فرصة لرؤية الحركة (اختياري)
        setTimeout(() => {
             preloader.classList.add('hidden');
        }, 300); // 300 ميلي ثانية
    });
}
// --- END: Preloader Logic ---


    // --- (اختياري) تحسين بسيط للتمرير الناعم (إذا لم يكن CSS كافيًا) ---
    /*
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // تأكد أنه رابط داخلي وليس رابط خارجي
            if (href.startsWith('#')) {
                e.preventDefault(); // منع السلوك الافتراضي
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                     const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight; // طرح ارتفاع الناف بار

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    */
// --- START: Enhanced Particles.js Configuration ---
if (document.getElementById('particles-js')) {
    particlesJS('particles-js',
        {
          "particles": {
            "number": {
              "value": 120, // <<<=== زيادة عدد الجزيئات
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": ["#00ffff", "#ff00ff", "#ffffff", "#00ff00"] // إضافة الأخضر
            },
            "shape": {
              "type": ["circle", "triangle", "star"], // <<<=== تنويع الأشكال
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
               "star": { // إعدادات النجمة إذا تم اختيارها
                  "nb_sides": 5
               }
            },
            "opacity": {
              "value": 0.7, // <<<=== زيادة الشفافية قليلاً
              "random": true,
              "anim": {
                "enable": true,
                "speed": 0.8,
                "opacity_min": 0.2,
                "sync": false
              }
            },
            "size": {
              "value": 3.5, // <<<=== تكبير الحجم قليلاً
              "random": true,
              "anim": {
                "enable": false, // يمكن تفعيلها لتأثير نبض الحجم
                "speed": 10,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 120, // <<<=== تقليل المسافة قليلاً
              "color": "#ffffff",
              "opacity": 0.3, // <<<=== زيادة شفافية الخطوط
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 4, // <<<=== زيادة السرعة
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": true, // <<<=== تفعيل جذب الجزيئات لبعضها
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "window", // التفاعل على كامل النافذة
            "events": {
              "onhover": {
                "enable": true,
                "mode": "bubble" // <<<=== تغيير التفاعل عند التحويم إلى فقاعة
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": { // لم نعد نستخدمه ولكن نبقي الإعدادات
                "distance": 140,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": { // إعدادات الفقاعة
                "distance": 200, // <<<=== المسافة التي يؤثر فيها التحويم
                "size": 15, // <<<=== حجم الجزيئات عند التحويم
                "duration": 1,
                "opacity": 0.8,
                "speed": 3
              },
              "repulse": { // لم نعد نستخدمه ولكن نبقي الإعدادات
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        }
    );
}
// --- END: Enhanced Particles.js Configuration ---
console.log("Initializing custom Vanilla Tilt settings..."); // رسالة للتحقق

// اختيار العناصر التي تريد تخصيصها
// يمكنك اختيار فئة معينة مثل '.project-card'
// أو كل العناصر التي لديها data-tilt: '[data-tilt]'
const tiltElements = document.querySelectorAll('.project-card, .skill-card'); // مثال: تخصيص بطاقات المشاريع والمهارات

if (tiltElements.length > 0) {
    VanillaTilt.init(tiltElements, {
        max: 20,        // زيادة أقصى درجة إمالة (الافتراضي 35)
        speed: 500,     // زيادة سرعة الانتقال قليلاً (الافتراضي 400)
        glare: true,    // تفعيل تأثير اللمعان
        "max-glare": 0.4, // تعديل شدة اللمعان (بين 0 و 1)
        scale: 1.03     // إضافة تكبير بسيط عند الإمالة
    });
    console.log(`Vanilla Tilt customized for ${tiltElements.length} elements.`);
} else {
    console.log("No elements found for custom Vanilla Tilt.");
    // ملاحظة: إذا كنت تستخدم data-tilt فقط، فهذا طبيعي وسيظل التأثير يعمل بالإعدادات الافتراضية
}

    console.log("الموقع جاهز والمؤثرات المحدثة تعمل!");

});