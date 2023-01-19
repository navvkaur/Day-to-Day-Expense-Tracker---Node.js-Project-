async function reset_Password(event)
{
    event.preventDefault();
    
    const email = document.getElementById('email').value;

    const details = {
        email
    };
    console.log(email);

    const response = await axios.post('http://43.205.255.229:3000/forgotpassword',details).then((response)=>{
        if(response.status === 202){
            document.getElementById('error').innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
        } else {
            throw new Error('Something went wrong!!!')
        }
    })
    

    .catch(err => {
        document.getElementById('error').innerHTML += `<div style="color:red;">${err} <div>`;
    })
}

