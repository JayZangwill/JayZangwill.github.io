import homeText from "../views/home/homeText";
import say from "../views/home/say";
import about from "../views/home/about";
import css1 from "../views/home/css";
import css2 from "../views/home/css2";
export default [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: homeText
  },
  {
    path: "/say",
    name: "say",
    component: say
  },
  {
    path: "/about",
    name: "about",
    component: about
  },
  {
    path: "/css1",
    name: "css1",
    component: css1
  },
  {
    path: "/css2",
    name: "css2",
    component: css2
  }
];
