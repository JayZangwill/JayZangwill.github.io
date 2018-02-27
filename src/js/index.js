window.onload = function () {
    new Swiper('.swiper-container', {
        spaceBetween: 30
    });
	let email = jay.$('#email'),
	tip = jay.$('#tip'),
	body = jay.$('body')
	setTimeout(()=>{
		tip.style.opacity = 0;
		body.style.paddingTop = 0;
	},10000)
	email.addEventListener('click', function(e) {
		e.preventDefault();
	})
}
