# rn-challenge — Guía para ejecutar, testear y depurar

> Proyecto Expo React Native (TypeScript) con **Redux Toolkit**, **React Navigation** y **Testing Library**.  
> Incluye _Tasks_ (Redux) y _Listado_ (fetch remoto) con **unit tests** para pantallas y slice.

---

## 1) Requisitos

- **Node.js** 20 LTS (recomendado)  
- **Git**  
- **Expo CLI** (se instala al clonar)  
- **Android Studio** con **Android SDK** y un **emulador** creado (Pixel + API 34 recomendado)  
- **ADB** en `PATH` (lo provee Android SDK)

> 💡 Antes de abrir el proyecto, abre **Android Studio** → **Device Manager** → Inicia el emulador. 
> En caso de ejecutarlo en el navegador, ignorar la parte anterior.

---

## 2) Clonado e instalación

```bash
git clone <tu-repo> rn-challenge
cd rn-challenge

# Instala dependencias
npm i
```

### Alineación de testing con Expo SDK
Para evitar conflictos de versiones:

```bash
# Asegura la versión esperada de jest-expo para Expo SDK 53
npm i -D jest-expo@~53.0.10

# Librerías de test
npm i -D @testing-library/react-native@13 @testing-library/jest-native whatwg-fetch

# Si aparece conflicto con react-test-renderer, alinea con tu versión de react (19.0.0 hoy):
npm i -D react-test-renderer@19.0.0
```

---


## 3) Estructura clave del proyecto

```
src/
  app/AppNavigator.tsx         # Navegación (Home, Tasks, Listado)
  screens/HomeScreen.tsx
  screens/TasksScreen.tsx
  screens/ListadoScreen.tsx
  components/AddTaskModal.tsx
  features/tasks/tasksSlice.ts
  features/listado/types.ts
  store/store.ts
  store/hooks.ts
App.tsx                        # Provider + Navigator
__tests__/                     # Pruebas unitarias
```

---

## 4) Ejecutar en Android

1. Inicia el emulador desde **Android Studio** (frío / Cold Boot si es necesario).
2. En el proyecto, ejecuta:

```bash
# Limpia cachés de Metro si algo falla
npx expo start -c

# Abre en Android (emulador)
npm run android
```

> Si Expo te sugiere actualizar `jest-expo` (p. ej. `~53.0.10`), ya lo cubrimos en el paso de instalación.

---

## 5) Ejecutar en Web

1.  Solamente tendrías que ejecutar el comando `npm run web` se ejecutará en el navegador. 


## 6) Ejecutar pruebas

```bash
# Pruebas unitarias
npm test

# Ver cobertura
npm run coverage
```

Tests incluidos (ejemplos reales de este repo):

- `ListadoScreen.test.tsx`: muestra **loading**, luego la **lista remota** con mock de `fetch`.
- `TasksScreen.test.tsx`: verifica **modal**, **validación** de texto y **agregado** en Redux.
- `tasksSlice.test.ts`: prueba **reducer** y **action** `addTask`.

---

**Checklist de recuperación:**

```bash
# 1) Reinicia servidor ADB (cierra emuladores primero)
adb kill-server
adb start-server
adb devices         # Debe listar tu emulator como "device" (no "offline")

# 2) Si sigue "offline", desde Android Studio: Device Manager →
#    selecciona el dispositivo → "Cold Boot Now" o "Wipe Data" y recrea el emulador.

# 3) (Opcional) Reversa de puertos para Metro
adb reverse tcp:8081 tcp:8081

# 4) Limpia caché de Metro y reintenta
npx expo start -c
npm run android
```

Si ves `Can't find service: package`, suele indicar:
- Emulador **no terminó de arrancar** (espera hasta que esté totalmente operativo).
- ADB en conflicto (reinicia ADB como arriba y vuelve a abrir el emulador).
- Asegúrate de usar una **imagen de sistema** estable (API 34 x86_64) y de **no** abrir múltiples instancias del mismo dispositivo.

---

## 8) Comportamiento funcional (lo que se validará)

- **Home** con 2 botones: _Tasks_ y _Listado_.  
- **Tasks**:
  - Lista leída de **Redux**.
  - Botón **"Agregar nuevo task"** abre modal.
  - **No** permite guardar vacío.
  - Al guardar, se **despacha** `addTask` y persiste mientras la app corre (puedes navegar fuera y volver).

- **Listado**:
  - Hace `fetch` a **`https://6172cfe5110a740017222e2b.mockapi.io/elements`** al montar.
  - Muestra **loading**, luego la lista (nombre y opcionalmente avatar).


---

## 9) Comandos rápidos

```bash
# Instalar dependencias
npm i && npm i -D jest-expo@~53.0.10 @testing-library/react-native@13 @testing-library/jest-native whatwg-fetch react-test-renderer@19.0.0

# Limpiar y abrir Android
npx expo start -c
npm run android
npm run web

# Tests
npm test
npm run coverage
```
