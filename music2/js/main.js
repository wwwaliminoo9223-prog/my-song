// Main initialization and utilities
document.addEventListener("DOMContentLoaded", () => {
  console.log("SoundWave Music Streaming Platform Loaded")

  // Initialize tooltips
  setupTooltips()

  // Keyboard shortcuts
  setupKeyboardShortcuts()

  // Auto-load first track
  const player = {} // Declare player variable
  player.loadTrack = () => {
    console.log("Loading first track...")
  }
  player.togglePlay = () => {
    console.log("Toggling play...")
  }
  player.play = () => {
    console.log("Playing...")
  }
  player.loadTrack()

  // Simulate some initial playback for demo
  setTimeout(() => {
    // Uncomment to auto-play: player.play();
  }, 500)
})

function setupTooltips() {
  document.querySelectorAll("[title]").forEach((element) => {
    element.addEventListener("mouseenter", (e) => {
      const tooltip = document.createElement("div")
      tooltip.className = "tooltip"
      tooltip.textContent = e.target.title
      tooltip.style.cssText = `
                position: absolute;
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                margin-bottom: 8px;
                border: 1px solid var(--border-color);
            `
      e.target.style.position = "relative"
      e.target.appendChild(tooltip)

      element.addEventListener("mouseleave", () => {
        tooltip.remove()
      })
    })
  })
}

function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Space to play/pause
    if (e.code === "Space" && e.target === document.body) {
      e.preventDefault()
      const player = {} // Declare player variable
      player.togglePlay = () => {
        console.log("Toggling play...")
      }
      player.togglePlay()
    }

    // Ctrl/Cmd + Shift + N for search
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "N") {
      e.preventDefault()
      const ui = {} // Declare ui variable
      ui.switchPage = (page) => {
        console.log(`Switching to ${page} page...`)
      }
      ui.switchPage("search")
      document.getElementById("globalSearch").focus()
    }
  })
}

function showNotification(message, type = "info") {
  const container = document.getElementById("toastContainer")
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.textContent = message
  toast.style.cssText = `
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        padding: 16px 20px;
        border-radius: 8px;
        margin-bottom: 12px;
        animation: slideUp 0.3s ease;
    `
  container.appendChild(toast)

  setTimeout(() => {
    toast.style.animation = "fadeOut 0.3s ease"
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}

// Export for external use
window.showNotification = showNotification
