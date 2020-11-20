$form = document.getElementById('form')

$form.innerHTML =`
  <h1>Set countdown date <br>Must be a future date.</h1>
  <div class="formPart">
  <h2>Title</h2>
      <input type="text" name="title" placeholder="Title">
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
// Targeting elements

let $day = document.getElementById('day')
const $month = document.getElementById('month')
const $year = document.getElementById('year')
const $countdown = document.getElementById('countdown')
const DateTime = luxon.DateTime
const now = DateTime.local()

// const daysInMonth = [31,28,31,30]
const yearsInFuture = 20
let years = []
    for (let i = now.year; i <= now.year + yearsInFuture; i++){
    years.push(`<option>${i}</option>`)
    }
    $year.innerHTML = years.join('') 


function setDays(){

    let date = DateTime.fromObject({
      year:$year.value,
      month:$month.value
    })
   console.log(date.month)
   console.log($year.value)
   console.log($month.value)
   
    let days = []
      for (let i = 1; i <= date.daysInMonth ; i++){
        days.push(`<option>${i}</option>`)
        }
        
        $day.innerHTML = days.join('')  
    
  }

  setDays()
    
  $month.addEventListener('change',setDays)

  $form.addEventListener('submit',function(event){
   
    event.preventDefault()
    const date = DateTime.fromObject({
       year:$year.value,
      month:$month.value,
      day:$day.value
    })
     console.log(date)
  })
  