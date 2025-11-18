// Mock Data
const mockTracks = [
  {
    "id": 1,
    "title": "Billie Jean",
    "artist": "Michael Jackson",
    "album": "Thriller",
    "duration": 297,
    "genre": "pop/funk",
    "image": "css/img/michael-jackson-billie-jean-solid-uk-7-inch-vinyl-single-a3084-645432.webp",
    "url": ""
  },
  {
    "id": 2,
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "duration": 355,
    "genre": "rock",
    "image": "css/img/Bohemian_Rhapsody_music_video_still.png",
    "url": ""
  },
  {
    "id": 3,
    "title": "Smells Like Teen Spirit",
    "artist": "Nirvana",
    "album": "Nevermind",
    "duration": 301,
    "genre": "grunge/rock",
    "image": "css/img/nirvana.webp",
    "url": ""
  },
  {
    "id": 4,
    "title": "Shape of You",
    "artist": "Ed Sheeran",
    "album": "÷ (Divide)",
    "duration": 233,
    "genre": "pop",
    "image": "css/img/shape.jpg",

    "url": ""
  },
  {
    "id": 5,
    "title": "Rolling in the Deep",
    "artist": "Adele",
    "album": "21",
    "duration": 228,
    "genre": "soul/pop",
    "image": "https://upload.wikimedia.org/wikipedia/en/1/1b/Adele_-_21.png",
    "url": ""
  },
  {
    "id": 6,
    "title": "Hotel California",
    "artist": "Eagles",
    "album": "Hotel California",
    "duration": 390,
    "genre": "rock",
    "image": "css/img/hotel.webp",
    "url": ""
  },
  {
    "id": 7,
    "title": "Hotel California",
    "artist": "Eagles",
    "album": "Hotel California",
    "album": "The Bodyguard Soundtrack",
    "duration": 273,
    "genre": "R&B/pop",
    "image": "css/img/mark.jpg",
    "url": ""
  },
  {
    "id": 8,
    "title": "Hey Jude",
    "artist": "The Beatles",
    "album": "Hey Jude (Single)",
    "duration": 431,
    "genre": "rock/pop",
    "image": "css/img/heyjude.jpg",
    "url": ""
  },
  {
    "id": 9,
    "title": "Thriller",
    "artist": "Michael Jackson",
    "album": "Thriller",
    "duration": 358,
    "genre": "pop",
    "image": "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
    "url": ""
  },
  {
    "id": 10,
    "title": "Like a Rolling Stone",
    "artist": "Bob Dylan",
    "album": "Highway 61 Revisited",
    "duration": 369,
    "genre": "folk rock",
    "image": "https://upload.wikimedia.org/wikipedia/en/8/8b/Bob_Dylan_-_Highway_61_Revisited.jpg",
    "url": ""
  },
  {
    "id": 11,
    "title": "Uptown Funk",
    "artist": "Mark Ronson feat. Bruno Mars",
    "album": "Uptown Special",
    "duration": 269,
    "genre": "funk/pop",
    "image": "https://upload.wikimedia.org/wikipedia/en/7/73/Mark_Ronson_-_Uptown_Special.png",
    "url": ""
  },
  {
    "id": 12,
    "title": "Call Me Maybe",
    "artist": "Carly Rae Jepsen",
    "album": "Kiss",
    "duration": 194,
    "genre": "pop",
    "image": "https://upload.wikimedia.org/wikipedia/en/9/9d/Carly_Rae_Jepsen_-_Kiss.png",
    "url": ""
  }
]

const mockPlaylists = [
  { id: 1, name: "Liked Songs", count: 142, icon: "heart" },
  { id: 2, name: "Hot Hits", count: 58, icon: "fire" },
  { id: 3, name: "Focus Mode", count: 37, icon: "headphones" },
  { id: 4, name: "Workout Mix", count: 62, icon: "dumbbell" },
  { id: 5, name: "Chill Vibes", count: 89, icon: "wind" },
]

const mockArtists = [
  { id: 1, name: "Luna Echo", followers: 245000, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=artist1" },
  { id: 2, name: "Solar Rays", followers: 512000, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=artist2" },
  { id: 3, name: "Thunder Road", followers: 387000, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=artist3" },
  { id: 4, name: "Blue Mood", followers: 198000, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=artist4" },
]

function getTracksByGenre(genre) {
  if (genre === "all") return mockTracks
  return mockTracks.filter((track) => track.genre === genre)
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}

function getRecentlyPlayed() {
  return mockTracks.slice(0, 6)
}

function getRecommended() {
  return mockTracks.slice(2, 8)
}

function getNewReleases() {
  return mockTracks.slice(1, 7)
}
