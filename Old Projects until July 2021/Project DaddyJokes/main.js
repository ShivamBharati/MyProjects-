const btn_newJoke = document.querySelector('#btn_newJoke');
const jokesContainer = document.querySelector('#jokesContainer');

const fetchNewJoke = async () =>{
    const config =  { headers: { Accept: 'application/json' } }
    const response = await axios.get('https://icanhazdadjoke.com/',config);
    return response.data.joke;
}

const createJokeField = async () => {
    let newjoke = await fetchNewJoke();

    //Crete new paragraph that contains joke
    let newParaContainer = document.createElement('DIV');
    newParaContainer.className = "is-block mt-3";
    let newPara = document.createElement('P');
    newPara.className = "content has-background-primary-light jokeBox";
    newPara.innerText = newjoke;

    //Push the paragraph element into joke container div
    newParaContainer.appendChild(newPara);
    jokesContainer.appendChild(newParaContainer);
    return 'OK';
}

btn_newJoke.addEventListener('click', async () => {
    //disable the button temporary until one request gets complete.
    btn_newJoke.setAttribute("disabled",'disabled'); 
    btn_newJoke.classList.add("is-loading");

    //Try to get a new joke and check for errors...
    try{
        const res = await createJokeField();
        //enable button again for user to get a new joke.
        if(res == 'OK'){
           btn_newJoke.removeAttribute("disabled"); 
           btn_newJoke.classList.remove("is-loading");
        }
    }
    catch(err){
        if(err == "Error: Network Error"){
            alert('Oops! Your internet connection is down.');
        } else {
            alert('Sorry! Could\'nt fetch a new joke.');
        }
    }
});


// function makeFakeRequest(url,resolve,reject){
//    setTimeout(() => {
//     let x =  Math.random() * 10;
//     if (x > 3) {
//         resolve(`Here is your data from ${url}`);
//     }
//     else{
//         reject('Request failure!');
//     }
//    },1500);
// }

// function postDataOnServer(url,resolve,reject){
//    setTimeout(() => {
//     let x =  Math.random() * 10;
//     if (x > 3) {
//         resolve(`Data got posted on ${url}`);
//     }
//     else{
//         reject('We could\'nt post your data on server.');
//     }
//    },1500);
// }

// makeFakeRequest('google.com/api',(response) => {
//  heading.innerHTML = response;
//     postDataOnServer('bharaticomputer.com/api/users',(response) => {
//         subtext.textContent = response;
//     }, (error) => {
//         subtext.textContent = error
//     });
// }, (error) => {
//  heading.innerHTML =  error;
// });


// function makeFakeRequest(url){
//    return new Promise((resolve,reject) => {
//     setTimeout(() => {
//         let x =  Math.random() * 10;
//         if (x > 4) {
//             resolve(`Here is your data from ${url}`);
//         }
//         else{
//             reject('Request failure!');
//         }
//        },1500);
//    }); 
// }

// function postDataOnServer(url){
//     return new Promise((resolve,reject) => {
//      setTimeout(() => {
//         let x =  Math.random() * 10;
//         if (x > 4) {
//             resolve(`Data got posted on ${url}`);
//         }
//         else{
//             reject('We could\'nt post your data on server.');
//         }
//       },1500);
//     });
// }

// makeFakeRequest('google.com/api').then((response) => {
//     heading.innerHTML = response;
//     postDataOnServer('bharaticomputer.com/api/users').then((response) => {
//         subtext.textContent = response;
//     }).catch((error) => {
//         subtext.textContent = error
//     });
// }).catch((error) => {
//     heading.innerHTML =  error;
// });
  


