(() => {
  "use strict";

  const CFG = window.UPITNIK_CONFIG || {};
  const LS_KEY = "andrew-upitnik-v1";

  /* ------------------------------------------------------------------ *
   *  SVG ilustracije
   * ------------------------------------------------------------------ */
  const MOUSE = "#2b2b36";

  const handImg = `<img src="assets/hand-measure.webp" class="hand-photo" alt="Kako izmjeriti šaku: od vrha srednjeg prsta do crte na zapešću" width="571" height="710">`;

  const topSym = (fill = MOUSE, stroke = "#555", wheel = "#888") => `
<svg viewBox="0 0 120 184" class="mouse-top">
  <path d="M60 8 C96 8 106 50 103 92 C100 134 95 174 60 176 C25 174 20 134 17 92 C14 50 24 8 60 8 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
  <path d="M60 8 L60 72 M20 74 Q60 80 100 74" stroke="${stroke}" stroke-width="2" fill="none" opacity=".7"/>
  <rect x="55" y="24" width="10" height="24" rx="5" fill="${wheel}"/>
</svg>`;

  const sideBody = (inner) => `
<svg viewBox="0 30 200 84" class="mouse-side">
  <path d="M12 104 C12 72 40 44 95 40 C150 36 188 62 190 104 Z" fill="${MOUSE}" stroke="#555" stroke-width="2"/>
  <line x1="8" y1="106" x2="194" y2="106" stroke="#444" stroke-width="3" stroke-linecap="round"/>
  ${inner}
</svg>`;
  const sb = (x, y, w = 26, h = 10) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#ff3b5c"/>`;
  const mmoGrid = (() => {
    let s = "";
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) s += `<circle cx="${52 + i * 15}" cy="${56 + j * 13}" r="5.2" fill="#ff3b5c"/>`;
    return s;
  })();

  // 3D renderi gripova (izvor: shapefinder.cc)
  const gripImg = (file, alt) => `<img src="assets/grips/${file}.webp" class="grip-img" alt="${alt}" draggable="false">`;


  const rgbMouse = `
<svg viewBox="0 0 120 184" class="mouse-top">
  <defs><linearGradient id="rgbg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ff3b5c"/><stop offset=".25" stop-color="#ffd23f"/>
    <stop offset=".5" stop-color="#22c55e"/><stop offset=".75" stop-color="#3b82f6"/><stop offset="1" stop-color="#a855f7"/>
  </linearGradient></defs>
  <path d="M60 8 C96 8 106 50 103 92 C100 134 95 174 60 176 C25 174 20 134 17 92 C14 50 24 8 60 8 Z" fill="url(#rgbg)" stroke="#555" stroke-width="2"/>
  <path d="M60 8 L60 72 M20 74 Q60 80 100 74" stroke="#222" stroke-width="2" fill="none" opacity=".5"/>
  <rect x="55" y="24" width="10" height="24" rx="5" fill="#222"/>
</svg>`;

  // Slike stvarnih miševa odozgo (izvor: shapefinder.cc)
  const mouseImg = (file, name) => `<img src="assets/mice/${file}.webp" class="mouse-photo" alt="${name}" title="${name}" draggable="false">`;

  const emoji = (e) => `<div class="emoji">${e}</div>`;

  /* ------------------------------------------------------------------ *
   *  Pitanja
   * ------------------------------------------------------------------ */
  const STEPS = [
    {
      id: "hand",
      title: "Koliko ti je velika šaka? ✋",
      sub: "Izmjeri od <b>vrha srednjeg prsta</b> do <b>prve crte na zapešću</b> (tamo gdje počinje dlan). Ruka ispružena, prsti skupa.",
      type: "hand",
    },
    {
      id: "shape",
      title: "Kakav oblik miša ti se sviđa?",
      sub: "Pogledaj odozgo kako izgleda.",
      groups: [
        {
          key: "shape",
          options: [
            { v: "sym", label: "Simetričan", desc: "Isti s obje strane. Univerzalan, dobar za brze pokrete i sve gripove.", img: mouseImg("symmetrical", "Logitech G Pro X Superlight 2") },
            { v: "ergo", label: "Ergonomski", desc: "Oblikovan za desnu ruku, s udubljenjem za palac. Udobniji za dlan.", img: mouseImg("ergonomic", "Razer DeathAdder V3 Pro") },
            { v: "any", label: "Nije mi bitno", desc: "Samo da je dobar.", img: emoji("🤷") },
          ],
        },
      ],
    },
    {
      id: "buttons",
      title: "Koliko bočnih gumba želiš?",
      sub: "Bočni gumbi su oni sa strane, ispod palca.",
      groups: [
        {
          key: "sideButtons",
          options: [
            { v: "0", label: "Nijedan", desc: "Čisto i minimalno.", img: sideBody("") },
            { v: "2", label: "2 gumba", desc: "Standard (naprijed / nazad). Ima ih većina gaming miševa.", img: sideBody(sb(48, 58) + sb(78, 58)) },
            { v: "3-5", label: "3 – 5 gumba", desc: "Malo više za bindove u igri.", img: sideBody(sb(48, 56) + sb(78, 56) + sb(48, 70) + sb(78, 70)) },
            { v: "mmo", label: "Puno (MMO, 6+)", desc: "Cijela tipkovnica pod palcem.", img: sideBody(mmoGrid) },
            { v: "any", label: "Nije mi bitno", desc: "", img: emoji("🤷") },
          ],
        },
      ],
    },
    {
      id: "grip",
      title: "Kako držiš miša? (grip)",
      sub: "Uzmi svog miša u ruku i vidi koja slika ti je najsličnija. Ako ne znaš, odaberi \"Ne znam\".",
      groups: [
        {
          key: "grip",
          options: [
            { v: "palm", label: "Palm grip", desc: "Cijeli dlan leži na mišu, prsti ispruženi.", img: gripImg("palm", "Palm grip") },
            { v: "relaxed-claw", label: "Relaxed claw", desc: "Između palma i clawa – dlan leži na mišu, ali prsti su malo savijeni.", img: gripImg("relaxed-claw", "Relaxed claw grip") },
            { v: "claw", label: "Claw grip", desc: "Prsti savijeni kao kandža, dlan dodiruje samo stražnji dio.", img: gripImg("claw", "Claw grip") },
            { v: "fingertip-claw", label: "Fingertip claw", desc: "Prsti savijeni, a dlan jedva dodiruje miša.", img: gripImg("fingertip-claw", "Fingertip claw grip") },
            { v: "fingertip", label: "Fingertip grip", desc: "Samo vrhovi prstiju diraju miša, dlan je u zraku.", img: gripImg("fingertip", "Fingertip grip") },
            { v: "unknown", label: "Ne znam / mix", desc: "Mijenjam ili nisam siguran.", img: emoji("🤔") },
          ],
        },
      ],
    },
    {
      id: "weight",
      title: "Kakav miš ti je najdraži po težini?",
      sub: "Za usporedbu: većina \"običnih\" miševa ima oko 90–120 g.",
      groups: [
        {
          key: "weight",
          options: [
            { v: "ultra", label: "Ultralagan", desc: "Ispod 55 g – kao da ništa ne držiš.", img: emoji("🪶") },
            { v: "light", label: "Lagan", desc: "55 – 75 g – brz i lagan.", img: emoji("🍃") },
            { v: "medium", label: "Srednji", desc: "75 – 95 g – zlatna sredina.", img: emoji("⚖️") },
            { v: "heavy", label: "Teži", desc: "Preko 95 g – osjeti se u ruci, stabilan.", img: emoji("🧱") },
            { v: "any", label: "Nije mi bitno", desc: "", img: emoji("🤷") },
          ],
        },
      ],
    },
    {
      id: "connection",
      title: "Žičani ili bežični?",
      sub: "",
      groups: [
        {
          key: "connection",
          options: [
            { v: "wired", label: "Žičani", desc: "Nikad se ne treba puniti.", img: emoji("🔌") },
            { v: "wireless", label: "Bežični", desc: "Nema kabela koji vuče. Puni se svakih par dana/tjedana.", img: emoji("📡") },
            { v: "any", label: "Nije mi bitno", desc: "", img: emoji("🤷") },
          ],
        },
      ],
    },
    {
      id: "color",
      title: "Koja boja miša ti se sviđa?",
      sub: "Može više boja.",
      groups: [
        {
          key: "colors",
          multi: true,
          exclusive: "any",
          options: [
            { v: "black", label: "Crna", img: topSym("#141418", "#555", "#555") },
            { v: "white", label: "Bijela", img: topSym("#f2f2f2", "#bbb", "#ccc") },
            { v: "pink", label: "Roza", img: topSym("#ff8fc7", "#c25d93", "#fff") },
            { v: "blue", label: "Plava", img: topSym("#3b82f6", "#1d4ed8", "#dbeafe") },
            { v: "red", label: "Crvena", img: topSym("#e11d48", "#9f1239", "#ffe4e6") },
            { v: "purple", label: "Ljubičasta", img: topSym("#8b5cf6", "#5b21b6", "#ede9fe") },
            { v: "green", label: "Zelena", img: topSym("#22c55e", "#15803d", "#dcfce7") },
            { v: "colorful", label: "Šareni dizajn", img: rgbMouse },
            { v: "any", label: "Nije mi bitno", img: emoji("🤷") },
          ],
        },
        {
          key: "rgb",
          chips: true,
          label: "RGB svjetla na mišu?",
          options: [
            { v: "yes", label: "🌈 Da, volim RGB" },
            { v: "no", label: "🌑 Ne, bez svjetla" },
            { v: "any", label: "🤷 Nije bitno" },
          ],
        },
      ],
    },
    {
      id: "extra",
      title: "Još samo ovo... 🙏",
      sub: "",
      groups: [
        { key: "currentLikes", type: "textarea", label: "Što ti se sviđa, a što ne sviđa kod miša kojeg sada koristiš?", placeholder: "npr. pretežak je, kabel mi smeta, volim oblik..." },
      ],
    },
  ];

  /* ------------------------------------------------------------------ *
   *  Stanje
   * ------------------------------------------------------------------ */
  const defaults = () => ({
    handLength: 18.5,
    shape: null,
    sideButtons: null,
    grip: null,
    weight: null,
    connection: null,
    colors: [],
    rgb: null,
    currentLikes: "",
  });

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(LS_KEY));
      if (s && s.answers) {
        s.answers = Object.assign(defaults(), s.answers);
        return s;
      }
    } catch (e) { /* ignore */ }
    return null;
  }

  let S = load() || { screen: "welcome", step: 0, answers: defaults(), attempts: 0, sentAt: null, fromReview: false };
  // Stranica se uvijek otvara na "Bok Andrew" (ako je stao negdje, tamo ima gumb "Nastavi")
  S.screen = "welcome";
  S.fromReview = false;
  const A = () => S.answers;
  const save = () => { try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

  /* ------------------------------------------------------------------ *
   *  Pomoćne
   * ------------------------------------------------------------------ */
  const app = document.getElementById("app");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const allGroups = STEPS.flatMap((s) => (s.groups || []).map((g) => ({ ...g, stepId: s.id })));
  const groupByKey = (k) => allGroups.find((g) => g.key === k);

  function labelOf(key) {
    const g = groupByKey(key);
    const v = A()[key];
    if (!g) return "";
    if (g.type === "text" || g.type === "textarea") return v ? v.trim() : "";
    const find = (x) => (g.options.find((o) => o.v === x) || {}).label || x;
    if (g.multi) return v.length ? v.map(find).join(", ") : "";
    return v ? find(v) : "";
  }

  const handCat = (cm) => (cm < 17 ? "mala" : cm <= 19.5 ? "srednja" : "velika");

  function isAnswered(g) {
    const v = A()[g.key];
    if (g.optional) return true;
    if (g.multi) return v.length > 0;
    return v !== null && String(v).trim() !== "";
  }
  const stepValid = (st) => st.type === "hand" || (st.groups || []).every(isAnswered);

  function hint() {
    const a = A();
    const L = a.handLength * 10;
    const r = { palm: [0.6, 0.66], "relaxed-claw": [0.58, 0.65], claw: [0.57, 0.63], "fingertip-claw": [0.54, 0.6], fingertip: [0.52, 0.58] }[a.grip] || [0.56, 0.64];
    return `Dužina miša cca ${Math.round(L * r[0])}–${Math.round(L * r[1])} mm (gruba procjena – provjeri na shapefinder.cc)`;
  }

  /* Redci za pregled + slanje: [naslov, vrijednost, stepId] */
  function summaryRows() {
    const a = A();
    const or = (x, fb = "—") => x || fb;
    return [
      ["Dužina šake", `${a.handLength.toFixed(1)} cm (${handCat(a.handLength)})`, "hand"],
      ["Oblik", or(labelOf("shape")), "shape"],
      ["Bočni gumbi", or(labelOf("sideButtons")), "buttons"],
      ["Grip", or(labelOf("grip")), "grip"],
      ["Težina", or(labelOf("weight")), "weight"],
      ["Povezivanje", or(labelOf("connection")), "connection"],
      ["Boja", or(labelOf("colors")), "color"],
      ["RGB", or(labelOf("rgb")), "color"],
      ["Trenutni miš – sviđa / ne sviđa", or(a.currentLikes.trim()), "extra"],
    ];
  }

  function plainText(rows) {
    return rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  }

  /* ------------------------------------------------------------------ *
   *  Slanje
   * ------------------------------------------------------------------ */
  const configured = () => !!(CFG.web3formsAccessKey || CFG.formEndpoint || CFG.ntfyTopic);

  async function sendResults() {
    const attempt = (S.attempts || 0) + 1;
    const rows = summaryRows().map(([k, v]) => [k, v]);
    rows.push(["Preporuka (za tebe)", hint()]);
    rows.push(["Pokušaj br.", String(attempt)]);
    rows.push(["Vrijeme", new Date().toLocaleString("hr-HR")]);
    const fields = Object.fromEntries(rows);
    const subject = `🎁 Andrew – rezultati upitnika (pokušaj #${attempt})`;
    const text = plainText(rows);

    const jobs = [];
    if (CFG.web3formsAccessKey) {
      jobs.push(
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: CFG.web3formsAccessKey, subject, from_name: "Andrewov upitnik", ...fields }),
        }).then(async (r) => {
          const j = await r.json().catch(() => ({}));
          if (!r.ok || j.success === false) throw new Error(j.message || "Web3Forms greška");
        })
      );
    }
    if (CFG.formEndpoint) {
      jobs.push(
        fetch(CFG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ _subject: subject, ...fields }),
        }).then((r) => { if (!r.ok) throw new Error("Form endpoint greška " + r.status); })
      );
    }
    if (CFG.ntfyTopic) {
      jobs.push(
        fetch("https://ntfy.sh/" + encodeURIComponent(CFG.ntfyTopic), {
          method: "POST",
          headers: { Title: "Andrew je ispunio upitnik (#" + attempt + ")", Tags: "gift,computer_mouse" },
          body: text,
        }).then((r) => { if (!r.ok) throw new Error("ntfy greška " + r.status); })
      );
    }
    if (!jobs.length) throw new Error("Slanje nije podešeno (js/config.js).");

    const res = await Promise.allSettled(jobs);
    if (!res.some((r) => r.status === "fulfilled")) {
      throw new Error(res.map((r) => r.reason && r.reason.message).join("; "));
    }
    S.attempts = attempt;
    S.sentAt = Date.now();
    S.lastText = text;
  }

  /* ------------------------------------------------------------------ *
   *  Render
   * ------------------------------------------------------------------ */
  function go(screen, step) {
    S.screen = screen;
    if (typeof step === "number") S.step = step;
    save();
    render();
    window.scrollTo(0, 0);
  }

  function render() {
    if (S.screen === "welcome") return renderWelcome();
    if (S.screen === "step") return renderStep();
    if (S.screen === "review") return renderReview();
    if (S.screen === "done") return renderDone();
  }

  function renderWelcome() {
    const inProgress = S.step > 0 && !S.sentAt;
    app.innerHTML = `
      <section class="welcome">
        <div class="meme">
          <div class="meme-img">
            <div class="meme-top">Bok Andrew</div>
            <div class="meme-face">🤨</div>
          </div>
        </div>
        ${S.sentAt ? `<p class="note">Već si jednom poslao odgovore ✅ Možeš ih riješiti opet – računa se zadnji.</p>` : ""}
        <div class="actions center">
          ${inProgress ? `<button class="btn primary big" data-act="continue">Nastavi gdje si stao 👉</button>
                          <button class="btn ghost" data-act="start">Kreni ispočetka</button>`
                       : `<button class="btn primary big" data-act="start">Ajmo 👉</button>`}
        </div>
      </section>`;
    app.querySelector('[data-act="start"]').onclick = () => { S.answers = defaults(); S.fromReview = false; go("step", 0); };
    const c = app.querySelector('[data-act="continue"]');
    if (c) c.onclick = () => go("step");
  }

  function progressBar() {
    const pct = Math.round(((S.step + 1) / STEPS.length) * 100);
    return `<div class="progress"><div class="bar" style="width:${pct}%"></div></div>
            <div class="stepcount">Pitanje ${S.step + 1} / ${STEPS.length}</div>`;
  }

  function renderGroup(g) {
    const a = A();
    const v = a[g.key];
    const opt = g.optional ? ' <span class="opt">(neobavezno)</span>' : "";
    if (g.type === "text") {
      return `<div class="group"><label class="glabel" for="f-${g.key}">${g.label}${opt}</label>
        <input id="f-${g.key}" class="txt" data-text="${g.key}" value="${esc(v)}" placeholder="${esc(g.placeholder || "")}" maxlength="300"></div>`;
    }
    if (g.type === "textarea") {
      return `<div class="group"><label class="glabel" for="f-${g.key}">${g.label}${opt}</label>
        <textarea id="f-${g.key}" class="txt" rows="3" data-text="${g.key}" placeholder="${esc(g.placeholder || "")}" maxlength="1000">${esc(v)}</textarea></div>`;
    }
    const sel = (x) => (g.multi ? v.includes(x) : v === x);
    const items = g.options
      .map((o) =>
        g.chips
          ? `<button type="button" class="chip ${sel(o.v) ? "sel" : ""}" data-key="${g.key}" data-v="${o.v}" aria-pressed="${sel(o.v)}">${o.label}</button>`
          : `<button type="button" class="card ${sel(o.v) ? "sel" : ""}" data-key="${g.key}" data-v="${o.v}" aria-pressed="${sel(o.v)}">
               <div class="img">${o.img || ""}</div>
               <div class="t">${o.label}</div>
               ${o.desc ? `<div class="d">${o.desc}</div>` : ""}
               <span class="tick">✓</span>
             </button>`
      )
      .join("");
    return `<div class="group ${g.chips ? "group-chips" : "group-cards"}" data-group="${g.key}">
      ${g.label ? `<div class="glabel">${g.label}${opt}</div>` : ""}
      ${g.chips ? `<div class="chips">${items}</div>` : `<div class="cards" style="${gridVars(g.options.length)}">${items}</div>`}</div>`;
  }

  /* Broj stupaca/redaka da kartice stanu na ekran bez scrollanja */
  function gridVars(n) {
    const cols = n <= 5 ? n : Math.ceil(n / 2);
    const mcols = n <= 2 ? n : n === 9 ? 3 : 2;
    return `--cols:${cols};--rows:${Math.ceil(n / cols)};--mcols:${mcols};--mrows:${Math.ceil(n / mcols)}`;
  }

  function renderHand() {
    const a = A();
    return `
      <div class="hand-wrap">
        <div class="hand-img">${handImg}</div>
        <div class="hand-controls">
          <div class="group">
            <div class="glabel">Dužina šake</div>
            <div class="bigval"><span id="hlVal">${a.handLength.toFixed(1)}</span> cm <span class="cat" id="hlCat">${handCat(a.handLength)}</span></div>
            <input type="range" id="hl" min="13" max="24" step="0.1" value="${a.handLength}" aria-label="Dužina šake u cm">
            <div class="range-labels"><span>13 cm</span><span>24 cm</span></div>
          </div>
        </div>
      </div>`;
  }

  function renderStep() {
    const st = STEPS[S.step];
    const last = S.step === STEPS.length - 1;
    const nextLabel = S.fromReview ? "Natrag na pregled ✔️" : last ? "Gotovo 👉" : "Dalje 👉";
    app.innerHTML = `
      <section class="step">
        ${progressBar()}
        <h1>${st.title}</h1>
        ${st.sub ? `<p class="sub">${st.sub}</p>` : ""}
        <div class="step-body">${st.type === "hand" ? renderHand() : st.groups.map(renderGroup).join("")}</div>
        <div class="nav">
          <button class="btn ghost" data-act="back">👈 Natrag</button>
          <button class="btn primary" data-act="next" ${stepValid(st) ? "" : "disabled"}>${nextLabel}</button>
        </div>
        <p class="muted small center" id="needHint" ${stepValid(st) ? "hidden" : ""}>Odaberi odgovor da možeš dalje.</p>
      </section>`;

    const nextBtn = app.querySelector('[data-act="next"]');
    const refreshNav = () => {
      const ok = stepValid(st);
      nextBtn.disabled = !ok;
      app.querySelector("#needHint").hidden = ok;
    };

    app.querySelector('[data-act="back"]').onclick = () => {
      if (S.fromReview) { S.fromReview = false; return go("review"); }
      if (S.step === 0) return go("welcome");
      go("step", S.step - 1);
    };
    nextBtn.onclick = () => {
      if (!stepValid(st)) return;
      if (S.fromReview || last) { S.fromReview = false; return go("review"); }
      go("step", S.step + 1);
    };

    // izbor kartica / chipova
    app.querySelectorAll("[data-key]").forEach((btn) => {
      btn.onclick = () => {
        const key = btn.dataset.key;
        const v = btn.dataset.v;
        const g = groupByKey(key);
        const a = A();
        if (g.multi) {
          let arr = a[key].slice();
          if (arr.includes(v)) arr = arr.filter((x) => x !== v);
          else if (g.exclusive && v === g.exclusive) arr = [v];
          else arr = arr.filter((x) => x !== g.exclusive).concat(v);
          a[key] = arr;
        } else {
          a[key] = v;
        }
        save();
        app.querySelectorAll(`[data-key="${key}"]`).forEach((b) => {
          const on = g.multi ? a[key].includes(b.dataset.v) : a[key] === b.dataset.v;
          b.classList.toggle("sel", on);
          b.setAttribute("aria-pressed", on);
        });
        refreshNav();
      };
    });

    // tekst
    app.querySelectorAll("[data-text]").forEach((inp) => {
      inp.oninput = () => { A()[inp.dataset.text] = inp.value; save(); refreshNav(); };
    });

    // šaka
    if (st.type === "hand") {
      const hl = app.querySelector("#hl");
      const upd = () => {
        const a = A();
        app.querySelector("#hlVal").textContent = a.handLength.toFixed(1);
        app.querySelector("#hlCat").textContent = handCat(a.handLength);
        hl.value = a.handLength;
        save();
      };
      hl.oninput = () => { A().handLength = Math.round(parseFloat(hl.value) * 10) / 10; upd(); };
    }
  }

  function renderReview() {
    const rows = summaryRows();
    const notReady = !configured();
    app.innerHTML = `
      <section class="review">
        <h1>Jesi li siguran za sve odgovore? 🤨</h1>
        <p class="sub">Provjeri još jednom. Ako nešto ne štima, klikni <b>Uredi</b>.</p>
        <div class="table">
          ${rows
            .map(
              ([k, v, step]) => `<div class="row">
                <div class="k">${esc(k)}</div>
                <div class="v">${esc(v)}</div>
                <button class="btn tiny ghost" data-edit="${step}" aria-label="Uredi">✏️<span class="lbl"> Uredi</span></button>
              </div>`
            )
            .join("")}
        </div>
        ${notReady ? `<p class="warn">⚠️ Slanje još nije podešeno (vidi <code>js/config.js</code>). Odgovore možeš kopirati ispod.</p>` : ""}
        <div class="actions center">
          <button class="btn primary big" data-act="send">Da, siguran sam – pošalji 🚀</button>
          <button class="btn ghost" data-act="restart">Ne, idem ispočetka 🔁</button>
        </div>
        <div id="sendErr"></div>
      </section>`;

    app.querySelectorAll("[data-edit]").forEach((b) => {
      b.onclick = () => {
        S.fromReview = true;
        go("step", STEPS.findIndex((s) => s.id === b.dataset.edit));
      };
    });
    app.querySelector('[data-act="restart"]').onclick = restart;
    const sendBtn = app.querySelector('[data-act="send"]');
    sendBtn.onclick = async () => {
      sendBtn.disabled = true;
      sendBtn.textContent = "Šaljem... ⏳";
      try {
        await sendResults();
        go("done");
      } catch (e) {
        sendBtn.disabled = false;
        sendBtn.textContent = "Pokušaj ponovno 🚀";
        showCopyFallback(app.querySelector("#sendErr"), e.message);
      }
    };
  }

  function showCopyFallback(el, msg) {
    const text = plainText(summaryRows());
    el.innerHTML = `
      <div class="errbox">
        <p><b>Nešto je zapelo 😬</b> <span class="muted small">(${esc(msg)})</span></p>
        <p>Kopiraj odgovore i pošalji ih porukom osobi koja ti je poslala ovaj link:</p>
        <textarea class="txt" rows="8" readonly>${esc(text)}</textarea>
        <button class="btn" data-act="copy">Kopiraj 📋</button>
      </div>`;
    el.querySelector('[data-act="copy"]').onclick = async (ev) => {
      const ta = el.querySelector("textarea");
      try { await navigator.clipboard.writeText(text); }
      catch (e) { ta.select(); document.execCommand("copy"); }
      ev.target.textContent = "Kopirano ✅";
    };
  }

  function restart() {
    S.answers = defaults();
    S.fromReview = false;
    go("step", 0);
  }

  function renderDone() {
    app.innerHTML = `
      <section class="done">
        <div class="meme small-meme">
          <div class="meme-img done-img">
            <div class="meme-top">Poslano</div>
            <div class="meme-face">🫡</div>
            <div class="meme-bottom">Sad šuti i čekaj</div>
          </div>
        </div>
        <p class="lead">Hvala ti! Odgovori su stigli. 🎁</p>
        <p class="muted">Ako misliš da si nešto krivo unio, slobodno ponovi – računa se zadnje poslano.</p>
        <div class="actions center">
          <button class="btn primary" data-act="edit">Promijeni nešto i pošalji opet ✏️</button>
          <button class="btn ghost" data-act="restart">Riješi sve ispočetka 🔁</button>
        </div>
      </section>`;
    app.querySelector('[data-act="edit"]').onclick = () => go("review");
    app.querySelector('[data-act="restart"]').onclick = restart;
  }

  render();
})();
