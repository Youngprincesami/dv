import { getDevotion } from "./open-heaven-data.js";
import { getDayName, getMonthName } from "./utility.js";

let todaysDateString = new Date().toISOString().split("T")[0];

let todaysDateDayNumber = todaysDateString.split("-")[2];
let todaysYearNumber = todaysDateString.split("-")[0];
let todaysDateObject = new Date(todaysDateString);

let todaysDevotionObject = getDevotion(todaysDateString);
let todaysDevotion = getDevotion(todaysDateString)[0];

let html;

// console.log(todaysDevotionObject);
function generateDevotion() {
  if (Array.isArray(todaysDevotionObject)) {
    html = `
      <h3>
        Open Heaven For Today ${
          todaysDevotion["date"].split("-")[0]
        } ${getDayName(todaysDateObject)} Daily Devotional By
        <span class="title"
          >Pastor <span class="whitespace-nowrap">E. A. Adeboye</span> – Friend
          Of God?</span
        >
      </h3>
      <p><span class="title">Date:</span> ${getDayName(
        todaysDateObject
      )} ${getMonthName(
      todaysDateObject
    )} ${todaysDateDayNumber}, ${todaysYearNumber}</p>
      <p>
        <span class="title">Topic:</span> <span>${todaysDevotion.topic}</span>
      </p>
      <p>
        <span class="title">Memorise:</span>
        <span
          >${todaysDevotion.memories.content}
          <strong><i>${todaysDevotion.memories.verse}</i></strong></span
        >
      </p>
      <div>
        <p><span class="title">Read:</span> <span>${
          todaysDevotion.read.verse
        }</span></p>
        <ul class="bible-text-ul">
          ${getBibleContent()}
        </ul>
      </div>
  
      <p><span class="title">Bible In one year:</span> ${
        todaysDevotion.bibleInOneYear
      }</p>
  
      <h4 class="center-text">Open Heaven For Today 2024 MESSAGE</h4>
      ${getMessageContent()}
      <section class="hymn">
        <p>
          <span class="title">Hymn</span>
          <span>${todaysDevotion.hymn.title}</span>
        </p>
        <ul class="hymn-ul">
          <li>
            ${getHymnFirstStanza()}
            <div class="hymn__chorus">
              ${getChorus()}
            </div>
          </li>
          ${getOtherStanzas()}
        </ul>
      </section>
      <p>
        <span class="title">${getPoint(true)}:</span>
        <span>${getPoint()}</span
        >
      </p>
    `;
  } else {
    html = todaysDevotionObject;
  }
  document.querySelector(".js-main").innerHTML = html;
}
window.addEventListener("load", generateDevotion);

// |||||||||||||||||||||Next and Prev|||||||||||||||||||||||||

// prev
document.querySelectorAll(".prev").forEach((btn) => {
  btn.addEventListener("click", prev);
});

function prev() {
  // console.log(todaysDevotion);
  // subtract a day from the current day;
  todaysDateObject.setDate(todaysDateObject.getDate() - 1);

  // update the variables
  todaysDateString = todaysDateObject.toISOString().split("T")[0];
  todaysDateDayNumber = todaysDateString.split("-")[2];
  todaysYearNumber = todaysDateString.split("-")[0];
  todaysDateObject = new Date(todaysDateString);

  todaysDevotionObject = getDevotion(todaysDateString);
  todaysDevotion = getDevotion(todaysDateString)[0];

  // console.log(todaysDevotion);
  generateDevotion();
}

document.querySelectorAll(".next").forEach((btn) => {
  btn.addEventListener("click", next);
});

function next() {
  // console.log(todaysDevotion);
  // add a day to the current day;
  todaysDateObject.setDate(todaysDateObject.getDate() + 1);

  // update the variables
  todaysDateString = todaysDateObject.toISOString().split("T")[0];
  todaysDateDayNumber = todaysDateString.split("-")[2];
  todaysYearNumber = todaysDateString.split("-")[0];
  todaysDateObject = new Date(todaysDateString);

  todaysDevotionObject = getDevotion(todaysDateString);
  todaysDevotion = getDevotion(todaysDateString)[0];

  // console.log(todaysDevotion);
  generateDevotion();
}

function getBibleContent() {
  const readContentVerses = todaysDevotion.read.content;

  var theReadVersesLis = "";
  for (let verse of readContentVerses) {
    let eachVerseLi = `<li>${verse}</li>`;

    theReadVersesLis += eachVerseLi;
  }

  return theReadVersesLis;
}

function getMessageContent() {
  const { message } = todaysDevotion;

  let paragraphs = "";
  message.forEach((paragraph) => {
    if (Array.isArray(paragraph)) {
      let specialParagrap = paragraph[0];
      paragraphs += `<p class="message-special-paragraph">${specialParagrap}</p>`;
    } else {
      paragraphs += `<p>${paragraph}</p>`;
    }
  });

  return paragraphs;
}

function getHymnFirstStanza() {
  const hymn = todaysDevotion.hymn;
  const { content } = hymn;
  if (Array.isArray(content)) {
    const firstStanza = content[0];
    // generate the stanza lines in lis
    let firstStanzaHTML = "";
    firstStanza.forEach((line) => {
      firstStanzaHTML += `<p class="margin-bottom-0">${line}</p>`;
    });
    return firstStanzaHTML;
  }
  return "";
}

function getChorus() {
  const { chorus } = todaysDevotion.hymn;
  let chorusHTML = "";
  if (Array.isArray(chorus)) {
    chorus.forEach((line) => {
      chorusHTML += `<p class="margin-bottom-0">${line}</p>`;
    });
  }
  return chorusHTML;
}

function getOtherStanzas() {
  const { content } = todaysDevotion.hymn;
  // get other stanzar aside the first stanzar;
  // i check if is array first coz there might be error if not haiving hymn
  const otherStanzaHTML = "";
  if (Array.isArray(content)) {
    let otherStanzas = content.slice(1);
    let stanzarsHTML = "";

    otherStanzas.forEach((stanzar) => {
      let currentStanzaHTML = "";
      stanzar.forEach((line) => {
        currentStanzaHTML += `<p class="margin-bottom-0">${line}</p>`;
      });
      stanzarsHTML += `<li>${currentStanzaHTML}</li>`;
    });

    return stanzarsHTML;
  }
  return "";
}

function getPoint(isPoint = false) {
  const { point } = todaysDevotion;

  let mainPoint = ``;
  for (let poinProperty in point) {
    if (point[poinProperty]) {
      if (isPoint) {
        return poinProperty;
      }
      mainPoint = point[poinProperty];
    }
  }
  return mainPoint;
}
