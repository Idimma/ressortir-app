// linear-gradient(45deg, rgba(23, 91, 170, 0.8) 8%,
// rgba(207, 16, 49, 0.6));
const colors = {
    primary: 'rgba(23, 91, 170, 1)',
    primaryAlt: 'rgba(207, 16, 49, 1)',
    primaryBg: 'rgba(23, 91, 49, 1)',
    secondary: 'rgba(207, 16, 49, 1)',
    tertiary: 'rgba(23, 91, 170, 0.7)',
    green: '#4FCE82',
    success: '#3EC261',
    white: '#FFFFFF',
    transparent: 'transparent',
    blue: '#0B2E70',
    blueAlt: '#ECF6FF',
    red: 'red',
    danger: 'red',
    orange: '#FF8C00',
    gray5: '#F2f2f2',
    gray10: '#E6E6E6',
    gray25: '#BFBFBF',
    gray50: '#808080',
    gray75: '#404040',
    gray100: '#191919',
};

export default colors;

export const colorProps = Object.keys(colors).map((color) => color);
