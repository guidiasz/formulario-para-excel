const botao = document.querySelector('#botao');

botao.addEventListener('click', function () {
  const form = document.querySelector('form');
  const intervalo = form.querySelector('#candidatos');
  const checkboxCargos = form.querySelectorAll('.checkbox input:checked');
  let cargos = [];
  checkboxCargos.forEach(function (checkboxCargo) {
    cargos.push(checkboxCargo.name);
  });

  const params = new URLSearchParams({
    intervalo: intervalo.value,
  });

  cargos.forEach(function (cargo) {
    params.append('areaDeInteresse', cargo);
  });

  document.location.assign('https://planilhabancodetalentos.herokuapp.com/?' + params);
})