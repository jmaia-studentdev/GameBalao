var timeID = null;

function iniciaJogo(){
    var nivel = document.getElementById('nivel_jogo').value;
    window.location.assign("../jogo.html?"+nivel);
    
}

function startGame() {
    var url = window.location.search;
    var dificuldade = url.replace("?","");
    
    var segundos = 0;

    if (dificuldade == 1){
        segundos = 120
    }

    if (dificuldade == 2){
        segundos = 60
    }

    if (dificuldade == 3){
        segundos = 30
    }

    document.getElementById('cont_segundos').innerHTML = segundos
   
    var qtd_balao = 30
    createBalon(qtd_balao)

    document.getElementById('baloesInteiros').innerHTML = qtd_balao;
    document.getElementById('baloesEstourados').innerHTML = 0;

    gameTime(segundos);

}


function gameTime(segundos){
    segundos = segundos - 1;

    if(segundos == -1){
        clearTimeout(timeID);
        gameOver();
        return false;
    }       
    document.getElementById('cont_segundos').innerHTML = segundos
    timeID = setTimeout("gameTime("+segundos+")", 1000);
      

}


function gameOver(){
    alert("Fim de Jogo, seu tempo esgotou!")
    removeEvents();
}




function createBalon(qtd_balao){

    for(var i = 1; i <= qtd_balao; i++){
        var imgBalao = document.createElement('img');
        imgBalao.src = '../imagens/balao_azul_pequeno.png'
        imgBalao.style.margin ='10px';
        imgBalao.id = 'b'+i;
        imgBalao.onclick = function(){ estourar(this);};
        document.getElementById('cenario').appendChild(imgBalao);

    }
    
}

function estourar(e){
    var id_balao = e.id
    document.getElementById(id_balao).src='../imagens/balao_azul_pequeno_estourado.png'
    document.getElementById(id_balao).setAttribute("onclick","");

    pontuacao(-1);
}

function pontuacao(acao){

    var contBalaoInteiro = document.getElementById("baloesInteiros").innerHTML;
    var contBalaoEstourado = document.getElementById("baloesEstourados").innerHTML;

    contBalaoInteiro = parseInt(contBalaoInteiro);
    contBalaoEstourado = parseInt(contBalaoEstourado);

    contBalaoInteiro = contBalaoInteiro + acao;
    contBalaoEstourado = contBalaoEstourado - acao;

    document.getElementById("baloesInteiros").innerHTML = contBalaoInteiro;
    document.getElementById("baloesEstourados").innerHTML = contBalaoEstourado;

    situacaoJogo(contBalaoInteiro);

}

function situacaoJogo(contBalaoInteiro){
    if(contBalaoInteiro == 0){
        alert("Parabens, voce venceu o jogo");
        stopGame();
    }
}

function stopGame(){
    clearTimeout(timeID);
}

function removeEvents() {
        var i = 1; //contado para recuperar balões por id
        
        //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
        while(document.getElementById('b'+i)) {
            //retira o evento onclick do elemnto
            document.getElementById('b'+i).onclick = '';
            i++; //faz a iteração da variávei i
        }
}
