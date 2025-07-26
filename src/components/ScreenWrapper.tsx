import * as React from 'react';
import {
  NativeModules,
  Platform,
  ScrollView,
  ScrollViewProps,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useExampleTheme } from '@src/hooks/useExampleTheme';
import { useAnimatedHeaderHeight } from '@react-navigation/native-stack';
import { useHeaderHeight } from '@react-navigation/elements';

type Props = ScrollViewProps & {
  children: React.ReactNode;
  withScrollView?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function ScreenWrapper({
  children,
  withScrollView = true,
  style,
  contentContainerStyle,
  ...rest
}: Props) {
  const theme = useExampleTheme();

  const insets = useSafeAreaInsets();

  const { StatusBarManager } = NativeModules;
  const statusBarHeight = StatusBarManager.HEIGHT;

  const headerHeight = useHeaderHeight();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.left,
    },
  ];

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={Platform.OS === 'android' ? '#000000' : undefined}
        translucent={false}
        animated
        hidden={false}
      />
      {withScrollView ? (
        <ScrollView
          {...rest}
          contentContainerStyle={contentContainerStyle}
          keyboardShouldPersistTaps="always"
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={[containerStyle, style]}
          scrollIndicatorInsets={{ top: headerHeight - statusBarHeight }}
        >
          <View style={{ marginTop: Platform.OS === 'ios' ? headerHeight : 0 }}>
            {children}
          </View>
        </ScrollView>
      ) : (
        <View style={[containerStyle, style]}>{children}</View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
