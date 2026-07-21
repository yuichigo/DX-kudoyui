// =============================
// コミュニティ詳細表示
// =============================

async function loadCommunity() {
  const params = new URLSearchParams(window.location.search);
  const communityId = Number(params.get("id")) || 1;

  try {
    // コミュニティデータ取得
    const communityResponse = await fetch("../data/communities.json");
    const communities = await communityResponse.json();

    // イベントデータ取得
    const eventResponse = await fetch("../data/events.json");
    const events = await eventResponse.json();

    const community = communities.find((c) => c.id === communityId);

    if (!community) {
      document.getElementById("community-detail").innerHTML =
        "<p>コミュニティが見つかりません。</p>";

      return;
    }

    displayCommunity(community, events);
  } catch (error) {
    console.error(error);
  }
}

// =============================
// コミュニティ表示
// =============================

function displayCommunity(community, events) {
  const container = document.getElementById("community-detail");

  let html = `

        <h2>${community.name}</h2>

        <p><strong>活動内容：</strong>${community.description}</p>

        <p><strong>対象年齢：</strong>${community.targetAge}</p>

        <p><strong>活動日：</strong>${community.activityDay}</p>

        <p><strong>活動場所：</strong>${community.place}</p>

        <p><strong>参加人数：</strong>${community.members}人</p>

        <h3>開催予定イベント</h3>

    `;

  community.eventIds.forEach((id) => {
    const event = events.find((e) => e.id === id);

    if (event) {
      html += `

                <div class="event-card">

                    <h4>${event.title}</h4>

                    <p>${event.date}</p>

                    <button onclick="location.href='event-detail.html?id=${event.id}'">
                        詳細を見る
                    </button>

                </div>

            `;
    }
  });

  container.innerHTML = html;
}

// =============================

document.addEventListener("DOMContentLoaded", loadCommunity);
