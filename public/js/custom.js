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
        // 1) Mes actual
        const data = new Date();
        const diaSetmana = data.getDay() -1;
        const mes = data.getMonth();
        const diaMes = data.getDate();
        const nDiesMes = new Date(data.getFullYear(), mes + 1, 0).getDate();
        alert(diaSetmana + ", " + mes + ", " + diaMes + ", " + nDiesMes);
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

const setmanaPlantilla = ({}) => `
<div class="calendari__setmana row ms-0 me-0"></div>
`;