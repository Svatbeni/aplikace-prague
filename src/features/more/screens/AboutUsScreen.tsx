import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../shared/theme';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../../shared/theme/spacing';

interface AboutUsScreenProps {
  navigation: any;
}

export const AboutUsScreen: React.FC<AboutUsScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const handleEmailPress = () => {
    Linking.openURL('mailto:adriana@discoveringprague.com');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            About Us
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Discovering Prague
          </Text>
        </View>

        {/* Who We Are Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Who we are?
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
            Hi, we are <Text style={styles.bold}>Adriana</Text> and <Text style={styles.bold}>Matěj</Text>, a married couple from the Czech Republic. We met each other in 2012 and we have been living and actively traveling together ever since.
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bulletText, { color: theme.colors.textSecondary }]}>
              • Matěj was born in Prague and has lived there his whole life. He knows everything about his hometown.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bulletText, { color: theme.colors.textSecondary }]}>
              • Adriana was born in Brno but moved to Prague and has a bit of an outside-the-box view of Prague.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bulletText, { color: theme.colors.textSecondary }]}>
              • We are authors of the successful travel blog <Text style={styles.bold}>Czech the World</Text>.
            </Text>
          </View>
        </View>

        {/* How We Write Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            How do we write about Prague?
          </Text>

          <View style={styles.subsection}>
            <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>
              1) We have a traveler's perspective on our hometown.
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
              We have visited more than 60 countries together and lived in many for longer periods (1 year in New Zealand, two summers in the USA, 8 months in South America), therefore we know a lot about traveling and can write about Prague from a traveler's perspective.
            </Text>
          </View>

          <View style={styles.subsection}>
            <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>
              2) We are honest and fair
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
              Our pride is honesty and fairness. There are a lot of bloggers who recommend lower quality or more expensive services only if they get a higher commission. We are not like that. We recommend only the best. If the better service doesn't have an affiliate program and the worse service does, we will recommend the better service without any commission for us.
            </Text>
          </View>

          <View style={styles.subsection}>
            <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>
              3) Quality over quantity
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
              We have discovered a lot of information about traveling and each destination on the Internet. However, very often the information is outdated, irrelevant, or incomplete. So we decided to focus on the quality of the content, not the quantity. We write our articles very precisely, therefore each guide takes several days to create.
            </Text>
          </View>

          <View style={styles.subsection}>
            <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>
              4) We create maps for you
            </Text>
            <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
              We both love maps from childhood. We can study them for hours. One of our biggest hobbies is orienteering and multidiscipline adventure races based on mapping. We try to transfer this passion to our blog. We create detailed maps. You can download these maps to your mobile for easier orientation and planning. We care about the maps. We spend a lot of time creating them and we are confident to say that you will not find similar maps elsewhere on the Internet for most destinations.
            </Text>
          </View>
        </View>

        {/* Award Section */}
        <View style={styles.section}>
          <View
            style={[
              styles.awardBox,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Ionicons
              name="trophy"
              size={32}
              color={theme.colors.primary}
              style={styles.awardIcon}
            />
            <Text style={[styles.awardText, { color: theme.colors.text }]}>
              We won prestigious journalist award Golden Pen
            </Text>
          </View>
        </View>

        {/* Our Team Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Our team:
          </Text>

          <View
            style={[
              styles.teamCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.teamName, { color: theme.colors.text }]}>
              Adriana
            </Text>
            <Text style={[styles.teamDescription, { color: theme.colors.textSecondary }]}>
              Adri is an enthusiastic traveler, photographer, and blogger. She fell in love with traveling after her first study exchange in Finland. She is also a nature lover, hiker, and backpacker. Her hobby is orienteering, outdoor and adventure racing.
            </Text>
          </View>

          <View
            style={[
              styles.teamCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.teamName, { color: theme.colors.text }]}>
              Matěj
            </Text>
            <Text style={[styles.teamDescription, { color: theme.colors.textSecondary }]}>
              Sportsman, traveler, passionate photographer, and former scout leader. He had loved nature, sports, and active lifestyle from his childhood. He has led the scout unit to help to raise children for many years. He wanted to continue helping others and therefore the travel blog was a logical step.
            </Text>
          </View>
        </View>

        {/* Recognition Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Our content is being shared by big travel brands:
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bulletText, { color: theme.colors.textSecondary }]}>
              • MTV Travel
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bulletText, { color: theme.colors.textSecondary }]}>
              • Culture Trip
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bulletText, { color: theme.colors.textSecondary }]}>
              • Compass
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bulletText, { color: theme.colors.textSecondary }]}>
              • Travonto
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Our photos in the books:
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bulletText, { color: theme.colors.textSecondary }]}>
              • Wanderlust Europe
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={[styles.bulletText, { color: theme.colors.textSecondary }]}>
              • Wanderlust Mediterranean
            </Text>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Cooperation
          </Text>
          <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
            If you have any questions, feedback, or just anything else, please contact us:
          </Text>
          <TouchableOpacity
            style={[
              styles.contactButton,
              {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={handleEmailPress}
            activeOpacity={0.7}
          >
            <Ionicons name="mail" size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>adriana@discoveringprague.com</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textTertiary }]}>
            We are <Text style={styles.bold}>Adriana and Matěj</Text> and we would love to guide you through <Text style={styles.bold}>Prague, our hometown</Text>.
          </Text>
          <Text style={[styles.footerText, { color: theme.colors.textTertiary, marginTop: spacing.sm }]}>
            We have traveled to more than 60 countries, but if we could tell you what <Text style={styles.bold}>place we know the most, it is our city</Text>.
          </Text>
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
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  headerSection: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  subsection: {
    marginBottom: spacing.lg,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.sm,
  },
  bold: {
    fontWeight: 'bold',
  },
  bulletPoint: {
    marginBottom: spacing.sm,
    paddingLeft: spacing.sm,
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 24,
  },
  awardBox: {
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  awardIcon: {
    marginBottom: spacing.md,
  },
  awardText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  teamCard: {
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  teamDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  footerText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
