/* ================= TYPING EFFECT ================= */
const words = ["Full Stack Developer", "UI Specialist", "Problem Solver"];
let i = 0, j = 0;
const el = document.getElementById("typing");

function type() {
  if (j < words[i].length) {
    el.textContent += words[i][j++];
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1200);
  }
}

function erase() {
  if (j > 0) {
    el.textContent = words[i].slice(0, --j);
    setTimeout(erase, 60);
  } else {
    i = (i + 1) % words.length;
    setTimeout(type, 400);
  }
}
type();

/* ================= CURSOR ================= */
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  if (!cursor) return;
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* ================= STAGGER SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");

function staggerReveal() {
  reveals.forEach((el, index) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 120) {
      el.style.transitionDelay = `${index * 0.12}s`;
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", staggerReveal);
staggerReveal();

/* ================= ACTIVE NAV LINK ================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* ================= PROJECT FILTER ================= */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
        card.style.animation = "fadeUp .5s ease";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* ================= MOBILE TAP = HOVER EFFECT ================= */
projectCards.forEach(card => {
  card.addEventListener("click", () => {
    projectCards.forEach(c => c.classList.remove("active"));
    card.classList.toggle("active");
  });
});

/* ================= PROJECT MODAL ================= */
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.querySelector(".close");

if (modal) {
  projectCards.forEach(card => {
    card.addEventListener("dblclick", () => {
      const img = card.querySelector("img")?.src;
      const title = card.querySelector("h3")?.innerText;
      const desc = card.querySelector("p")?.innerText;

      modalImg.src = img;
      modalTitle.innerText = title;
      modalDesc.innerText = desc;

      modal.classList.add("show");
    });
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.classList.remove("show");
  });
}



/* ================= SMALL ANIMATION ================= */
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeUp{
  from{opacity:0; transform:translateY(20px)}
  to{opacity:1; transform:translateY(0)}
}
`;
document.head.appendChild(style);

/* ================= MOBILE MENU ================= */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

/* Auto close on link click */
mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});
