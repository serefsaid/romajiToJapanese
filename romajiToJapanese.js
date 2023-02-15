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

let alt = 'hiragana';//default alphabet is hiragana

document.addEventListener('keyup',function(e){//to change alphabet on press Altgraph
    if(e.key=='AltGraph'){
        if(alt=='hiragana'){
            alt='katakana';
        }else if(alt=='katakana'){
            alt='latin';
        }else if(alt=='latin'){
            alt='hiragana';
        }
        defineOnKeyUps();
    }
})
let latinPart;//this is the part before i close latin part (this can also name as oldPart)

function defineOnKeyUps(){
    inputObjects.forEach(object =>{//to define function for every input(input and textarea)
        object.onkeyup = null;//forget old function (otherwise it will be hiragana all the time)
        if(alt=='hiragana'){
            object.onkeyup = function(){tryToChangeHiragana(object)};
        }else if(alt=='katakana'){
            object.onkeyup = function(){tryToChangeKatakana(object)};
        }else if(alt=='latin'){
            object.onkeyup = function(){saveLatin(object)};    
        }
    })
}
defineOnKeyUps();

function saveLatin(input){
    latinPart = input.value;
}

function tryToChangeHiragana(input){
    let text = input.value;
    text = text.toLowerCase();
    var hiragana = hiraganaJson.find(object=>text.includes(object.roumaji));
    if(hiragana!=undefined){
        if(latinPart!=undefined){text = text.replace(latinPart,'');}//replaced latin part from the text
        text = text.replace(hiragana.roumaji,hiragana.kana);
        if(latinPart!=undefined){text = latinPart + text;}//deplaced    "        "    "    "    "   "
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