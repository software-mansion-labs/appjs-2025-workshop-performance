import React, {useEffect} from 'react';
import {
  Animated as RNAnimated,
  Button,
  Easing as RNEasing,
  StyleSheet,
  useAnimatedValue,
  View,
} from 'react-native';
import Animated, {
  runOnUI,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedStyle,
  css,
} from 'react-native-reanimated';

function sleep(ms: number) {
  'worklet';
  const start = performance.now();
  while (performance.now() - start < ms) {}
}

function blockJSThread() {
  sleep(1000);
}

function blockUIThread() {
  runOnUI(sleep)(1000);
}

function SetIntervalAnimation() {
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth(w => (w >= 250 ? 0 : w + 5));
    }, 0);
    return () => clearInterval(interval);
  }, []);

  return <View style={[{width}, styles.box, styles.red]} />;
}

function RequestAnimationFrameAnimation() {
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    let id = -1;
    const step = (time: number) => {
      setWidth((time % 1000) / 4);
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return <View style={[{width}, styles.box, styles.orange]} />;
}

function AnimatedWithoutNativeDriverAnimation() {
  const width = useAnimatedValue(0);

  useEffect(() => {
    const animation = RNAnimated.loop(
      RNAnimated.timing(width, {
        toValue: 250,
        easing: RNEasing.linear,
        duration: 1000,
        useNativeDriver: false,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [width]);

  return <RNAnimated.View style={[{width}, styles.box, styles.yellow]} />;
}

function AnimatedWithNativeDriverAnimation() {
  const scaleX = useAnimatedValue(0);

  useEffect(() => {
    const animation = RNAnimated.loop(
      RNAnimated.timing(scaleX, {
        toValue: 1,
        easing: RNEasing.linear,
        duration: 1000,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [scaleX]);

  return (
    <RNAnimated.View
      style={[
        {transform: [{scaleX}]},
        styles.box,
        styles.width,
        styles.greenyellow,
      ]}
    />
  );
}

function ReanimatedSharedValueAnimation() {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = 0;
    width.value = withRepeat(
      withTiming(250, {duration: 1000, easing: Easing.linear}),
      -1,
      false,
    );
  }, [width]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  return (
    <Animated.View style={[animatedStyle, styles.box, styles.limegreen]} />
  );
}

function ReanimatedCSSAnimation() {
  const widthAnimation = css.keyframes({
    from: {
      width: 0,
    },
    to: {
      width: 250,
    },
  });

  return (
    <Animated.View
      style={[
        {animationName: widthAnimation},
        cssStyles.cssAnimation,
        styles.box,
        styles.deepskyblue,
      ]}
    />
  );
}

export default function Fps() {
  return (
    <>
      {/* <PerformanceMonitor /> */}
      <View style={styles.container}>
        <Button title="Block JS thread" onPress={blockJSThread} />
        <Button title="Block UI thread" onPress={blockUIThread} />
        <SetIntervalAnimation />
        <RequestAnimationFrameAnimation />
        <AnimatedWithoutNativeDriverAnimation />
        <AnimatedWithNativeDriverAnimation />
        <ReanimatedSharedValueAnimation />
        <ReanimatedCSSAnimation />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 50,
  },
  width: {
    width: 250,
  },
  red: {
    backgroundColor: 'red',
  },
  orange: {
    backgroundColor: 'darkorange',
  },
  yellow: {
    backgroundColor: 'gold',
  },
  greenyellow: {
    backgroundColor: 'greenyellow',
  },
  limegreen: {
    backgroundColor: 'limegreen',
  },
  deepskyblue: {
    backgroundColor: 'deepskyblue',
  },
});

const cssStyles = css.create({
  cssAnimation: {
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
});
