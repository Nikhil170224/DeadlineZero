/// <reference types="vite/client" />

declare module 'firebase/ai' {
  export function getAI(app: any): any;
  export function getGenerativeModel(ai: any, options: { model: string }): any;
}
