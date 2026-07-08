// =============================
// 予約画面
// =============================

async function loadReservation() {
  const params = new URLSearchParams(window.location.search);

  const eventId = Number(params.get("id"));

  try {
    const response = await fetch("../data/events.json");

    const events = await response.json();

    const event = events.find((e) => e.id === eventId);

    if (!event) {
      document.getElementById("reservation-detail").innerHTML =
        "<p>イベントが見つかりません。</p>";

      return;
    }

    displayReservation(event);
  } catch (error) {
    console.error(error);
  }
}

// =============================
// 予約内容表示
// =============================

function displayReservation(event) {
  const container = document.getElementById("reservation-detail");

  container.innerHTML = `

        <h2>${event.title}</h2>

        <p><strong>日時：</strong>${event.date}</p>

        <p><strong>時間：</strong>${event.time}</p>

        <p><strong>場所：</strong>${event.place}</p>

        <p><strong>対象：</strong>${event.targetAge}</p>

        <p><strong>現在の参加人数：</strong>${event.participants}人</p>

        <label>参加人数</label>

        <select id="people">

            <option value="1">1人</option>

            <option value="2">2人</option>

            <option value="3">3人</option>

            <option value="4">4人</option>

        </select>

        <br><br>

        <button onclick="reserveEvent(${event.id})">

            予約する

        </button>

    `;
}

// =============================
// 予約処理
// =============================

function reserveEvent(id) {
  const people = document.getElementById("people").value;

  alert(`イベントID：${id}\n参加人数：${people}人\n\n予約が完了しました。`);
}

// =============================

document.addEventListener("DOMContentLoaded", loadReservation);
