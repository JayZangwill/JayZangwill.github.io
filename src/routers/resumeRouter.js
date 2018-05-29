import introduct from "../views/resume/introduct";
import skills from "../views/resume/skills";
import experience from "../views/resume/experience";
import work from "../views/resume/work";
export default [
  {
    path: "/",
    redirect: "/introduct"
  },
  {
    path: "/introduct",
    name: "introduct",
    component: introduct
  },
  {
    path: "/work",
    name: "work",
    component: work
  },
  {
    path: "/skills",
    name: "skills",
    component: skills
  },
  {
    path: "/experience",
    name: "experience",
    component: experience
  }
];
