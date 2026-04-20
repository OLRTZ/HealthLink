import { createControlStyles } from './controlStyles';
import { createLayoutStyles } from './layoutStyles';
import { createTheme } from './theme';

export function makeStyles(largeText, highContrast) {
  const theme = createTheme(largeText, highContrast);

  return {
    ...createLayoutStyles(theme),
    ...createControlStyles(theme),
  };
}
