const dotnev = require('dotenv').config();

const path = require('path');

const Expense = require("../models/expense");


exports.addExpense=async (req,res,next)=>{
    try {
      
      const amount = req.body.amount;
      const category = req.body.category;
      const description = req.body.description;
      console.log(req.user.id);
      
  
      if (!amount) {
          throw new Error('Amount is mandatory !')
      }
      const data = await Expense.create({
          amount : amount,
          category : category,
          description : description,
          userId:req.user.id
      })
  
      res.status(201).json({ newExpenseDetail: data });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}

exports.getExpense = async (req,res,next)=>{
try{
    let items_per_page = (req.header('size'));

     let count =  await Expense.count({where :{userId:req.user.id}});
     
    items_per_page =  Number(items_per_page) || 1;
    console.log("---------------")
   console.log(items_per_page)
   
   console.log(count)

   

    let  page = req.query.page;
    page = Number(page);
    console.log(page)
    console.log(items_per_page*page<count);
    Expense.findAll().then((total)=>{
         return Expense.findAll({
            where :{userId:req.user.id},
            offset:((page-1)*items_per_page),
            limit :items_per_page
            
           
        }).then((expense)=>{
            console.log(expense)
            res.status(200).json({expense:expense,
            count : count,
                currentPage:page,      
        hasnextPage:items_per_page*page<count,
        nextPage:page+1,
        haspreviousPage:page>1,
        previousPage:page-1,
        lastPage:Math.ceil(count/items_per_page)});
        })
    
    })
      
    
} catch(err) {
    console.log(err);
    res.status(500).json({error : err})
}
}

exports.deleteExpense = async (req,res,next)=>{
    try{
        const id = req.params.id;
         
        const user = Expense.findAll({where:{id:id,userId:req.user.id}});
        if(!user){
            console.log('This user does not exist.');
            return res.sendStatus(400);
        }
        await Expense.destroy({where: {id:id}});
        res.sendStatus(200);
        }catch(err){
            console.log(err);
            res.status(500).json({error : err})
        }
}
exports.editExpense = async (req, res, next) => {
    try{
        
        const updatedamount = req.body.amount;
        const updateddescription = req.body.description;
        const updatedcategory = req.body.category;
        const id = req.params.id;
        console.log(id);
        let user = await Expense.update(
            {
                amount : updatedamount,
            category:updatedcategory,
            description:updateddescription
            },
                {where:{id:id,userId:req.user.id}})
                console.log(user);
                res.status(201).json({user}); 
    }catch(err){
        console.log(err);
        res.status(500).json({error : err})
    }
}

