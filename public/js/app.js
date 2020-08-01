const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const messageThree = document.querySelector('#message-three')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Please wait...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = 'Location: ' + data.place 
                messageTwo.textContent = 'Weather: ' + data.weather 
                messageThree.textContent = 'Tempurature: ' + data.tempurature 
            }
        })
    })
})
