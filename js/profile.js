// =============================
// マイページ表示
// =============================

async function loadProfile() {
  try {
    const userResponse = await fetch("../data/users.json");
    const users = await userResponse.json();

    const eventResponse = await fetch("../data/events.json");
    const events = await eventResponse.json();

    // 今回は最初のユーザーをログインユーザーとする
    const user = users[0];

    displayProfile(user, events);
  } catch (error) {
    console.error("プロフィールの取得に失敗しました", error);
  }
}

// =============================
// プロフィール表示
// =============================

function displayProfile(user, events) {
  const container = document.getElementById("profile");

  let html = `

        <h2>プロフィール</h2>

        <p><strong>名前：</strong>${user.name}</p>

        <p><strong>年齢：</strong>${user.age}歳</p>

        <p><strong>住所：</strong>${user.address}</p>

        <h2>子どもの情報</h2>

        <ul>

    `;

  user.children.forEach((child) => {
    html += `
            <li>${child.name}（${child.age}歳）</li>
        `;
  });

  html += `

        </ul>

        <h2>予約済みイベント</h2>

        <ul>

    `;

  user.reservedEvents.forEach((id) => {
    const event = events.find((e) => e.id === id);

    if (event) {
      html += `
                <li>${event.title}</li>
            `;
    }
  });

  html += `

        </ul>

        <h2>参加履歴</h2>

        <ul>

    `;

  user.participatedEvents.forEach((id) => {
    const event = events.find((e) => e.id === id);

    if (event) {
      html += `
                <li>${event.title}</li>
            `;
    }
  });

  html += `

        </ul>

    `;

  container.innerHTML = html;
}

// =============================

document.addEventListener("DOMContentLoaded", loadProfile);
