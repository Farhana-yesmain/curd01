const handleLogin =  async () => {
    const userIdInput = document.getElementById('user-id');
    const passwordInput = document.getElementById('password');

    const userId = userIdInput.value;
    const password = passwordInput.value;

    const user = {
        userId: userId,
        password: password,

        
    };

    
    
     const userInfo = await fetchUserInfo(user);
     console.log(userInfo);

     const errorElemect = document.getElementById("user-login-error");
     //user data did not match with database
     if(userInfo.length === 0){
        errorElemect.classList.remove("hidden");
     }
     else{
        errorElemect.classList.add("hidden");

        //save user information before junping to the next page
        localStorage.setItem("loggedInUser",JSON.stringify(userInfo[0]));

        //then make a jump to a new page
        window.location.href = "/post.html";
     }
     
     
};


const fetchUserInfo = async (user) => {
    let data;
    try{
        const res = await fetch("http://localhost:5000/getUserInfo",{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify(user),
    
        });
        data = await res.json();
    }
    
    catch (err){
        console.log("Error connecting to the server:",err);

    }
    
    finally{
        return data;

    }
        

    
};