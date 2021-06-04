const colors = {
    primary: '#3EC261',
    primaryAlt: '#287c3d',
    primaryBg: '#3EC261',
    secondary: '#287c3d',
    tertiary: '#00848E',
    green: '#4FCE82',
    success: '#3EC261',
    white: '#FFFFFF',
    transparant: 'transparent',
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
