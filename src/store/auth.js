import { reactive } from 'vue';
import router from '../router';

export const auth = reactive({
  isAuthenticated: false,
  setIsAuthenticated(status) {
    this.isAuthenticated = status
    console.log("Auth Status:", this.isAuthenticated)
  },
  login(token){
    localStorage.setItem('token', token);
    this.setIsAuthenticated(true);
    router.push('/dashboard'); 
  },
  logout() {
    localStorage.removeItem("token");
    this.setIsAuthenticated(false);
    router.push('/'); 
  },
});