import {
    BG_GRAY,
    BLACK,
    BLUE,
    DANGER,
    DARK_SUCCESS,
    DEFAULT_DARK_TEXT,
    DEFAULT_TEXT,
    ORANGE,
    PRIMARY,
    RED,
    SUCCESS,
    SUCCESS_INVERSE,
    TRANSPARENT,
    WARNING,
    WHITE,
    YELLOW_TEXT
} from "./Colors";

export const viewStyles = (props) => {
    let bg = TRANSPARENT;
    let styles = {};
    const {
        success, color, justify, justified, central, primary, warning, py, px, my, mx, flex,
        danger, pl, p, pt, pr, pb, m, mr, ml, mt, mb, w, align, transparent, orange,
        info, white, opacity, gray, h, row, spaced, outline, aligned, self_center, absolute,
        self_end, self_start, b, bt, bc, bb, bl, br, bw, radius, success_inverse, shadow,
        dark_success, radiusTR, radiusTL, radiusBL, radiusBR, tint, lightShadow, minW, minH,
        btw, bbw, blw, brw, hr, maxW, card, r, header
    } = props;

    if (flex) styles.flex = 1;
    if (row) styles.flexDirection = 'row';
    if (spaced) styles.justifyContent = 'space-between';
    if (central) styles.justifyContent = 'center';
    if (justified) styles.justifyContent = 'center';
    if (central) styles.alignItems = 'center';
    if (aligned) styles.alignItems = 'center';
    if (self_end) styles.alignSelf = 'flex_end';
    if (self_center) styles.alignSelf = 'center';
    if (self_start) styles.alignSelf = 'flex_start';
    if (absolute) styles.position = 'absolute';


    if (white) bg = WHITE;
    if (transparent) bg = TRANSPARENT;
    if (success) bg = SUCCESS;
    if (orange) bg = ORANGE;
    if (dark_success) bg = DARK_SUCCESS;
    if (success_inverse) bg = SUCCESS_INVERSE;
    if (danger) bg = DANGER;
    if (gray) bg = BG_GRAY;
    if (info) bg = BLUE;
    if (warning) bg = WARNING;
    if (primary) bg = PRIMARY;
    if (color) bg = color;

    styles.backgroundColor = bg;

    if (lightShadow) {
        styles.shadowColor = "#000";
        styles.shadowOffset = {width: 0, height: 2,};
        styles.shadowOpacity = 0.4;
        // styles.elevation = 5;
    }
    if (shadow) {
        styles.borderColor = '#CECECE';
        styles.borderWidth = 0.8;
        styles.shadowColor = "rgba(0,0,0,0.21)";
        styles.shadowOffset = {
            width: 0,
            height: 1,
        };
        styles.shadowOpacity = 0.3;
        styles.shadowRadius = 2.22;
        // styles.elevation = 3;
    }


    if (outline) {
        styles.borderColor = bg;
        styles.backgroundColor = TRANSPARENT;
        styles.borderWidth = 0.9
    } else {
        styles.backgroundColor = bg;
    }

    if (tint) styles.tintColor = tint;

    if (card) {
        styles = {
            ...styles,
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: "#ffffff",
            borderRadius: 6,
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4
        }
    }

    if (header) {
        styles = {
            ...styles,
            shadowColor: "rgba(0, 0, 0, 0.5)",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4
        }
    }

    if (px) styles.paddingHorizontal = px;
    if (py) styles.paddingVertical = py;
    if (mx) styles.marginHorizontal = mx;
    if (my) styles.marginVertical = my;

    if (b) styles.border = b;
    if (bt) styles.borderTop = bt;
    if (bc) styles.borderColor = bc;
    if (bb) styles.borderBottom = bb;
    if (bl) styles.borderLeft = bl;
    if (br) styles.borderRight = br;

    if (radius) styles.borderRadius = radius;
    if (r) styles.borderRadius = r;
    if (radiusTL) styles.borderTopLeftRadius = radiusTL;
    if (radiusTR) styles.borderTopRightRadius = radiusTR;
    if (radiusBR) styles.borderBottomRightRadius = radiusBR;
    if (radiusBR) styles.borderBottomEndRadius = radiusBR;
    if (radiusBL) styles.borderBottomLeftRadius = radiusBL;

    if (p) styles.padding = p;
    if (pl) styles.paddingLeft = pl;
    if (pt) styles.paddingTop = pt;
    if (pr) styles.paddingRight = pr;
    if (pb) styles.paddingBottom = pb;

    if (m) styles.margin = m;
    if (ml) styles.marginLeft = ml;
    if (mt) styles.marginTop = mt;
    if (mr) styles.marginRight = mr;
    if (mb) styles.marginBottom = mb;

    if (maxW) styles.maxWidth = maxW;

    if (align) styles.alignItems = align ? align : 'flex-start';
    if (justify) styles.justifyContent = justify || 'flex-start';
    if (w) styles.width = w;
    if (minW) styles.minWidth = minW;
    if (minH) styles.minHeight = minH;
    if (h) styles.height = h;
    if (opacity) styles.opacity = opacity;
    if (bw) styles.borderWidth = bw;
    if (btw) styles.borderTopWidth = btw;
    if (bbw) styles.borderBottomWidth = bbw;
    if (blw) styles.borderLeftWidth = blw;
    if (brw) styles.borderRightWidth = brw;

    if (hr) {
        styles.borderBottomColor = "#BDBDBD";
        styles.borderBottomWidth = 1;
    }


    return styles

};


export const textStyles = (props) => {
    let cl = DEFAULT_TEXT;
    const {
        absolute, color, fs, fw, primary, warning, danger, pl, p, pt, pr, pb, m, mr, ml, mt, bg, dark, demi, self_center,
        mb, w, align, info, white, opacity, ls, orange, black, bold, medium, light, italic, self_end, self_start,
        lh, h, heavy, py, px, my, mx, title, red, center, transparent, success, success_inverse, gray
    } = props;
    let styles = {};
    styles.fontWeight = '500';
    // styles.fontFamily = 'Medium';

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

    if (m) styles.margin = m;
    if (ml) styles.marginLeft = ml;
    if (mt) styles.marginTop = mt;
    if (mr) styles.marginRight = mr;
    if (mb) styles.marginBottom = mb;
    if (my) styles.marginVertical = my;
    if (mx) styles.marginHorizontal = mx;

    if (align) styles.textAlign = align;
    if (w) styles.width = w;
    if (h) styles.height = h;
    if (lh) styles.lineHeight = lh;
    if (ls) styles.letterSpacing = ls;

    if (fw) styles.fontWeight = fw;

    if (absolute) styles.position = 'absolute';
    // if (bold) styles.fontWeight = 'bold';
    // if (bold) styles.fontFamily = 'Bold';
    // if (heavy) styles.fontFamily = 'Heavy';
    // if (demi) styles.fontFamily = 'Oblique';

    if (medium) styles.fontWeight = '600';
    // if (medium) styles.fontFamily = 'Medium';

    if (light) styles.fontWeight = '300';
    // if (light) styles.fontFamily = 'Light';
    //
    // if (italic) styles.fontFamily = 'Italic';
    // if (italic) styles.fontFamily = 'Oblique';

    if (fs) styles.fontSize = fs;
    if (opacity) styles.opacity = opacity;
    if (bg) styles.backgroundColor = bg;


    if (white) cl = WHITE;
    if (black) cl = BLACK;
    if (dark) cl = DEFAULT_DARK_TEXT;
    if (transparent) cl = TRANSPARENT;
    if (success) cl = SUCCESS;
    if (success_inverse) cl = SUCCESS_INVERSE;
    if (danger) cl = DANGER;
    if (gray) cl = BG_GRAY;
    if (info) cl = BLUE;
    if (warning) cl = YELLOW_TEXT;
    if (primary) cl = PRIMARY;
    if (orange) cl = ORANGE;
    if (red) cl = RED;
    if (color) cl = color;
    styles.color = cl;




    return styles;

};
