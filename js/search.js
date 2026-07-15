// =============================
// イベント検索機能
// =============================

let events = [];

// JSONファイルを読み込む
async function loadEvents() {
  try {
    const response = await fetch("../data/events.json");
    events = await response.json();

    console.log(events);

    displayEvents(events);
  } catch (error) {
    console.error("イベントデータの読み込みに失敗しました。", error);
  }
}

// =============================
// イベント一覧表示
// =============================

function displayEvents(eventList) {
  const container = document.getElementById("event-list");

  if (!container) return;

  container.innerHTML = "";

  eventList.forEach((event) => {
    container.innerHTML += `
            <div class="event-card">

                <h3>${event.title}</h3>

                <p>日時：${event.date}</p>

                <p>場所：${event.place}</p>

                <p>対象：${event.targetAge}</p>

                <button onclick="location.href='event-detail.html?id=${event.id}'">
                    詳細を見る
                </button>

            </div>
        `;
  });
}

// =============================
// キーワード検索
// =============================

function searchEvents() {
  const keyword = document.getElementById("search-input").value.toLowerCase();
  console.log(keyword);
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(keyword) ||
      event.place.toLowerCase().includes(keyword) ||
      event.category.toLowerCase().includes(keyword),
  );

  console.log(filteredEvents);

  displayEvents(filteredEvents);
}

// =============================
// 初期処理
// =============================

document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
});
