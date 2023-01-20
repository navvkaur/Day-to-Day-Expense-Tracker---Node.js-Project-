async function reset_Password(event)
{
    event.preventDefault();
    
    const email = document.getElementById('email').value;

    
    console.log(email);
    const userEmail = {email};
     axios.post('http://localhost:3000/password/forgotpassword',userEmail).then((response)=>{
        if(response.status === 200){
            console.log(response.data.link)
            document.getElementById('error').innerHTML += `<div style="color:red;">Mail Successfuly sent <div>` 
            document.getElementById('clickme').innerHTML += response.data.link.html;
           
            document.getElementById('email').value = null;

        } 

        
    })
    

    .catch(err => {
        document.getElementById('error').innerHTML += `<div style="color:red;">${err} <div>`;
    })
}

