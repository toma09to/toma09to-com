class Departure {
  constructor(time, from, to, color) {
    this.time = time;
    this.from = from;
    this.to = to;
    this.color = color;
  }
  get getTime() {
    return this.time;
  }
  display(element, nowTime) {
    // Time
    let time = document.createElement('time');
    const hour = Math.floor(this.time / 60).toString().padStart(2, '0');
    const minute = (this.time % 60).toString().padStart(2, '0');
    time.textContent = hour + ':' + minute;
    element.appendChild(time);

    // From and To
    let information = document.createElement('div');
    information.classList.add('rollsign')

    let from = document.createElement('i');
    from.textContent = this.from;
    from.style.color = this.color;
    from.classList.add('departure');
    let to = document.createElement('i');
    to.textContent = this.to;
    to.classList.add('destination');

    information.appendChild(from);
    information.appendChild(to);
    element.appendChild(information);

    // Remaining time
    let remain = document.createElement('b');
    if (nowTime <= this.time) {
      remain.textContent = 'あと' + (this.time - nowTime) + '分';
    } else {
      remain.textContent = '';
    }
    element.appendChild(remain);
  }
}

// Create timetables
const fromKosenTable = [];
const toKosenTable = [];

// 高専前->木更津駅西口
const frontToWest = [
  [402,422,445,472,497,510,522,527,549,591,607,649,727,767,827,847,887,907,967,1007,1024,1069,1087,1127,1148,1174,1237,1282], // 平日
  [452,532,572,612,652,692,732,772,872,952,992,1032,1092,1132,1182,1237], // 土休日
];
// 高専前->木更津駅東口
const frontToEast = [
  [569,689,749,809,867,929,989,1042,1103], // 平日
  [512,592,752,852,932,1012], // 土休日
];
// 高専裏->木更津駅東口
const backToEast = [
  [413,459,503,658,701,958,1080,1201,1254], // 平日
  [413,493,553,713,813,893,973,1053,1153,1203,1254], // 土休日
];

// 木更津駅西口->高専前
const westToFront = [
  [385,405,425,450,471,488,500,505,517,545,570,630,670,728,745,785,805,845,865,910,961,985,1020,1047,1080,1105,1155,1215,1260], // 平日
  [470,490,550,590,630,670,710,750,790,850,930,972,1010,1110,1155,1215], // 土休日
];
// 木更津駅東口->高専前(畳ヶ池経由)
const eastToFront = [
  [585,710,825,888,945,1006,1065,1132], // 平日
  [530,690,870,950,1030,1130], // 土休日
];
// 木更津駅東口->高専裏(太田経由)
const eastToBack = [
  [435,480,625,680,780,935,1055,1100,1180,1230,1310], // 平日
  [390,430,510,570,730,830,910,990,1070,1180,1230], // 土休日
];


const nowDate = new Date;
const nowTime = nowDate.getHours() * 60 + nowDate.getMinutes();

let tableDay;
if (
  nowDate.getDay() === 0 // 日曜
  || nowDate.getDay() === 6 // 土曜
  || JapaneseHolidays.isHoliday(nowDate) // 祝日
) {
  tableDay = 1;
} else {
  tableDay = 0;
}

for (let i = 0; i < frontToWest[tableDay].length; i++) {
  fromKosenTable.push(new Departure(frontToWest[tableDay][i], '高専前', '西口 行', 'Red'));
}
for (let i = 0; i < frontToEast[tableDay].length; i++) {
  fromKosenTable.push(new Departure(frontToEast[tableDay][i], '高専前', '東口 行', 'Red'));
}
for (let i = 0; i < backToEast[tableDay].length; i++) {
  fromKosenTable.push(new Departure(backToEast[tableDay][i], '高専裏', '東口 行', 'Blue'));
}
for (let i = 0; i < westToFront[tableDay].length; i++) {
  toKosenTable.push(new Departure(westToFront[tableDay][i], '西口', '高専前 経由', 'Red'));
}
for (let i = 0; i < eastToFront[tableDay].length; i++) {
  toKosenTable.push(new Departure(eastToFront[tableDay][i], '東口', '高専前 経由', 'Blue'));
}
for (let i = 0; i < eastToBack[tableDay].length; i++) {
  toKosenTable.push(new Departure(eastToBack[tableDay][i], '東口', '高専裏 経由', 'Blue'));
}

function tableSort(a, b) {
  return a.getTime - b.getTime;
}

fromKosenTable.sort(tableSort);
toKosenTable.sort(tableSort);

let count = 0;
const maxDisplayCount = 3;
let parentElement;

count = 0;
parentElement = document.getElementById('from-kosen');
for (let i = 0; i < fromKosenTable.length && count < maxDisplayCount; i++) {
  if (nowTime - 3 < fromKosenTable[i].getTime) {
    let content = document.createElement('p');
    fromKosenTable[i].display(content, nowTime);
    parentElement.appendChild(content);
    count += 1;
  }
}
if (count > 0) {
  document.getElementById('no-bus-0').style.display = 'none';
}

count = 0;
parentElement = document.getElementById('to-kosen');
for (let i = 0; i < toKosenTable.length && count < maxDisplayCount; i++) {
  if (nowTime - 3 < toKosenTable[i].getTime) {
    let content = document.createElement('p');
    toKosenTable[i].display(content, nowTime);
    parentElement.appendChild(content);
    count += 1;
  }
}
if (count > 0) {
  document.getElementById('no-bus-1').style.display = 'none';
}

// Reload when the minute changes
const minuteChecker = setInterval(reloadMinutes, 1000, nowTime);

function reloadMinutes(prevTime) {
  const nowDate = new Date;
  const nowTime = nowDate.getHours() * 60 + nowDate.getMinutes();

  if (nowTime > prevTime) {
    location.reload();
  }
}
