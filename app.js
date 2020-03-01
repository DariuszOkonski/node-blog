const express = require('express');
const app = express();


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
})




// LISTENING =====================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`);
});