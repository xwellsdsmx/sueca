// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Sorteio', ['ionic', 'ngCordova', 'ionic-material'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString("#387EC5");
    }
  });
})

.controller('AppController', function($scope, $ionicTabsDelegate, $cordovaDialogs){

  $scope.regras = ['Escolhe uma pessoa para beber','Escolhe duas pessoas para beber','Jogo do "Pi"\nO jogador que tirou a carta fala o número 1.\nO próximo jogador fala o número seguinte (2) e assim por diante.\nA pegadinha é que todo múltiplo de três deve ser substituído pela palavra "pi".\nEntão fica assim: Quem tirou o três do deque fala "um".\nO jogador à sua esquerda fala "dois".\nO da esquerda fala "pi".\nO próximo fala "quatro".\nO outro "cinco".\nO outro "pi", e assim sucessivamente.\nQuem errar, ou demorar muito, bebe.','Jogo do "Stop"\nQuem tirou a carta do deque escolhe uma categoria e uma letra do alfabeto e dá um exemplo.\nO próximo jogador tem que seguir o padrão.\nO primeiro que errar ou não souber, bebe.\nPor exemplo: O jogador escolhe "carros com a letra A", e dá como exemplo "Audi".\nO próximo diz "Astra".\nO outro "Alfa Romeu", e assim por diante.','Jogo da Memória\nQuem tirou a carta fala uma palavra qualquer.\nO próximo tem que repetir a palavra anterior e adicionar uma.\nE assim por diante.\nExemplo: Quem tirou a carta fala "jamanta".\nO próximo fala "jamanta cabrito".\nO próximo diz "jamanta cabrito mesa", e assim por diante.\nO que errar ou demorar, bebe.','Continência\nQuem tirou o 6 guarda a carta (não a devolve ao monte de descarte, como as demais) e usa-a quando quiser.\nDiscretamente, essa pessoa deve colocar a mão na testa, fazendo continência e observar os outros jogadores.\nO último que perceber e fizer continência, bebe.','A pessoa a direita de quem tirou a carta bebe uma dose.','Regra Geral\nQuem tira essa carta determina uma regra para todos obedecerem.\nPode ser algo do tipo "está proíbido falar a palavra "beber" e seus derivados", ou "antes de beber uma dose, a pessoa tem que rebolar".\nQuem quebrar a regra, deve beber (as vezes, de novo).\nA Regra Geral pode ser substituída por outra Regra Geral, caso contrário, dura o jogo todo.','Mão na Nuca\nParecida com a regra do número 7.\nA carta é guardada e usa quando o jogador quiser.\nAo invés da continência, o jogador coloca a mão em sua nuca.','Saída\nEssa carta também pode ser guardada, e negociada, se for o caso.\nEla permite ao jogador uma ida ao banheiro.','O jogador à esquerda de quem tirou o valete bebe uma dose.','Todas as mulheres da mesa bebem uma dose.','Todos os homens da mesa bebem uma dose.'];

  $scope.isComecar = false;

  $scope.isRegras = false;

  $scope.isSorteio = true;

  $scope.selecionarCartas = ["Ás","Dois","Três","Quatro","Cinco","Seis","Sete","Oito","Nove","Dez","Valete","Dama","Rei"];

  $scope.cartasFora = [];

  $scope.cartas = [];

  $scope.cartasUtilizadas = [];

  $scope.novoSueca = function(){
    $scope.isComecar = !$scope.isComecar;
    $scope.isRegras = false;
  };

  $scope.novoRegras = function(){
    $scope.isRegras = !$scope.isRegras;
    $scope.isComecar = false;
  };

  $scope.liberarSorteio = function(opcao){
    if(opcao == 1){
      $('#btnSortearCarta').show();  
    }else{
      $('#btnSortearCarta').hide();  
    }
  };

  $scope.mostrarRegra = function(carta) {
    $cordovaDialogs
    .alert($scope.regras[carta], 'Regras', 'OK')
    .then(function() {
      $scope.cartasUtilizadas.push($scope.cartas[cartaSorteada]);
      $scope.cartas.splice($scope.cartaUtilizada,1);
      $('#cartaSorteio').html("");
      $scope.liberarSorteio(1);
    });
  };

  $scope.verificaCarta = function(numero){
    if(numero.charAt(0) == 1 && isFinite(numero.charAt(1))){
      return numero;
    }else if(numero.charAt(0) == 1 && !isFinite(numero.charAt(1))){
      return 1;
    }else{
      return numero.charAt(0);
    }
  };

  $scope.sortearCarta = function(){
    if($scope.cartas.length == 0){
      $scope.cartas == $scope.iniciarSueca($scope.cartasFora);
    }
    $scope.liberarSorteio(2);
    setTimeout(function(){
      clearInterval(sorteioCarta);
      carta = parseInt($scope.verificaCarta($scope.cartas[cartaSorteada].charAt(4) + $scope.cartas[cartaSorteada].charAt(5))) - 1;
      $scope.mostrarRegra(carta);
    }, 2000);

    var sorteioCarta = setInterval(function(){
      cartaSorteada = parseInt(Math.floor((Math.random() * $scope.cartas.length)));
      $scope.cartaUtilizada = cartaSorteada;
      $('#cartaSorteio').html("<img src='" + $scope.cartas[cartaSorteada] + "' width='100%' height='100%'>");
    }, 50);
  };

  $scope.retirarCarta = function(cartaFora){
    if($scope.cartasFora.length == 5){
      $cordovaDialogs.alert('Só é possivel retirar no maximo 5 cartas.\nQuer jogar sem cartas?', 'Hey', 'OK');
    }
    if($scope.cartasFora.indexOf(parseInt(cartaFora)) < 0 && $scope.cartasFora.length != 5){      
      $scope.cartasFora.push(parseInt(cartaFora));
      console.log(cartaFora);
    }    
    $scope.cartasFora.sort();
  };

  $scope.devolverCarta = function(posicao){
    console.log(posicao);
    for(i = 0; i < $scope.cartasFora.length; i++){
      if($scope.cartasFora[i] == parseInt(posicao)){
        $scope.cartasFora.splice(i,1);
      }
    }
    $scope.cartasFora.sort();
  };

  $scope.iniciarSueca = function(cartasFora){
    $scope.cartas = [];
    for(i = 1;i <= 13; i++){
      if($scope.cartasFora.indexOf(i) < 0){
        for(j = 1;j <= 4;j++){
          $scope.cartas.push('img/' + i + '_' + j + '.png');
        }        
      }
    }
    $scope.cartasUtilizadas = [];
    $scope.cartasFora = [];
    $ionicTabsDelegate.select(1);
  };
});

