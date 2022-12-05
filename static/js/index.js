const daysTag = document.querySelector(".days"),
    booking_scheduleTag = document.querySelector(".booking-schedule"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

const day_of_month = document.getElementById("message");

// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
        && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    day_of_month.innerHTML = `${date.getDate()}  ${months[currMonth]}`;
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

function getTimeBooking(i, time) {
    switch (i) {
        case 0:
            return time.time_6_7;
        case 1:
            return time.time_7_8;
        case 2:
            return time.time_8_9;
        case 3:
            return time.time_9_10;
        case 4:
            return time.time_10_11;
        case 5:
            return time.time_11_12;
        case 6:
            return time.time_12_13;
        case 7:
            return time.time_13_14;
        case 8:
            return time.time_14_15;
        case 9:
            return time.time_15_16;
        case 10:
            return time.time_16_17;
        case 11:
            return time.time_17_18;
        case 12:
            return time.time_18_19;
        case 13:
            return time.time_19_20;
        case 14:
            return time.time_20_21;
        case 15:
            return time.time_21_22;
        case 16:
            return time.time_22_23;
        case 17:
            return time.time_23_24;
        default:
            break;
    }
}

const daysli = document.querySelectorAll(".days li");

// async function getBookingPoleAPI() {
//
//     let bookingpoleapi;
//
//     let response = await fetch('bookingpole/', {
//         method: 'get',
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//             'Content-Type': 'application/json'
//         }
//     }).then(response => response.json())
//         .then(data => bookingpoleapi = data)
//
// }

// async function getAPI() {
//
//     let ans;
//
//     let response = await fetch('bookingitem/', {
//         method: 'get',
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//             'Content-Type': 'application/json'
//         }
//     }).then(response => response.json())
//         .then(data => ans = data)
//
//     let bookingpoleapi;
//
//     let responsepole = await fetch('bookingpole/', {
//         method: 'get',
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//             'Content-Type': 'application/json'
//         }
//     }).then(responsepole => responsepole.json())
//         .then(data => bookingpoleapi = data)
//
//     for (let i=0; i < 18; i++) {
//         console.log(getTimeBooking(i, bookingpoleapi[0]));
//     }

    // console.log(ans);

    // const daysTag = document.querySelector(".days");
    //
    // let liTag = "";

    // function lili(data) {
    //     for (let i = 0; i < 2; i++) { // creating li of previous month last days
    //         liTag += `<li>${data[i].id}</li>`;
    //     }
    // }

    // lili(ans)
    // daysTag.innerHTML = liTag;
// }

daysli.forEach(li => {
    li.addEventListener("click", async () => {

        let clickedmonth = li.parentElement.parentElement.parentElement.children[0].children[1].innerHTML;
        let clickedyear = li.parentElement.parentElement.parentElement.children[0].children[2].innerHTML;
        let clickedday = li.firstChild.nodeValue;

        let bookingpoleapi, ans, bookingput;

        let response = await fetch('bookingitem/', {
            method: 'get',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => ans = data)

        let responsepole = await fetch('bookingpole/', {
            method: 'get',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            }
        }).then(responsepole => responsepole.json())
            .then(data => bookingpoleapi = data)

        let bookingpoleput = await fetch(`bookingpoleput/${clickedyear}/${clickedmonth}/${clickedday}/`, {
            method: 'get',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            }
        }).then(responsepole => responsepole.json())
            .then(data => bookingput = data)

        for (let i=0; i < 18; i++) {
            console.log(getTimeBooking(i, bookingpoleapi[0]));
        }
        console.log(bookingput);
        // console.log(li.parentElement.parentElement.parentElement.children[0].children[2].innerHTML);
        // console.log(li.parentElement.parentElement.parentElement.children[0].children[1].innerHTML);
        day_of_month.innerHTML = `${clickedday}  ${months[currMonth]}`;

        let liTag = "";
        for (let i = 0; i < 17; i++) {
            if (!getTimeBooking(i, bookingpoleapi[0])) {
                liTag += `<li class="booking-row"><span>${i+6} : 00</span><span>${i+7} : 00</span><a class="disable">disable</a></li>`;
            } else {
                liTag += `<li class="booking-row"><span>${i+6} : 00</span><span>${i+7} : 00</span><a class="able">able</a></li>`;
            }
        }
    booking_scheduleTag.innerHTML = liTag;
    })
})

