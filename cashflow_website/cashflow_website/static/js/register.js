const usernameField=document.querySelector('#usernameField');
const usernameSuccessOutput = document.querySelector('.usernameSuccessOutput');
const feedbackArea=document.querySelector('.userInvalidFeedback');

const emailField=document.querySelector('#emailField');
const emailFeedbackArea=document.querySelector('.emailInvalidFeedback');
const emailSuccessOutput = document.querySelector('.emailSuccessOutput');

const passwordField=document.querySelector('#passwordField');
const showPasswordToggle=document.querySelector('.showPasswordToggle');

const handleToggleInput= (e)  =>{
    if (showPasswordToggle.textContent === 'SHOW') {
        showPasswordToggle.textContent = 'HIDE';
        passwordField.setAttribute('type', 'text');
    }
    else{
        showPasswordToggle.textContent = 'SHOW';
        passwordField.setAttribute('type', 'password');
    }
}

showPasswordToggle.addEventListener('click', handleToggleInput);

emailField.addEventListener('keyup', (e) => {
    const emailVal = e.target.value;

    emailField.classList.remove('is-invalid');
    emailFeedbackArea.style.display = "none";

    if (emailVal.length>0) {
        emailSuccessOutput.style.display='block';
        emailSuccessOutput.textContent=`Checking  ${emailVal}`
        
        fetch('/authentication/validate-email', {
            body: JSON.stringify({email: emailVal}),
            method: "POST",
        })
        .then(res=>res.json())
        .then(data=>{
            emailSuccessOutput.style.display='none';
            if (data.email_error) {
                emailField.classList.add('is-invalid');
                emailFeedbackArea.style.display = "block";
                emailFeedbackArea.innerHTML=`<p>${data.email_error}</p>`;
            }
        });
    }

});

usernameField.addEventListener('keyup', (e) => {
    const usernameVal = e.target.value;

    usernameField.classList.remove('is-invalid');
    feedbackArea.style.display = "none";

    if (usernameVal.length>0) {
        usernameSuccessOutput.style.display='block';
        usernameSuccessOutput.textContent=`Checking  ${usernameVal}`
        
        fetch('/authentication/validate-username', {
            body: JSON.stringify({username: usernameVal}),
            method: "POST",
        })
        .then(res=>res.json())
        .then(data=>{
            usernameSuccessOutput.style.display='none';
            if (data.username_error) {
                usernameField.classList.add('is-invalid');
                feedbackArea.style.display = "block";
                feedbackArea.innerHTML=`<p>${data.username_error}</p>`;
            }
        });
    }
    else{
        usernameSuccessOutput.style.display='none';
    }
    
});