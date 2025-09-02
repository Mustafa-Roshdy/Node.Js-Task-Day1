const fs = require("fs")
const http = require("http");
const { json } = require("stream/consumers");

let data = [{ "name": "p1", "color": "red", "price": 100 },
{ "name": "p2", "color": "blue", "price": 200 },
{ "name": "p3", "color": "black", "price": 300 }
]

fs.writeFile("text.json", JSON.stringify(data), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("created file Successfully");
    }
})

const server = http.createServer((req, res) => {
    let dataArr = req.url.split("/")
    console.log(dataArr);
    if (req.url == "/products") {
        fs.readFile("text.json", 'utf-8', (err, data) => {
            if (err) {
                res.write("error")
                res.end()
            } else {
                console.log("get from file Successfully");
                res.write(data)
                res.end()
            }
        })


    } else if (dataArr.length == 3 && dataArr[1] == "products") {
        let index = parseInt(dataArr[dataArr.length - 1]);
        fs.readFile("text.json", 'utf-8', (err, data) => {
            if (err) {
                res.write(err)
                res.end()
            } else {

                let jsonData = JSON.parse(data)
                if (index >= jsonData.length || isNaN(index)) {
                    res.write("param is not a number or  out of range")
                    res.end()
                } else {
                    res.write(JSON.stringify(jsonData[index]))
                    res.end()
                }

            }
        })
    }

    else {
        res.write("Not Found")
        res.end()
    }
})

server.listen(7000, () => {
    console.log("Server is running at port 7000");
})