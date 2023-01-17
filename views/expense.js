
let flag = false;
let page = 1;
var e = document.getElementById("size");


let Pagination = document.getElementById('btn-group')
const token = localStorage.getItem('token');
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function getExpense()

{  

    const token = localStorage.getItem('token');
    let params = new URLSearchParams(window.location.search);
    page = params.get('page');
    console.log('page' + page);
var row = e.options[e.selectedIndex].value;
console.log(row)
localStorage.setItem('size',row);
     axios.get(`http://localhost:3000/expense/add-expense?page=${page}`,{headers:{"Authorization":token,"size":row}})
    .then(({data:{expense, ...pagedata}}) => {
       
       console.log(pagedata);
    //   for(var i = 1;i<=pagedata.count;i++){
    //     Pagination.innerHTML += `<a id='btn${total}' href='http://localhost:3000/expense/add-expense?page=${total}'>${total}</a>`
      
    // }
        listProducts(expense)
       showPagination(pagedata)
        
    })
    .catch((err) => {
        console.log(err);
    })
}
window.addEventListener('DOMContentLoaded', (event) => {
    
    const decodetoken = parseJwt(token);
         
    console.log(decodetoken);
   
     getExpense();
    
        
        const premium = decodetoken.ispremiumuser;
             if(premium != null)
             {
                document.getElementById('span2').style.visibility="visible";
                document.getElementById('rzp-button1').style.visibility = 'hidden';
                document.getElementById('premium').innerHTML += "<h4>You are premium user now!!</h4>";
                createLeaderboard()


             }
       
})

function listProducts(expense)
{
    
    console.log(expense)
    for(var i = 0;i<expense.length;i++){
          showNewUseronScreen(expense[i]);
    }
  
}

function showPagination({
   count,currentPage,nextPage,hasnextPage,previousPage,haspreviousPage,lastPage
}){
    
    
    for(var i = 1;i<=lastPage;i++){

        const btn = document.createElement('button')
        btn.innerHTML =`<a  href='?page=${i}'>${i}</a>` 
        btn.addEventListener('click',()=>{
            listProducts(i) 
            getExpense();
           
            
    })
    
    Pagination.appendChild(btn);
}

    
    // if(haspreviousPage){
    //     const btn2 = document.createElement('button')
    //     btn2.innerHTML =`<a  href='?page=${previousPage}'>${previousPage}</a>` 
    //     btn2.addEventListener('click',()=>{
    //         listProducts(previousPage) 
    //         page = previousPage
    //         getExpense();
    // })
    // Pagination.appendChild(btn2);
    // }

    // const btn1 = document.createElement('button')
    // btn1.innerHTML =`<a  href='?page=${currentPage}'>${currentPage}</a> ` 
    // btn1.addEventListener('click',()=>{
    //     listProducts(currentPage)
    //     page = currentPage
    //     getExpense();

    // })
    // Pagination.appendChild(btn1);

    // if(hasnextPage){
    //     const btn3 = document.createElement('button')
    //     btn3.innerHTML =`<a  href='?page=${nextPage}'>${nextPage}</a> ` 
    //     btn3.addEventListener('click',()=>{
    //         listProducts(nextPage) 
    //         page = nextPage
    //         getExpense();

    // })
    // Pagination.appendChild(btn3);
    // }

}




function findexpense(event){
    event.preventDefault();
    var e = document.getElementById("category");
    var category = e.options[e.selectedIndex].value;
    
   
    
    console.log(category);
    let description = document.getElementById('description').value;
    let amount = document.getElementById('amount').value;
    let id = document.getElementById('id').value;
    
    let expense_details={
        id,
        category,description,amount
    };
    postRequest = async () => {
        try {
            if(flag==false){
            const response = await axios.post("http://localhost:3000/expense/add-expense", expense_details,{headers:{"Authorization":token}});
            console.log(response);
            console.log(response.data.newExpenseDetail);
            location.reload();
           
            return;
            }
            else{
                console.log(expense_details.id);
                
                        const response = await axios.post(`http://localhost:3000/expense/edit-expense/${expense_details.id}`,expense_details,{headers:{"Authorization":token}});
                        console.log(response.data);
                        flag = false;
                        location.reload();
               }
            }
catch (err) {
    document.body.innerHTML += "<h4>Something went wrong !</h4>";
    console.log(err);
}
}
postRequest();
}

function showNewUseronScreen(userDetails){
    const d=document.getElementById('users')
    console.log(userDetails.id);
    let li= ` <div class = "new"><li id="${userDetails.id}"> ${userDetails.category} ---->${userDetails.description} =  $${userDetails.amount}
      <button onclick = editUser('${ userDetails.id}','${ userDetails.amount}','${userDetails.description}','${userDetails.category}')   class="glyphicon glyphicon-edit">  </button> 
     <button onclick = deleteUserfromapi('${userDetails.id}') class="glyphicon glyphicon-trash">  </button> 
      </li> <br></div>`
   d.innerHTML=d.innerHTML + li
   }

   
deleteUserfromapi = async (id) => {
    try {
       
        const users = await axios.delete(`http://localhost:3000/expense/delete-expense/${id}`,{headers:{"Authorization":token}});
        location.reload();
    } catch (err) {

        document.getElementById('error').innerHTML += "<h4>Something went wrong !</h4>";
        console.log(err);
    }
}

function editUser(id,amount,description,category) {
    flag = true;
    document.getElementById('id').value=id;
    document.getElementById('amount').value=amount;
document.getElementById('category').value=category;
document.getElementById('description').value=description;

    }

    document.getElementById('rzp-button1').onclick = async function(e){
       
        const response = await axios.get("http://localhost:3000/purchase/premium", {headers:{"Authorization":token}});
        console.log(response);
        var options ={
            "key":response.data.key_id,
            "order_id":response.data.order.id,
            "handler":async function (response){
                await axios.post("http://localhost:3000/purchase/updatestatus", {
                    order_id:options.order_id,
                    payment_id:response.razorpay_payment_id,
                },{headers:{"Authorization":token}});
                alert("You are a Premium User Now");
                  document.getElementById('rzp-button1').style.visibility = 'hidden';
                  document.getElementById('premium').innerHTML += "<h4>You are premium user now!!</h4>";
                 
            },

        };


const rzp1 = new Razorpay(options);
rzp1.open();
e.preventDefault();
rzp1.on('payment.failed',function(response){
console.log(response)
alert("Something went wrong!");
});
    }


async function createLeaderboard(){
    try{
   
    const userLeaderboard = await axios.get('http://localhost:3000/premium/Leaderboard',{headers:{"Authorization":token}})
    console.log(userLeaderboard);
    document.getElementById('div2-2').innerHTML=`<div class="card">
    <div class="card-header">
      <h2 class="fw-bold mb-2 text-uppercase justify-content-center" style="font-size: large;">LEADERBOARD</h2>
      
  </div>
      <ul id = "users" style="display: block;">
      </ul>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Expense</th>
    </tr>
  </thead> <tbody id = "output"></tbody> </table>`
   var count = 1;
    userLeaderboard.data.forEach((userDetails)=>{

        document.getElementById('output').innerHTML += `
    <tr>
    
      <th scope="row">${count}</th>
      <td>${userDetails.fname}</td>
      <td>${userDetails.lname}</td>
      <td>${userDetails.TotalCost}</td></tr> `
      count++;
    })

    
    }
    catch (err) {

        document.getElementById('error').innerHTML += "<h4>Something went wrong !</h4>";
        console.log(err);
    }  

}


async function download(){
   try {
    const response = await axios.get('http://localhost:3000/premium/download',{headers:{"Authorization":token}})
   
        if(response.status === 200){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            let a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.txt';
            a.click();
            
        } else {
            throw new Error(response.data.message)
        }

    }
    catch (err) {

        document.getElementById('error').innerHTML += "<h4>Something went wrong !</h4>";
        console.log(err);


    }  


}

document.getElementById('myBtn').addEventListener("click",getdownload)
async function getdownload()
{   
    console.log("hiii");
   try {
    const response = await axios.get("http://localhost:3000/expense/download",{headers:{"Authorization":token}})
     
      
      console.log(response.data);
      console.log(response.data.Users);

      let count = 1;
      response.data.Users.forEach((allDetail)=>{

        let link = allDetail.fileUrl;
        let date = allDetail.DateTime;
        
                   
                document.getElementById('download-table').innerHTML += `
                <tr>
                  <th scope="row">${count}</th>
                  <td>${date.split('T')[0]}</td>
                  <td>${date.split('T')[1].split('.')[0]}</td>
                  <td><button type="button" id = "download${count}" class="btn btn-default " >
                  <span class="glyphicon glyphicon-download-alt"></span><a  id = 'adownload${count}' href = ${link} > Download</a>
                </button></td>
                </tr> `
                count++;
      })
      
   }
   catch (err) {

    document.getElementById('error').innerHTML += "<h4>Something went wrong !</h4>";
    console.log(err);


}  

}