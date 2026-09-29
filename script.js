const projects = [
    {
        category: "Remodelação",
        title: "Casa de banho<br>Porto",
        description: "Reestruturação completa de uma casa de banho, com atenção ao conforto, à funcionalidade e à qualidade dos acabamentos.",
        link: "https://www.facebook.com/photo?fbid=506328185295516&set=pb.100077550159685.-2207520000"
    },
    {
        category: "Construção exterior",
        title: "Piscina<br>Famalicão",
        description: "Construção de piscina integrada no espaço exterior, com uma solução adequada ao terreno e à utilização da habitação.",
        link: "https://www.facebook.com/photo.php?fbid=310790821515921&set=pb.100077550159685.-2207520000&type=3"
    },
    {
        category: "Remodelação",
        title: "Habitação<br>Famalicão",
        description: "Intervenção de remodelação numa habitação em Famalicão, melhorando a imagem, o conforto e a utilização do espaço.",
        link: "https://www.facebook.com/p/MR-Constru%C3%A7%C3%B5es-100077550159685/"
    }
];

const slides = document.querySelectorAll(".hero-slide");
const category = document.getElementById("slide-category");
const number = document.getElementById("slide-number");
const title = document.getElementById("slide-title");
const description = document.getElementById("slide-description");
const link = document.getElementById("slide-link");
const previousButton = document.getElementById("previous-slide");
const nextButton = document.getElementById("next-slide");
const autoplayButton = document.getElementById("toggle-autoplay");
const detailsButton = document.getElementById("details-button");
const detailsPanel = document.getElementById("project-details");

let currentSlide = 0;
let autoplay = true;
let sliderTimer;

function closeDetails() {
    detailsButton.classList.remove("open");
    detailsButton.setAttribute("aria-expanded", "false");
    detailsPanel.classList.remove("open");
    detailsPanel.setAttribute("aria-hidden", "true");
}

function showSlide(index) {
    currentSlide = (index + projects.length) % projects.length;

    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === currentSlide);
    });

    const project = projects[currentSlide];
    category.textContent = project.category;
    number.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
    title.innerHTML = project.title;
    description.textContent = project.description;
    link.href = project.link;

    closeDetails();
}

function startAutoplay() {
    clearInterval(sliderTimer);

    if (autoplay) {
        sliderTimer = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5500);
    }
}

previousButton.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    startAutoplay();
});

nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    startAutoplay();
});

autoplayButton.addEventListener("click", () => {
    autoplay = !autoplay;
    autoplayButton.textContent = autoplay ? "Ⅱ" : "▶";
    autoplayButton.setAttribute(
        "aria-label",
        autoplay ? "Pausar apresentação" : "Retomar apresentação"
    );
    startAutoplay();
});

detailsButton.addEventListener("click", () => {
    const isOpen = detailsButton.classList.toggle("open");
    detailsButton.setAttribute("aria-expanded", String(isOpen));
    detailsPanel.classList.toggle("open", isOpen);
    detailsPanel.setAttribute("aria-hidden", String(!isOpen));
});

const comparisonRange = document.getElementById("comparison-range");
const comparisonBefore = document.getElementById("comparison-before-wrap");
const comparisonHandle = document.getElementById("comparison-handle");
const comparisonImage = document.querySelector(".comparison-before");

function updateComparison(value) {
    const percentage = Number(value);

    comparisonBefore.style.width = `${percentage}%`;
    comparisonHandle.style.left = `${percentage}%`;

    if (percentage > 0) {
        comparisonImage.style.setProperty(
            "--comparison-image-width",
            `${10000 / percentage}%`
        );
    }
}

comparisonRange.addEventListener("input", (event) => {
    updateComparison(event.target.value);
});

updateComparison(comparisonRange.value);

document.getElementById("current-year").textContent = new Date().getFullYear();

showSlide(0);
startAutoplay();