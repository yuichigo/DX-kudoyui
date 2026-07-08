// =============================
// イベント詳細表示
// =============================

async function loadEvent() {
  const params = new URLSearchParams(window.location.search);
  const eventId = Number(params.get("id"));

  try {
    const response = await fetch("../data/events.json");
    const events = await response.json();

    const event = events.find((e) => e.id === eventId);

    if (!event) {
      document.getElementById("event-detail").innerHTML =
        "<p>イベントが見つかりません。</p>";

      return;
    }

    displayEvent(event);
  } catch (error) {
    console.error(error);
  }
}

// =============================
// イベント表示
// =============================

function displayEvent(event) {
  const container = document.getElementById("event-detail");

  container.innerHTML = `

        <h2>${event.title}</h2>

        <img src="${event.image}" alt="${event.title}" width="100%">

        <p><strong>日時：</strong>${event.date}</p>

        <p><strong>時間：</strong>${event.time}</p>

        <p><strong>場所：</strong>${event.place}</p>

        <p><strong>対象年齢：</strong>${event.targetAge}</p>

        <p><strong>定員：</strong>${event.capacity}人</p>

        <p><strong>参加予定：</strong>${event.participants}人</p>

        <p>${event.description}</p>

        <button onclick="goReservation(${event.id})">
            参加する
        </button>

    `;
}

// =============================
// 予約画面へ
// =============================

function goReservation(id) {
  location.href = `reservation.html?id=${id}`;
}

// =============================

document.addEventListener("DOMContentLoaded", loadEvent);
