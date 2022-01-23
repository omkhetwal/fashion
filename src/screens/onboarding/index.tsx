import { SLIDES } from '@/constants';
import { Box, makeStyles, theme, Theme } from '@/theme';
import { StackNavigatorProps } from '@/types';
import React, { useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Slide from './components/slide';
import SubSlide from './components/sub-slide';

const { width, height } = Dimensions.get('window');
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  slider: {
    height: 0.61 * height,
    borderBottomEndRadius: theme.borderRadii.xxxl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadii.xxxl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

// TODO ts

const OnBoarding = ({ navigation }: { navigation: any }) => {
  const translateX = useSharedValue(0);
  const styles = useStyles();

  const scrollRef = useRef<Animated.ScrollView>(null);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      translateX.value = contentOffset.x;
    },
  });

  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      translateX.value,
      SLIDES.map((_, i) => i * width),
      SLIDES.map((slide) => slide.color)
    )
  );

  const slider = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const footerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, slider]}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          onScroll={onScroll}
          bounces={false}
          scrollEventThrottle={16}
        >
          {SLIDES.map((data, index) => (
            <Slide key={data.title} right={!!(index & 1)} title={data.title} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[StyleSheet.absoluteFill, slider]} />
        <Box style={styles.footerContent}>
          <Animated.View
            style={[
              {
                flex: 1,
                flexDirection: 'row',
                width: width * SLIDES.length,
              },
              footerStyle,
            ]}
          >
            {SLIDES.map(({ subtitle, description }, index) => {
              const last = index === SLIDES.length - 1;

              return (
                <SubSlide
                  key={index}
                  subtitle={subtitle}
                  description={description}
                  last={last}
                  onPress={() => {
                    if (last) {
                      navigation.navigate('Welcome');
                    } else {
                      // @ts-ignore
                      scrollRef.current?.scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                  }}
                />
              );
            })}
          </Animated.View>
        </Box>
      </View>
    </View>
  );
};

export default OnBoarding;
