document.getElementById("toggle").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleColorFix,
  });
});

function toggleColorFix() {
  window.colorFixEnabled = !window.colorFixEnabled;
  if (window.colorFixEnabled) {
    alert("Color adjustment enabled.");
    localStorage.setItem("colorFix", "enabled");
    window.applyColorFix && window.applyColorFix();
  } else {
    alert("Color adjustment disabled.");
    localStorage.removeItem("colorFix");
    location.reload();
  }
}
