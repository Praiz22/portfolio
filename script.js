// REAL-WORLD NORMALIZED PROJECT DATA OBJECTS
const graphicProjects = [
    { id: 1, name: "Educational Brand Identity", industry: "Education ", tools: "Corel Draw, Adobe Illustrator", image: "june flyer.webp?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Latter Glory School Portal Interface", industry: "Academic Management", tools: "Adobe Photoshop, Tailwind UI", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Random Design", industry: "All Industry", tools: "Corel Draw, CorelDraw Suite", image: "mds.webp?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Brand Identity Design", industry: "Winery, Food and Consumption", industry: "Events & Promotion", tools: "Corel Draw, Blender 3D", image: "mock and proper_converted.webp?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Church Program", industry: "Religion", tools: "Corel Draw, Sketch", image: "shiloh.webp?auto=format&fit=crop&w=600&q=80" },
    { id: 7, name: "Mother's Day", industry: "Education", tools: "Adobe Illustrator, Photoshop", image: "motherday.webp?auto=format&fit=crop&w=600&q=80" },
    { id: 8, name: "Children's Day", industry: "Education", tools: "Corel Draw, After Effects", image: "children's day.webp?auto=format&fit=crop&w=600&q=80" },
    { id: 9, name: "Enterprise Threat Assessment Infographics", industry: "Network Security", tools: "Blender, Adobe Photoshop", image: "cdc.webp?auto=format&fit=crop&w=600&q=80" },
    { id: 10, name: "Pros and Cons of AI", industry: "Deep Learning Software", tools: "Corel Draw, Midjourney", image: "live.webp?auto=format&fit=crop&w=600&q=80" }
];

const softwareProjects = [
    { id: 1, title: "Latter Glory Comprehensive School Portal", stack: "Vue.js, Firebase Backend, Tailwind", desc: "Engineered a production-level institutional system to streamline real-time student profiling, robust administrative control tracking panels, and responsive grade assessment models.", gitLink: "https://github.com/Praiz22", isCode: true },
    { id: 2, title: "SWEP Academic Event Management Hub", stack: "Vanilla JS, Supabase DB, Bootstrap", desc: "A robust custom reservation system deployed with relational database architectures to handle live seating allocations, unique ticket token authentication, and strict capacity controls.", gitLink: "https://github.com/Praiz22", isCode: true },
    { id: 3, title: "PraixTech Internal Workflow Automations", stack: "Python Runtime, Google Apps Script", desc: "Built dynamic script packages optimization protocols linking automated external lead capture structures with enterprise client tracking systems.", gitLink: "https://github.com/Praiz22", isCode: true },
    { id: 4, title: "Secure Multi-Tenant REST API Gateway", stack: "Node.js, Express, PostgreSQL", desc: "Developed highly resilient network mediation middleware supporting encrypted access layers, transaction scaling pools, and minimized network request latencies.", gitLink: "https://github.com/Praiz22", isCode: true },
    { id: 5, title: "Performance & Stress Metric Interface", stack: "React Engine, Tailwind CSS, Chart.js", desc: "Designed a premium glassmorphic tracking frontend framework evaluating organizational efficiency metrics and visual data trends over specified operational timelines.", gitLink: "https://github.com/Praiz22", isCode: true },
    { id: 6, title: "High-Throughput Inventory Pipeline", stack: "Go (Golang), Redis Cache, Docker", desc: "Engineered an asynchronous processing network microservice protecting storage inventory balances against transaction race conditions during surge event volumes.", gitLink: "https://github.com/Praiz22", isCode: true },
    { id: 7, title: "Automated Graphic Vector Pre-processor", stack: "Python ML, PyTorch, FastAPI Core", desc: "Implemented an edge-server workflow engine executing algorithmic taxonomy generation and metadata rendering directly onto user asset records.", gitLink: "https://github.com/Praiz22", isCode: true }
];

// INTERACTIVE HERO TYPEWRITER
const phrases = ["a Full-Stack Developer.", "a Graphic Designer.", "a UI/UX Specialist."];
let phraseIdx = 0, letterIdx = 0, isDeleting = false;
const typewriterTarget = document.getElementById("typewriter");

function handleTypewriter() {
    const currentPhrase = phrases[phraseIdx];
    if (isDeleting) {
        typewriterTarget.textContent = currentPhrase.substring(0, letterIdx - 1);
        letterIdx--;
    } else {
        typewriterTarget.textContent = currentPhrase.substring(0, letterIdx + 1);
        letterIdx++;
    }
    let typeSpeed = isDeleting ? 40 : 100;
    if (!isDeleting && letterIdx === currentPhrase.length) { typeSpeed = 2200; isDeleting = true; }
    else if (isDeleting && letterIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; typeSpeed = 400; }
    setTimeout(handleTypewriter, typeSpeed);
}
setTimeout(handleTypewriter, 500);

// INTERSECTION SCROLL STATISTICS NUMBERS ANIMATION
const counterObs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.querySelectorAll('.counter-value').forEach(counter => {
                const maxVal = +counter.getAttribute('data-target');
                let count = 0;
                const pace = Math.ceil(maxVal / 30);
                const trigger = () => {
                    count += pace;
                    if(count >= maxVal) { counter.textContent = maxVal; }
                    else { counter.textContent = count; requestAnimationFrame(trigger); }
                };
                trigger();
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
counterObs.observe(document.getElementById('counters'));

// CAROUSEL 1: 3D CYLINDRICAL GALLERY TRACK ENGINE
const container = document.getElementById("carouselContainer");
const track = document.getElementById("carouselTrack");
const totalGraphics = graphicProjects.length;

let currentRotation = 0;
let baseRotationSpeed = -0.12; 
let currentSpeed = baseRotationSpeed;
let isInteracting = false;
let startX = 0, originalRotation = 0, lastX = 0, velocityX = 0;

function calculateRadius() {
    if (window.innerWidth < 640) return 200;
    if (window.innerWidth < 1024) return 320;
    return 460;
}
let radiusDepth = calculateRadius();
window.addEventListener('resize', () => { radiusDepth = calculateRadius(); });

function buildGraphicsCarousel() {
    graphicProjects.forEach((proj, idx) => {
        const el = document.createElement("div");
        el.className = "carousel-item glass-card rounded-2xl overflow-hidden p-1.5 shadow-2xl transition-all";
        el.innerHTML = `
            <div class="w-full h-full rounded-xl overflow-hidden relative">
                <img src="${proj.image}" alt="${proj.name}" class="w-full h-full object-cover pointer-events-none">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/20 to-transparent p-3 sm:p-4 flex flex-col justify-end">
                    <span class="text-[9px] font-mono uppercase font-bold tracking-widest text-orange-400 mb-0.5">${proj.industry}</span>
                    <h3 class="text-[11px] sm:text-xs font-bold text-white line-clamp-2 leading-snug">${proj.name}</h3>
                </div>
            </div>
        `;
        el.addEventListener("click", () => {
            if (Math.abs(velocityX) > 0.3) return;
            const normalizedDeg = (-(currentRotation) % 360 + 360) % 360;
            const targetDeg = (idx * (360 / totalGraphics)) % 360;
            let diff = targetDeg - normalizedDeg;
            if (diff > 180) diff -= 360; if (diff < -180) diff += 360;
            if (Math.abs(diff) < 20) openModalTrigger(proj, false);
            else currentRotation = -(idx * (360 / totalGraphics));
        });
        track.appendChild(el);
    });
}

function animationLoopEngine() {
    if (!isInteracting) {
        currentRotation += currentSpeed;
        if (Math.abs(currentSpeed - baseRotationSpeed) > 0.01) currentSpeed += (baseRotationSpeed - currentSpeed) * 0.06;
    } else {
        currentRotation += velocityX;
        velocityX *= 0.94;
    }
    const items = track.querySelectorAll(".carousel-item");
    const angleStep = 360 / totalGraphics;
    items.forEach((item, idx) => {
        let angle = (idx * angleStep) + currentRotation;
        item.style.transform = `rotateY(${angle}deg) translateZ(${radiusDepth}px)`;
        let norm = ((angle % 360) + 360) % 360;
        if (norm > 180) norm = 360 - norm;
        
        if (norm < 45) { item.style.opacity = "1"; item.style.filter = "none"; item.style.zIndex = "40"; item.style.pointerEvents = "auto"; }
        else if (norm < 90) { item.style.opacity = "0.6"; item.style.filter = "blur(1px)"; item.style.zIndex = "30"; item.style.pointerEvents = "auto"; }
        else if (norm < 135) { item.style.opacity = "0.2"; item.style.filter = "blur(3px)"; item.style.zIndex = "20"; item.style.pointerEvents = "none"; }
        else { item.style.opacity = "0.05"; item.style.zIndex = "10"; item.style.pointerEvents = "none"; }
    });
    requestAnimationFrame(animationLoopEngine);
}

function dragStart(x) { isInteracting = true; startX = x; lastX = x; originalRotation = currentRotation; velocityX = 0; }
function dragMove(x) { if (!isInteracting) return; let dx = x - startX; let sensitivity = window.innerWidth < 640 ? 0.32 : 0.18; currentRotation = originalRotation + (dx * sensitivity); velocityX = (x - lastX) * sensitivity; lastX = x; }
function dragEnd() { if (!isInteracting) return; isInteracting = false; if (Math.abs(velocityX) > 0.3) currentSpeed = velocityX; }

container.addEventListener("mousedown", (e) => dragStart(e.clientX));
window.addEventListener("mousemove", (e) => dragMove(e.clientX));
window.addEventListener("mouseup", () => dragEnd());
container.addEventListener("touchstart", (e) => dragStart(e.touches[0].clientX));
window.addEventListener("touchmove", (e) => dragMove(e.touches[0].clientX));
window.addEventListener("touchend", () => dragEnd());

document.getElementById("prevBtn").addEventListener("click", () => { currentSpeed = 4.5; });
document.getElementById("nextBtn").addEventListener("click", () => { currentSpeed = -4.5; });


// CAROUSEL 2: 3D SOFTWARE CASCADE STACK DECK ENGINE
const deckContainer = document.getElementById("deckContainer");
let deckIndex = 0;
const totalDeckItems = softwareProjects.length;

function buildSoftwareDeck() {
    softwareProjects.forEach((proj, idx) => {
        const card = document.createElement("div");
        card.className = "deck-item glass-card rounded-2xl p-5 sm:p-7 flex flex-col justify-between border-t-2 border-t-orange-500/20 group hover:border-orange-500/50 shadow-2xl";
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between items-start">
                    <span class="text-[9px] font-mono font-bold text-orange-400 tracking-wider bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20 max-w-[180px] sm:max-w-none truncate">${proj.stack}</span>
                    <div class="flex gap-1 opacity-30 group-hover:opacity-100 transition-opacity">
                        <span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        <span class="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                    </div>
                </div>
                <h3 class="text-sm sm:text-lg font-bold text-white tracking-tight pt-0.5 line-clamp-1">${proj.title}</h3>
                <p class="text-[11px] sm:text-xs text-gray-400 font-light leading-relaxed line-clamp-3 sm:line-clamp-4">${proj.desc}</p>
            </div>
            <div class="pt-3 flex items-center justify-between border-t border-white/5">
                <span class="text-[9px] font-mono text-gray-500">PROJECT // 0${proj.id}</span>
                <span class="text-[11px] font-semibold text-orange-400 group-hover:text-orange-300 flex items-center gap-1">Project Details &rarr;</span>
            </div>
        `;
        card.addEventListener("click", () => {
            if (idx === deckIndex) { openModalTrigger(proj, true); }
            else { deckIndex = idx; updateDeckPositioning(); }
        });
        deckContainer.appendChild(card);
    });
    updateDeckPositioning();
}

function updateDeckPositioning() {
    const cards = deckContainer.querySelectorAll(".deck-item");
    cards.forEach((card, idx) => {
        let offset = idx - deckIndex;
        
        if (offset === 0) {
            card.style.transform = `translateX(0px) translateZ(0px) scale(1) rotateY(0deg)`;
            card.style.opacity = "1";
            card.style.zIndex = "40";
            card.style.pointerEvents = "auto";
        } else if (offset === 1 || (offset === -(totalDeckItems - 1) && deckIndex === totalDeckItems - 1)) {
            let transX = window.innerWidth < 640 ? 35 : 75;
            card.style.transform = `translateX(${transX}px) translateZ(-90px) scale(0.88) rotateY(-8deg)`;
            card.style.opacity = "0.45";
            card.style.zIndex = "30";
            card.style.pointerEvents = "auto";
        } else if (offset === -1 || (offset === totalDeckItems - 1 && deckIndex === 0)) {
            let transX = window.innerWidth < 640 ? -35 : -75;
            card.style.transform = `translateX(${transX}px) translateZ(-90px) scale(0.88) rotateY(8deg)`;
            card.style.opacity = "0.45";
            card.style.zIndex = "30";
            card.style.pointerEvents = "auto";
        } else if (offset === 2 || (offset === -(totalDeckItems - 2) && deckIndex >= totalDeckItems - 2)) {
            let transX = window.innerWidth < 640 ? 65 : 140;
            card.style.transform = `translateX(${transX}px) translateZ(-170px) scale(0.78) rotateY(-14deg)`;
            card.style.opacity = "0.15";
            card.style.zIndex = "20";
            card.style.pointerEvents = "auto";
        } else if (offset === -2 || (offset === totalDeckItems - 2 && deckIndex <= 1)) {
            let transX = window.innerWidth < 640 ? -65 : -140;
            card.style.transform = `translateX(${transX}px) translateZ(-170px) scale(0.78) rotateY(14deg)`;
            card.style.opacity = "0.15";
            card.style.zIndex = "20";
            card.style.pointerEvents = "auto";
        } else {
            card.style.transform = `translateX(0px) translateZ(-300px) scale(0.6)`;
            card.style.opacity = "0";
            card.style.zIndex = "10";
            card.style.pointerEvents = "none";
        }
    });
    document.getElementById("deckIndicator").textContent = `${deckIndex + 1} / ${totalDeckItems}`;
}

document.getElementById("deckPrev").addEventListener("click", () => { deckIndex = (deckIndex - 1 + totalDeckItems) % totalDeckItems; updateDeckPositioning(); });
document.getElementById("deckNext").addEventListener("click", () => { deckIndex = (deckIndex + 1) % totalDeckItems; updateDeckPositioning(); });

let dStartX = 0;
deckContainer.addEventListener("touchstart", (e) => dStartX = e.touches[0].clientX);
deckContainer.addEventListener("touchend", (e) => {
    let dEndX = e.changedTouches[0].clientX;
    if (dStartX - dEndX > 45) { deckIndex = (deckIndex + 1) % totalDeckItems; updateDeckPositioning(); }
    else if (dEndX - dStartX > 45) { deckIndex = (deckIndex - 1 + totalDeckItems) % totalDeckItems; updateDeckPositioning(); }
});


// EXPANDED MODAL DETAIL ENGINE
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");

function openModalTrigger(item, isSoftware = false) {
    if (isSoftware) {
        modalContent.innerHTML = `
            <div class="space-y-5 text-left">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
                    <div>
                        <span class="text-[9px] font-mono uppercase font-bold tracking-widest text-orange-400 px-2 py-0.5 bg-orange-500/10 rounded border border-orange-500/20">${item.stack}</span>
                        <h2 class="text-lg sm:text-2xl font-black text-white tracking-tight mt-1.5">${item.title}</h2>
                    </div>
                    <a href="${item.gitLink}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 font-mono transition-all self-start sm:self-center">
                        <svg class="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                        View Repository
                    </a>
                </div>
                <div class="space-y-2">
                    <h4 class="text-[10px] font-mono uppercase tracking-widest text-gray-500">Project Description</h4>
                    <p class="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">${item.desc}</p>
                </div>
                <div class="grid grid-cols-2 gap-4 pt-2">
                    <div class="p-3 bg-white/5 rounded-xl border border-white/5 font-mono">
                        <span class="block text-[8px] text-gray-500 uppercase tracking-wider">Project Type</span>
                        <span class="text-xs font-bold text-gray-200 mt-0.5 block">Production System</span>
                    </div>
                    <div class="p-3 bg-white/5 rounded-xl border border-white/5 font-mono">
                        <span class="block text-[8px] text-gray-500 uppercase tracking-wider">Deployment Status</span>
                        <span class="text-xs font-bold text-emerald-400 mt-0.5 block flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Active / Verified</span>
                    </div>
                </div>
                <button onclick="closeModalTrigger()" class="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-widest transition-colors pt-3.5">Close Window</button>
            </div>
        `;
    } else {
        modalContent.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div class="aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] w-full max-w-[240px] mx-auto rounded-xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="space-y-4 flex flex-col justify-between text-left">
                    <div class="space-y-3">
                        <div>
                            <span class="text-[9px] font-mono uppercase font-bold tracking-widest text-orange-400 px-2 py-0.5 bg-orange-500/10 rounded border border-orange-500/20">${item.industry}</span>
                            <h2 class="text-md sm:text-xl font-extrabold text-white mt-1.5 leading-snug">${item.name}</h2>
                        </div>
                        <hr class="border-white/5">
                        <div class="space-y-1">
                            <span class="block text-[8px] font-mono text-gray-500 uppercase tracking-wider">Production Tools</span>
                            <span class="text-xs font-semibold text-gray-200 block">${item.tools}</span>
                        </div>
                        <p class="text-gray-400 text-xs leading-relaxed font-light">Custom visual systems and layout designs engineered to provide memorable user experiences across production environments.</p>
                    </div>
                    <button onclick="closeModalTrigger()" class="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-widest transition-colors pt-3.5">Return to Portfolio</button>
                </div>
            </div>
        `;
    }
    modal.classList.remove("pointer-events-none", "opacity-0");
    modal.firstElementChild.classList.remove("scale-95");
    document.body.style.overflow = "hidden";
}

function closeModalTrigger() {
    modal.classList.add("pointer-events-none", "opacity-0");
    modal.firstElementChild.classList.add("scale-95");
    document.body.style.overflow = "";
}
document.getElementById("closeModal").addEventListener("click", closeModalTrigger);
modal.addEventListener("click", (e) => { if(e.target === modal) closeModalTrigger(); });


// SEQUENTIAL FORM FIELD FLOW ENGINE
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneContainer = document.getElementById("phone-container");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

const nodeEmail = document.getElementById("node-email");
const nodePhone = document.getElementById("node-phone");
const nodeMessage = document.getElementById("node-message");
const nodeSubmit = document.getElementById("node-submit");

const line1 = document.getElementById("line-1");
const line2 = document.getElementById("line-2");
const line3 = document.getElementById("line-3");

function updateNodeUIState(input, targetNode, targetLine) {
    if(input.value.trim().length > 2 || (input.type === 'email' && input.checkValidity())) {
        targetNode.classList.add("node-active");
        targetNode.querySelector('.node-dot')?.classList.replace('bg-gray-600', 'bg-orange-500');
        if(targetLine) targetLine.style.height = "32px";
    }
}

nameInput.addEventListener("input", () => updateNodeUIState(nameInput, nodeEmail, line1));
emailInput.addEventListener("input", () => updateNodeUIState(emailInput, nodePhone, line2));

phoneContainer.addEventListener("click", () => {
    if(!nodePhone.classList.contains("node-active")) return;
    phoneContainer.style.height = "52px";
    document.getElementById("phone-placeholder-text").style.opacity = "0";
    phoneInput.classList.remove("opacity-0", "pointer-events-none");
    phoneInput.focus();
});

phoneInput.addEventListener("input", () => {
    nodeMessage.classList.add("node-active");
    line3.style.height = "32px";
});

messageInput.addEventListener("input", () => {
    nodeMessage.classList.add("node-active");
    updateNodeUIState(messageInput, nodeSubmit, null);
});


// FORM HANDLING WITH CUSTOM SUBMISSION RESPONSES
const contactForm = document.getElementById("contact-form");
const responseBox = document.getElementById("response-message-box");
const responseText = document.getElementById("response-message-text");
const planeIcon = document.getElementById("planeIcon");
const btnText = document.getElementById("btnText");

if(contactForm) {
    contactForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        planeIcon.classList.add("animate-plane");
        btnText.textContent = "SENDING...";
        
        const formData = new FormData(this);
        
        setTimeout(async () => {
            try {
                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                responseBox.classList.remove("pointer-events-none", "opacity-0");
                if(response.ok) {
                    responseText.textContent = "Your message has been sent successfully. Praise will reach out to you shortly.";
                    this.reset();
                    [nodeEmail, nodePhone, nodeMessage, nodeSubmit].forEach(n => n.classList.remove("node-active"));
                    [line1, line2, line3].forEach(l => l.style.height = "0px");
                    document.getElementById("node-name").classList.add("node-active");
                    phoneContainer.style.height = "48px";
                    document.getElementById("phone-placeholder-text").style.opacity = "1";
                    phoneInput.classList.add("opacity-0", "pointer-events-none");
                } else {
                    responseText.textContent = "An error occurred. Please verify your entries and try again.";
                }
            } catch(err) {
                responseBox.classList.remove("pointer-events-none", "opacity-0");
                responseText.textContent = "Transmission failed. Please check your network connection.";
            } finally {
                planeIcon.classList.remove("animate-plane");
                btnText.textContent = "Submit Message";
            }
        }, 1000);
    });
}

function hideMessageBox() { responseBox.classList.add("pointer-events-none", "opacity-0"); }


// AMBIENT BACKGROUND MATRIX EFFECT
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charArr = matrixChars.split("");
const fontSize = 10;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrixRain() {
    ctx.fillStyle = "rgba(3, 7, 18, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(249, 115, 22, 0.2)";
    ctx.font = fontSize + "px 'Share Tech Mono'";

    for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
        drops[i]++;
    }
}
setInterval(drawMatrixRain, 33);


// FOOTER BRANDING GLITCH EFFECT
const glitchTitle = document.getElementById("glitchTitle");
const originalText = glitchTitle.textContent.trim();
const glitchChars = "X01Y2Z389#$&%";

function cycleGlitchFrame() {
    let iterations = 0;
    const interval = setInterval(() => {
        glitchTitle.textContent = originalText.split("").map((letter, idx) => {
            if(idx < iterations) return originalText[idx];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }).join("");
        
        if(iterations >= originalText.length) { clearInterval(interval); }
        iterations += 1 / 3;
    }, 30);
}
setInterval(cycleGlitchFrame, 4500);
glitchTitle.addEventListener("mouseenter", cycleGlitchFrame);


// DOM LIFECYCLE CONTROLLER INTERACTION HOOKS
window.addEventListener("DOMContentLoaded", () => {
    buildGraphicsCarousel();
    buildSoftwareDeck();
    animationLoopEngine();
});