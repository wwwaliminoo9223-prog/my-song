// UI Logic
class UIManager {
  constructor() {
    this.currentPage = "home"
    this.setupPageNavigation()
    this.setupSidebar()
    this.setupSearch()
    this.renderAllContent()
  }

  setupPageNavigation() {
    document.querySelectorAll("[data-page]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const page = link.dataset.page
        this.switchPage(page)
      })
    })
  }

  switchPage(pageName) {
    // Hide all pages
    document.querySelectorAll(".page-content").forEach((page) => {
      page.classList.remove("active")
    })

    // Show selected page
    document.getElementById(pageName + "Page").classList.add("active")
    document.getElementById("pageTitle").textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1)

    // Update active nav link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
    })
    document.querySelector(`[data-page="${pageName}"]`).classList.add("active")

    this.currentPage = pageName
  }

  setupSidebar() {
    const toggleBtn = document.getElementById("sidebarToggle")
    const mobileToggle = document.getElementById("mobileToggle")
    const sidebar = document.getElementById("sidebar")
    ;[toggleBtn, mobileToggle].forEach((btn) => {
      if (btn)
        btn.addEventListener("click", () => {
          sidebar.classList.toggle("active")
        })
    })

    // Close sidebar on page selection
    document.querySelectorAll("[data-page]").forEach((link) => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("active")
      })
    })
  }

  setupSearch() {
    const searchInput = document.getElementById("globalSearch")
    const searchResults = document.getElementById("searchResults")

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase()
      if (query.length === 0) {
        searchResults.innerHTML = '<p class="empty-state">Start typing to search</p>'
        return
      }

      const results = window.mockTracks.filter(
        (track) => track.title.toLowerCase().includes(query) || track.artist.toLowerCase().includes(query),
      )

      if (results.length === 0) {
        searchResults.innerHTML = '<p class="empty-state">No results found</p>'
        return
      }

      searchResults.innerHTML = results
        .map(
          (track) => `
                <div class="search-result-item" onclick="window.player.play(window.mockTracks.indexOf(window.mockTracks.find(t => t.id === ${track.id})))">
                    <img src="${track.image}" alt="${track.title}">
                    <div>
                        <div style="color: var(--text-primary); font-weight: 600;">${track.title}</div>
                        <div style="color: var(--text-secondary); font-size: 12px;">${track.artist}</div>
                    </div>
                </div>
            `,
        )
        .join("")
    })
  }

  renderAllContent() {
    this.renderGrid("recentlyPlayed", window.getRecentlyPlayed(), "track")
    this.renderGrid("recommended", window.getRecommended(), "track")
    this.renderGrid("newReleases", window.getNewReleases(), "track")
    this.renderGrid("discoverGrid", window.mockTracks, "track")
    this.renderPlaylistsList()
    this.renderLibraryTracks()
    this.renderTopTracks()
    this.renderArtistsGrid()
    this.setupDiscoverFilters()
  }

  renderGrid(elementId, items, type) {
    const container = document.getElementById(elementId)
    if (!container) return

    container.innerHTML = items
      .map((item) => {
        if (type === "track") {
          return `
                    <div class="track-card" onclick="window.player.play(window.mockTracks.indexOf(window.mockTracks.find(t => t.id === ${item.id})))">
                        <img src="${item.image}" alt="${item.title}" class="track-image">
                        <div class="track-title">${item.title}</div>
                        <div class="track-artist">${item.artist}</div>
                    </div>
                `
        } else if (type === "artist") {
          return `
                    <div class="artist-card">
                        <img src="${item.image}" alt="${item.name}" class="track-image" style="border-radius: 50%;">
                        <div class="track-title">${item.name}</div>
                        <div class="track-artist">${item.followers.toLocaleString()} followers</div>
                    </div>
                `
        }
      })
      .join("")
  }

  renderPlaylistsList() {
    const container = document.getElementById("userPlaylists")
    if (!container) return

    container.innerHTML = window.mockPlaylists
      .map(
        (playlist) => `
            <div class="playlist-card">
                <div class="playlist-icon"><i class="fas fa-${playlist.icon}"></i></div>
                <div class="playlist-name">${playlist.name}</div>
                <div class="playlist-count">${playlist.count} songs</div>
            </div>
        `,
      )
      .join("")
  }

  renderLibraryTracks() {
    const container = document.getElementById("likedTracks")
    if (!container) return

    container.innerHTML = window.mockTracks
      .slice(0, 5)
      .map(
        (track) => `
            <div class="track-row" onclick="window.player.play(window.mockTracks.indexOf(window.mockTracks.find(t => t.id === ${track.id})))">
                <img src="${track.image}" alt="${track.title}">
                <div class="track-row-info">
                    <div class="track-row-title">${track.title}</div>
                    <div class="track-row-artist">${track.artist}</div>
                </div>
                <div class="track-row-actions">
                    <button class="icon-btn" onclick="event.stopPropagation()"><i class="fas fa-heart"></i></button>
                    <button class="icon-btn" onclick="event.stopPropagation()"><i class="fas fa-ellipsis-h"></i></button>
                </div>
            </div>
        `,
      )
      .join("")
  }

  renderTopTracks() {
    const container = document.getElementById("topTracks")
    if (!container) return

    container.innerHTML = window.mockTracks
      .slice(0, 8)
      .map(
        (track, index) => `
            <div class="track-row" onclick="window.player.play(window.mockTracks.indexOf(window.mockTracks.find(t => t.id === ${track.id})))">
                <img src="${track.image}" alt="${track.title}">
                <div class="track-row-info">
                    <div class="track-row-title">#${index + 1} - ${track.title}</div>
                    <div class="track-row-artist">${track.artist}</div>
                </div>
                <span style="color: var(--text-secondary);">${window.formatDuration(track.duration)}</span>
            </div>
        `,
      )
      .join("")
  }

  renderArtistsGrid() {
    const container = document.getElementById("followedArtists")
    if (!container) return

    this.renderGrid("followedArtists", window.mockArtists, "artist")
  }

  setupDiscoverFilters() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
        e.target.classList.add("active")
        const genre = e.target.dataset.genre
        const filtered = window.getTracksByGenre(genre)
        this.renderGrid("discoverGrid", filtered, "track")
      })
    })
  }
}

const ui = new UIManager()

// Declare variables and functions that were previously undeclared
window.mockTracks = [
  { id: 1, title: "Track 1", artist: "Artist 1", image: "image1.jpg", duration: 180 },
  { id: 2, title: "Track 2", artist: "Artist 2", image: "image2.jpg", duration: 240 },
]

window.mockPlaylists = [
  { name: "Playlist 1", icon: "music", count: 10 },
  { name: "Playlist 2", icon: "headphones", count: 15 },
]

window.mockArtists = [
  { name: "Artist A", image: "artistA.jpg", followers: 100000 },
  { name: "Artist B", image: "artistB.jpg", followers: 200000 },
]

window.player = {
  play: (index) => {
    console.log("Playing track at index:", index)
  },
}

window.getRecentlyPlayed = () => window.mockTracks.slice(0, 3)

window.getRecommended = () => window.mockTracks.slice(3, 6)

window.getNewReleases = () => window.mockTracks.slice(6, 9)

window.getTracksByGenre = (genre) => window.mockTracks.filter((track) => track.genre === genre)

window.formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}
