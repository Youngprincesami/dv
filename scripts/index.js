import { getDevotion } from "./open-heaven-data.js";
import { getDayName, getMonthName } from "./utility.js";

const todaysDateString = new Date().toISOString().split("T")[0];
const todaysDateDayNumber = todaysDateString.split("-")[2];
const todaysDateObject = new Date(todaysDateString);

const todaysDevotion = getDevotion(todaysDateString)[0];

// console.log(todaysDevotion);

function getTopic() {
  return typeof todaysDevotion !== "string" ? todaysDevotion.topic : "";
}
function getDateInNiceFormat() {
  return typeof todaysDevotion !== "string"
    ? `${getDayName(todaysDateObject)} ${getMonthName(
        todaysDateObject
      )} ${todaysDateDayNumber}`
    : "";
}

function getMemoryVerseContent() {
  return typeof todaysDevotion !== "string"
    ? todaysDevotion.memories.content
    : "";
}

function getMemoryverseVerse() {
  return typeof todaysDevotion !== "string"
    ? todaysDevotion.memories.verse
    : "Not available";
}

const cardData = [
  {
    id: 1,
    name: "open-heaven",
    title: getTopic(),
    date: getDateInNiceFormat(),
    memoryVerse: getMemoryVerseContent(),
    bibleverse: getMemoryverseVerse(),
    image: "/imgs/pastor-e-a-adeboye-1.webp",
    readMore: "open-heaven.html"
  },
  {
    id: 2,
    name: "sunday-school",
    date: "Friday November 1",
    title: "Lesson 10: Divine resistance",
    memoryVerse:
      "And said, verily  say unto you, Except ye be converted, And  become as little children, ye shall not enter the kingdom of heaven.",
    bibleverse: "James 4:6",
    image: "/imgs/sundayschpic.jpg",
    readMore: "sunday-school.html"
  },

  {
    id: 3,
    name: "house-fellowship",
    title: "house fellowship",
    date: "Friday November 1",
    memoryVerse:
      "And said, verily  say unto you, Except ye be converted, And  become as  little children, ye shall not enter the  kingdom of heaven.",
    bibleverse: "James 4:6",
    image: "/imgs/housefellowship.png",
    readMore: "house-fellowship.html"
  }
];

//  load cards
let html = "";

cardData.forEach((card) => {
  html += `
  <div class="wrapper-card">
    <section class="card">
      <figure class="card-fig">
         <a href="${card.name}.html"><img src="${card.image}" alt="${card.image}" /></a>
      </figure>
      <h3 class="word-center">${card.title}</h3>
      <p class="date">${card.date}</p>
      <p class="card-memo"><span class='date'>Memories: </span>${card.memoryVerse}<span class="bible-verse">${card.bibleverse}</span></p><a href="${card.readMore}"><button>Read more</button></a>
   </div>`;
});

// for (let i = 0; i < 5; ++i) {
//   html += `
//   <div class="wrapper-card">
//     <section class="card">
//       <figure class="card-fig">
//          <a href="${card.name}.html"><img src="${card.image}" alt="${card.image}" /></a>
//       </figure>
//       <h3 class="word-center">${card.title}</h3>
//       <p class="date">${card.date}</p>
//       <p class="card-memo"><span class='date'>Memories: </span>${card.memoryVerse}<span class="bible-verse">${card.bibleverse}</span></p><a href="${card.readMore}"><button>Read more</button></a>
//    </div>`;
// }

document.querySelector(".card-grid").innerHTML = html;
