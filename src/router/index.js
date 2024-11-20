import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import Main from '../components/Main.vue';
import CalendarContainer from '../components/CalendarContainer.vue';
import Success from '../components/Success.vue';

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
    path:'/success',
    name: 'Success',
    component: Success,
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
