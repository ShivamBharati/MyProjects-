const ToDo = ['Collect Chicken Eggs', 'Water the plants', 'Go for night walk'];

function AddDialogue(dialogue){
    var element = document.createElement("INPUT");
    element.setAttribute("type", "text");
    element.setAttribute("class", "cmd");
    element.setAttribute("onkeypress", "submitValue(event);");
    element.value = dialogue;
    inputCmd.appendChild(element);
}

document.getElementById('BTN_start').onclick = function () {
    let inputCmd = document.getElementById('inputCmd');
    AddDialogue('~ Hello there. Please type a command');

    function processCommand() {
       var node = document.createElement("INPUT");
       node.setAttribute("type", "text");
       node.setAttribute("class", "cmd");
       node.value= "~ ";
       node.addEventListener("keyup", function(event) {
           if (event.key === 'Enter') {
               var val = node.value
            //    val = val.replace("~ ", "");
               if(val=='~ exit'){
                   AddDialogue('~ Program Terminated.');
                   setTimeout ( function(){
                       document.getElementById('inputCmd').innerHTML = '';
                   }, 1000);
               }
               else if(val=='~ clear'){
                document.getElementById('inputCmd').innerHTML = '';
                processCommand();
               }
               else if(val=='~ list'){
                 AddDialogue('***********************');
                    for(let i=0; i<ToDo.length; i++){
                        AddDialogue(`${i+1} : ${ToDo[i]}`);
                    }
                 AddDialogue('***********************');
                 processCommand();
               }
               else if(val.includes("~ new ")){
                var newTodo = val.split("~ new ").toString().replace(",", "");
                ToDo.push(newTodo);
                AddDialogue('Your entry is added :-)');
                processCommand();
               }
               else if(val.includes("~ delete ")){
                var delIndex = val.split("~ delete ").toString().replace(",", "");
                    delIndex = parseInt(delIndex);
                    if(isNaN(delIndex)){
                        AddDialogue('Pleaser enter a valid index of the Todo 1');
                        processCommand();
                    }
                    else{
                        if(delIndex>0 && delIndex<=ToDo.length){
                            delIndex--;
                            ToDo.splice(delIndex, 1);
                            AddDialogue('Your entry is deleted :-)');
                            processCommand();
                        }
                        else{
                            AddDialogue('Pleaser enter a valid index of the Todo 2');
                            processCommand();
                        }
                        
                    }
               }
               else{
                    AddDialogue('~ Invalid Command. Try again');
                    processCommand();
               }
            }
        });
        inputCmd.appendChild(node);
        return 0;
    }   

    processCommand();
    // var node = document.createElement("INPUT");
    // node.setAttribute("type", "text");
    // var textnode = document.createTextNode("Water");
    // inputCmd.appendChild(node);
    
    // inputCmd.append('~ Program Terminated.');
}


