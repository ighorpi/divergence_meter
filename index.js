const express = require('express');
const app = express();


app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render("index");
})

const server = app.listen(3000, () => {
    console.log("`Tuturuuu`: http://localhost:3000");
})

const io = require('socket.io').listen(server);

app.set('io', io);

let divergenceval;

function setdiver() {
    const stamp = Date.now()%10
    const arraynumber = 
                [
                Math.round(+Math.random()),
                Math.round((+Math.acos(Math.random())*100)%10),
                Math.round((+Math.sin(Math.random())*100)%10),
                Math.round(+Math.sqrt(stamp)),
                Math.round((+Math.sin(Math.random())*100)%10),
                Math.round((+Math.acos(Math.random())*100)%10),
                Math.round((+Math.tan(Math.random())*100)%10),
                ];
    const stringnumber = arraynumber[0]+'.'
    +arraynumber[1]
    +arraynumber[2]
    +arraynumber[3]
    +arraynumber[4]
    +arraynumber[5]
    +arraynumber[6];
    
    divergenceval = parseFloat(stringnumber);;
    divergencearray = arraynumber;
}

setdiver();

io.on('connection', (socket) => {
    socket.emit(
        'diverge',
        {val: divergenceval, reload: false}
    );

    socket.on('updated', (data) => {
        setdiver();
        socket.emit(
            'diverge', 
            {val: divergenceval, reload: true}
        );
        socket.broadcast.emit(
            'diverge', 
            {val: divergenceval, reload: true}
        );
    });
    
})
