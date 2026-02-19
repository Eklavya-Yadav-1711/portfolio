# EKLAVYA — Cosmic Portfolio

Next.js 14 portfolio with cosmic dark theme, 3D starfield, and Framer Motion.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add project screenshots

1. Put images in `public/screenshots/` (e.g. `origin-of-saare.png`, `resqora.png`).
2. In `src/components/ui/ProjectCard.tsx`, in the preview area, add:
   ```tsx
   <Image src={`/screenshots/${project.id}.png`} fill className="object-cover blur-sm" alt={project.name} />
   ```
   (Remove `blur-sm` when you want the image sharp.)

## Update links and email

Edit `src/lib/data.ts`:

- `contactLinks.github.href` — your GitHub URL
- `contactLinks.linkedin.href` — your LinkedIn URL  
- `contactLinks.email.handle` and `contactLinks.email.href` — your email

## Build

```bash
npm run build
npm start
```
