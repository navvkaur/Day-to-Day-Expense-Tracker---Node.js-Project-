

function datasave(event){
    event.preventDefault();
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById('lname').value;
    let username = document.getElementById('username').value;
    console.log(username);
    
    let password = document.getElementById('password').value;
    console.log(password);

    let detail = {
        fname,lname,username,password
    };

    postrequest= async () => {
       try{
        console.log(detail);
        
        const response = await axios.post("http://43.205.255.229:3000/login/sign-in",detail);
        console.log(response);
        console.log(response.data.newUserLogin);
        window.location = "http://43.205.255.229:3000/login.html";
        return;
       
       
    }
    
    catch
    {err=>console.log(err)
    }
}
postrequest();
}


function getdata(event){
    event.preventDefault();
    let username = document.getElementById('username').value;
    console.log(username);
    
    let password = document.getElementById('password').value;
    console.log(password);

    let login_detail = {
        username,password
};
getrequest= async () => {
  
     console.log(login_detail);
      await axios.post("http://43.205.255.229:3000/login",login_detail).then(response=>{
        console.log(response);
        if(response.status == 200){
           alert(response.data.message)
           localStorage.setItem('token',response.data.token)
          window.location = "http://43.205.255.229:3000/expense.html";
      }
    }).catch(err=>{console.log(JSON.stringify(err))
        document.getElementById("error").innerHTML+= `<h3>${err.message}</h3>`;
    });

}
getrequest();
}
