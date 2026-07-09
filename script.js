// fade up

const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add('show');

        }

    });

});

fadeElements.forEach(el => observer.observe(el));


// menu

const menuBtn = document.querySelector(".menu-btn");
const menuOverlay = document.getElementById("menu-overlay");
const closeBtn = document.getElementById("close-menu");

menuBtn.addEventListener("click", () => {

    menuOverlay.classList.add("show");

});

closeBtn.addEventListener("click", () => {

    menuOverlay.classList.remove("show");

});

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        document.body.classList.add("scrolled");

    } else {

        document.body.classList.remove("scrolled");

    }

});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".index-video");

  if (video) {
    video.muted = true;
    video.play().catch(() => {});
  }
});

const slider = document.querySelector('.gallery-slider');
const dots = document.querySelectorAll('.dot');

if (slider && dots.length) {

    slider.addEventListener('scroll', () => {

        const index = Math.round(
            slider.scrollLeft / slider.clientWidth
        );

        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        if (dots[index]) {
            dots[index].classList.add('active');
        }

    });

}

const videos = document.querySelectorAll('.marquee-link');

videos.forEach(video => {

    video.addEventListener('mouseenter', () => {
        video.pause();
    });

    video.addEventListener('mouseleave', () => {
        video.play();
    });

});

// gallery search

const searchInput = document.getElementById("searchInput");
const searchClose = document.getElementById("searchClose");
const searchResults = document.getElementById("searchResults");
const works = document.querySelectorAll(".gallery-work");

if (searchInput && searchClose && searchResults) {

    searchInput.addEventListener("input", () => {

        const keyword = searchInput.value.trim().toLowerCase();

        // 前の検索候補を消す
        searchResults.innerHTML = "";

        // 何も入力していない時は候補を出さない
        if (keyword === "") {
            return;
        }

        works.forEach((work) => {

            const title = work.dataset.title || "";
            const keywords = work.dataset.keywords || "";

            const searchText = title + " " + keywords;

            if (searchText.toLowerCase().includes(keyword)) {

                const result = document.createElement("div");

                result.classList.add("search-result");
                result.textContent = work.dataset.title;

                result.addEventListener("click", () => {

                    work.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                    searchResults.innerHTML = "";
                    searchInput.value = "";

                });

                searchResults.appendChild(result);
            }

        });

    });


    // ×を押した時
    searchClose.addEventListener("click", () => {

        searchInput.value = "";
        searchResults.innerHTML = "";
        searchInput.focus();

    });

}


/* =====================
   WORK OVERLAY
===================== */

const workInfo = document.getElementById("work-info");
const galleryWorks = document.querySelectorAll(".gallery-work");
const workOverlay = document.getElementById("work-overlay");
const workOverlayImages = document.getElementById("work-overlay-images");
const workClose = document.getElementById("work-close");


galleryWorks.forEach((work) => {

    work.addEventListener("click", (e) => {

        e.preventDefault();

        const mediaItems = work.dataset.media
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== "");

        workOverlayImages.innerHTML = "";

         const info = work.dataset.info || "";
         const text = work.dataset.text || "";
         const link = work.dataset.link || "";

         workInfo.innerHTML = "";

         if (info) {
         if (link) {
             const infoLink = document.createElement("a");

             infoLink.href = link;
             infoLink.target = "_blank";
             infoLink.rel = "noopener noreferrer";
             infoLink.className = "music-link";
             infoLink.textContent = info;

     workInfo.appendChild(infoLink);
      } else {
     const infoText = document.createElement("p");

     infoText.textContent = info;
     workInfo.appendChild(infoText);
     }

     if (text) {
     const subText = document.createElement("p");

     subText.className = "music-text";
     subText.textContent = text;

     workInfo.appendChild(subText);
      }
      }


        mediaItems.forEach((src) => {

            /* 動画の場合 */
            if (src.endsWith(".mp4")) {

                const video = document.createElement("video");

                video.src = src;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;

                workOverlayImages.appendChild(video);

            }

            /* 画像の場合 */
            else {

                const img = document.createElement("img");

                img.src = src;

                workOverlayImages.appendChild(img);

            }

        });


        workOverlay.scrollTop = 0;
        workOverlay.classList.add("is-open");

        document.body.style.overflow = "hidden";

    });

});


workClose.addEventListener("click", () => {

    workOverlay.classList.remove("is-open");

    document.body.style.overflow = "";

});

const isEnglish =
  document.documentElement.lang === "en";

const placeholders = isEnglish
  ? [
      "What are you in the mood for?",
      "Romance / Can't sleep...",
      "Staying in or going out?",
      "What should we do today? °・*:.。.☆"
    ]
  : [
      "今、どんな気分？",
      "恋愛モード / 眠れない / 何か作りたい...",
      "家にいる？お出かけする？",
      "今日はなにしよう°・*:.。.☆"
    ];

let placeholderIndex = 0;

setInterval(() => {

  // まず薄くする
  searchInput.classList.add("placeholder-fade");

  setTimeout(() => {

    // 一度完全に消す
    searchInput.placeholder = "";

    setTimeout(() => {

      // 次の文字に切り替える
      placeholderIndex =
        (placeholderIndex + 1) % placeholders.length;

      searchInput.placeholder =
        placeholders[placeholderIndex];

      // ふわっと表示
      searchInput.classList.remove("placeholder-fade");

    }, 100);

  }, 500);

}, 3000);