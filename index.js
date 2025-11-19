let myLeads = []
const inputEl = document.getElementById('input-el')
const ulEl = document.getElementById('ul-el')
const inputBtn = document.getElementById('input-btn')
const deleteBtn = document.getElementById('delete-btn')
const saveBtn = document.getElementById('save-btn')
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
//const tabs=[{url: "github.com/GOKUL-KA"}]

if (leadsFromLocalStorage){

  myLeads = leadsFromLocalStorage
  render(myLeads)
}

deleteBtn.addEventListener('dblclick', function(){
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

function render(leads) {

  let li = ""
  for (let i = 0; i < leads.length; i++) {
    li += `<li>
<a href='${leads[i]}' target='_blank'>
                  ${leads[i]}
                </a>
            </li>` 
  }
  ulEl.innerHTML = li 
}

//browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
//    let tab = tabs[0]; // Safe to assume there will only be one result
//    console.log(tab.url);
//}, console.error),

saveBtn.addEventListener('click', function() {

  browser.tabs.query({active:true, currentWindow:true}, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads))  
    render(myLeads) 

  })  
  //myLeads.push(tabs[0].url);
  //localStorage.setItem("myLeads", JSON.stringify(myLeads))  
  //render(myLeads) 
})

inputBtn.addEventListener('click', function(){

  if(inputEl.value != ""){
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
  }
  render(myLeads)  
  inputEl.value = ""
  console.log(JSON.parse(localStorage.getItem("myLeads")))
})



