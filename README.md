# 🖼️ Masonry Pexels Gallery

Template project to display a list of images from Pexels (with Pexels API).

![Preview of the app](public/screenshot.jpg)

## 🛠️ Installation

### 1️⃣ Prerequisites

- [Node.js](https://nodejs.org/) (used with version `22.14.0`)
- [npm](https://www.npmjs.com/) (used with version `10.9.2`)

_Volta is configured and version pinned in the package.json_

### 2️⃣ Install dependencies

Clone the repo and install dependencies by running the following command:

```sh
git clone https://github.com/Adzouz/MasonryPexelsGallery.git photos-gallery
cd photos-gallery
npm install
```

---

## ⚙️ Configuration

You need to setup a .env and provide your Pexels API key in order to run the project on your side.

```env
VITE_PEXELS_API_KEY=very-super-secret-key
```

_You can choose the number of elements you want to display per request in **src/context/PhotoContext/PhotoContext.tsx (line 7)**._

_You can also customize a few other elements in **src/components/GridList/index.tsx (top of the file)**, like:_

- _The gap between the elements in the grid (in pixels) - gapImages_
- _The number of columns (based on minimal breakpoints) - nbColumnsByBreakpoint_
- _The grid max width (in pixels) - containerMaxWidth_

---

## 🏃‍➡️ Run project

To run the project locally (in dev mode) you can run the following command:

```sh
npm run dev
```

---

## 📝 Additional scripts

```sh
npm run lint
```

---

## 📦 Stack

- ⚛️ **React** (with Vite)
- 🔗 **React Router DOM**
- 🎨 **Sass + Styled Components**
- 📡 **Pexels**
- 🛠️ **ESLint + Prettier**

_This project is using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to check commits messages format._

---

## 🚀 Deployment

To prepare the app for production, run the following command:

```sh
npm run build
```

---

## 👨‍💻 Contribute

1. **Fork** the repo
2. **Create a new fix or feature branch** : `git checkout -b {feat|fix}/update-name`
3. **Commit** : `git commit -m "{feat|fix}: changes description"`
4. **Push** : `git push origin {feat|fix}/update-name`
5. **Open a Pull Request**
