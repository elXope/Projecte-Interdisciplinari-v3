$(document).ready(function() {

    // Formulari tasca
    $('#tancarModal').click(function() {
        $('.principalFormTasca').hide();
    });

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
                        $('.calendari__setmana:last-child').append(diaPlantilla({numDia : (nDiesMesAnterior - (dia1Mes - j - 1))}));
                        $('.calendari__dia:last-child').addClass('text-muted');
                    } else {
                        $('.calendari__setmana:last-child').append(diaPlantilla({numDia : contadorDies}));
                        contadorDies++;
                    }
                } else {
                    $('.calendari__setmana:last-child').append(diaPlantilla({numDia : contadorDies}));
                    if(!canviMes && diaMes == contadorDies) {
                        $('.calendari__setmana:last-child').children('.calendari__dia:last-child').children('p').addClass('actual');
                    }
                    contadorDies++;
                    if(canviMes) {
                        $('.calendari__setmana:last-child').children('.calendari__dia:last-child').addClass('text-muted');
                    }        
                }
                $('.calendari__setmana:last-child').children('.calendari__dia:last-child').click(function() {
                    $(this).addClass('pulsado');
                    $('.principalFormTasca').show();
                });
                if(contadorDies > nDiesMes) {
                    contadorDies = 1;
                    canviMes = true;
                }

                // actualitzar amb el .get les tasques del dia
                // $.get(ruta).done(function() {
                //  $('.calendari__setmana:last-child').children('.calendari__dia:last-child').append(tasquesDiaPlantilla({tasques : data}));
                // })
            }
        }
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

const setmanaPlantilla = () => `
<div class="calendari__setmana row ms-0 me-0">
</div>
`;

const diaPlantilla = ({numDia}) => `
    <div class="col calendari__dia">
        <p class="calendari__diaInd">${numDia}</p>
    </div>
`;