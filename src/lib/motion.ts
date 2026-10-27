// Shared animation curves, so every reveal and transition moves the same way.
export const ease = [0.22, 1, 0.36, 1] as const; // soft ease-out: reveals, fades, slides
export const easeInOut = [0.76, 0, 0.24, 1] as const; // full-screen wipes (mobile menu)
