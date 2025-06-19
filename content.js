(function () {
  if (localStorage.getItem("colorFix") === "enabled") {
    applyColorFix();
  }

  window.applyColorFix = function () {
    const elements = document.querySelectorAll("*");
    elements.forEach((el) => {
      const style = window.getComputedStyle(el);
      const color = style.color;
      const bgColor = style.backgroundColor;

      if (isProblematic(color)) {
        el.style.color = darkenColor(color);
      }
      if (isProblematic(bgColor)) {
        el.style.backgroundColor = darkenColor(bgColor);
      }
    });
  };

  function isProblematic(color) {
    if (!color || color === 'transparent') return false;
    const rgb = color.match(/\d+/g)?.map(Number);
    if (!rgb || rgb.length < 3) return false;

    const [r, g, b] = rgb;
    // Check for red-green clash or low contrast
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 180 || Math.abs(r - g) < 30;
  }

  function darkenColor(color) {
    const rgb = color.match(/\d+/g)?.map(Number);
    if (!rgb) return color;

    const [r, g, b] = rgb.map((c) => Math.max(0, c - 50));
    return `rgb(${r}, ${g}, ${b})`;
  }
})();
