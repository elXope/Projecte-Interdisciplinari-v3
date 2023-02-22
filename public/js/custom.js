$(document).ready(function() {    

    // Contingut noms dies
    (function() {
        $(window).resize(function() {
            let diesMin = ['Dll', 'Dt', 'Dm', 'Dj', 'Dv', 'Ds', 'Dg'];
            let diesMax = ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge'];
            console.log($('.calendari').width());
            if ($('.calendari').width() < 920) {
                let cont = 0;
                $('.calendari__nomDia').each(function() {
                    $(this).text(diesMin[cont]);
                    cont++;
                });
            } else {
                let cont = 0;
                $('.calendari__nomDia').each(function() {
                    $(this).text(diesMax[cont]);
                    cont++;
                });
            }
        });
    })();

    // Plenar dies
    (function() {
        // const data = new Date(5 + " 1, 2023 00:00:00");
        const data = new Date();
        const mes = data.getMonth();
        const diaMes = data.getDate();
        const nDiesMes = new Date(data.getFullYear(), mes + 1, 0).getDate();
        let dia1Mes = new Date(mes + 1 + " 1, " + data.getFullYear() + " 00:00:00").getDay();
        dia1Mes == 0 ? dia1Mes = 6 : dia1Mes -= 1;
        let contadorDies = 1;
        let canviMes = false;
        for (let i = 0; i < 6; i++) {
            $('.calendari').append(setmanaPlantilla());
            if(i == 5) {
                $('.calendari__setmana:last-child').addClass('rounded-bottom');
            }
            for (let j = 0; j < 7; j++) {
                let nDiesMesAnterior = new Date(data.getFullYear(), mes, 0).getDate(); // fique mes perquè el contingut de mes és el index i per tant és un menos
                if (i == 0 && dia1Mes != 0) {
                    if(j < dia1Mes) {
                        $('.calendari__setmana:last-child').append(diaPlantilla({numDia : (nDiesMesAnterior - (dia1Mes - j - 1)), any : data.getFullYear(), mes: mes, dia: (nDiesMesAnterior - (dia1Mes - j - 1))}));
                        $('.calendari__dia:last-child').addClass('text-muted');
                        actualitzaDia(`${data.getFullYear()}-${mes}-${nDiesMesAnterior - (dia1Mes - j - 1)}`);
                    } else {
                        let dia = '';
                        contadorDies < 10 ? dia += '0' + contadorDies : dia += contadorDies;
                        $('.calendari__setmana:last-child').append(diaPlantilla({numDia : contadorDies, any : data.getFullYear(), mes: mes + 1, dia: dia}));
                        contadorDies++;
                        actualitzaDia(`${data.getFullYear()}-${mes + 1}-${dia}`);
                    }
                } else {
                    if(!canviMes){
                        let dia = '';
                        contadorDies < 10 ? dia += '0' + contadorDies : dia += contadorDies;
                        $('.calendari__setmana:last-child').append(diaPlantilla({numDia : contadorDies, any : data.getFullYear(), mes: mes + 1, dia: dia}));
                        if(diaMes == contadorDies) {                        
                            $('.calendari__setmana:last-child').children('.calendari__dia:last-child').children('p').addClass('actual');
                        }
                        actualitzaDia(`${data.getFullYear()}-${mes + 1}-${dia}`);
                    }
                    contadorDies++;
                    if(canviMes) {
                        let dia = '';
                        contadorDies < 10 ? dia += '0' + contadorDies : dia += contadorDies;
                        $('.calendari__setmana:last-child').append(diaPlantilla({numDia : contadorDies, any : data.getFullYear(), mes: mes + 2, dia: dia}));
                        $('.calendari__setmana:last-child').children('.calendari__dia:last-child').addClass('text-muted');
                        actualitzaDia(`${data.getFullYear()}-${mes + 2}-${contadorDies}`);
                    }        
                }
                $('.calendari__setmana:last-child').children('.calendari__dia:last-child').click(function() {
                    $(this).addClass('pulsado');
                    $('.principalFormTasca').show();
                });
                if(contadorDies > nDiesMes) {
                    contadorDies = 0;
                    canviMes = true;
                }
            }
        }
    })();

    // Formulari tasca
    (function() {
        $('#tancarModal').click(function(evento) {
            evento.preventDefault();
            $('.principalFormTasca').hide();
        });
        $('.formTasca').submit(function(evento) {
            evento.preventDefault();
            $.post('/centraleta/principalTasca', $(this).serialize()).done(function(data) {
                $('.principalFormTasca').hide();
                let args = data.any + "-" + data.mes[1] + "-" + data.dia;
                console.log(args);
                actualitzaDia(args);
            }).fail(function(err) {
                console.log("err");
            });
        });
    })();

    // Llibreta tatxar
    (function() {
        $('.form-check-input').change(function() {
            if($(this).prop('checked')) {
                $(this).parent().addClass('text-muted');
                $(this).siblings().addClass('text-decoration-line-through');
                $('.llibreta').append($(this).parent());
            } else {
                $(this).parent().removeClass('text-muted');
                $(this).siblings().removeClass('text-decoration-line-through');
                $(this).parent().insertBefore($('.form-check-input').parent('.text-muted')[0]);
            }
        });
    })();

});

function actualitzaDia(data) {
    $.getJSON(`/centraleta/tasquesDia/${data}`).done(function(tasques) {
        $.each(tasques, function(i, tasca) {     
            $(`.calendari__dia[data-id=${data}]`).children('.calendari__llistaTasques').append(tascaPlantilla({nom : tasca.nom}));
        });
    }).fail(function(err) {
        console.log(err);
    });
}

const setmanaPlantilla = () => `
<div class="calendari__setmana row ms-0 me-0">
</div>
`;

const diaPlantilla = ({numDia, any, mes, dia}) => `
    <div class="col calendari__dia" data-id="${any}-${mes}-${dia}">
        <p class="calendari__diaInd">${numDia}</p>
        <ul class="list-unstyled calendari__llistaTasques">
        </ul>
    </div>
`;

const tascaPlantilla = ({nom}) => `
<li class="calendari__tasca rounded mb-1 ps-1 pe-1 text-truncate">${nom}</li>
`;