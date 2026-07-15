// =============================
// ホーム画面
// =============================

let events = [];
let communities = [];
let user = null;

// =============================
// 初期処理
// =============================

document.addEventListener("DOMContentLoaded", () => {
  loadHome();
});

// =============================
// データ読込み
// =============================

async function loadHome() {
  try {
    // イベント
    const eventResponse = await fetch("data/events.json");
    events = await eventResponse.json();

    // コミュニティ
    const communityResponse = await fetch("data/communities.json");
    communities = await communityResponse.json();

    // ユーザー
    const userResponse = await fetch("data/users.json");
    const users = await userResponse.json();

    // 今回は1人目をログインユーザーとする
    user = users[0];

    displayRecommendedEvents();

    displayNewEvents();

    displayCommunities();
  } catch (error) {
    console.error("ホーム画面の読込みに失敗しました。", error);
  }
}

// =============================
// 検索
// =============================

function goSearch() {
  const keyword = document.getElementById("home-search").value;

  location.href = `pages/event-list.html?keyword=${encodeURIComponent(keyword)}`;
}

// =============================
// おすすめイベント
// =============================

function displayRecommendedEvents() {
  const container = document.getElementById("recommend-events");

  if (!container) return;

  container.innerHTML = "";

  const reserved = user.reservedEvents;

  const recommendEvents = events.filter(
    (event) => !reserved.includes(event.id),
  );

  recommendEvents.slice(0, 2).forEach((event) => {
    container.innerHTML += `

            <div class="event-card">

                <h3>${event.title}</h3>

                <p>日時：${event.date}</p>

                <p>場所：${event.place}</p>

                <button onclick="location.href='pages/event-detail.html?id=${event.id}'">

                    詳細を見る

                </button>

            </div>

        `;
  });
}

// =============================
// 新着イベント
// =============================

function displayNewEvents() {
  const container = document.getElementById("new-events");

  if (!container) return;

  container.innerHTML = "";

  events.forEach((event) => {
    container.innerHTML += `

            <li>

                <a href="pages/event-detail.html?id=${event.id}">

                    ${event.title}

                </a>

            </li>

        `;
  });
}

// =============================
// コミュニティ一覧
// =============================

function displayCommunities() {
  const container = document.getElementById("community-list");

  if (!container) return;

  container.innerHTML = "";

  communities.forEach((community) => {
    container.innerHTML += `

            <div class="community-card">

                <h3>${community.name}</h3>

                <p>対象：${community.targetAge}</p>

                <button onclick="location.href='pages/community-detail.html?id=${community.id}'">

                    詳細を見る

                </button>

            </div>

        `;
  });
}
