import React, { useCallback } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import BoardingCard from './components/boarding-card';
import Button from './components/button';
import Dot from './components/dot';
import { BOARDING_DATA } from './constants';
import { Box, Text } from './theme';
import { palette } from './theme/colors';

const { width: PAGE_WIDTH, height } = Dimensions.get('window');

const BOARDING_BACKGROUND_COLOR = {
  0: palette.amber300,
  1: palette.blu300,
  2: palette.pink300,
  3: palette.fuchsia300,
};

const Onboarding = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const activeCardRadiusBackground = useAnimatedStyle(() => {
    // @ts-ignore
    const color = BOARDING_BACKGROUND_COLOR[activeIndex.value];
    return {
      backgroundColor: color,
    };
  });

  const scrollRef = useAnimatedRef<ScrollView>();

  const onIconPress = useCallback(() => {
    if (activeIndex.value === BOARDING_DATA.length - 1) return;
    scrollRef.current?.scrollTo({ x: PAGE_WIDTH * (activeIndex.value + 1) });
  }, []);

  return (
    <View style={styles.container}>
      <Box height={0.81 * height} backgroundColor={'black'}>
        <Animated.ScrollView
          ref={scrollRef as any}
          onScroll={scrollHandler}
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          {BOARDING_DATA.map((board, index) => (
            <BoardingCard
              board={board}
              index={index}
              key={board.id}
              translateX={translateX}
              activeIndex={activeIndex.value}
            />
          ))}
        </Animated.ScrollView>
      </Box>
      <View style={styles.footer}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
            activeCardRadiusBackground,
          ]}
        ></Animated.View>
        <Box
          flex={1}
          backgroundColor={'white'}
          alignItems={'center'}
          borderTopLeftRadius={'xl'}
          paddingBottom={'m'}
        >
          <View style={[styles.fillCenter, { flexDirection: 'row' }]}>
            {BOARDING_DATA.map((_, index) => {
              return (
                <Dot key={_.id} index={index} activeDotIndex={activeIndex} />
              );
            })}
          </View>
          <Button variant="secondary" text="Next" onPress={onIconPress} />
        </Box>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    flex: 1,
  },
  fillCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
