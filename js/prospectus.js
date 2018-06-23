(function() {
	$(function() {
		$(".pages .img_wrapper").click(function(e) {
			if($(this).parents(".page").hasClass("current")) {
				/* flip */
				if ($(this).hasClass("show_obverse")) {
					$(this).removeClass("show_obverse");
					$(this).addClass("show_reverse");
				}
				else {
					$(this).removeClass("show_reverse");
					$(this).addClass("show_obverse");
				}
			}
			else {
				/* make current */
				$(this).parents(".pages").children(".page").removeClass("current");
				$(this).parents(".page").addClass("current");
				$(this).parents(".wrapper").animate({
					scrollLeft: $(this).parents(".wrapper").scrollLeft() + $(this).offset().left + 300 - ($(window).width() / 2)
				}, 1000);
			}
		});
	});
})();
