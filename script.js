
// Targeting elements
$form = document.getElementById('form')
$result = document.getElementById('result')
var interval

$form.innerHTML =`
  <h1>Set countdown date <br>Must be a future date.</h1>
  <div class="formPart">
  <h2>Title</h2>
      <input id="title" type="text"  name='recipient' placeholder="Title">
  <h2>Year</h2>
      <select id="year"></select>
  <h2>Month</h2>
      <select id="month">
      <option value="1">January</option>
      <option value="2">February</option>
      <option value="3">March</option>
      <option value="4">April</option>
      <option value="5">May</option>
      <option value="6">June</option>
      <option value="7">July</option>
      <option value="8">August</option>
      <option value="9">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>   
      </select>
  <h2>Day</h2>
  <select id="day"></select>
  <button id="countdown" type="submit">Get Countdown</button>
  </div>
`
let $title = document.getElementById('title')
$result.innerHTML  = `<p id="titleValue"></p><br><p id="duration"></p><button id="changeCountdown"> Change Countdown</button>`

let $titleValue = document.getElementById('titleValue')
// Targeting elements

let $day = document.getElementById('day')
const $month = document.getElementById('month')
const $year = document.getElementById('year')
const $countdown = document.getElementById('countdown')
const DateTime = luxon.DateTime
const now = DateTime.local()
//target date
let date 
// console.log($result)
const $changeCountdown = document.getElementById('changeCountdown')    

const yearsInFuture = 20
let years = []
    for (let i = now.year; i <= now.year + yearsInFuture; i++){
    years.push(`<option>${i}</option>`)
    }
    $year.innerHTML = years.join('') 


function setDays(){

    let monthSelected = DateTime.fromObject({
      year:$year.value,
      month:$month.value
    })
    console.log($form[0])
    console.log(monthSelected.month)
    console.log($year.value)
    console.log($month.value)
    let days = []
      for (let i = 1; i <= monthSelected.daysInMonth ; i++){
        days.push(`<option>${i}</option>`)
        }       
        $day.innerHTML = days.join('') 
           
  }

setDays()

$month.addEventListener('change',setDays)
$form.addEventListener('submit',function(event){
  event.preventDefault()

  // use the values from the form to create Luxon DateTime object
  date = DateTime.fromObject({
    year:$year.value,
    month:$month.value,
    day:$day.value
  })

  // use toISo to turn DateTime object into string
  localStorage.setItem('futureDay',date.toISO())
  localStorage.setItem('titleLocal',$title.value)

  showCountdown()
})
document.getElementById('changeCountdown').addEventListener('click',showForm)

function showForm() {
  // hide result; show form
  $result.style.display = "none"
  $form.style.display = "block"
}

function showCountdown(){
  //get values from local storage
  $titleValue.innerHTML = localStorage.getItem('titleLocal')
  date = DateTime.fromISO(localStorage.getItem('futureDay'))

  //reset timer
  clearInterval(interval)

  // Update the count down every 1 second
  interval = setInterval(function() {

    // Find the distance between now and the count down date
    var distance = date.diffNow();

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // localStorage.setItem('futureDay',JSON.stringify({daysLocal:days,hoursLocal:hours,minutesLocal:minutes,secondLocal:seconds}))

    // Display the result in the element with id="duration"
    document.getElementById("duration").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(interval);
      document.getElementById("duration").innerHTML = "Date is in the past";
    }
  }, 1000);

    
    
    // hide result; show form
    $result.style.display = "block"
    $form.style.display = "none"
}

if (localStorage.getItem('futureDay')){
  showCountdown()
} else {
  showForm()
}

 