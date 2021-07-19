$(document).ready(function() {

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var azul = '#000080';
    var verm = '#800000';
    var ama = '#DAA520';
    var verde = '#006400';

    function cores(){
        var myArray = [azul, verde, ama, verm];
        var rand = myArray[Math.floor(Math.random() * myArray.length)];
        return rand;
    }

    async function acendeBotoes(){
        var s = 2000;
        var acerto = 0;
        var total_esperado = 0;
        var cor_ref = cores();
        var inicio_tempo=0;
        var fim_tempo =0;
        var tempo_reacao = [];
        $("#b18").css("background-color", cor_ref);
        for (var i=1; i<30; i++){
            var ran = getRandomIntInclusive(1, 16);
            var id = "#b"+ran;
            var cor = cores();
            inicio_tempo = new Date().getTime();
            $(id).css("background-color", cor);
            
            await sleep(s);
            
            $(id).click(function(){
                if (cor == cor_ref){
                    acerto += 1;
                    fim_tempo = new Date().getTime();
                    tempo_reacao.push(fim_tempo-inicio_tempo);
                }
            });
            
            if (cor == cor_ref){
                total_esperado++;
            }
            
            if (i<4) {
                s = 3000;
            }else if (i>3 && i<7){
                s = 2500;
            }else if (i>6 && i<12){
                s = 2000;
            }else if (i>11){
                s = 1000;
            }
            
            $(id).css("background-color", "#f9fafb");
        }
        mostrarResultado(acerto, total_esperado, tempo_reacao);
    }

    function resetar(){
        $("#b18").css("background-color", "#f9fafb");
        acerto = 0;
        total_esperado = 0;
        for (var i=1; i<17; i++){
            var id = "#b"+i
            $(id).css("background-color", "#f9fafb");
        }
        console.clear()
    }
    
    function mostrarResultado(acerto, total_esperado, tempo_reacao){
        $(".btn-get-restarted").on("click", function(){
            resetar();
            $('#acertos').html("");
            $('#erros').html("");
        });
        acertos = "Você fez " + acerto + " acertos";
        erros = "Essa cor apareceu "+ (total_esperado) + " vezes."+ " Você clicou errado "+ (total_esperado-acerto) + " vezes." + "Tempo de reação: " + (tempo_reacao);
        $('#acertos').html(acertos);
        $('#erros').html(erros);

    }

    $(".btn-get-started").on("click", function(){
        acendeBotoes();
    });

    $(".btn-get-restarted").on("click", function(){
        resetar();
    });

});

