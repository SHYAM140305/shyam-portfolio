<div align="center">

# ✨ Shyam J - Portfolio Website

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.5-purple?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

> A stunning, modern portfolio website showcasing AI/ML engineering expertise and full-stack development skills. Built with cutting-edge technologies and designed for performance.

[🚀 Live Demo](https://shyamj.vercel.app) • [📖 Documentation](#-features) • [💻 Tech Stack](#️-tech-stack) • [📦 Installation](#-installation)

---

</div>

## 🌟 Overview

This portfolio website represents a **modern, high-performance** showcase of skills and projects in AI/ML engineering and full-stack development. Featuring smooth animations, responsive design, and optimal performance, it's built to make a lasting impression.

<div align="center">

![Portfolio Preview](https://via.placeholder.com/800x400/0a0a0a/ffffff?text=Portfolio+Website+Preview)

*Built with ❤️ using Next.js 15 and TypeScript*

</div>

---

## ✨ Features

### 🎨 **Design & UX**
- **Glassmorphism Effects** - Modern frosted glass UI elements with backdrop blur
- **Gradient Backgrounds** - Beautiful gradient animations that adapt to theme
- **Dark Mode** - Smooth theme toggle with system preference detection
- **Responsive Design** - Flawless experience across all devices (mobile, tablet, desktop)
- **Accessibility** - WCAG compliant with proper semantic HTML and ARIA labels

### 🚀 **Performance**
- **Next.js 15 App Router** - Latest Next.js features for optimal performance
- **Image Optimization** - Automatic image optimization with Next.js Image component
- **Code Splitting** - Automatic code splitting for faster page loads
- **SEO Optimized** - Comprehensive meta tags and structured data with next-seo
- **Type Safety** - Full TypeScript coverage for robust, maintainable code

### 🎭 **Animations**
- **Framer Motion** - Buttery smooth animations and page transitions
- **Scroll Animations** - Elements animate into view on scroll
- **Interactive Components** - Hover effects and micro-interactions throughout
- **Loading States** - Smooth loading indicators and skeleton screens

### 📧 **Contact Integration**
- **Contact Form** - Functional contact form with validation (FormSubmit integration)
- **Form Validation** - Real-time validation using React Hook Form + Zod
- **Error Handling** - Graceful error handling with user-friendly messages

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology |
|---------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.6 |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | Framer Motion 11.5 |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod |
| **Theme** | next-themes |
| **SEO** | next-seo |
| **Deployment** | Vercel |

</div>

---

## 📦 Installation

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/SHYAM140305/shyam-portfolio.git
   cd shyam-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```
shyam-portfolio/
├── 📁 app/                    # Next.js App Router directory
│   ├── layout.tsx            # Root layout with theme provider & SEO
│   ├── page.tsx              # Main page with all sections
│   └── globals.css           # Global styles & Tailwind imports
│
├── 📁 components/            # React components
│   ├── Navbar.tsx           # Navigation bar with theme toggle
│   ├── Footer.tsx           # Footer component with social links
│   ├── ThemeToggle.tsx      # Dark/light theme switcher
│   ├── SectionTitle.tsx     # Reusable animated section titles
│   ├── ProjectCard.tsx      # Project showcase cards
│   ├── SkillCard.tsx        # Skill display cards
│   ├── Timeline.tsx         # Experience & education timeline
│   └── ContactForm.tsx      # Contact form with validation
│
├── 📁 data/                  # Data files (easy to customize!)
│   ├── projects.ts          # Project data & descriptions
│   ├── skills.ts            # Skills & technologies
│   ├── experience.ts        # Work experience
│   ├── education.ts         # Educational background
│   └── leadership.ts        # Leadership roles & achievements
│
├── 📁 lib/                   # Utility functions
│   └── utils.ts             # Helper functions (cn, etc.)
│
├── 📁 public/                # Static assets
│   ├── resume.pdf           # Resume PDF file
│   └── favicon files        # Site icons & manifest
│
├── 📄 next.config.ts         # Next.js configuration
├── 📄 tailwind.config.ts     # Tailwind CSS configuration
├── 📄 tsconfig.json          # TypeScript configuration
└── 📄 package.json           # Dependencies & scripts
```

---

## 🎨 Customization

### 📝 Update Personal Information

All your personal information is stored in the `data/` directory. Simply edit these files:

- **`data/projects.ts`** - Add/remove/edit your projects
- **`data/skills.ts`** - Update your skills and technologies
- **`data/experience.ts`** - Add your work experience
- **`data/education.ts`** - Update your educational background
- **`data/leadership.ts`** - Add leadership roles and achievements

### 🎨 Customize Colors & Theme

1. **Tailwind Colors**: Edit `tailwind.config.ts` to change the color palette
2. **Global Styles**: Modify `app/globals.css` for custom styles
3. **Theme**: Adjust dark/light mode colors in the CSS variables

### 📄 Add Your Resume

1. Replace `public/resume.pdf` with your resume
2. Update the resume link in the Navbar component if needed

### 📧 Contact Form Configuration

The contact form uses [FormSubmit](https://formsubmit.co/). To use your own email:

1. Update the email in `components/ContactForm.tsx` (line 36)
2. Or set up your own email service and update the endpoint

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[Vercel](https://vercel.com) is the easiest way to deploy a Next.js application:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Deploy!**
   - Click "Deploy"
   - Your site will be live in minutes! 🎉

### Other Deployment Options

- **Netlify**: Connect your GitHub repo and deploy
- **AWS Amplify**: Import repository and deploy
- **Docker**: Build a Docker image and deploy anywhere

---

## 🧪 Scripts

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 📊 Performance

This portfolio is optimized for performance:

- ⚡ **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- 🎯 **Core Web Vitals**: All green
- 📦 **Bundle Size**: Optimized with code splitting
- 🖼️ **Images**: Optimized with Next.js Image component

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For hosting and deployment
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Lucide** - For beautiful icons

---

## 📞 Connect

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-Website-000000?style=for-the-badge&logo=vercel)](https://shyamj.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github)](https://github.com/SHYAM140305)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail)](mailto:jshyam2005@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/shyam-jayakanthan-050a85284)

</div>

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

Made with ❤️ by [Shyam J](https://github.com/SHYAM140305)

---

![Visitor Count](https://komarev.com/ghpvc/?username=SHYAM140305&color=blueviolet&style=for-the-badge)

</div>
