// Audio Player Logic
const mockTracks = [
  { id: 1, title: "Track 1", artist: "Artist 1", image: "image1.jpg", url: "audio1.mp3" },
  { id: 2, title: "Track 2", artist: "Artist 2", image: "image2.jpg", url: "audio2.mp3" },
  // Add more tracks as needed
]

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
}

class MusicPlayer {
  constructor() {
    this.audio = new Audio()
    this.currentTrackIndex = 0
    this.playlist = [...mockTracks]
    this.isPlaying = false
    this.isShuffle = false
    this.repeatMode = 0 // 0: no repeat, 1: repeat all, 2: repeat one
    this.likedTracks = new Set()
    this.setupEventListeners()
  }

  setupEventListeners() {
    this.audio.addEventListener("loadedmetadata", () => this.updateDuration())
    this.audio.addEventListener("timeupdate", () => this.updateProgress())
    this.audio.addEventListener("ended", () => this.nextTrack())
    this.audio.addEventListener("play", () => this.onPlay())
    this.audio.addEventListener("pause", () => this.onPause())

    // Player controls
    document.getElementById("playBtn").addEventListener("click", () => this.togglePlay())
    document.getElementById("prevBtn").addEventListener("click", () => this.prevTrack())
    document.getElementById("nextBtn").addEventListener("click", () => this.nextTrack())
    document.getElementById("repeatBtn").addEventListener("click", () => this.toggleRepeat())
    document.getElementById("shuffleBtn").addEventListener("click", () => this.toggleShuffle())
    document.getElementById("likeBtn").addEventListener("click", () => this.toggleLike())
    document.getElementById("fullscreenBtn").addEventListener("click", () => this.openFullscreenPlayer())
    document.getElementById("closeFullscreen").addEventListener("click", () => this.closeFullscreenPlayer())

    // Progress slider
    document.getElementById("progressSlider").addEventListener("change", (e) => {
      this.audio.currentTime = (e.target.value / 100) * this.audio.duration
    })

    // Volume slider
    document.getElementById("volumeSlider").addEventListener("input", (e) => {
      this.audio.volume = e.target.value / 100
    })
  }

  play(trackIndex = null) {
    if (trackIndex !== null) {
      this.currentTrackIndex = trackIndex
      this.loadTrack()
    }
    this.audio.play()
  }

  pause() {
    this.audio.pause()
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  nextTrack() {
    if (this.repeatMode === 2) {
      this.play(this.currentTrackIndex)
    } else {
      if (this.isShuffle) {
        this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length)
      } else {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length
      }
      this.play(this.currentTrackIndex)
    }
  }

  prevTrack() {
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0
    } else {
      this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length
      this.play(this.currentTrackIndex)
    }
  }

  loadTrack() {
    const track = this.playlist[this.currentTrackIndex]
    this.audio.src = track.url || ""
    this.updatePlayerUI(track)
  }

  updatePlayerUI(track) {
    document.querySelector(".player-track-name").textContent = track.title
    document.querySelector(".player-artist-name").textContent = track.artist
    document.querySelector(".player-album-art").src = track.image
    document.querySelector(".fullscreen-track-name").textContent = track.title
    document.querySelector(".fullscreen-artist-name").textContent = track.artist
    document.querySelector(".fullscreen-album-art").src = track.image

    this.updateLikeButton()
  }

  updateDuration() {
    const duration = this.audio.duration
    document.getElementById("duration").textContent = formatDuration(duration)
  }

  updateProgress() {
    const progress = (this.audio.currentTime / this.audio.duration) * 100
    document.getElementById("progressFill").style.width = progress + "%"
    document.getElementById("progressSlider").value = progress
    document.getElementById("currentTime").textContent = formatDuration(this.audio.currentTime)
  }

  toggleRepeat() {
    this.repeatMode = (this.repeatMode + 1) % 3
    const btn = document.getElementById("repeatBtn")
    btn.classList.remove("active")
    if (this.repeatMode > 0) {
      btn.classList.add("active")
      if (this.repeatMode === 2) {
        btn.innerHTML = '<i class="fas fa-redo"></i> <span style="font-size: 10px;">1</span>'
      }
    }
  }

  toggleShuffle() {
    this.isShuffle = !this.isShuffle
    document.getElementById("shuffleBtn").classList.toggle("active", this.isShuffle)
  }

  toggleLike() {
    const track = this.playlist[this.currentTrackIndex]
    if (this.likedTracks.has(track.id)) {
      this.likedTracks.delete(track.id)
    } else {
      this.likedTracks.add(track.id)
    }
    this.updateLikeButton()
  }

  updateLikeButton() {
    const track = this.playlist[this.currentTrackIndex]
    const isLiked = this.likedTracks.has(track.id)
    const likeBtn = document.getElementById("likeBtn")
    if (isLiked) {
      likeBtn.innerHTML = '<i class="fas fa-heart"></i>'
      likeBtn.classList.add("liked")
    } else {
      likeBtn.innerHTML = '<i class="far fa-heart"></i>'
      likeBtn.classList.remove("liked")
    }
  }

  onPlay() {
    this.isPlaying = true
    document.getElementById("playBtn").innerHTML = '<i class="fas fa-pause"></i>'
    document.getElementById("playBtn").classList.add("playing")
  }

  onPause() {
    this.isPlaying = false
    document.getElementById("playBtn").innerHTML = '<i class="fas fa-play"></i>'
    document.getElementById("playBtn").classList.remove("playing")
  }

  openFullscreenPlayer() {
    document.getElementById("fullscreenPlayer").classList.add("active")
  }

  closeFullscreenPlayer() {
    document.getElementById("fullscreenPlayer").classList.remove("active")
  }

  setPlaylist(tracks) {
    this.playlist = tracks
    this.currentTrackIndex = 0
  }
}

const player = new MusicPlayer()
player.loadTrack()
