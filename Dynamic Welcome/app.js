const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
app.set('view engine ','ejs')
app.use(express.json())
function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        return 'Good morning';
    } else if (currentHour < 18) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
}


filepath =path.join(__dirname,"/views/index.ejs")

app.get("/",(req,res)=>{
    let name = "Sam"
    let place = "China town"
    const greeting = getGreeting();
    res.render(filepath,{name,destination:place,greeting})
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }    
    else{
        console.log(`Listening to port ${PORT}`)

    }
})