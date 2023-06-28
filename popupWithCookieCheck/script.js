var COOKIE_PREFIX = "MK_POPUP_";

window.onresize = event => {
  alignPopupsToGrid();
};

const alignPopupsToGrid = () => {
  const mainPopups = document.querySelectorAll(".main-popup");
  if (window.innerWidth < 768) {
    mainPopups.forEach(elem => setPopupPosition(elem, -1, -1));
  } else {
    mainPopups.forEach(alignPopupsPCGrid);
  }
};

const getMainPopup = () => {
  // API 연동 필요

  // title: 팝업 타이틀
  // target: 새창(blank)|기존창(self) 옵션
  // position: 팝업 위치
  // pcImage: pc 이미지 경로
  // mobileImage: 모바일 이미지 경로
  // description: 이미지 레이블

  const mainPopupInfo = [
    {
      idx: 1,
      title: "더 뉴 아반떼",
      target: "self", // self, blank
      pcImage:
        "https://images.unsplash.com/photo-1498940757830-82f7813bf178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      mobileImage:
        "https://images.unsplash.com/photo-1498940757830-82f7813bf178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      description: "더 뉴 아반떼 상세보기",
    },
    {
      idx: 2,
      title: "더 뉴 아반떼",
      target: "blank", // self, blank
      pcImage:
        "https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      mobileImage:
        "https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "더 뉴 아반떼 상세보기",
    },
    {
      idx: 3,
      title: "더 뉴 아반떼",
      target: "blank", // self, blank
      pcImage:
        "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80",
      mobileImage:
        "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80",
      description: "더 뉴 아반떼 상세보기",
    },
    {
      idx: 4,
      title: "더 뉴 아반떼",
      target: "blank", // self, blank
      pcImage:
        "https://images.unsplash.com/photo-1531012451721-432c0ae74527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      mobileImage:
        "https://images.unsplash.com/photo-1531012451721-432c0ae74527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      description: "더 뉴 아반떼 상세보기",
    },
  ];

  drawMainPopup(mainPopupInfo);
};

const drawMainPopup = res => {
  if (!res.length) return;

  let popupElement = "";

  for (let el of res) {
    if (getPopupCookie(COOKIE_PREFIX + el.idx)) {
      continue;
    }
    popupElement += `
      <div class="main-popup visible" data-target="${el.idx}">
        <div class="popup-body">
          <a href="" class="popup-link" title="${el.title}" aria-label="${
      el.title
    }" target="_${el.target.trim().toLowerCase()}">
            <img
              src="${el.pcImage}"
              class="popup-img-pc" alt="${el.description}" />
            <img
              src="${el.mobileImage}"
              class="popup-img-mobile" alt="${el.description}" />
          </a>
        </div>
        <div class="popup-footer">
          <div class="popup-check-wrap">
            <input type="checkbox" id="checkNotToday_${
              el.idx
            }" class="popup-check checkNotToday" />
            <label for="checkNotToday_${
              el.idx
            }" class="" title="오늘 하루 보지 않기">
              <span></span>오늘 하루 보지 않기
            </label>
          </div>
          <button class="popup-close" aria-label="팝업 닫기"></button>
        </div>
      </div>
    `;

    document.querySelector("#popupContainer").innerHTML = popupElement;
  }

  const mainPopups = document.querySelectorAll(".main-popup");

  mainPopups.forEach((elem, idx) => {
    elem
      .querySelector(".popup-close")
      .addEventListener("click", e => closePopup(e));
    elem.querySelector("input").addEventListener("change", e => closePopup(e));
  });

  alignPopupsToGrid();
};

const closePopup = e => {
  e.preventDefault();
  const target = e.target;
  const parent = target.closest(".main-popup");

  parent.classList.remove("visible");

  setTimeout(() => {
    parent.remove();
    alignPopupsToGrid();
  }, 500);

  if (target.classList.contains("checkNotToday")) {
    const idx = parent.getAttribute("data-target");
    setPopupCookie(idx);
  }
};

const getPopupCookie = name => {
  const cookies = document.cookie.split(";");

  for (let el of cookies) {
    if (el.indexOf(name) !== -1 && el.split("=")[1] === "Y") {
      return true;
    }
  }

  return false;
};

const setPopupCookie = idx => {
  let date = new Date(Date.now() + 86400e3);
  date = date.toUTCString();
  document.cookie = COOKIE_PREFIX + idx + "=Y; expires=" + date + "path=/;";
};

const setPopupPosition = (target, x, y) => {
  if (typeof x !== "number" || typeof y !== "number") return;

  if (x < 0 && y < 0) {
    target.style.left = "50%";
    target.style.top = "50%";
  } else {
    target.style.left = x + "px";
    target.style.top = y + "px";
  }
};

const alignPopupsPCGrid = (elem, idx) => {
  const xPosi = 10 + (idx % 2) * (elem.offsetWidth + 10);
  const yPosi = 10 + Math.floor(idx / 2) * (elem.offsetHeight + 10);

  setPopupPosition(elem, xPosi, yPosi);
};
