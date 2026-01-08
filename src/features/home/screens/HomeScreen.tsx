import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../shared/theme';
import { FeatureCard } from '../../../shared/components/FeatureCard';
import { spacing } from '../../../shared/theme/spacing';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const handlePlacesPress = () => {
    navigation.navigate('Places');
  };

  const handleItinerariesPress = () => {
    navigation.navigate('Itineraries');
  };

  const handleToursPress = () => {
    navigation.navigate('More');
  };

  // Placeholder images - in production, these would be actual image assets
  const pragueHeaderImage = {
    uri: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=400&fit=crop',
  };

  const cityWalksImage = {
    uri: 'https://images.unsplash.com/photo-1555993536-7e0c0a0a0b0b?w=800&h=400&fit=crop',
  };

  const whatToSeeImage = {
    uri: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=400&fit=crop',
  };

  const toursImage = {
    uri: 'https://images.unsplash.com/photo-1555993536-7e0c0a0a0b0b?w=800&h=400&fit=crop',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with Prague Image */}
        <View style={styles.headerContainer}>
          <ImageBackground
            source={pragueHeaderImage}
            style={styles.headerImage}
            imageStyle={styles.headerImageStyle}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']}
              style={styles.headerGradient}
            >
              <View style={[styles.headerContent, { paddingTop: insets.top + 16 }]}>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => navigation.navigate('More')}
                >
                  <Ionicons name="menu" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                  <Text style={styles.headerTitle}>Prague</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Feature Cards Section */}
        <View style={styles.cardsContainer}>
          <FeatureCard
            title="City walks"
            image={cityWalksImage}
            onPress={handleItinerariesPress}
          />
          <FeatureCard
            title="What to see"
            image={whatToSeeImage}
            onPress={handlePlacesPress}
          />
          <FeatureCard
            title="Tours and"
            image={toursImage}
            onPress={handleToursPress}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  headerContainer: {
    height: 300,
    marginBottom: spacing.lg,
  },
  headerImage: {
    flex: 1,
    width: '100%',
  },
  headerImageStyle: {
    opacity: 0.9,
  },
  headerGradient: {
    flex: 1,
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerTextContainer: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
  headerTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  cardsContainer: {
    paddingHorizontal: spacing.md,
  },
});
