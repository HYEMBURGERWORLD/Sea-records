const recordForm = document.querySelector("#recordForm");

// 저장
let records = [];

function saveRecord(e) {
  e.preventDefault();

  const text = document.querySelector("#recordText");
  const title = document.querySelector("#recordTitle");
  const author = document.querySelector("#recordAuthor");
  const tag = document.querySelector("#recordTag");
  const date = new Date();

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

  let arr = [text, title, author, tag];
  arr.forEach((i) => (i.value = ""));
  printRecord(recordObj);
}

// 출력
function printRecord(record) {
  const card = document.querySelector(".c1").childNodes;
  console.log(record.text);
}

// 수정
const modBtn = document.querySelector(".btn--mod");
function modRecord(event) {}

// 삭제
const delBtn = document.querySelector(".btn--del");
function delRecord(event) {
  alert("기록을 삭제하시겠습니까?");
  const li = event.target.parentElement.parentElement;
  li.remove();
  records = records.filter((item) => item.id !== Number(li.id));
}

// 이벤트 리스너
recordForm.addEventListener("submit", saveRecord);
modBtn.addEventListener("click", modRecord);
delBtn.addEventListener("click", delRecord);
