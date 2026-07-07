# Explain : https://excalidraw.com/

```
src/
│
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── login/
│   │       │   └── route.ts
│   │       └── signup/
│   │           └── route.ts
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── signup/
│   │   └── page.tsx
│   │
│   ├── profile/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── Navbar.tsx
│   ├── LoginForm.tsx
│   └── SignupForm.tsx
│
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── jwt.ts
│
├── models/
│   └── User.ts
│
├── utils/
│   ├── generateToken.ts
│   └── hashPassword.ts
│
├── types/
│   └── user.ts
│
└── middleware.ts
```

