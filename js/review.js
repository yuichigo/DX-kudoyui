// =============================
// 口コミ表示
// =============================

async function loadReviews() {
  const params = new URLSearchParams(window.location.search);

  const eventId = Number(params.get("id"));

  try {
    const response = await fetch("../data/reviews.json");

    const reviews = await response.json();

    const eventReviews = reviews.filter((review) => review.eventId === eventId);

    displayReviews(eventReviews);
  } catch (error) {
    console.error("口コミデータの取得に失敗しました", error);
  }
}

// =============================
// 口コミ一覧表示
// =============================

function displayReviews(reviews) {
  const container = document.getElementById("review-list");

  if (!container) return;

  if (reviews.length === 0) {
    container.innerHTML = "<p>まだ口コミはありません。</p>";

    return;
  }

  container.innerHTML = "";

  reviews.forEach((review) => {
    container.innerHTML += `

            <div class="review-card">

                <h3>${"★".repeat(review.rating)}</h3>

                <p><strong>${review.userName}</strong></p>

                <p>${review.comment}</p>

                <small>${review.date}</small>

            </div>

        `;
  });
}

// =============================

document.addEventListener("DOMContentLoaded", loadReviews);
