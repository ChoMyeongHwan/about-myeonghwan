// ==========================================================================
// Data: Favorites & Interests
// ==========================================================================
const DEFAULT_FAVORITES = [
  {
    id: "hobby-1",
    category: "hobby",
    icon: "🏸",
    title: "주말 배드민턴 & 유산소 운동",
    desc: "빠른 랠리 속에서 집중하며 땀 흘리는 시간을 좋아합니다. 스트레스를 시원하게 해소하고 한 주를 다시 시작할 활력을 충전합니다.",
    tags: ["Badminton", "랠리", "건강한루틴"],
    likes: 48
  },
  {
    id: "tech-1",
    category: "tech",
    icon: "💻",
    title: "읽기 좋은 코드와 간결한 설계",
    desc: "누구나 쉽게 이해하고 유지보수할 수 있는 명확한 코드와 직관적인 문제 해결에 관심이 많습니다.",
    tags: ["CleanCode", "Architecture", "ProblemSolving"],
    likes: 36
  },
  {
    id: "tech-2",
    category: "tech",
    icon: "🛠️",
    title: "개발 생산성 도구 & 자동화",
    desc: "반복 작업을 줄이고 작업 효율을 높여주는 유용한 개발 도구와 자동화 스크립트를 탐색하고 적용합니다.",
    tags: ["Productivity", "Automation", "DevTools"],
    likes: 29
  },
  {
    id: "daily-1",
    category: "daily",
    icon: "☕",
    title: "아침 커피와 하루 계획",
    desc: "하루를 시작하기 전 따뜻한 커피 한 잔과 함께 오늘 할 일과 우선순위를 차분히 정리하는 시간을 갖습니다.",
    tags: ["MorningCoffee", "DailyRoutine", "Focus"],
    likes: 41
  },
  {
    id: "daily-2",
    category: "daily",
    icon: "🎧",
    title: "몰입을 돕는 플레이리스트",
    desc: "작업이나 공부를 할 때 잡음을 지워주고 흐름을 편안하게 유지해 주는 잔잔한 음악을 즐겨 듣습니다.",
    tags: ["BGM", "FocusMusic", "Playlist"],
    likes: 23
  },
  {
    id: "hobby-2",
    category: "hobby",
    icon: "📖",
    title: "새로운 기술 아티클 & 배움",
    desc: "개발자들의 블로그 글과 최신 기술 동향을 가볍게 살펴보며 새로운 시각과 인사이트를 꾸준히 접합니다.",
    tags: ["TechArticle", "ContinuousLearning", "Insight"],
    likes: 27
  }
];

// ==========================================================================
// State Management
// ==========================================================================
const DEFAULT_PROFILE = {
  avatar: "🏸",
  name: "조명환",
  role: "Software Developer",
  status: "배움과 성장을 지속하는 중 🚀",
  bio: "읽기 좋은 코드와 간결한 문제 해결을 지향하는 개발자 조명환(MyeongHwan Cho)입니다. 새로운 기술을 차근차근 익혀 실용적인 결과물로 만드는 것을 좋아하며, 주말에는 배드민턴 코트에서 땀 흘리며 에너지를 충전합니다."
};

// Clear legacy sample data if present
let savedProfile = JSON.parse(localStorage.getItem("profile_data"));
if (!savedProfile || savedProfile.name === "김민수") {
  savedProfile = DEFAULT_PROFILE;
  localStorage.setItem("profile_data", JSON.stringify(DEFAULT_PROFILE));
  localStorage.setItem("favorites_data", JSON.stringify(DEFAULT_FAVORITES));
}

const state = {
  theme: localStorage.getItem("theme") || "dark",
  activeCategory: "all",
  profile: savedProfile,
  favorites: JSON.parse(localStorage.getItem("favorites_data")) || DEFAULT_FAVORITES,
  likedItems: JSON.parse(localStorage.getItem("liked_items")) || {},
  cheerCount: parseInt(localStorage.getItem("cheer_count") || "42", 10)
};

// ==========================================================================
// Typewriter Effect
// ==========================================================================
const typePhrases = [
  "안녕하세요! 개발자 조명환입니다 👋",
  "기본에 충실하며 꾸준히 성장합니다 🌱",
  "코드로 가치를 더하고, 코트 위에서 땀을 흘립니다 🏸",
  "방문해 주셔서 감사합니다! 편안하게 둘러보세요 ☕"
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
    const email = copyBtn.getAttribute("data-email") || "1jmhcho@gmail.com";
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
      avatar: document.getElementById("input-avatar").value || "🏸",
      name: document.getElementById("input-name").value || "조명환",
      role: document.getElementById("input-role").value || "Software Developer",
      status: document.getElementById("input-status").value || "배움과 성장을 지속하는 중 🚀",
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
