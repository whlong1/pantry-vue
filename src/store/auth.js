import { reactive } from 'vue';
import router from '../router';

export const auth = reactive({
  isAuthenticated: false,
  setIsAuthenticated(status) {
    this.isAuthenticated = status
    console.log("Welcome back!")
  },
  login(token){
    localStorage.setItem('token', token);
    this.setIsAuthenticated(true);
    router.push('/dashboard/pantry'); 
  },
  logout() {
    localStorage.removeItem("token");
    this.setIsAuthenticated(false);
    router.push('/'); 
  },
});