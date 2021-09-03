import Colors, { colorProps } from 'themes/colors';
import Fonts, { fontProps } from 'themes/fonts';
import { Text as RNText, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

const styles = StyleSheet.create({
    centered: {
        textAlign: 'center',
    },
    flex: {
        flex: 1,
    },
});

const textStyles = (props) => {
    const {
        centered, fs, fw, primary, warning, danger, pl, p, pt, pr, pb, m, mr, ml, mt, bg, dark, demi, self_center,
        mb, w, align, info, white, opacity, ls, orange, black, bold, medium, light, italic, self_end, self_start,
        lh, h, capitalize, py, px, my, mx, title, red, center, transparent, success, success_inverse, gray
    } = props;
    let styles = {};
    styles.fontWeight = '300';
    styles.fontFamily = 'regular';

    if (p) styles.padding = p;
    if (pl) styles.paddingLeft = pl;
    if (pt) styles.paddingTop = pt;
    if (pr) styles.paddingRight = pr;
    if (pb) styles.paddingBottom = pb;
    if (px) styles.paddingHorizontal = px;
    if (py) styles.paddingVertical = py;
    if (center) styles.textAlign = 'center';

    if (title) {
        styles.fontSize = 24;
        styles.fontWeight = 'bold';
    }
    if(capitalize){
      styles.textTransform = 'capitalize'
    }

    if (m) styles.margin = m;
    if (ml) styles.marginLeft = ml;
    if (mt) styles.marginTop = mt;
    if (mr) styles.marginRight = mr;
    if (mb) styles.marginBottom = mb;
    if (my) styles.marginVertical = my;
    if (mx) styles.marginHorizontal = mx;

    if (align) styles.textAlign = align;
    if (centered) styles.textAlign = 'center';
    if (w) styles.width = w;
    if (h) styles.height = h;
    if (lh) styles.lineHeight = lh;
    if (ls) styles.letterSpacing = ls;

    if (fw) styles.fontWeight = fw;

    if (bold) styles.fontWeight = 'bold';
    if (bold) styles.fontFamily = 'bold';
    // if (heavy) styles.fontFamily = 'Heavy';
    // if (demi) styles.fontFamily = 'Oblique';

    if (medium) styles.fontWeight = '600';
    if (medium) styles.fontFamily = 'regular';

    if (light) styles.fontWeight = '300';
    if (light) styles.fontFamily = 'Light';
    if (light) styles.fontFamily = 'light';


    if (italic) styles.fontStyle = 'italic';
    if (italic) styles.fontFamily = 'italic';

    if (fs) styles.fontSize = fs;
    if (opacity) styles.opacity = opacity;
    if (bg) styles.backgroundColor = bg;


    if (white) styles.color = 'white';
    if (black) styles.color = "black";
    if (transparent) styles.color = Colors.transparent;
    if (success) styles.color = Colors.success;
    if (danger) styles.color = 'red';
    if (gray) styles.color = Colors.gray100;
    if (info) styles.color = Colors.blue;
    if (warning) styles.color = 'yellow';
    if (primary) styles.color = Colors.primary;
    if (orange) styles.color = 'orange';
    if (red) styles.color = Colors.red;
    return styles;

};



const Text = (props) => {
    const {
        style, children, centered, flex, font, weight, color, ...otherProps
    } = props;


    return (
        <RNText
            allowFontScaling={false}
            style={StyleSheet.flatten([
                centered && styles.centered,
                {
                    color: Colors[color],
                    ...Fonts[font](weight),
                },
                style,
                textStyles(props)
            ])}
            {...otherProps}
        >
            {children}
        </RNText>
    );
};

Text.propTypes = {
    children: PropTypes.any,
    style: PropTypes.any,
    centered: PropTypes.bool,
    flex: PropTypes.bool,
    color: PropTypes.oneOf(colorProps),
    font: PropTypes.oneOf(fontProps),
    weight: PropTypes.oneOf(['regular', 'medium', 'light', 'bold', 'italic']),
};

Text.defaultProps = {
    children: null,
    style: null,
    centered: false,
    flex: false,
    color: 'gray100',
    font: 'p2',
    weight: 'regular',
};

export default Text;
