let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const getAllArtists = () =>
    new Promise((res, rej) => {
        fs.readFile("./public/artists.txt", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    fs.writeFile("./public/artists.txt", "", err => {
                        if (err) rej(err);
                    });
                } else {
                    rej(err);
                }
                res([]);
            }
            try {
                res(JSON.parse(data.toString()));
            } catch (err) {
                fs.writeFile("./public/artists.txt", "", err => {
                    if (err) rej(err);
                });
                res([]);
            }
        });
    });

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/lab5.html");
});

app.get("/artists/add", (req, res) => {
    const artist = {};
    artist.name = req.query.name;
    artist.about = req.query.about;
    artist.url = req.query.url;
    getAllArtists().then((artists) => {
        artists.push(artist)
        fs.writeFile("./public/artists.txt", JSON.stringify(artists), err => {
            if (err) res.status(500).send("error when writting file")
            res.send("ok")
        });
    }).catch((err) => {
        res.status(500).send("error when getting artists")
    });
});


app.get("/artists/delete", (req, res) => {
    getAllArtists().then((artists) => {
        artists.splice(req.query.id, 1);
        fs.writeFile("./public/artists.txt", JSON.stringify(artists), err => {
            if (err) res.status(500).send("error when writting file")
            res.send("ok")
        });
    }).catch((err) => {
        res.status(500).send("error when getting artists")
    });
});

app.get("/artists/all", (req, res) => {
    getAllArtists().then((artists) => {
        res.send(artists)
    }).catch((err) => {
        res.status(500).send("error when getting artists")
    });
});

app.listen(80, () => console.log("Server ready"));
