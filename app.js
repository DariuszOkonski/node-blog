const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send('Home page');
})




// LISTENING =====================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`);
});