import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getHeaderHeight, getNavBarHeight, getStatusBarHeight } from 'utils/size';

import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';
import Text from '../Text';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
        height: getHeaderHeight(),
    },
    statusBar: {
        height: getStatusBarHeight(),
        backgroundColor: Colors.white,
    },
    bar: {
        height: getNavBarHeight(),
        justifyContent: 'space-between',
        position: 'absolute',
        top: getStatusBarHeight(),
        left: 0,
        right: 0,
        paddingHorizontal: scale(14),
    },
    navBar: {
        backgroundColor: Colors.white,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        width: scale(40),
    },
    title: {
        marginRight: scale(30),
    },
});

const PlainBar = ({ children }) => (
    <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.statusBar} />
        <View style={[styles.navBar, styles.bar, styles.row]}>
            {children}
        </View>
    </>
);

const GradientBar = ({ children }) => (
    <>
        <StatusBar barStyle="light-content" />
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[Colors.tertiary, Colors.primaryAlt, Colors.primary]}
            style={styles.container}
        >
            <View style={[styles.bar, styles.row]}>
                {children}
            </View>
        </LinearGradient>
    </>
);

const GhostBar = ({ children }) => (
    <>
        <StatusBar barStyle="light-content" />
        <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'transparent']}
            style={styles.container}
        >
            <View style={[styles.bar, styles.row]}>
                {children}
            </View>
        </LinearGradient>
    </>
);

const NavBar = ({
    variant,
    title,
    leftIconName,
    onLeftIconPress,
    renderLeftComponent,
    renderRightComponent,
    containerStyle,
}) => {
    const LeftComponent = () => (
        <View style={styles.row}>
            {onLeftIconPress && leftIconName && (
                <TouchableOpacity onPress={onLeftIconPress}>
                    <Icon
                        name={leftIconName}
                        size={scale(24)}
                        color={variant === 'plain' ? Colors.gray100 : Colors.white}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            )}
            {renderLeftComponent && renderLeftComponent()}
            {title && (
                <Text
                    font="h3"
                    color={variant === 'plain' ? 'gray100' : 'white'}
                    weight="bold"
                    numberOfLines={1}
                    style={styles.title}
                >
                    {title}
                </Text>
            )}
        </View>
    );

    return (
        <View style={[styles.container, containerStyle]}>
            {variant === 'plain' && (
                <PlainBar>
                    <LeftComponent />
                    {renderRightComponent && renderRightComponent()}
                </PlainBar>
            )}
            {variant === 'gradient' && (
                <GradientBar>
                    <LeftComponent />
                    {renderRightComponent && renderRightComponent()}
                </GradientBar>
            )}
            {variant === 'ghost' && (
                <GhostBar>
                    <LeftComponent />
                    {renderRightComponent && renderRightComponent()}
                </GhostBar>
            )}
        </View>
    );
};

NavBar.propTypes = {
    variant: PropTypes.oneOf(['gradient', 'plain', 'ghost']),
    onLeftIconPress: PropTypes.func,
    renderLeftComponent: PropTypes.func,
    renderRightComponent: PropTypes.func,
    title: PropTypes.string,
    leftIconName: PropTypes.oneOf(['chevron-left', 'close']),
    containerStyle: PropTypes.any,
};

NavBar.defaultProps = {
    variant: 'gradient',
    title: null,
    leftIconName: 'chevron-left',
    renderLeftComponent: null,
    renderRightComponent: null,
    onLeftIconPress: null,
    containerStyle: null,
};

GradientBar.propTypes = {
    children: PropTypes.any.isRequired,
};

PlainBar.propTypes = {
    children: PropTypes.any.isRequired,
};

GhostBar.propTypes = {
    children: PropTypes.any.isRequired,
};

export default NavBar;
