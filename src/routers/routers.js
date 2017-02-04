import homeText from '../asssets/views/home/homeText';
import say from '../asssets/views/home/say';
import about from '../asssets/views/home/about';
import css1 from '../asssets/views/home/css';
import css2 from '../asssets/views/home/css2';
export default [{
	path: '/',
	redirect: '/home'
}, {
	path: "/home",
	name: "home",
	component: homeText
}, {
	path: "/say",
	name: "say",
	component: say
}, {
	path: "/about",
	name: "about",
	component: about
}, {
	path: "/css1",
	name: "css1",
	component: css1
}, {
	path: "/css2",
	name: "css2",
	component: css2
}];