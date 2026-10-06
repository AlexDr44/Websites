// ---------- Reservation Form ----------

const reservationForm = document.getElementById("reservation-form");
const reservationConfirmation = document.getElementById("reservation-confirmation");

reservationForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value;

    const formData = new FormData(reservationForm);

    try {

        const response = await fetch(reservationForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {

            reservationConfirmation.innerHTML = `
                <h3>Reservation Request Received!</h3>

                <p>Thank you, ${name}!</p>

                <p>Your reservation request has been received.</p>

                <p>
                    <strong>Date:</strong> ${date}<br>
                    <strong>Time:</strong> ${time}<br>
                    <strong>Guests:</strong> ${guests}
                </p>

                <p>
                    We will contact you shortly to confirm your table.
                </p>
            `;

            reservationConfirmation.style.display = "block";

            reservationConfirmation.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            reservationForm.reset();

        } else {

            reservationConfirmation.innerHTML = `
                <h3>Something went wrong</h3>

                <p>
                    We couldn't send your reservation request.
                    Please try again.
                </p>
            `;

            reservationConfirmation.style.display = "block";
        }

    } catch (error) {

        reservationConfirmation.innerHTML = `
            <h3>Something went wrong</h3>

            <p>
                Please check your internet connection and try again.
            </p>
        `;

        reservationConfirmation.style.display = "block";
    }

});


// ---------- Mobile Menu ----------

const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

menuToggle.addEventListener("click", function() {
    mobileNav.classList.toggle("active");
});


// ---------- Back to Top Button ----------

const backToTop = document.getElementById("back-to-top");

if (backToTop) {

    window.addEventListener("scroll", function() {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", function() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// ---------- Active Navigation Link ----------

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", function() {

    let currentSection = "";

    sections.forEach(function(section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(function(link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


// ---------- Section Reveal Animation ----------

const revealElements = document.querySelectorAll(
    ".about, .menu, .reservation, .gallery, .contact"
);

const revealObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(function(element) {

    element.classList.add("reveal");
    revealObserver.observe(element);

});


// ---------- Prevent Past Reservation Dates ----------

const reservationDate = document.getElementById("date");

if (reservationDate) {
    reservationDate.min = new Date().toISOString().split("T")[0];
}


// ---------- Gallery Lightbox ----------

const galleryImages = document.querySelectorAll(".gallery-grid img");
const galleryLightbox = document.getElementById("gallery-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let currentImageIndex = 0;

function showGalleryImage(index) {

    currentImageIndex = index;

    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxImage.alt = galleryImages[currentImageIndex].alt;

    galleryLightbox.classList.add("active");
}

galleryImages.forEach(function(image, index) {

    image.addEventListener("click", function() {
        showGalleryImage(index);
    });

});

lightboxClose.addEventListener("click", function() {
    galleryLightbox.classList.remove("active");
});

lightboxNext.addEventListener("click", function() {

    currentImageIndex++;

    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    showGalleryImage(currentImageIndex);

});

lightboxPrev.addEventListener("click", function() {

    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    showGalleryImage(currentImageIndex);

});

galleryLightbox.addEventListener("click", function(event) {

    if (event.target === galleryLightbox) {
        galleryLightbox.classList.remove("active");
    }

});


// ---------- Gallery Keyboard Controls ----------

document.addEventListener("keydown", function(event) {

    if (!galleryLightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        galleryLightbox.classList.remove("active");
    }

    if (event.key === "ArrowRight") {

        currentImageIndex++;

        if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }

        showGalleryImage(currentImageIndex);
    }

    if (event.key === "ArrowLeft") {

        currentImageIndex--;

        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        }

        showGalleryImage(currentImageIndex);
    }

});


// ---------- Feature Details Toggle ----------

const featureButtons = document.querySelectorAll(".feature-button");

featureButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const details = button.nextElementSibling;

        details.classList.toggle("active");

        if (details.classList.contains("active")) {
            button.textContent = "Show Less";
        } else {
            button.textContent = "Discover More";
        }

    });

});


// ---------- Menu Category Filter ----------

const menuFilters = document.querySelectorAll(".menu-filter");
const menuCategories = document.querySelectorAll(".menu-category");

menuFilters.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCategory = button.dataset.category;

        menuFilters.forEach(function(filter) {
            filter.classList.remove("active");
        });

        button.classList.add("active");

        menuCategories.forEach(function(category) {

            if (
                selectedCategory === "all" ||
                category.dataset.category === selectedCategory
            ) {
                category.classList.remove("hidden");
            } else {
                category.classList.add("hidden");
            }

        });

    });

});


// ---------- FAQ Accordion ----------

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question) {

    question.addEventListener("click", function() {

        const faqItem = question.parentElement;

        faqItem.classList.toggle("active");

    });

});


// ---------- Language Switcher ----------

const languageButtons = document.querySelectorAll(".language-button");

const translations = {

    // ---------- English ----------

    en: {

        about: "About",
        menu: "Menu",
        whyUs: "Why Us",
        gallery: "Gallery",
        faq: "FAQ",
        contact: "Contact",
        reservation: "Reserve a Table",

        heroEyebrow: "Traditional Cretan Cuisine",
        heroTitle: "A Taste of Crete,<br>Served With Heart.",
        heroText: "Authentic recipes, local ingredients and the warm hospitality of Crete — right in the heart of Chania.",

        aboutTitle: "Our Story",
        aboutTextTitle: "A Taste of Home",

        aboutText1: "Cretan Table was born from a love for the flavours, traditions and hospitality of Crete.",
        aboutText2: "Our kitchen brings together authentic recipes, fresh local ingredients and the warmth of a traditional Cretan table.",
        aboutText3: "Our recipes are inspired by generations of Cretan cooking, using fresh local ingredients, traditional techniques and plenty of love.",
        aboutText4: "Whether you're visiting Chania or simply looking for a taste of Greece, we welcome you like family.",

        whyUsEyebrow: "Why Cretan Table",

        feature1Title: "Local Ingredients",
        feature1Text: "Fresh ingredients inspired by the land, sea and villages of Crete.",
        feature1Details: "We choose fresh vegetables, herbs, olive oil and other ingredients inspired by the Cretan landscape.",

        feature2Title: "Traditional Recipes",
        feature2Text: "Authentic Cretan recipes prepared with respect for generations of tradition.",
        feature2Details: "Our dishes are inspired by traditional Cretan cooking and recipes passed down through generations.",

        feature3Title: "Cretan Hospitality",
        feature3Text: "Warm service and a welcoming atmosphere inspired by the spirit of Crete.",
        feature3Details: "We want every guest to feel welcome, relaxed and at home, just like sharing a meal with family in Crete.",

        menuEyebrow: "Our Menu",

        startersTitle: "Starters",
        mainsTitle: "Main Courses",
        dessertsTitle: "Desserts",

        filterAll: "All",
        filterStarters: "Starters",
        filterMains: "Main Courses",
        filterDesserts: "Desserts",

        dailySpecialEyebrow: "Today's Special",
        dailySpecialTitle: "Cretan Lamb with Herbs",
        dailySpecialText: "Slow-cooked local lamb with fresh herbs, potatoes and a traditional Cretan sauce.",

        menuNote: "Our menu changes with the seasons and the freshest local ingredients.",

        menuItem1Title: "Cretan Dakos",
menuItem1Text: "Barley rusk, tomato, feta, olive oil and herbs.",

menuItem2Title: "Fried Courgettes",
menuItem2Text: "Crispy courgette slices served with yogurt dip.",

menuItem3Title: "Grilled Halloumi",
menuItem3Text: "Grilled halloumi with honey and sesame.",

menuItem4Title: "Village Salad",
menuItem4Text: "Tomato, cucumber, olives, feta and extra virgin olive oil.",

menuItem5Title: "Slow-Cooked Cretan Lamb",
menuItem5Text: "Tender lamb slowly cooked with herbs and potatoes.",

menuItem6Title: "Beef Stifado",
menuItem6Text: "Traditional beef stew with onions and red wine.",

menuItem7Title: "Gemista",
menuItem7Text: "Tomatoes and peppers stuffed with rice and herbs.",

menuItem8Title: "Grilled Sea Bream",
menuItem8Text: "Fresh sea bream with lemon, olive oil and herbs.",

menuItem9Title: "Greek Yogurt & Honey",
menuItem9Text: "Thick Greek yogurt with local honey and walnuts.",

menuItem10Title: "Baklava",
menuItem10Text: "Traditional pastry with nuts and honey syrup.",

menuItem11Title: "Loukoumades",
menuItem11Text: "Greek honey doughnuts with cinnamon and honey.",

        menuTitle: "Traditional Cretan Flavours",
        galleryTitle: "A Taste of Crete",
        faqTitle: "Good to Know",
        testimonialsTitle: "What Our Guests Say"

    },


    // ---------- Greek ----------

    el: {

        about: "Σχετικά",
        menu: "Μενού",
        whyUs: "Γιατί Εμάς",
        gallery: "Γκαλερί",
        faq: "Συχνές Ερωτήσεις",
        contact: "Επικοινωνία",
        reservation: "Κλείστε Τραπέζι",

        heroEyebrow: "Παραδοσιακή Κρητική Κουζίνα",
        heroTitle: "Μια Γεύση από την Κρήτη,<br>Σερβιρισμένη με Αγάπη.",
        heroText: "Αυθεντικές συνταγές, τοπικά υλικά και η ζεστή φιλοξενία της Κρήτης — στην καρδιά των Χανίων.",

        aboutTitle: "Η Ιστορία μας",
        aboutTextTitle: "Μια Γεύση από το Σπίτι",

        aboutText1: "Το Cretan Table γεννήθηκε απο την αγάπη μας για τις γεύσεις, τις παραδόσεις και τη φιλοξενία της Κρήτης.",
        aboutText2: "Η κουζίνα μας συνδυάζει αυθεντικές συνταγές, φρέσκα τοπικά υλικά και τη ζεστασιά ενός παραδοσιακού κρητικού τραπεζιού.",
        aboutText3: "Οι συνταγές μας είναι εμπνευσμένες από γενιές κρητικής μαγειρικής, με φρέσκα τοπικά υλικά, παραδοσιακές τεχνικές και πολλή αγάπη.",
        aboutText4: "Είτε επισκέπτεστε τα Χανιά είτε απλώς αναζητάτε μια γεύση από την Ελλάδα, σας υποδεχόμαστε σαν οικογένεια.",

        whyUsEyebrow: "Γιατί Cretan Table",

        feature1Title: "Τοπικά Υλικά",
        feature1Text: "Φρέσκα υλικά εμπνευσμένα από τη γη, τη θάλασσα και τα χωριά της Κρήτης.",
        feature1Details: "Επιλέγουμε φρέσκα λαχανικά, βότανα, ελαιόλαδο και άλλα υλικά εμπνευσμένα από το κρητικό τοπίο.",

        feature2Title: "Παραδοσιακές Συνταγές",
        feature2Text: "Αυθεντικές κρητικές συνταγές, με σεβασμό σε μια παράδοση γενεών.",
        feature2Details: "Τα πιάτα μας είναι εμπνευσμένα από την παραδοσιακή κρητική κουζίνα και συνταγές που περνούν από γενιά σε γενιά.",

        feature3Title: "Κρητική Φιλοξενία",
        feature3Text: "Ζεστή εξυπηρέτηση και μια φιλόξενη ατμόσφαιρα εμπνευσμένη από το πνεύμα της Κρήτης.",
        feature3Details: "Θέλουμε κάθε επισκέπτης να νιώθει άνετα, χαλαρά και σαν στο σπίτι του, όπως όταν μοιράζεσαι ένα γεύμα με την οικογένειά σου στην Κρήτη.",

        menuEyebrow: "Το Μενού μας",

        startersTitle: "Ορεκτικά",
        mainsTitle: "Κυρίως Πιάτα",
        dessertsTitle: "Επιδόρπια",

        filterAll: "Όλα",
        filterStarters: "Ορεκτικά",
        filterMains: "Κυρίως Πιάτα",
        filterDesserts: "Επιδόρπια",

        dailySpecialEyebrow: "Η Σημερινή Πρόταση",
        dailySpecialTitle: "Κρητικό Αρνί με Μυρωδικά",
        dailySpecialText: "Αργομαγειρεμένο ντόπιο αρνί με φρέσκα μυρωδικά, πατάτες και παραδοσιακή κρητική σάλτσα.",

        menuNote: "Το μενού μας αλλάζει ανάλογα με την εποχή και τα πιο φρέσκα τοπικά υλικά.",

        menuItem1Title: "Κρητικός Ντάκος",
menuItem1Text: "Κριθαρένιο παξιμάδι, ντομάτα, φέτα, ελαιόλαδο και μυρωδικά.",

menuItem2Title: "Τηγανητά Κολοκυθάκια",
menuItem2Text: "Τραγανές φέτες κολοκυθιού με σως γιαουρτιού.",

menuItem3Title: "Ψητό Χαλούμι",
menuItem3Text: "Ψητό χαλούμι με μέλι και σουσάμι.",

menuItem4Title: "Χωριάτικη Σαλάτα",
menuItem4Text: "Ντομάτα, αγγούρι, ελιές, φέτα και έξτρα παρθένο ελαιόλαδο.",

menuItem5Title: "Κρητικό Αρνί Σιγομαγειρεμένο",
menuItem5Text: "Τρυφερό αρνί σιγομαγειρεμένο με μυρωδικά και πατάτες.",

menuItem6Title: "Μοσχάρι Στιφάδο",
menuItem6Text: "Παραδοσιακό μοσχαρίσιο στιφάδο με κρεμμύδια και κόκκινο κρασί.",

menuItem7Title: "Γεμιστά",
menuItem7Text: "Ντομάτες και πιπεριές γεμιστές με ρύζι και μυρωδικά.",

menuItem8Title: "Ψητή Τσιπούρα",
menuItem8Text: "Φρέσκια τσιπούρα με λεμόνι, ελαιόλαδο και μυρωδικά.",

menuItem9Title: "Ελληνικό Γιαούρτι & Μέλι",
menuItem9Text: "Παχύ ελληνικό γιαούρτι με ντόπιο μέλι και καρύδια.",

menuItem10Title: "Μπακλαβάς",
menuItem10Text: "Παραδοσιακό γλυκό με ξηρούς καρπούς και σιρόπι μελιού.",

menuItem11Title: "Λουκουμάδες",
menuItem11Text: "Ελληνικοί λουκουμάδες με κανέλα και μέλι.",

        menuTitle: "Παραδοσιακές Κρητικές Γεύσεις",
        galleryTitle: "Μια Γεύση από την Κρήτη",
        faqTitle: "Χρήσιμες Πληροφορίες",
        testimonialsTitle: "Τι Λένε οι Επισκέπτες μας"

    }

};


// ---------- Change Language ----------

function changeLanguage(language) {

    const translation = translations[language];

    if (!translation) {
        return;
    }


    // ---------- Navigation ----------

    const navLinks = document.querySelectorAll(".navbar nav a");

    navLinks[0].textContent = translation.about;
    navLinks[1].textContent = translation.menu;
    navLinks[2].textContent = translation.whyUs;
    navLinks[3].textContent = translation.gallery;
    navLinks[4].textContent = translation.faq;
    navLinks[5].textContent = translation.contact;
    navLinks[6].textContent = translation.reservation;


    // ---------- Hero ----------

    const heroEyebrow = document.querySelector(".hero .eyebrow");
    const heroTitle = document.querySelector(".hero h1");
    const heroText = document.querySelector(".hero-text");

    if (heroEyebrow) {
        heroEyebrow.textContent = translation.heroEyebrow;
    }

    if (heroTitle) {
        heroTitle.innerHTML = translation.heroTitle;
    }

    if (heroText) {
        heroText.textContent = translation.heroText;
    }


    // ---------- About Section ----------

    const aboutTitle = document.querySelector(".about-text h2");
    const aboutParagraphs = document.querySelectorAll(".about-text p");

    if (aboutTitle) {
        aboutTitle.textContent = translation.aboutTextTitle;
    }

    if (aboutParagraphs.length >= 4) {

        aboutParagraphs[0].textContent = translation.aboutText1;
        aboutParagraphs[1].textContent = translation.aboutText2;
        aboutParagraphs[2].textContent = translation.aboutText3;
        aboutParagraphs[3].textContent = translation.aboutText4;

    }


    // ---------- Section Headings ----------

    const sectionHeadings = document.querySelectorAll(
        ".about h2, .why-choose-us h2, .menu h2, .testimonials h2, .faq h2, .contact h2"
    );

    if (sectionHeadings.length >= 6) {

        sectionHeadings[0].textContent = translation.aboutTitle;
        sectionHeadings[1].textContent = translation.whyUs;
        sectionHeadings[2].textContent = translation.menuTitle;
        sectionHeadings[3].textContent = translation.testimonialsTitle;
        sectionHeadings[4].textContent = translation.faqTitle;
        sectionHeadings[5].textContent = translation.contact;

    }


    // ---------- Why Us Section ----------

    const whyUsEyebrow = document.querySelector(
        ".why-choose-us .eyebrow"
    );

    const featureTitles = document.querySelectorAll(
        ".feature h3"
    );

    const featureTexts = document.querySelectorAll(
        ".feature > p:not(.feature-details)"
    );

    const featureDetails = document.querySelectorAll(
        ".feature-details"
    );

    if (whyUsEyebrow) {
        whyUsEyebrow.textContent = translation.whyUsEyebrow;
    }

    if (featureTitles.length >= 3) {

        featureTitles[0].textContent = translation.feature1Title;
        featureTitles[1].textContent = translation.feature2Title;
        featureTitles[2].textContent = translation.feature3Title;

    }

    if (featureTexts.length >= 3) {

        featureTexts[0].textContent = translation.feature1Text;
        featureTexts[1].textContent = translation.feature2Text;
        featureTexts[2].textContent = translation.feature3Text;

    }

    if (featureDetails.length >= 3) {

        featureDetails[0].textContent = translation.feature1Details;
        featureDetails[1].textContent = translation.feature2Details;
        featureDetails[2].textContent = translation.feature3Details;

    }


    // ---------- Menu Section ----------

    const menuEyebrow = document.querySelector(
        ".menu .eyebrow"
    );

    const menuCategoryTitles = document.querySelectorAll(
        ".menu-category h3"
    );

    const menuFilterButtons = document.querySelectorAll(
        ".menu-filter"
    );

    const dailySpecialEyebrow = document.querySelector(
        ".daily-special .eyebrow"
    );

    const dailySpecialTitle = document.querySelector(
        ".daily-special h3"
    );

    const dailySpecialText = document.querySelector(
        ".daily-special p:not(.eyebrow)"
    );


    if (menuEyebrow) {
        menuEyebrow.textContent = translation.menuEyebrow;
    }


    if (menuCategoryTitles.length >= 3) {

        menuCategoryTitles[0].textContent =
            translation.startersTitle;

        menuCategoryTitles[1].textContent =
            translation.mainsTitle;

        menuCategoryTitles[2].textContent =
            translation.dessertsTitle;

    }


    if (menuFilterButtons.length >= 4) {

        menuFilterButtons[0].textContent =
            translation.filterAll;

        menuFilterButtons[1].textContent =
            translation.filterStarters;

        menuFilterButtons[2].textContent =
            translation.filterMains;

        menuFilterButtons[3].textContent =
            translation.filterDesserts;

    }


    if (dailySpecialEyebrow) {
        dailySpecialEyebrow.textContent =
            translation.dailySpecialEyebrow;
    }

    if (dailySpecialTitle) {
        dailySpecialTitle.textContent =
            translation.dailySpecialTitle;
    }

    if (dailySpecialText) {
        dailySpecialText.textContent =
            translation.dailySpecialText;
    }

        // ---------- Menu Items ----------

    const menuItems = document.querySelectorAll(
        ".menu-item"
    );

    const menuItemTitles = document.querySelectorAll(
        ".menu-item h4"
    );

    const menuItemTexts = document.querySelectorAll(
        ".menu-item p"
    );

    if (menuItemTitles.length >= 11) {

        menuItemTitles[0].textContent = translation.menuItem1Title;
        menuItemTitles[1].textContent = translation.menuItem2Title;
        menuItemTitles[2].textContent = translation.menuItem3Title;
        menuItemTitles[3].textContent = translation.menuItem4Title;
        menuItemTitles[4].textContent = translation.menuItem5Title;
        menuItemTitles[5].textContent = translation.menuItem6Title;
        menuItemTitles[6].textContent = translation.menuItem7Title;
        menuItemTitles[7].textContent = translation.menuItem8Title;
        menuItemTitles[8].textContent = translation.menuItem9Title;
        menuItemTitles[9].textContent = translation.menuItem10Title;
        menuItemTitles[10].textContent = translation.menuItem11Title;

    }

    if (menuItemTexts.length >= 11) {

        menuItemTexts[0].textContent = translation.menuItem1Text;
        menuItemTexts[1].textContent = translation.menuItem2Text;
        menuItemTexts[2].textContent = translation.menuItem3Text;
        menuItemTexts[3].textContent = translation.menuItem4Text;
        menuItemTexts[4].textContent = translation.menuItem5Text;
        menuItemTexts[5].textContent = translation.menuItem6Text;
        menuItemTexts[6].textContent = translation.menuItem7Text;
        menuItemTexts[7].textContent = translation.menuItem8Text;
        menuItemTexts[8].textContent = translation.menuItem9Text;
        menuItemTexts[9].textContent = translation.menuItem10Text;
        menuItemTexts[10].textContent = translation.menuItem11Text;

    }


    // ---------- Language Buttons ----------

    languageButtons.forEach(function(button) {

        button.classList.remove("active");

        if (button.dataset.language === language) {
            button.classList.add("active");
        }

    });

}


// ---------- Language Button Events ----------

languageButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        changeLanguage(button.dataset.language);

    });

});