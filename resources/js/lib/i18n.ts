// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { /* English translations */ } },
    np: { translation: { /* Nepali translations */ } },
  },
  lng: localStorage.getItem('language') || 'en',
});