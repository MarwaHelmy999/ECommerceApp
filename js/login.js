let email = document.querySelector("#email")
let password = document.querySelector("#password")

let log_in_btn = document.querySelector("#Log_in")

let getMail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

log_in_btn.addEventListener("click" , function(e){
    e.preventDefault()
    if(email.value === "" || password.value=== ""){
        alert("please fill data")
    }
    else{
        if((getMail && getMail.trim() === email.value.trim() && getPassword && getPassword.trim() === password.value) ){
            setTimeout(() => {
                window.location = "index.html"
            }, 1500)
        }
        else{
            alert("Either Email or Password is wrong")
        }
    }
})