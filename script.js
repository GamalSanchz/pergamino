$(function(){
  // ---- Abrir carta desde el sobre ----
  function openCard(){
    $('.envelope').css({'animation':'fall 0.9s ease 1'});
    $('.valentines-day').fadeOut(600, function(){
      const $card = $('#card');
      $card.attr('aria-hidden','false');
      $card.css({'visibility':'visible', 'opacity': 0});
      $card.animate({'opacity': 1}, { duration: 500 });
    });
  }

  $('.valentines-day').on('click', openCard);
  $('.valentines-day').on('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCard(); }
  });

  // ---- Efecto de quemar + mostrar modal ----
  $('#closeBtn').on('click', function() {
    const $book = $('.book');
    const $card = $('#card');
    const $modal = $('#dedicationModal');

    // Inicia animación de quemado
    $book.addClass('burn-effect');

    // Cuando termina la animación (2.3s) ocultamos la carta y mostramos modal
    setTimeout(() => {
      $card.fadeOut(800, function(){
        $(this).css({'visibility':'hidden','opacity':0});
        $book.removeClass('burn-effect');
        // Mostrar modal de dedicatoria
        $modal.addClass('show').attr('aria-hidden','false');
        $('#dedicText').trigger('focus');
      });
    }, 2300);
  });

  // ---- Modal: contador + copiar + cerrar ----
  const $dedicText = $('#dedicText');
  const $char = $('#charCount');

  function updateCount(){
    $char.text(`${$dedicText.val().length}/600`);
  }
  $dedicText.on('input', updateCount);
  updateCount();

  $('#copyBtn').on('click', function(){
    $dedicText[0].select();
    $dedicText[0].setSelectionRange(0, 99999);
    const ok = document.execCommand('copy');
    if (ok) {
      $(this).text('¡Copiado!').prop('disabled', true);
      setTimeout(()=> { $('#copyBtn').text('Copiar').prop('disabled', false); }, 1200);
    }
  });

  $('#closeModalBtn').on('click', function(){
    $('#dedicationModal').removeClass('show').attr('aria-hidden','true');
    // Vuelve a mostrar el sobre, por si quieres abrir de nuevo
    $('.valentines-day').fadeIn(500);
  });

  // Cerrar modal al click en fondo oscuro
  $('#dedicationModal').on('click', function(e){
    if (e.target.id === 'dedicationModal') {
      $('#closeModalBtn').trigger('click');
    }
  });

  // ESC para cerrar modal
  $(document).on('keydown', function(e){
    const $modal = $('#dedicationModal');
    if (e.key === 'Escape' && $modal.hasClass('show')) {
      $('#closeModalBtn').trigger('click');
    }
  });
});
