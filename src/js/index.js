const datePickerEl = document.getElementById("date-picker");
const dateInputEl = datePickerEl.querySelector("#date-input");
const calendarEl = datePickerEl.querySelector("#calendar");
const calendarMonthEl = calendarEl.querySelector("#month");
const monthContentEl = calendarMonthEl.querySelector("#content");
const nextBtnEl = calendarMonthEl.querySelector("#next");
const prevBtnEl = calendarMonthEl.querySelector("#prev");
const calendarDatesEl = calendarEl.querySelector("#dates");
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

dataPicker();

(function printNow(){
  const today = new Date();
  const dayNames = [
    '(월요일)',
    '(화요일)',
    '(수요일)',
    '(목요일)',
    '(금요일)',
    '(토요일)',
    '(일요일)',
  ];
  const day = dayNames[today.getDay() -1];
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const printTimeEl = document.querySelector(".print-time")

  hour %= 12;
  hour = hour || 12;

  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;

  const now = `${year}년 ${month}월 ${date}일 ${day} ${hour}:${minute}:${second}${ampm}`

  printTimeEl.textContent = now;

  setTimeout(printNow, 1000);
}());

function dataPicker() {
  dateInputEl.textContent = `${year}년 ${month}월 ${day}일`;
  datePickerEl.addEventListener("click", toggleCalendar);
  nextBtnEl.addEventListener("click", moveToNextMonth);
  // prevBtnEl.addEventListener("click", moveToPrevMonth);
}
function moveToNextMonth() {
  this.today = new Date(today.getFullYear(), today.getMonth() + 1).getDate();
  toggleCalendar();
}

function toggleCalendar() {
  calendarEl.classList.toggle("active");
  updateMonth();
  updateDates();
}

function updateMonth() {
  monthContentEl.textContent = `${year}년 ${month}월 ${day}일`;
}

function updateDates() {
  calendarDatesEl.innerHTML = "";
  const numberOfDates = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const fragment = new DocumentFragment();

  for (let i = 0; i < numberOfDates; i++) {
    let dateEl = document.createElement("div");
    dateEl.classList.add("date");
    dateEl.textContent = i + 1;
    dateEl.dataset.date = i + 1;
    fragment.appendChild(dateEl);
  }
  fragment.firstChild.style.gridColumnStart =
    new Date(year, month, 1).getDay() + 1;
  calendarDatesEl.appendChild(fragment);

  colorSaturday();
  colorSunday();
  markToday();
}

function markToday() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const today = currentDate.getDate();

  if (currentYear === year && currentMonth === month) {
    calendarDatesEl
      .querySelector(`[data-date='${today}']`)
      .classList.add("today");
  }
}

function colorSaturday() {
  const saturdayEls = calendarDatesEl.querySelectorAll(
    `.date:nth-child(7n+${7 - new Date(year, month, 1).getDay()})`
  );

  for (let i = 0; i < saturdayEls.length; i++) {
    saturdayEls[i].style.color = "blue";
  }
}

function colorSunday() {
  const saturdayEls = calendarDatesEl.querySelectorAll(
    `.date:nth-child(7n+${8 - new Date(year, month, 1).getDay()})`
  );

  for (let i = 0; i < saturdayEls.length; i++) {
    saturdayEls[i].style.color = "red";
  }
}
