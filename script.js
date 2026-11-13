const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const navigationLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-current", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  },
  { rootMargin: "-30% 0px -60% 0px" },
);
document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".project-card").forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

const skillContent = {
  admin: {
    title: "Administration & Operations",
    copy: "Structured support for the everyday work that keeps teams moving.",
    tools: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Outlook", "Google Docs", "Google Sheets", "Google Drive"],
  },
  assist: {
    title: "Executive / Personal Assistance",
    copy: "Organisation, scheduling and follow-through in academic and support settings.",
    tools: ["Scheduling", "Document organisation", "Records management", "Data entry", "Spreadsheet updates", "Correspondence"],
  },
  client: {
    title: "Client Support & Communication",
    copy: "Clear, considerate communication and dependable follow-up.",
    tools: ["Client support", "Email correspondence", "Follow-ups", "Meeting coordination", "Digital communications"],
  },
  social: {
    title: "Social Media Strategy & Management",
    copy: "Practical account management, content coordination and consistent brand presentation.",
    tools: ["Instagram", "TikTok", "Content planning", "Caption writing", "Canva", "CapCut", "Photoshop"],
  },
  design: {
    title: "UI/UX & Design",
    copy: "Product and visual design tools used in concepts and project work.",
    tools: ["Figma", "Canva", "CapCut", "Photoshop", "Wireframing", "Visual editing"],
  },
  web: {
    title: "Web Development",
    copy: "Front-end and web application technologies used in academic and personal projects.",
    tools: ["HTML5", "CSS3", "JavaScript", "React.js", "Python", "Flask", "REST APIs", "Git", "GitHub", "VS Code"],
  },
  data: {
    title: "Programming & Data",
    copy: "Programming and data tools used across coursework and project work.",
    tools: ["Python", "Pandas", "Jupyter Notebook", "MongoDB", "Git", "GitHub", "Excel"],
  },
  ai: {
    title: "AI & Machine Learning Concepts",
    copy: "Introductory project exposure to AI and machine learning concepts.",
    tools: ["AI concepts", "scikit-learn", "spaCy", "Python", "Jupyter Notebook"],
  },
  travel: {
    title: "Travel Technology",
    copy: "Introductory exposure to reservation systems through travel administration work.",
    tools: ["Sabre · introductory exposure", "Amadeus · introductory exposure", "Travel documentation"],
  },
};

const skillTabs = [...document.querySelectorAll(".skill-tab")];
const skillPanel = document.querySelector("#skill-panel");
const skillTitle = document.querySelector("#skill-panel-title");
const skillCopy = document.querySelector("#skill-panel-copy");
const toolList = document.querySelector("#tool-list");

function selectSkillTab(tab, moveFocus = false) {
  const content = skillContent[tab.dataset.skill];
  if (!content) return;
  skillTabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  skillPanel.setAttribute("aria-labelledby", tab.id);
  skillTitle.textContent = content.title;
  skillCopy.textContent = content.copy;
  toolList.replaceChildren(...content.tools.map((tool) => {
    const chip = document.createElement("span");
    chip.className = "tool-chip";
    chip.textContent = tool;
    return chip;
  }));
  if (moveFocus) tab.focus();
}

skillTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectSkillTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % skillTabs.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + skillTabs.length) % skillTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = skillTabs.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      selectSkillTab(skillTabs[nextIndex], true);
    }
  });
});
selectSkillTab(skillTabs[0]);

const projects = {
  talent: {
    type: "Academic project · Web app",
    title: "Smart Talent Acquisition System",
    description: "A recruitment system concept combining a web interface with AI-assisted ideas. The project explores how a structured digital experience could support the talent acquisition process. Technologies and concepts include Python, Flask, React, MongoDB and AI.",
    tags: ["Python", "Flask", "React", "MongoDB", "AI concepts"],
  },
  vericart: {
    type: "E-commerce · Project",
    title: "VeriCart",
    description: "An e-commerce system project exploring product discovery and the online shopping experience. The image shown is a temporary visual mock-up, not a captured screen from the project.",
    tags: ["E-commerce", "Web development"],
  },
  skyne: {
    type: "Skincare app · Concept",
    title: "Skyne",
    description: "A skincare app concept developed as a product idea. I contributed in a CMO role. This visual is a conceptual placeholder and does not represent a finished interface.",
    tags: ["Skincare", "App concept", "CMO role"],
  },
  securelink: {
    type: "SOS · Demonstration",
    title: "SecureLink",
    description: "An SOS demonstration project presented at an exhibition. The graphic here is illustrative only and is not an authentic product screen.",
    tags: ["SOS demonstration", "Exhibition presenter"],
  },
  abixa: {
    type: "Social media · Planning",
    title: "Abixa Analytics",
    description: "Social media content planning work for Abixa Analytics. The calendar shown is a temporary portfolio mock-up, not an actual planning document.",
    tags: ["Content planning", "Social media"],
  },
  tedx: {
    type: "Campaign · Social media",
    title: "TEDx Veritas University",
    description: "Social media management and content coordination for TEDx Veritas University. Campaign content achieved over 67,000 organic views in 30 days.",
    tags: ["Social media", "Content coordination", "67,000+ organic views in 30 days"],
  },
  vuna: {
    type: "Digital communications",
    title: "VUNA CSC",
    description: "Established and managed Instagram and TikTok presence for VUNA CSC, with digital communications and announcements. The channel art shown is a placeholder mock-up.",
    tags: ["Instagram", "TikTok", "Digital communications"],
  },
};

const projectDialog = document.querySelector("#project-dialog");
const dialogVisual = document.querySelector("#dialog-visual");
const dialogType = document.querySelector("#dialog-type");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogGallery = document.querySelector("#dialog-gallery");
const dialogTags = document.querySelector("#dialog-tags");
const lightboxDialog = document.querySelector("#lightbox-dialog");
const lightboxVisual = document.querySelector("#lightbox-visual");

function closeDialog(dialog) {
  dialog.close();
  document.body.classList.remove("dialog-open");
}

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    const project = projects[card.dataset.project];
    if (!project) return;
    dialogVisual.replaceChildren(card.querySelector(".project-art").cloneNode(true));
    dialogType.textContent = project.type;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    dialogTags.replaceChildren(...project.tags.map((tag) => {
      const chip = document.createElement("span");
      chip.textContent = tag;
      return chip;
    }));
    dialogGallery.replaceChildren(...[0, 1, 2].map((index) => {
      const thumbnail = document.createElement("button");
      thumbnail.className = "gallery-thumb";
      thumbnail.type = "button";
      thumbnail.setAttribute("aria-label", `Enlarge temporary mock-up view ${index + 1} of ${project.title}`);
      const visual = card.querySelector(".project-art").cloneNode(true);
      visual.classList.add(`gallery-variation-${index + 1}`);
      thumbnail.append(visual);
      thumbnail.addEventListener("click", () => {
        lightboxVisual.replaceChildren(visual.cloneNode(true));
        projectDialog.close();
        lightboxDialog.showModal();
        document.body.classList.add("dialog-open");
      });
      return thumbnail;
    }));
    projectDialog.showModal();
    document.body.classList.add("dialog-open");
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => closeDialog(projectDialog));
document.querySelector(".lightbox-close").addEventListener("click", () => closeDialog(lightboxDialog));
[projectDialog, lightboxDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener("close", () => {
    if (!projectDialog.open && !lightboxDialog.open) document.body.classList.remove("dialog-open");
  });
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

function pdfEscape(value) {
  return value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function createPlaceholderPdf() {
  const lines = [
    "EJINDU BLESSING MMESOMACHUKWU",
    "CURRICULUM VITAE",
    "",
    "TEMPORARY PLACEHOLDER - NOT A REAL CV",
    "",
    "This portfolio download is a temporary placeholder.",
    "Replace this file with your authentic CV before sharing.",
    "",
    "Contact: blessingejindu96@gmail.com",
    "Location: Abuja, Nigeria",
    "Portfolio: Administrative Operations | Technology | Digital Strategy",
  ];
  const textCommands = lines.map((line, index) => {
    const fontSize = index === 0 ? 17 : index === 1 ? 12 : 10;
    const y = 735 - index * 34;
    return `/F1 ${fontSize} Tf 1 0 0 1 70 ${y} Tm (${pdfEscape(line)}) Tj`;
  }).join("\n");
  const stream = `BT\n${textCommands}\nET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${new TextEncoder().encode(stream).length} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(new TextEncoder().encode(pdf).length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = new TextEncoder().encode(pdf).length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

document.querySelector("#download-cv").addEventListener("click", () => {
  const url = URL.createObjectURL(createPlaceholderPdf());
  const download = document.createElement("a");
  download.href = url;
  download.download = "Ejindu-Blessing-CV-PLACEHOLDER.pdf";
  document.body.append(download);
  download.click();
  download.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
});

const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");
contactForm.addEventListener("invalid", () => {
  formFeedback.textContent = "Please complete all fields and check that your email address is valid.";
  formFeedback.classList.add("is-error");
}, true);
contactForm.addEventListener("input", () => {
  formFeedback.textContent = "";
  formFeedback.classList.remove("is-error");
});
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formFeedback.classList.remove("is-error");
  if (!contactForm.reportValidity()) {
    formFeedback.textContent = "Please complete each field with a valid email address.";
    formFeedback.classList.add("is-error");
    return;
  }
  const formData = new FormData(contactForm);
  const name = String(formData.get("name")).trim();
  const senderEmail = String(formData.get("email")).trim();
  const message = String(formData.get("message")).trim();
  if (name.length < 2 || message.length < 10) {
    formFeedback.textContent = "Please enter your name and a message of at least 10 characters.";
    formFeedback.classList.add("is-error");
    return;
  }
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${senderEmail}\n\n${message}`);
  window.location.href = `mailto:blessingejindu96@gmail.com?subject=${subject}&body=${body}`;
  formFeedback.textContent = "Your email app should open with your message ready. If it doesn’t, email blessingejindu96@gmail.com directly.";
});
