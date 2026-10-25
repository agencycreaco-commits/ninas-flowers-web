import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

const base = ({ size = 20, ...p }: P) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...p,
})

export const IconWhatsApp = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3a9 9 0 0 0-7.8 13.4L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
    <path d="M9.1 7.9c-.4 0-.9.4-1 1-.3 1.6.6 3.6 2.2 5.1 1.5 1.4 3.4 2.2 4.8 1.9.6-.1 1-.6 1-1l.1-.9-2-1-1 1c-1.3-.6-2.4-1.6-3-2.9l1-1-1-2h-1.1Z" />
  </svg>
)
export const IconInstagram = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
  </svg>
)
export const IconTikTok = (p: P) => (
  <svg {...base(p)} stroke="none" fill="currentColor">
    <path d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.2a6.2 6.2 0 1 0 5.3 6.2V8.6a7.5 7.5 0 0 0 4.4 1.4V6.7a4.4 4.4 0 0 1-4.4-4.4Z" />
  </svg>
)
export const IconSearch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </svg>
)
export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)
export const IconMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)
export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
export const IconArrow = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const IconChevronLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="m15 6-6 6 6 6" />
  </svg>
)
export const IconChevronRight = (p: P) => (
  <svg {...base(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

/** Monograma «Nf» del manual de identidad. Toma el color del texto (currentColor). */
export const Monograma = ({ size = 48, title }: { size?: number; title?: string }) => (
  <svg
    width={size}
    height={Math.round((size * 483) / 645)}
    viewBox="0 0 645 483"
    role={title ? 'img' : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M 229 1 C 209 3 183 14 139 38 C 97 61 85 64 92 49 C 96 41 96 40 89 43 C 58 58 8 118 1 149 C -4 175 12 178 48 156 C 108 120 115 116 138 104 C 186 79 206 74 211 89 C 215 101 198 147 165 213 C 148 246 147 249 104 322 C 78 366 74 376 81 391 C 89 407 107 411 122 399 C 130 393 131 392 192 305 C 230 252 251 223 281 187 C 309 154 317 145 342 125 C 367 104 378 100 380 111 C 383 122 374 140 338 197 C 265 311 240 382 258 419 C 279 463 336 439 417 351 C 421 348 423 345 423 345 C 424 345 423 349 423 354 C 416 432 510 453 562 385 C 575 368 575 366 566 372 C 533 392 489 395 466 380 C 420 348 470 261 524 278 C 534 281 533 281 519 282 C 501 282 485 286 488 290 C 497 300 530 303 547 295 C 559 290 560 287 555 280 C 542 261 517 258 481 272 C 475 274 494 258 511 247 C 548 222 556 193 537 156 C 527 136 501 102 501 109 C 501 112 494 125 486 137 C 466 169 461 185 464 207 C 467 221 474 239 477 239 C 484 239 511 190 511 176 C 511 175 511 175 512 175 C 513 177 512 195 510 203 C 505 224 498 235 473 261 C 456 279 449 288 440 305 C 438 311 435 315 434 315 C 431 315 425 319 415 327 C 383 354 363 365 347 365 C 305 366 325 307 408 180 C 463 96 473 68 458 38 C 437 -3 388 23 301 121 C 291 133 277 149 269 157 C 248 181 229 204 187 257 C 165 285 147 307 146 307 C 145 305 162 273 182 238 C 185 233 196 213 207 194 C 219 174 231 151 235 144 C 239 136 244 125 247 121 C 253 110 264 84 269 71 C 285 31 275 5 241 1 C 239 1 234 1 229 1 M 527 98 C 527 99 530 103 533 107 C 547 125 561 150 568 167 C 571 177 572 177 572 169 C 572 147 559 121 541 107 C 534 101 525 96 527 98 M 66 360 C 47 372 51 399 72 409 C 81 413 83 412 77 406 C 64 394 61 380 69 364 C 72 357 72 356 66 360 M 590 394 C 586 397 583 404 584 409 C 586 427 613 424 613 406 C 613 395 600 388 590 394"
    />
  </svg>
)
