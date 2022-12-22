const daysTag = document.querySelector(".days"),
    booking_scheduleTag = document.querySelector(".booking-schedule"),
    currentDate = document.querySelector(".current-date"),
    userName = document.getElementById("userName").firstChild.nodeValue,
    userNameID = document.getElementById("userNameId").firstChild.nodeValue,
    prevNextIcon = document.querySelectorAll(".icons span");

const day_of_month = document.getElementById("message");

// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const renderCalendar = async () => {
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


    // a TAG
    let clickedmonth = currMonth;
    let clickedyear = currYear;
    let clickedday = date.getDate();

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


    day_of_month.innerHTML = `${clickedday}  ${months[currMonth]}`;

    let list_booking_time = [];
    let list_booking_time_user = [];

    for (let i = 0; i < bookingput.length; i++) {
        if (parseInt(bookingput[i].name) === parseInt(userNameID)) {
            list_booking_time_user.push(parseInt(bookingput[i].booking_time));
        } else {
            list_booking_time.push(bookingput[i].booking_time);
        }
    }
    // list_booking_time_user = list_booking_time_user.map(function(str) {
    //  return parseInt(str);
    // });

    list_booking_time.sort();
    list_booking_time_user.sort((a, b)=>{ a - b});


    let aliTag = "";
    for (let i = 0; i < 18; i++) {
        if (list_booking_time_user) {
            if (list_booking_time_user[0] - 1 === i) {
                aliTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="booked-own" id="${i + 1}">booked-own</a></li>`;
                list_booking_time_user.shift();
                continue;
            }
        }
        if (list_booking_time) {
            if (list_booking_time[0] - 1 === i) {
                aliTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="booked" id="${i + 1}">booked</a></li>`;
                list_booking_time.shift();
                continue;
            }
        }
        if (!getTimeBooking(i, bookingpoleapi[0])) {
            aliTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="disable" id="${i + 1}">disable</a></li>`;
        } else {
            aliTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="able" id="${i + 1}">able</a></li>`;
        }
    }
    booking_scheduleTag.innerHTML = aliTag;

    const aTag = document.querySelectorAll(".booking-schedule li");

    async function aclicked(a) {
        let check = String(a.children[2].innerText);
        if (check === "able") {

            const aInfo = a.children[2]

            let data = `${clickedyear} ${clickedmonth} ${clickedday} ${aInfo.id} ${userNameID}`;

            await fetch(`bookingpost/`, {
                method: 'POST',
                body: data,
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            console.log("able");
            // console.log(li);
            // console.log(aInfo);
            // console.log(userName, clickedyear, clickedmonth, clickedday, aInfo.id);

            let bookingpoleapi, bookingput1;


            await fetch('bookingpole/', {
                method: 'get',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                }
            }).then(responsepole => responsepole.json())
                .then(data => {
                    bookingpoleapi = data
                })


            await fetch(`bookingpoleput/${clickedyear}/${clickedmonth}/${clickedday}/`, {
                method: 'get',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                }
            }).then(responsepole => responsepole.json())
                .then(data => {

                    bookingput1 = data
                })

            const list_booking_time = [];
            const list_booking_time_user = [];

            for (let i = 0; i < bookingput1.length; i++) {
                if (parseInt(bookingput1[i].name) === parseInt(userNameID)) {
                    list_booking_time_user.push(bookingput1[i].booking_time);
                } else {
                    list_booking_time.push(bookingput1[i].booking_time);
                }
            }
            //
            list_booking_time.sort();
            list_booking_time_user.sort();
            //
            let liTag = "";
            // console.log(liTag);
            // call(liTag, list_booking_time_user, list_booking_time, bookingpoleapi)
            // $('#booking-schedule').click(function() {
            //     location.reload();
            // });

            let filteredItem = bookingput1.find(item => item.booking_time == a.lastChild.id)
            let newLiTag = `<span>${filteredItem.booking_time + 5} : 00</span><span>${filteredItem.booking_time + 6} : 00</span><a class="booked-own" id="${filteredItem.booking_time}">booked-own</a>`;
            a.innerHTML = newLiTag
        }
    }


    aTag.forEach(a => {
        a.children[2].addEventListener("click", async () => {
            aclicked(a);
        })
    })
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

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

const daysli = document.querySelectorAll(".days li");

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


        day_of_month.innerHTML = `${clickedday}  ${months[currMonth]}`;

        let list_booking_time = [];
        let list_booking_time_user = [];

        for (let i = 0; i < bookingput.length; i++) {
            if (parseInt(bookingput[i].name) === parseInt(userNameID)) {
                list_booking_time_user.push(parseInt(bookingput[i].booking_time));
            } else {
                list_booking_time.push(bookingput[i].booking_time);
            }
        }
        // list_booking_time_user = list_booking_time_user.map(function(str) {
        //  return parseInt(str);
        // });

        list_booking_time.sort();
        list_booking_time_user.sort((a, b)=>{ a - b});


        let liTag = "";
        for (let i = 0; i < 18; i++) {
            if (list_booking_time_user) {
                if (list_booking_time_user[0] - 1 === i) {
                    liTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="booked-own" id="${i + 1}">booked-own</a></li>`;
                    list_booking_time_user.shift();
                    continue;
                }
            }
            if (list_booking_time) {
                if (list_booking_time[0] - 1 === i) {
                    liTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="booked" id="${i + 1}">booked</a></li>`;
                    list_booking_time.shift();
                    continue;
                }
            }
            if (!getTimeBooking(i, bookingpoleapi[0])) {
                liTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="disable" id="${i + 1}">disable</a></li>`;
            } else {
                liTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="able" id="${i + 1}">able</a></li>`;
            }
        }
        booking_scheduleTag.innerHTML = liTag;

        // aTagsFun(li, csrftoken, booking_scheduleTag);

        const aTag = document.querySelectorAll(".booking-schedule li");

        async function aclicked(a) {
            let check = String(a.children[2].innerText);
            if (check === "able") {

                const aInfo = a.children[2]

                let data = `${clickedyear} ${clickedmonth} ${clickedday} ${aInfo.id} ${userNameID}`;

                await fetch(`bookingpost/`, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'X-CSRFToken': csrftoken,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                console.log("able");
                // console.log(li);
                // console.log(aInfo);
                // console.log(userName, clickedyear, clickedmonth, clickedday, aInfo.id);

                let bookingpoleapi, bookingput1;


                await fetch('bookingpole/', {
                    method: 'get',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json'
                    }
                }).then(responsepole => responsepole.json())
                    .then(data => {
                        bookingpoleapi = data
                    })


                await fetch(`bookingpoleput/${clickedyear}/${clickedmonth}/${clickedday}/`, {
                    method: 'get',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json'
                    }
                }).then(responsepole => responsepole.json())
                    .then(data => {

                        bookingput1 = data
                    })

                const list_booking_time = [];
                const list_booking_time_user = [];

                for (let i = 0; i < bookingput1.length; i++) {
                    if (parseInt(bookingput1[i].name) === parseInt(userNameID)) {
                        list_booking_time_user.push(bookingput1[i].booking_time);
                    } else {
                        list_booking_time.push(bookingput1[i].booking_time);
                    }
                }
                //
                list_booking_time.sort();
                list_booking_time_user.sort();
                //
                let liTag = "";
                // console.log(liTag);
                // call(liTag, list_booking_time_user, list_booking_time, bookingpoleapi)
                // $('#booking-schedule').click(function() {
                //     location.reload();
                // });

                let filteredItem = bookingput1.find(item => item.booking_time == a.lastChild.id)
                let newLiTag = `<span>${filteredItem.booking_time + 5} : 00</span><span>${filteredItem.booking_time + 6} : 00</span><a class="booked-own" id="${filteredItem.booking_time}">booked-own</a>`;
                a.innerHTML = newLiTag
            }
        }
        aTag.forEach(a => {
            a.children[2].addEventListener("click", async () => {
                aclicked(a);
            })
        })

    })
})
function call(liTag, list_booking_time_user, list_booking_time, bookingpoleapi) {
    for (let i = 0; i < 18; i++) {
        if (list_booking_time_user) {
            if (list_booking_time_user[0] - 1 === i) {
                liTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="booked-own" id="${i + 1}">booked-own</a></li>`;
                list_booking_time_user.shift();
                continue;
            }
        }
        if (list_booking_time) {
            if (list_booking_time[0] - 1 === i) {
                liTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="booked" id="${i + 1}">booked</a></li>`;
                list_booking_time.shift();
                continue;
            }
        }
        if (!getTimeBooking(i, bookingpoleapi[0])) {
            liTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="disable" id="${i + 1}">disable</a></li>`;
        } else {
            liTag += `<li class="booking-row"><span>${i + 6} : 00</span><span>${i + 7} : 00</span><a class="able" id="${i + 1}">able</a></li>`;
        }
    }
    booking_scheduleTag.innerHTML = liTag
}
