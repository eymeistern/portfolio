// Sticky nav solid-on-scroll (keep as you had)
const nav = document.getElementById("siteNav");
const setNavState = () => {
  if (!nav) return;
  if (window.scrollY > 20) nav.classList.add("is-solid");
  else nav.classList.remove("is-solid");
};
setNavState();
window.addEventListener("scroll", setNavState, { passive: true });

// Mobile menu toggle
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle?.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});
links?.addEventListener("click", (e) => {
  const t = e.target;
  if (t && t.tagName === "A" && links.classList.contains("is-open")) {
    links.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  }
});

// SPOTLIGHT TRANSITIONS
const wipe = document.querySelector(".wipe");
const wipeLabel = document.querySelector(".wipe__label");

function isExternal(a){
  const url = new URL(a.href, window.location.href);
  return url.origin !== window.location.origin;
}

function isHashNav(a){
  const href = a.getAttribute("href") || "";
  if (href.startsWith("#")) return true;
  try{
    const url = new URL(a.href, window.location.href);
    return (url.pathname === window.location.pathname) && !!url.hash;
  }catch{ return false; }
}

function activateWipe(text){
  if (!wipe) return;
  if (wipeLabel) wipeLabel.textContent = (text || "Loading").toUpperCase();
  wipe.classList.add("is-active");
}

function deactivateWipe(){
  wipe?.classList.remove("is-active");
}

window.addEventListener("pageshow", () => deactivateWipe());

document.addEventListener("click", (e) => {
  const a = e.target?.closest?.("a");
  if (!a) return;

  // ignore new tabs / downloads / external
  if (a.target === "_blank" || a.hasAttribute("download")) return;
  if (isExternal(a)) return;

  // ignore hash scroll
  if (isHashNav(a)) return;

  // ignore modifier keys
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  const href = a.getAttribute("href");
  if (!href) return;

  e.preventDefault();

  const label = (a.textContent || "").trim() || "Loading";
  activateWipe(label);

  window.setTimeout(() => {
    window.location.href = a.href;
  }, 520);
});
