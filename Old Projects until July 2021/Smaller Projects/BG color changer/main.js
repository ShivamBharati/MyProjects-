const sctn = document.querySelector('SECTION');
const btn_changeNow = document.querySelector('#ChangeColorNow');
const btn_smoothness = document.querySelector('#Smoothness');
const btn_auto = document.querySelector('#AutoMode');
const Smooth_Badge = document.querySelector('#Smooth_Badge');
const Auto_Badge = document.querySelector('#Auto_Badge');

var autoPlay = false;
var Smoothness = true;
var myInterval = 0;

Smooth_Badge.style.backgroundColor = '#3e9462';
Auto_Badge.style.backgroundColor = '#964848';

//-------------------------------------------------------------------->

btn_changeNow.addEventListener('click', () => {
    const newColor = makeRandomColor();
    sctn.style.backgroundColor = newColor;
});

btn_smoothness.addEventListener('click', () => {
    if(Smoothness == true){
        sctn.style.transition = 'none';
        btn_changeNow.style.transition = 'none';
        Smooth_Badge.style.backgroundColor = '#964848';
        Smoothness = false;
    }
    else{
        sctn.style.transition = 'background-color .6s';
        btn_changeNow.style.transition = 'transform .3s';
        Smooth_Badge.style.backgroundColor = '#3e9462';
        Smoothness = true;
    }
});


btn_auto.addEventListener('click', () => {
    if(autoPlay == false){
      autoPlay = true; 
      Auto_Badge.style.backgroundColor = '#3e9462';
    }
    else{
      autoPlay = false;
      Auto_Badge.style.backgroundColor = '#964848';
    }

     var Repeat =  function (){ 
        const newColor = makeRandomColor();
        sctn.style.backgroundColor = newColor;
     }

     if(autoPlay == true){
        myInterval = setInterval(Repeat, 1000);
     }
     else{
         clearInterval(myInterval);
     }

});

const makeRandomColor = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}
