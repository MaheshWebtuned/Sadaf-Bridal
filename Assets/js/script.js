

// NAV BAR DROPDOWN
document.querySelectorAll('.service-tab').forEach(tab => {
    tab.addEventListener('click', () => {

        // Remove active from all tabs
        document.querySelectorAll('.service-tab').forEach(t => {
            t.classList.remove('active');
        });

        // Add active to clicked tab
        tab.classList.add('active');

        const target = tab.getAttribute('data-target');

        // Hide all details
        document.querySelectorAll('.dropdown-menu-service-detail').forEach(detail => {
            detail.classList.remove('active');
        });

        // Show selected detail
        document.querySelector('.' + target).classList.add('active');
    });
});







// SERVICE SECTION
const buttons = document.querySelectorAll(".service-list");
const images = document.querySelectorAll(".image-gallery img");
const gallery = document.getElementById("gallery");

function activateService(imageId) {
    images.forEach(img => img.classList.remove("active"));
    buttons.forEach(btn => btn.classList.remove("active"));

    document.getElementById(imageId).classList.add("active");
    document
        .querySelector(`.service-list[data-target="${imageId}"]`)
        .classList.add("active");
}

function scrollToImage(imageId) {
    const target = document.getElementById(imageId);

    const scrollPosition =
        target.offsetTop -
        gallery.offsetTop -
        gallery.clientHeight / 2 +
        target.clientHeight / 2;

    gallery.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
    });

    activateService(imageId);
}

// Button click → scroll image
buttons.forEach(button => {
    button.addEventListener("click", () => {
        scrollToImage(button.dataset.target);
    });
});

// Image scroll → activate button
gallery.addEventListener("scroll", () => {
    const galleryCenter = gallery.scrollTop + gallery.clientHeight / 2;

    images.forEach(img => {
        const imgTop = img.offsetTop - gallery.offsetTop;
        const imgBottom = imgTop + img.clientHeight;

        if (galleryCenter >= imgTop && galleryCenter <= imgBottom) {
            activateService(img.id);
        }
    });
});

// Default active on load
window.addEventListener("load", () => {
    scrollToImage("make-up");
});











// REVIEW SECTION

const track = document.getElementById("reviewTrack");
const cards = document.querySelectorAll(".review-card");
let index = 0;

function visibleCards() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function move(dir) {
    const maxIndex = cards.length - visibleCards();
    index = Math.max(0, Math.min(index + dir, maxIndex));

    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

document.querySelector(".prev-btn").onclick = () => move(-1);
document.querySelector(".next-btn").onclick = () => move(1);













// FAQs Section

document.querySelectorAll('.question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.closest('.item');

        document.querySelectorAll('.item.open').forEach(openItem => {
            if (openItem !== item) openItem.classList.remove('open');
        });

        item.classList.toggle('open');
    });
});








/*---------------------------------------------------*/
/*--------------   All  Animation Code   -------------*/
/*---------------------------------------------------*/


document.addEventListener("DOMContentLoaded", () => {
    const allRevealElements = document.querySelectorAll('[class*="reveal-"]');

    // 1) Group elements by parent AND by reveal class
    const parentMap = new Map();

    allRevealElements.forEach(el => {
        const parent = el.parentElement;
        if (!parent) return;

        // Find the main reveal-* class (exclude reveal-visible)
        const revealClass = [...el.classList].find(
            c => c.startsWith("reveal-") && c !== "reveal-visible"
        );
        if (!revealClass) return;

        if (!parentMap.has(parent)) {
            parentMap.set(parent, new Map());
        }

        const classMap = parentMap.get(parent);
        if (!classMap.has(revealClass)) {
            classMap.set(revealClass, []);
        }

        classMap.get(revealClass).push(el);
    });

    // 2) Apply stagger delay per reveal class inside each parent
    const STAGGER = 0.4; // seconds
    parentMap.forEach(classMap => {
        classMap.forEach(elements => {
            elements.forEach((el, index) => {
                el.style.transitionDelay = `${index * STAGGER}s`;
            });
        });
    });

    // 3) IntersectionObserver for scroll reveal (lightweight)
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    // After first reveal, stop observing (perf win)
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,            // triggers once it's slightly in view
            rootMargin: "0px 0px -10% 0px" // don't wait until fully visible
        }
    );

    allRevealElements.forEach(el => observer.observe(el));
});









