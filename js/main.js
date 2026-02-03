 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	// Disable parallax on mobile to prevent hang/jank on phone mockup and hero
	if (!isMobile.any()) {
		$(window).stellar({
			responsive: true,
			parallaxBackgrounds: true,
			parallaxElements: true,
			horizontalScrolling: false,
			hideDistantElements: false,
			scrollProperty: 'scroll'
		});
	}


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax – disable on mobile to avoid scroll jank
	if (!isMobile.any()) {
		$.Scrollax();
	}

	var carousel = function() {
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

		// Get Drive – “What we are bringing” phone mockup carousel (4 slides, no autoplay – only click/hover)
		$('.getdrive-what-we-bring-carousel').owlCarousel({
			items: 1,
			loop: true,
			autoplay: false,
			nav: false,
			dots: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn'
		});
		$('.getdrive-what-we-bring-carousel').on('initialized.owl.carousel', function() {
			$('#what-we-bring-steps').find('.getdrive-step-item').removeClass('active').filter('[data-slide="0"]').addClass('active');
		});
		function setActiveStepAndSlide($step) {
			var index = $step.data('slide');
			$('#what-we-bring-steps').find('.getdrive-step-item').removeClass('active');
			$step.addClass('active');
			$('.getdrive-what-we-bring-carousel').trigger('to.owl.carousel', index);
		}
		$('#what-we-bring-steps').on('click', '.getdrive-step-item', function(e) {
			e.preventDefault();
			setActiveStepAndSlide($(this));
		});
		$('#what-we-bring-steps').on('mouseenter', '.getdrive-step-item', function() {
			setActiveStepAndSlide($(this));
		});

	};
	carousel();

	// Car Rentals – brand → model cascading
	var rentalModelsByBrand = {
		toyota: [{ v: 'camry', t: 'Camry' }, { v: 'corolla', t: 'Corolla' }, { v: 'rav4', t: 'RAV4' }, { v: 'highlander', t: 'Highlander' }],
		honda: [{ v: 'accord', t: 'Accord' }, { v: 'civic', t: 'Civic' }, { v: 'cr-v', t: 'CR-V' }],
		hyundai: [{ v: 'elantra', t: 'Elantra' }, { v: 'sonata', t: 'Sonata' }, { v: 'tucson', t: 'Tucson' }, { v: 'santa-fe', t: 'Santa Fe' }],
		nissan: [{ v: 'altima', t: 'Altima' }, { v: 'sentra', t: 'Sentra' }, { v: 'x-trail', t: 'X-Trail' }],
		ford: [{ v: 'fusion', t: 'Fusion' }, { v: 'focus', t: 'Focus' }, { v: 'explorer', t: 'Explorer' }],
		chevrolet: [{ v: 'cruze', t: 'Cruze' }, { v: 'malibu', t: 'Malibu' }],
		mercedes: [{ v: 'c-class', t: 'C-Class' }, { v: 'e-class', t: 'E-Class' }],
		bmw: [{ v: '3-series', t: '3 Series' }, { v: '5-series', t: '5 Series' }],
		kia: [{ v: 'optima', t: 'Optima' }, { v: 'rio', t: 'Rio' }, { v: 'sorento', t: 'Sorento' }],
		mazda: [{ v: 'mazda3', t: 'Mazda 3' }, { v: 'mazda6', t: 'Mazda 6' }],
		volkswagen: [{ v: 'golf', t: 'Golf' }, { v: 'passat', t: 'Passat' }],
		audi: [{ v: 'a4', t: 'A4' }, { v: 'a6', t: 'A6' }],
		lexus: [{ v: 'es', t: 'ES' }, { v: 'rx', t: 'RX' }, { v: 'nx', t: 'NX' }],
		peugeot: [{ v: '206', t: '206' }, { v: '307', t: '307' }, { v: '308', t: '308' }],
		renault: [{ v: 'clio', t: 'Clio' }, { v: 'megane', t: 'Mégane' }],
		jeep: [{ v: 'cherokee', t: 'Cherokee' }, { v: 'compass', t: 'Compass' }, { v: 'wrangler', t: 'Wrangler' }],
		'land-rover': [{ v: 'discovery', t: 'Discovery' }, { v: 'evoque', t: 'Range Rover Evoque' }, { v: 'defender', t: 'Defender' }],
		volvo: [{ v: 's60', t: 'S60' }, { v: 'xc60', t: 'XC60' }, { v: 'xc90', t: 'XC90' }],
		porsche: [{ v: 'cayenne', t: 'Cayenne' }, { v: 'panamera', t: 'Panamera' }, { v: 'macan', t: 'Macan' }]
	};
	$('#rental-brand').on('change', function() {
		var brand = $(this).val();
		var $model = $('#rental-model');
		$model.empty();
		if (!brand) {
			$model.append('<option value="">Select brand first</option>').prop('disabled', true);
			return;
		}
		var models = rentalModelsByBrand[brand];
		if (models && models.length) {
			$model.append('<option value="">Select model</option>');
			$.each(models, function(i, m) { $model.append('<option value="' + m.v + '">' + m.t + '</option>'); });
			$model.prop('disabled', false);
		} else {
			$model.append('<option value="">No models</option>').prop('disabled', true);
		}
	});

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


	$('#book_pick_date,#book_off_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});
	$('#time_pick').timepicker();



})(jQuery);

