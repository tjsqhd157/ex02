import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SiginIn.vue';
import SignUp from '../components/SiginUp.vue';
import Main from '../components/Main.vue';
import CalendarContainer from '../components/CalendarContainer.vue';

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: CalendarContainer,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
