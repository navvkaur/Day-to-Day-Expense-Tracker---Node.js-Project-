
const fs = require('fs');
const path = require('path');
const https = require('https')
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const sequelize = require('./util/login')
const cors = require('cors');
const Expense = require("./models/expense");
const User = require("./models/user");
const Order = require("./models/order");
const Forgotpassword = require('./models/forgotpassword')
console.log(process.env);



const bodyParser = require('body-parser');
const accessstreamlog = fs.createWriteStream(path.join(__dirname,'access.log'),{flag : 'a'});
const privatekey = fs.readFileSync('server.key')
const certificate = fs.readFileSync('server.key')
app.use(bodyParser.json({ extended: false}));
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessstreamlog}))
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