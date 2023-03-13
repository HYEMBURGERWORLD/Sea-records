const recordForm = document.querySelector("#recordForm");
let records = [];

// record form
const text = document.querySelector("#recordText");
const title = document.querySelector("#recordTitle");
const author = document.querySelector("#recordAuthor");
const tag = document.querySelector("#recordTag");
const card = document.querySelectorAll(".record-card");

// 시작
const getRecord = JSON.parse(localStorage.getItem("records"));
const empty = document.querySelector(".record-empty");
if (getRecord !== null) {
  empty.classList.add("hidden");
  records = getRecord;
  records.forEach(printRecord);
  printTag();
} else {
  empty.classList.remove("hidden");
}

// tag 출력
function printTag() {
  console.log("실행중");
  // 1. tag 정보 불러오기
  let tag = [];

  getRecord.forEach((item) => {
    tag.push(item.tag);
  });

  // 2. node 추가
  new Set(tag).forEach((item) => {
    if (item === "") {
      return;
    } else {
      const tags = document.querySelector(".tags");
      const li = document.createElement("li");
      li.classList.add("tag");

      // 아이콘
      const icon = document.createElement("i");
      icon.classList.add("tag--icon");
      icon.classList.add("ph-anchor");
      li.appendChild(icon);

      // tag name
      const span = document.createElement("span");
      span.classList.add("tag--text");
      span.innerText = item;
      li.appendChild(span);
      tags.appendChild(li);

      li.addEventListener("click", function () {
        findTag(item);
      });
    }
  });
}

// tag　찾기

// 수정, 추가해야하는 부분 -> 원래 있던 레코드를 가리고, 새로 보여주어야 함
function findTag(v) {
  let tags = records.filter((item) => item.tag === v);
  tags.forEach(printRecord);
}

// 저장
function saveRecord(e) {
  e.preventDefault();
  empty.classList.remove("hidden");

  const date = new Date();

  if (title.value === "") {
    title.value = "불명";
  }
  if (author.value === "") {
    author.value = "작자미상";
  }

  const recordObj = {
    text: text.value,
    title: title.value,
    author: author.value,
    tag: tag.value,
    date: `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`,
    id: Date.now(),
  };

  records.push(recordObj);
  localStorage.setItem("records", JSON.stringify(records));
  console.log("저장 성공");

  let reset = [text, title, author, tag];
  reset.forEach((i) => (i.value = ""));
  printRecord(recordObj);
}

// 출력
function printRecord(record) {
  const cards = document.querySelector(".record-cards");
  const $fragment = document.createDocumentFragment();
  const li = document.createElement("li");
  const div = document.createElement("div");

  [record.date, record.text, record.title, record.id].forEach((item) => {
    const span = document.createElement("span");
    li.classList.add("record-card");

    // date
    if (item === record.date) {
      span.innerText = item;
      span.classList.add("card-date");
      li.appendChild(span);
    }

    // text
    else if (item === record.text) {
      span.innerText = item;
      span.classList.add("card-text");
      li.appendChild(span);
    }

    // info
    else if (item === record.title) {
      span.classList.add("card-info");
      span.innerText = `—${record.title}, ${record.author}`;
      li.appendChild(span);
    }

    // id
    else if (item === record.id) {
      li.setAttribute("id", item);
    }
  });

  // 버튼
  div.classList.add("card-btn-box");
  li.appendChild(div);
  ["수정", "삭제"].forEach((text) => {
    const button = document.createElement("button");
    button.classList.add("btn--card");

    const textNode = document.createTextNode(text);
    button.appendChild(textNode);

    text === "수정"
      ? button.classList.add("btn--mod")
      : button.classList.add("btn--del");

    div.appendChild(button);

    button.addEventListener("click", (e) => {
      button.classList.contains("btn--mod") ? modRecord(e) : delRecord(e);
    });
  });

  // 추가
  $fragment.appendChild(li);
  // 완성
  cards.appendChild($fragment);
}

// 수정
function modRecord(event) {
  // form 창 이동, 기록 -> 수정으로 버튼 메시지 변경
  const recordBtn = document.querySelector("#recordBtn");
  const recordModBtn = document.querySelector("#recordModBtn");

  recordBtn.classList.add("hidden");
  recordModBtn.classList.remove("hidden");

  // 수정할 record 출력
  const id = event.target.parentElement.parentElement.id;
  const target = records.filter((item) => item.id === Number(id));

  text.value = target[0].text;
  title.value = target[0].title;
  author.value = target[0].author;
  tag.value = target[0].tag;

  // 텍스트 수정 완료
  // 로컬스토리지 수정
  recordModBtn.addEventListener("click", function () {
    confirm("수정하시겠습니까?");
    modStorage(target[0].id);
  });
}

function modStorage(recordId) {
  records.forEach((item) => {
    if (item.id === recordId) {
      item.text = text.value;
      item.title = title.value;
      item.author = author.value;
      item.tag = tag.value;
    }
  });

  // 버튼 변경
  const recordBtn = document.querySelector("#recordBtn");
  const recordModBtn = document.querySelector("#recordModBtn");
  recordBtn.classList.remove("hidden");
  recordModBtn.classList.add("hidden");

  localStorage.setItem("records", JSON.stringify(records));

  let reset = [text, title, author, tag];
  reset.forEach((i) => (i.value = ""));
  location.reload();
}

// 삭제
function delRecord(event) {
  confirm("기록을 삭제하시겠습니까?");
  const li = event.target.parentElement.parentElement;
  li.remove();
  records = records.filter((item) => item.id !== Number(li.id));
}

// 이벤트 리스너
recordForm.addEventListener("submit", saveRecord);
