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

  const handleMapPress = () => {
    navigation.navigate('Map');
  };

  const handleToursPress = () => {
    navigation.navigate('Tours');
  };

  const handleItinerariesPress = () => {
    navigation.navigate('Itineraries');
  };

  const handleHotelsPress = () => {
    navigation.navigate('Hotels');
  };

  const handlePracticalTipsPress = () => {
    navigation.navigate('PracticalTips');
  };

  const handleWeatherPress = () => {
    navigation.navigate('Weather');
  };

  // Placeholder images - in production, these would be actual image assets
  const pragueHeaderImage = {
    uri: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=400&fit=crop',
  };

  const thingsToSeeImage = {
    uri: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=400&fit=crop',
  };

  const mapImage = {
    uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop',
  };

  const toursImage = {
    uri: 'https://images.unsplash.com/photo-1555993536-7e0c0a0a0b0b?w=800&h=400&fit=crop',
  };

  const itinerariesImage = {
    uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
  };

  const hotelsImage = {
    uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
  };

  const practicalTipsImage = {
    uri: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
  };

  const weatherImage = {
    uri: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=400&fit=crop',
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
                  <Text style={styles.headerTitle}>Discovering Prague</Text>
                  <Text style={styles.headerSubtitle}>Only Guide by Locals</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Feature Cards Section */}
        <View style={styles.cardsContainer}>
          <FeatureCard
            title="Things to See"
            image={thingsToSeeImage}
            onPress={handlePlacesPress}
          />
          <FeatureCard
            title="Map"
            image={mapImage}
            onPress={handleMapPress}
          />
          <FeatureCard
            title="Tours"
            image={toursImage}
            onPress={handleToursPress}
          />
          <FeatureCard
            title="Itineraries"
            image={itinerariesImage}
            onPress={handleItinerariesPress}
          />
          <FeatureCard
            title="Where to Stay"
            image={hotelsImage}
            onPress={handleHotelsPress}
          />
          <FeatureCard
            title="Practical Tips"
            image={practicalTipsImage}
            onPress={handlePracticalTipsPress}
          />
          <FeatureCard
            title="Weather"
            image={weatherImage}
            onPress={handleWeatherPress}
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
    justifyContent: 'center',
    paddingBottom: spacing.xl,
  },
  headerTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  cardsContainer: {
    paddingHorizontal: spacing.md,
  },
});
