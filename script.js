// ==========================================================================
// Data: Favorites & Interests
// ==========================================================================
const DEFAULT_FAVORITES = [
  {
    id: "tech-1",
    category: "tech",
    icon: "💻",
    title: "모던 웹 기술 & 인터랙션 디자인",
    desc: "직관적이고 미려한 UI/UX를 구현하는 과정을 사랑합니다. 섬세한 마이크로 애니메이션과 반응형 디자인에 큰 흥미를 느낍니다.",
    tags: ["Frontend", "CSS Art", "UI/UX"],
    likes: 28
  },
  {
    id: "tech-2",
    category: "tech",
    icon: "🤖",
    title: "생성형 AI & 개발 생산성 도구",
    desc: "AI 도구를 활용해 더 스마트하고 효율적으로 문제를 해결하는 새로운 워크플로우를 탐구하고 실험합니다.",
    tags: ["Generative AI", "Automation", "Tooling"],
    likes: 35
  },
  {
    id: "daily-1",
    category: "daily",
    icon: "☕",
    title: "스페셜티 드립 커피",
    desc: "신선한 원두를 갈아 정성껏 핸드드립으로 내리는 아침 루틴. 은은한 커피 향과 함께 하루를 차분하게 시작하는 시간을 아낍니다.",
    tags: ["Hand Drip", "Morning Routine", "Coffee Lover"],
    likes: 42
  },
  {
    id: "daily-2",
    category: "daily",
    icon: "🎧",
    title: "로파이 비트 & 앰비언트 음악",
    desc: "깊은 몰입과 집중이 필요할 땐 잔잔한 로파이와 신스웨이브 음악을 듣습니다. 일상의 소음을 지우고 리듬을 더해줍니다.",
    tags: ["Lofi Chill", "Focus Music", "Playlist"],
    likes: 19
  },
  {
    id: "hobby-1",
    category: "hobby",
    icon: "📚",
    title: "기술 서적 & 에세이 독서",
    desc: "다양한 관점과 통찰을 전해주는 도서들을 꾸준히 읽습니다. 책 속의 문장 하나가 새로운 생각의 실마리가 되곤 합니다.",
    tags: ["Reading", "Insights", "Growth"],
    likes: 24
  },
  {
    id: "hobby-2",
    category: "hobby",
    icon: "🌿",
    title: "도심 속 공원 산책과 사진",
    desc: "복잡한 모니터를 벗어나 계절의 변화와 자연의 색감을 눈에 담으며 걷습니다. 일상 속 소소한 순간을 스냅샷으로 기록합니다.",
    tags: ["Walking", "Photography", "Healing"],
    likes: 31
  }
];

// ==========================================================================
// State Management
// ==========================================================================
const state = {
  theme: localStorage.getItem("theme") || "dark",
  activeCategory: "all",
  profile: JSON.parse(localStorage.getItem("profile_data")) || {
    avatar: "👨‍💻",
    name: "김민수",
    role: "Frontend & Creative Explorer",
    status: "새로운 배움과 영감을 찾는 중 🚀",
    bio: "사용자에게 편리함과 즐거움을 주는 웹 경험을 디자인하고 구축하는 것을 좋아합니다. 호기심을 바탕으로 기술과 일상의 연결고리를 탐구하며 지속적으로 성장해나가고 있습니다."
  },
  favorites: JSON.parse(localStorage.getItem("favorites_data")) || DEFAULT_FAVORITES,
  likedItems: JSON.parse(localStorage.getItem("liked_items")) || {},
  cheerCount: parseInt(localStorage.getItem("cheer_count") || "42", 10)
};

// ==========================================================================
// Typewriter Effect
// ==========================================================================
const typePhrases = [
  "기술과 일상을 잇는 따뜻한 인터랙션을 만듭니다 ✨",
  "새로운 지식을 배우고 공유하는 것을 즐깁니다 💡",
  "커피 한 잔과 함께 더 좋은 코드를 고민합니다 ☕",
  "방문해 주셔서 진심으로 반갑습니다! 👋"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 75;
const deletingSpeed = 40;
const delayBetweenPhrases = 2200;

function runTypewriter() {
  const typewriterElement = document.getElementById("typewriter-line");
  if (!typewriterElement) return;

  const currentPhrase = typePhrases[phraseIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let nextSpeed = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentPhrase.length) {
    nextSpeed = delayBetweenPhrases;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typePhrases.length;
    nextSpeed = 400;
  }

  setTimeout(runTypewriter, nextSpeed);
}

// ==========================================================================
// Theme Toggle
// ==========================================================================
function initTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  const themeToggle = document.getElementById("theme-toggle");

  themeToggle?.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("theme", state.theme);
    showToast(`${state.theme === "dark" ? "🌙 다크 모드" : "☀️ 라이트 모드"}로 전환되었습니다`);
  });
}

// ==========================================================================
// Render Profile
// ==========================================================================
function renderProfile() {
  const { avatar, name, role, status, bio } = state.profile;

  const avatarEl = document.getElementById("profile-avatar");
  const nameEl = document.getElementById("profile-name");
  const roleEl = document.getElementById("profile-role");
  const statusEl = document.getElementById("profile-status-text");
  const bioEl = document.getElementById("profile-bio");
  const footerNameEl = document.getElementById("footer-name");

  if (avatarEl) avatarEl.textContent = avatar;
  if (nameEl) nameEl.textContent = name;
  if (roleEl) roleEl.textContent = role;
  if (statusEl) statusEl.textContent = status;
  if (bioEl) bioEl.textContent = bio;
  if (footerNameEl) footerNameEl.textContent = name;
}

// ==========================================================================
// Render Favorites Cards
// ==========================================================================
function renderFavorites() {
  const grid = document.getElementById("favorites-grid");
  if (!grid) return;

  const filtered = state.activeCategory === "all"
    ? state.favorites
    : state.favorites.filter(item => item.category === state.activeCategory);

  grid.innerHTML = "";

  filtered.forEach(item => {
    const isLiked = state.likedItems[item.id] || false;
    const card = document.createElement("article");
    card.className = "fav-card";
    card.setAttribute("data-id", item.id);

    const categoryNames = {
      tech: "테크 & 코딩",
      daily: "일상 & 라이프",
      hobby: "취미 & 힐링"
    };

    const tagsHtml = item.tags
      .map(tag => `<span class="tag-item">#${tag}</span>`)
      .join("");

    card.innerHTML = `
      <div>
        <div class="fav-card-header">
          <div class="fav-icon-box">${item.icon}</div>
          <span class="fav-category-tag">${categoryNames[item.category] || item.category}</span>
        </div>
        <div class="fav-card-body" style="margin-top: 14px;">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <div class="fav-tags-list">
            ${tagsHtml}
          </div>
        </div>
      </div>
      <div class="fav-card-footer">
        <button class="like-btn ${isLiked ? "liked" : ""}" data-card-id="${item.id}" aria-label="좋아요">
          <span class="heart-icon">${isLiked ? "💖" : "🤍"}</span>
          <span class="like-count">${item.likes}</span>
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  // Attach like listeners
  grid.querySelectorAll(".like-btn").forEach(btn => {
    btn.addEventListener("click", handleLikeClick);
  });
}

function handleLikeClick(e) {
  const btn = e.currentTarget;
  const id = btn.dataset.cardId;
  const item = state.favorites.find(f => f.id === id);
  if (!item) return;

  const isLiked = state.likedItems[id];

  if (isLiked) {
    item.likes = Math.max(0, item.likes - 1);
    delete state.likedItems[id];
  } else {
    item.likes += 1;
    state.likedItems[id] = true;
    spawnFloatingHeart(e.clientX, e.clientY);
  }

  localStorage.setItem("favorites_data", JSON.stringify(state.favorites));
  localStorage.setItem("liked_items", JSON.stringify(state.likedItems));

  renderFavorites();
}

// ==========================================================================
// Category Filter
// ==========================================================================
function initFilters() {
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => {
        c.classList.remove("active");
        c.setAttribute("aria-selected", "false");
      });
      chip.classList.add("active");
      chip.setAttribute("aria-selected", "true");
      state.activeCategory = chip.dataset.category;
      renderFavorites();
    });
  });
}

// ==========================================================================
// Floating Hearts Animation
// ==========================================================================
function spawnFloatingHeart(x, y) {
  const container = document.getElementById("hearts-container");
  if (!container) return;

  const heart = document.createElement("div");
  heart.className = "floating-heart";
  const hearts = ["💖", "💕", "✨", "❤️", "🥰"];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  // Position relative to click
  const posX = (x || window.innerWidth / 2) + (Math.random() * 40 - 20);
  const posY = (y || window.innerHeight / 2) - 20;

  heart.style.left = `${posX}px`;
  heart.style.top = `${posY}px`;

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1800);
}

// ==========================================================================
// Toast Notification
// ==========================================================================
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-msg");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// ==========================================================================
// Cheer Button
// ==========================================================================
function initCheer() {
  const cheerBtn = document.getElementById("cheer-btn");
  const cheerCountEl = document.getElementById("cheer-count");
  if (!cheerBtn || !cheerCountEl) return;

  cheerCountEl.textContent = state.cheerCount;

  cheerBtn.addEventListener("click", (e) => {
    state.cheerCount += 1;
    cheerCountEl.textContent = state.cheerCount;
    localStorage.setItem("cheer_count", state.cheerCount.toString());

    // Spawn 3 burst hearts
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        spawnFloatingHeart(e.clientX + (i * 20 - 20), e.clientY);
      }, i * 120);
    }

    showToast("따뜻한 응원 감사합니다! 힘이 나요 🥰");
  });
}

// ==========================================================================
// Copy Email
// ==========================================================================
function initEmailCopy() {
  const copyBtn = document.getElementById("copy-email-btn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.getAttribute("data-email") || "minsu.alex.kim@example.com";
    try {
      await navigator.clipboard.writeText(email);
      showToast(`이메일(${email})이 복사되었습니다! 💌`);
    } catch {
      // Fallback
      const tempInput = document.createElement("input");
      tempInput.value = email;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      showToast(`이메일(${email})이 복사되었습니다! 💌`);
    }
  });
}

// ==========================================================================
// Profile Modal (Customization)
// ==========================================================================
function initProfileModal() {
  const openBtn = document.getElementById("edit-profile-btn");
  const modal = document.getElementById("profile-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const cancelBtn = document.getElementById("modal-cancel-btn");
  const form = document.getElementById("profile-edit-form");

  if (!modal || !openBtn || !form) return;

  const openModal = () => {
    document.getElementById("input-avatar").value = state.profile.avatar;
    document.getElementById("input-name").value = state.profile.name;
    document.getElementById("input-role").value = state.profile.role;
    document.getElementById("input-status").value = state.profile.status;
    document.getElementById("input-bio").value = state.profile.bio;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  openBtn.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    state.profile = {
      avatar: document.getElementById("input-avatar").value || "👨‍💻",
      name: document.getElementById("input-name").value || "김민수",
      role: document.getElementById("input-role").value || "Frontend Explorer",
      status: document.getElementById("input-status").value || "새로운 배움 탐구 중 🚀",
      bio: document.getElementById("input-bio").value || ""
    };

    localStorage.setItem("profile_data", JSON.stringify(state.profile));
    renderProfile();
    closeModal();
    showToast("프로필 정보가 성공적으로 업데이트되었습니다! ✨");
  });
}

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderProfile();
  renderFavorites();
  initFilters();
  initCheer();
  initEmailCopy();
  initProfileModal();
  runTypewriter();
});
