const loginBlock = document.querySelector('.login__wrapper');
const upperheaderBlock = document.querySelector('.header-topheader');
const currentDay = document.querySelector('.title-geocurrenttime');

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
        1:'пн',
        2:'вт',
        3:'ср',
        4:'чт',
        5:'пт',
        6:'сб',
        7:'вс'
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