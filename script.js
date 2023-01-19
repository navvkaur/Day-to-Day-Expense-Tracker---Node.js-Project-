
const fs = require('fs');
const path = require('path');
const https = require('https')
const express = require('express');
const compression = require('compression');

const app = express();
const dotenv=require('dotenv');
dotenv.config();
const sequelize = require('./util/login')
const cors = require('cors');
const Expense = require("./models/expense");
const User = require("./models/user");
const Order = require("./models/order");
const Forgotpassword = require('./models/forgotpassword')




const bodyParser = require('body-parser');

app.use(bodyParser.json({ extended: false}));

app.use(compression());
app.use(cors());

const loginRoutes = require('./routes/login')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const premiumRoutes = require('./routes/premium');
const forgotpasswordRoutes = require('./routes/forgotpassword')
const DownloadRoutes = require('./routes/download')
app.use(loginRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);
app.use(forgotpasswordRoutes);
app.use(DownloadRoutes)
app.use((req,res)=>{
    console.log(req.url)
    res.sendFile(path.join(__dirname,`/views/${req.url}`))
})
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync().then((result)=>{
    //console.log(result)
     app.listen(3000);
 })
 .catch((err)=>console.log(err));
