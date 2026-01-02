import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 900,
  easing: 'ease-out-cubic',
  once: true
});


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
