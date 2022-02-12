"use strict";

const menu = document.querySelector(".menu");
const menuTime = document.querySelectorAll(".time");
const allCurrentActivities = [
  document.querySelector(".work-now"),
  document.querySelector(".play-now"),
  document.querySelector(".study-now"),
  document.querySelector(".exercise-now"),
  document.querySelector(".social-now"),
  document.querySelector(".self-care-now"),
];
const allPreviousActivities = [
  document.querySelector(".work-previous"),
  document.querySelector(".play-previous"),
  document.querySelector(".study-previous"),
  document.querySelector(".exercise-previous"),
  document.querySelector(".social-previous"),
  document.querySelector(".self-care-previous"),
];

const changeAllContent = async function (time, labelTime) {
  const data = await fetch("./data.json");
  const result = await data.json();

  result.forEach((obj, i) => {
    allCurrentActivities[i].innerHTML = `${obj.timeframes[time].current}hrs`;
    allPreviousActivities[
      i
    ].innerHTML = `Last ${labelTime} - ${obj.timeframes[time].previous}hrs`;
  });
};

menu.addEventListener("click", function (e) {
  const target = e.target.closest(".time");
  if (!target) return;

  menuTime.forEach((t) => t.classList.remove("active"));
  target.classList.add("active");
  const time = target.dataset.time;
  const labelTime = target.dataset.labelTime;
  changeAllContent(time, labelTime);
});
