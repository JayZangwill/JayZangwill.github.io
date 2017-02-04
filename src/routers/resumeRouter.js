import introduct from '../asssets/views/resume/introduct';
import skills from '../asssets/views/resume/skills';
import experience from '../asssets/views/resume/experience';
export default [{
	path: '/',
	redirect: '/introduct'
}, {
	path: "/introduct",
	name: "introduct",
	component: introduct
}, {
	path: "/skills",
	name: "skills",
	component: skills
}, {
	path: "/experience",
	name: "experience",
	component: experience
}];