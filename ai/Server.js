const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// simple smart pricing AI
function getPrice(text){
    let price = 10;

    if(text.includes("small")) price = 5;
    if(text.includes("medium")) price = 10;
    if(text.includes("large")) price = 20;

    if(text.includes("complex")) price += 10;

    return price;
}

app.post("/ai", (req, res) => {
    let msg = req.body.message.toLowerCase();

    let price = getPrice(msg);

    let reply = "";

    if(msg.includes("price") || msg.includes("cost")){
        reply = `💰 Estimated price: €${price}`;
    } else {
        reply = `Got it 👍 I understand your request. Estimated price: €${price}. Please continue or describe more details.`;
    }

    res.json({ reply });
});

app.listen(3000, () => console.log("AI running"));
