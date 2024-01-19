import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello from server")
});

app.listen(8000, () => console.log("port is listening on port 8000"));