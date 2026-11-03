function addCopyButtons(): void {
  for (const pre of document.querySelectorAll<HTMLPreElement>("pre.astro-code")) {
    if (pre.closest(".ojuny-code-block")) continue;

    const wrapper = document.createElement("div");
    wrapper.className = "ojuny-code-block";
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.append(pre);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "ojuny-copy-button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code to clipboard");

    button.addEventListener("click", async () => {
      const code = pre.textContent ?? "";
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Copied";
        button.dataset.copied = "true";
      } catch {
        button.textContent = "Failed";
      }
      window.setTimeout(() => {
        button.textContent = "Copy";
        delete button.dataset.copied;
      }, 1600);
    });

    wrapper.append(button);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addCopyButtons, { once: true });
} else {
  addCopyButtons();
}
