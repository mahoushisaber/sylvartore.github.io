let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/lab5.html');
});


app.get('/artists/add', (req, res) => {
    const artist_name = req.body.artist_name;
    fs.writeFileSync('./public/artists.txt', artist_name);
});

app.get('/artists/all', (req, res) => {
    fs.readFile('./public/artists.txt', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.writeFileSync('./public/artists.txt', "");
            } else {
                throw err;
            }
        }

        console.log(data.toString());
        return res.send(data.toString());
    });
});

app.listen(80, () => console.log('Server ready'))



