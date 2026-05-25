/** @type {import('tailwindcss').Config} */

const BASE_COLORS = {
  'team-primary': '#1814BA',
  'team-secondary': '#269E87',
  'team-tertiary': '#104239',
  'team-accent': '#F59E0B',
  'team-dark': '#050D24',
  'team-light': '#F6F6F6',
};

const SHADE_STOPS = {
  50: { mix: 0.94, target: 'white' },
  100: { mix: 0.88, target: 'white' },
  200: { mix: 0.72, target: 'white' },
  300: { mix: 0.56, target: 'white' },
  400: { mix: 0.38, target: 'white' },
  500: { mix: 0, target: 'base' },
  600: { mix: 0.18, target: 'black' },
  700: { mix: 0.32, target: 'black' },
  800: { mix: 0.48, target: 'black' },
  900: { mix: 0.64, target: 'black' },
  950: { mix: 0.78, target: 'black' },
};

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(r, g, b) {
  const channel = (value) =>
    Math.round(Math.max(0, Math.min(255, value)))
      .toString(16)
      .padStart(2, '0');

  return `#${channel(r)}${channel(g)}${channel(b)}`;
}

function mixChannels(base, target, amount) {
  return {
    r: base.r + (target.r - base.r) * amount,
    g: base.g + (target.g - base.g) * amount,
    b: base.b + (target.b - base.b) * amount,
  };
}

function generatePalette(hex) {
  const base = hexToRgb(hex);
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };

  return Object.fromEntries(
    Object.entries(SHADE_STOPS).map(([shade, { mix, target }]) => {
      if (shade === '500') {
        return [shade, hex];
      }

      const mixed = mixChannels(
        base,
        target === 'white' ? white : black,
        mix,
      );

      return [shade, rgbToHex(mixed.r, mixed.g, mixed.b)];
    }),
  );
}

function withDefault(palette, hex) {
  return { ...palette, DEFAULT: hex };
}

const teamColors = {
  ...Object.fromEntries(
    Object.entries(BASE_COLORS).map(([name, hex]) => [
      name,
      withDefault(generatePalette(hex), hex),
    ]),
  ),
  'team-brand-accent': 'var(--accent-color, #1814BA)',
};

export default {
  theme: {
    extend: {
      colors: teamColors,
    },
  },
};
