# MathLab KZ — мектеп математикасы ғылыми жобасы

Next.js + TypeScript + Tailwind CSS + Firebase негізіндегі интерактивті математика оқу платформасы.

## Беттер

- `/` — басты бет: жоба таныстырылымы, математикалық визуал және бөлімдерге жылдам өту.
- `/theory` — тақырыптар кабинеті: алгебра, геометрия, функциялар, ықтималдық және формулалар.
- `/practice` — интерактивті тест: сұрақтарға жауап беріп, нәтижені көру және авторизацияланған қолданушы үшін прогресті сақтау.
- `/calculator` — математикалық зертхана: негізгі есептеу, пайыз, Пифагор теоремасы, квадрат теңдеу және орташа мән.
- `/profile` — профиль: аккаунт деректері, тест нәтижелері және жетістіктер.

Қосымша `/login` және `/register` беттері бар. Header авторизация күйіне қарай «Кіру / Тіркелу» батырмаларын немесе «Профиль» мәзірін көрсетеді.

## Іске қосу

1. Node.js 20+ орнатыңыз.
2. Репозиторий ішінен тәуелділіктерді орнатыңыз:

```bash
npm install
```

3. `.env.example` файлын `.env.local` деп көшіріңіз.
4. Firebase Console-да Web App жасаңыз да, конфигурация мәндерін `.env.local` ішіне енгізіңіз.
5. Firebase Authentication ішінен **Email/Password** және **Google** provider-лерін қосыңыз.
6. Firestore Database жасаңыз. Қолданушы прогресі `users/{uid}` құжатында сақталады.
7. Жобаны іске қосыңыз:

```bash
npm run dev
```

8. Браузерден `http://localhost:3000` ашыңыз.

## Firestore Security Rules

Пайдаланушы тек өз прогресін оқу/жазу үшін төмендегідей rule қолдануға болады:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Google Sign-In

Firebase Authentication → Sign-in method → Google → Enable. Web app домені Firebase Authentication → Settings → Authorized domains бөлімінде болуы керек.

## Қолданылған технологиялар

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Firebase Authentication + Firestore
- Lucide React icons

## Ескерту

ZIP ішінде нақты Firebase құпия деректері жоқ. Сайттың авторизациясы нақты Firebase жобасына `.env.local` арқылы қосылады.
