import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { ACCENT } from '../utils/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PARTICLE_COUNT = 36;
const COLORS = [ACCENT, '#60A5FA', '#93C5FD', '#DBEAFE', '#FFFFFF', '#BFDBFE'];

type ParticleConfig = {
  id: number;
  x: number;
  color: string;
  size: number;
  drift: number;
  rotation: number;
};

function createParticles(): ParticleConfig[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * SCREEN_WIDTH,
    color: COLORS[i % COLORS.length],
    size: 5 + Math.random() * 7,
    drift: (Math.random() - 0.5) * 100,
    rotation: (Math.random() - 0.5) * 540,
  }));
}

const PARTICLES = createParticles();

type ParticleProps = {
  config: ParticleConfig;
  progress: SharedValue<number>;
};

function Particle({ config, progress }: ParticleProps) {
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: config.x + config.drift * progress.value },
      { translateY: -20 + progress.value * (SCREEN_HEIGHT + 40) },
      { rotate: `${config.rotation * progress.value}deg` },
    ],
    opacity: progress.value < 0.85 ? 1 : 1 - (progress.value - 0.85) / 0.15,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: config.size,
          height: config.size * 0.55,
          backgroundColor: config.color,
        },
        style,
      ]}
    />
  );
}

type Props = {
  visible: boolean;
  onFinish?: () => void;
};

export function ConfettiOverlay({ visible, onFinish }: Props) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!visible) {
      progress.value = 0;
      return;
    }

    progress.value = 0;
    progress.value = withTiming(
      1,
      { duration: 2500, easing: Easing.out(Easing.quad) },
      (finished) => {
        if (finished && onFinish) {
          runOnJS(onFinish)();
        }
      },
    );
  }, [visible, progress, onFinish]);

  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      {PARTICLES.map((particle) => (
        <Particle key={particle.id} config={particle} progress={progress} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
  },
  particle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 2,
  },
});
