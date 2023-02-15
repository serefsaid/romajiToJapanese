let inputsAndTextareas = [];let textareas = document.getElementsByTagName('textarea');let inputs = document.getElementsByTagName('input');
inputsAndTextareas.push(textareas,inputs)
let inputObjects = [];
function findInputs(){
    for(let i = 0 ; i<inputsAndTextareas.length;i++){
        for(let j = 0 ; j<inputsAndTextareas[i].length;j++){
            inputObjects.push(inputsAndTextareas[i][j])
        }
    }
    return inputObjects;
}
findInputs();///to found all inputs in the page and add them in inputObjects array (textaea and input tags)

const alphabets = ['latin','hiragana','katakana'];
let alt = alphabets[0];//default alphabet

document.addEventListener('keyup',function(e){//to change alphabet on press Altgraph
    if(e.key=='AltGraph'){
        const currentAlphabet = (alph)=>alph==alt;
        var index = alphabets.findIndex(currentAlphabet);
        alt = alphabets[index+1];

        /*
        if(alt=='hiragana'){
            alt='katakana';
        }else if(alt=='katakana'){
            alt='latin';
        }else if(alt=='latin'){
            alt='hiragana';
        }
        */
        
        defineOnKeyUps();
    }
})

function defineOnKeyUps(){
    inputObjects.forEach(object =>{//to define function for every input(input and textarea)
        object.onkeyup = null;//forget old function (otherwise it will be hiragana all the time)
        if(alt=='hiragana'){
            object.onkeyup = function(){tryToChangeHiragana(object)};
        }else if(alt=='katakana'){
            object.onkeyup = function(){tryToChangeKatakana(object)};
        }else if(alt=='latin'){
            //object.onkeyup = function(){saveLatin(object)};    
        }
    })
}
defineOnKeyUps();

function tryToChangeHiragana(input){
    let text = input.value;
    text = text.toLowerCase();
    var hiragana = hiraganaJson.find(object=>text.includes(object.roumaji));
    if(hiragana!=undefined){
        text = text.replace(hiragana.roumaji,hiragana.kana);
        input.value = text;
    }
}
function tryToChangeKatakana(input){
    let text = input.value;
    text = text.toLowerCase();
    var katakana = katakanaJson.find(object=>text.includes(object.roumaji));
    if(katakana!=undefined){
        text = text.replace(katakana.roumaji,katakana.kana);
        input.value = text;
    }
}
