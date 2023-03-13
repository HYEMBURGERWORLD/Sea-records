// 윈도우 내장된 api 사용
// 크롬일 경우 webkit~을 사용
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// 인스턴스 생성
const recognition = new SpeechRecognition();

// true -> 연속 음절 OK / false -> 처음의 한 음절만 기록한다.
recognition.interimResults = true;

// 음성인식 언어 설정
recognition.lang = "ko-KR";

// true일 경우, 음성인식이 끝나지 않고 계속된다.
recognition.continuous = true;

// 음성인식 텍스트가 저장되는 변수
let speechToText = "";

// recognition.start =>
recognition.addEventListener("result", (e) => {
  let interimTranscript = "";
  for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
    let transcript = e.results[i][0].transcript;
    console.log(transcript);

    // isFinal === true 일 경우, 텍스트 인식이 모두 완료 되었을 시점을 뜻한다.
    // 즉, 음성인식이 끝났다고 판단되는 상태!
    if (e.results[i].isFinal) {
      speechToText += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  // 음성인식 텍스트가 출력될 곳을 지정.
  // 이 사이트의 경우에는 textarea
  text.innerText = speechToText + interimTranscript;
});

// 음성인식이 종료되면, 자동으로 재시작
// recognition.addEventListener("end", recognition.start);

const mic = document.querySelector(".user-voice");
mic.addEventListener("click", () => {
  recognition.start();
});
