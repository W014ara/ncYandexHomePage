const data = [
    {
        source: "Яндекс.Новости",
        sourceimg:"https://avatars.mds.yandex.net/get-zen-logos/246004/pub_5bc73bda17667700aaf44f9a_5edf8efe8d5c925baba78285/36x36_2x",
        action: "",
        baseurl: "https://avatars.mds.yandex.net/get-ynews/3293387/159f5a8eccdb6777c802aea5087cabf7/smart_crop_356x267",
        title: "Windows 11 получит 6 пользовательских версий",
        discription:"Масштабная утечка о Windows 11 раскрыла немало важных подробностей.",
        publish: "день назад",
        comment: true
    },
    {
        source: "Знакомые лица",
        sourceimg:"https://avatars.mds.yandex.net/get-zen-logos/212539/pub_5bcfdccab9fcb700aa296d9e_5fce6f050a45a91cf4622a8c/36x36_2x",
        action: "",
        baseurl: "https://avatars.mds.yandex.net/get-zen_doc/1590365/pub_60bb071de14854002ed94cf7_60bb071f0716567b35274915/smart_crop_356x267",
        title: "Василия Шукшина не стало на съёмках «Они сражались за Родину»: кого снимали вместо него— да так, что никто не догадался о замене",
        discription:"Фильм Сергея Бондарчука «Они сражались за Родину» стал последней творческой работой Василия Шукшина. Он не успел довести …",
        publish: "сегодня",
        comment: false
    },
    {
        source: "Тинькофф",
        sourceimg:"https://avatars.mds.yandex.net/get-zen-logos/1540393/pub_592d906ad7d0a6f37915023b_5ce50780e1ea8802c2e29bdb/36x36_2x",
        action: "вы подписаны",
        baseurl: "https://avatars.mds.yandex.net/get-zen_doc/4979934/pub_607ee4e2b1dee050509a9714_607ee772330a4f14d56df07f/smart_crop_356x267",
        title: "Почему лучше взять кредитку, а не кредит?",
        discription:"Выбирать между кредиткой и кредитом — все равно что выбирать между собственным автомобилем и самолетом. Из Москвы до…",
        publish: "год назад",
        comment: true
    },
    {
        source: "Виктория Миронова",
        sourceimg:"https://avatars.mds.yandex.net/get-zen-logos/200214/pub_60b7ae46b0886d640cd306f3_60b8b9e417777f0620759a00/36x36_2x",
        action: "Личный блог",
        baseurl: "https://avatars.mds.yandex.net/get-zen_doc/3927246/pub_60ca3665f7ddc664b1e0c4be_60ca3a016f4a071f4977e301/smart_crop_356x267",
        title: "Это те самые сериалы, которые мы так долго ждали",
        discription:"Вот уже мы стремительно подошли ко второй половине 2021 года, которая так и наполнена новыми сезонами наших…",
        publish: "10 секунд назад",
        comment: true
    }
]

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


const loginBlock = document.querySelector('.widgets__wrapper');
const upperheaderBlock = document.querySelector('.header-topheader');
const currentDay = document.querySelector('.title-geocurrenttime');
const searchInputInput = document.querySelector('#yasearch');
const searthInput = document.querySelector('.container-yandexsearch');
const searchInputBtn = document.querySelector('.container-yandexsearch__searchbtn');
const dzen = document.querySelector(".dzen__table");

const yandexYellowColor = "#fc0";
const yandexYellowColorHighligh = "rgb(238, 191, 4)";


searchInputInput.addEventListener("mouseover", (e)=>{
    searthInput.style.backgroundColor = yandexYellowColor;
})

searchInputBtn.addEventListener("mouseover", (e)=>{
    searthInput.style.backgroundColor = yandexYellowColorHighligh;
})

searchInputBtn.addEventListener("mouseout", (e)=>{
    searthInput.style.backgroundColor = yandexYellowColor;
})

let dayObj = {
    month:{
        1:'января',
        2:'февраля',
        3:'марта',
        4:'апреля',
        5:'мая',
        6:'июня',
        7:'июля',
        8:'августа',
        9:'сентября',
        10:'октября',
        11:'ноября',
        12:'декабря'
    },
    weekDay:{
        0:'вс',
        1:'пн',
        2:'вт',
        3:'ср',
        4:'чт',
        5:'пт',
        6:'сб'
    },
    monthDay:new Date().getDate(),
    year:new Date().getFullYear()
}

let fadeFlag = false;
setInterval((e) => {
    let currentMonth = new Date().getMonth() + 1;
    let currentDayNumber = new Date().getDay();
    let currentHours = new Date().getHours();
    let currentMinutes = new Date().getMinutes();
    if(!fadeFlag){
        //: появляется
        currentDay.childNodes[1].innerHTML = `<h1 class="title-geocurrenttime__time">${dayObj.monthDay} ${dayObj.month[currentMonth]}, ${dayObj.weekDay[currentDayNumber]} <a href="" class="title title-geocurrenttime__timechanger">${addZeroPad(currentHours)}<span class="title title-geocurrenttime__timedelimiter">&nbsp;</span>${addZeroPad(currentMinutes)}</a></h1>`
    }else{
        //: уходит
        currentDay.childNodes[1].innerHTML = `<h1 class="title-geocurrenttime__time">${dayObj.monthDay} ${dayObj.month[currentMonth]}, ${dayObj.weekDay[currentDayNumber]} <a href="" class="title title-geocurrenttime__timechanger">${addZeroPad(currentHours)}<span class="title title-geocurrenttime__timedelimiter">:</span>${addZeroPad(currentMinutes)}</a></h1>`
    }
    fadeFlag = !fadeFlag;
}, 1000);



/**
 * Function that implements changing the width of the site header
 * @param {number} loginWidth - the length of the required block
 * @param {number} screenSize - window screen size (or another block width)
 */
 function setNewBlockSize(targetNode){
    const loginWidth = (Number(loginBlock.clientWidth) * 100)/Number(window.screen.width);
    const targetWidth = 100 - loginWidth;
    targetNode.style.width = `${targetWidth - 1}%`;
}


/**
 * A function that helps to convert minutes or hours, if they are represented by a single digit in the format "0X"
 * @param {Number} digit - input number to convert
 * @returns Returns the number appended with 0 if it is divisible by 10
 */
 function addZeroPad(digit){
    if(Number(digit) / 10 >= 1){
        return digit;
    }
    return `0${digit}`;
}


document.addEventListener("DOMContentLoaded", (e) => {
    setNewBlockSize(upperheaderBlock);
});

window.addEventListener('resize', (e) => {
    setNewBlockSize(upperheaderBlock);
})

window.addEventListener("scroll", (e)=>{
    insertNewsBlock();
})


function validEmptyBlockAction(data, index){
    if(data[index].action !== ""){
        return `<p class="dzen__item-subscribe-info">${data[index].action}</p>`
    }
    return "";
}

function validEmptyCommentBlock(data, index){
    console.log(data, index);
    if(data[index].comment){
        return `<a class="dzen__item-footer-comment" href="">
        <div class="widget-avatar _auth _dzen"></div>
        <p class="dzen__item-footer-text">Комментировать...</p>
    </a>`
    }
    return `<a class="dzen__item-footer-comment _disabled" href="">
    <div class="widget-avatar _auth _dzen"></div>
    <p class="dzen__item-footer-text">Комментировать...</p>
</a>`;
}


function insertNewsBlock(){
    if(window.scrollY + document.body.offsetHeight >= document.body.scrollHeight){
        let randomNewsLeftIndex = getRandomArbitrary(0, data.length);
        let randomNewsRightIndex = getRandomArbitrary(0, data.length);
        const leftBlock =
        `<div class="dzen__item dzen__item-col2"><a href="" class="dzen__item-mainLink">
        <div class="dzen__item-mainHeader">
            <div class="container">
                <div class="container__dzen-header">
                    <img class="marker marker__dzen marker__dzen-main" width="36px" height="36px" src="${data[randomNewsLeftIndex].sourceimg}" alt="">
                    <div class="dzen__item-subscribe">
                        <p class="dzen__item-subscribe-text">${data[randomNewsLeftIndex].source}</p>
                        ${validEmptyBlockAction(data, randomNewsLeftIndex)}
                    </div>
                </div>
            </div>
            <div class="dzen__item-functional">
                <button class="marker-dzen__title" type="button">
                    <svg class="marker-dzen__title-icon">
                        <use href="#icon-dzen__subscribe"></use>
                    </svg>
                </button>
                <button class="marker-dzen__title" type="button">
                    <svg class="marker-dzen__title-icon _transperent">
                        <use href="#icon-settings"></use>
                    </svg>
                </button>
            </div>
        </div>
        <img class="dzen__item-splash" src="${data[randomNewsLeftIndex].baseurl}" alt="${data[randomNewsLeftIndex].source}">
        <div class="dzen__item-maincontent">
            <h1 class="title__dzen-card">${data[randomNewsLeftIndex].title}</h1>
            <p class="dzen__item-maincontent-text">${data[randomNewsLeftIndex].discription}</p>
            <span class="dzen__item-maincontent-time">${data[randomNewsLeftIndex].publish}</span>
        </div>
    </a>
    <div class="dzen__item-footer">
        ${validEmptyCommentBlock(data, randomNewsLeftIndex)}
        <div class="dzen__item-footer-btn">
            <button class="marker-dzen__title" type="button">
                <svg class="marker-dzen__title-icon">
                    <use href="#icon-dzen__share"></use>
                </svg>
            </button>
            <button class="marker-dzen__title" type="button">
                <svg class="marker-dzen__title-icon">
                    <use href="#icon-dzen__like"></use>
                </svg>
            </button>
            <button class="marker-dzen__title" type="button">
                <svg class="marker-dzen__title-icon">
                    <use href="#icon-dzen_dislike"></use>
                </svg>
            </button>
        </div>
    </div></div>`;
        const rightBlock =
        `<div class="dzen__item dzen__item-col2 dzen__item-style2"><a href="" class="dzen__item-mainLink">
        <div class="dzen__item-mainHeader">
            <div class="container">
                <div class="container__dzen-header">
                    <img class="marker marker__dzen marker__dzen-main" width="36px" height="36px" src="${data[randomNewsRightIndex].sourceimg}" alt="">
                    <div class="dzen__item-subscribe">
                        <p class="dzen__item-subscribe-text">${data[randomNewsRightIndex].source}</p>
                        ${validEmptyBlockAction(data, randomNewsRightIndex)}
                    </div>
                </div>
            </div>
            <div class="dzen__item-functional">
                <button class="marker-dzen__title" type="button">
                    <svg class="marker-dzen__title-icon">
                        <use href="#icon-dzen__subscribe"></use>
                    </svg>
                </button>
                <button class="marker-dzen__title" type="button">
                    <svg class="marker-dzen__title-icon _transperent">
                        <use href="#icon-settings"></use>
                    </svg>
                </button>
            </div>
        </div>
        <img class="dzen__item-splash _style2" src="${data[randomNewsRightIndex].baseurl}" alt="${data[randomNewsRightIndex].source}">
        <div class="dzen__item-maincontent">
            <h1 class="title__dzen-card">${data[randomNewsRightIndex].title}</h1>
            <p class="dzen__item-maincontent-text">${data[randomNewsRightIndex].discription}</p>
            <span class="dzen__item-maincontent-time">${data[randomNewsRightIndex].publish}</span>
        </div>
    </a>
    <div class="dzen__item-footer">
        ${validEmptyCommentBlock(data, randomNewsRightIndex)}
        <div class="dzen__item-footer-btn">
            <button class="marker-dzen__title" type="button">
                <svg class="marker-dzen__title-icon">
                    <use href="#icon-dzen__share"></use>
                </svg>
            </button>
            <button class="marker-dzen__title" type="button">
                <svg class="marker-dzen__title-icon">
                    <use href="#icon-dzen__like"></use>
                </svg>
            </button>
            <button class="marker-dzen__title" type="button">
                <svg class="marker-dzen__title-icon">
                    <use href="#icon-dzen_dislike"></use>
                </svg>
            </button>
        </div>
    </div></div>`;
        const resultBlock = leftBlock + rightBlock;
        dzen.insertAdjacentHTML("beforeend", resultBlock);
    }
}

function debounce(f, ms) {
    let isCooldown = false;
    return function() {
      if (isCooldown) return;
      f.apply(this, arguments);
      isCooldown = true;
      setTimeout(() => isCooldown = false, ms);
    };
  }
