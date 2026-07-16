/*
-----------------------------------------
File: LoginStyles.js

Purpose:
Stores all visual styles for the Login screen.

Concepts Used:
- React Native StyleSheet
- Flexbox
- Spacing
- Shadows
- Typography
- Colors
-----------------------------------------
*/

// React Native StyleSheet
// StyleSheet.create organizes style objects for React Native components.
import {StyleSheet} from 'react-native';

// StyleSheet object
// Each property name, like container or card, is used in Login.js.
const styles = StyleSheet.create({
  container: {
    // Flexbox
    // flex: 1 makes the screen fill all available space.
    flex: 1,
    // Color
    // Sets the full screen background.
    backgroundColor: '#F5F7FA',
  },
  keyboardView: {
    // Flexbox
    // Makes KeyboardAvoidingView fill the screen.
    flex: 1,
    // Flexbox
    // Centers the login card vertically.
    justifyContent: 'center',
    // Spacing
    // Adds left and right padding.
    paddingHorizontal: 20,
    // Spacing
    // Keeps content away from bottom edge.
    paddingBottom: 22,
  },
  card: {
    // Color
    // White background for the login form card.
    backgroundColor: '#FFFFFF',
    // Shape
    // Rounds card corners.
    borderRadius: 18,
    // Spacing
    // Adds left and right space inside card.
    paddingHorizontal: 22,
    // Spacing
    // Adds top and bottom space inside card.
    paddingVertical: 28,
    // iOS shadow color.
    shadowColor: '#102A43',
    // iOS shadow position.
    shadowOffset: {
      width: 0,
      height: 10,
    },
    // iOS shadow transparency.
    shadowOpacity: 0.1,
    // iOS shadow blur.
    shadowRadius: 24,
    // Android shadow.
    elevation: 8,
  },
  header: {
    // Flexbox
    // Centers logo/title/subtitle horizontally.
    alignItems: 'center',
    // Spacing
    // Adds space below the header block.
    marginBottom: 30,
  },
  logo: {
    // Size
    // Logo circle width.
    width: 76,
    // Size
    // Logo circle height.
    height: 76,
    // Shape
    // Half of size makes it a circle.
    borderRadius: 38,
    // Color
    // NTPC blue.
    backgroundColor: '#005BAC',
    // Border
    // Orange outline around logo.
    borderWidth: 3,
    borderColor: '#F9A826',
    // Flexbox
    // Centers NTPC text horizontally and vertically.
    alignItems: 'center',
    justifyContent: 'center',
    // Spacing
    // Adds space below logo.
    marginBottom: 18,
  },
  logoText: {
    // Text color.
    color: '#FFFFFF',
    // Text size.
    fontSize: 17,
    // Text weight.
    fontWeight: '800',
    // Letter spacing.
    letterSpacing: 0,
  },
  title: {
    color: '#102A43',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0,
  },
  subtitle: {
    color: '#52606D',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
    letterSpacing: 0,
  },
  form: {
    // Layout
    // Makes form use full card width.
    width: '100%',
  },
  fieldGroup: {
    // Spacing
    // Adds space below each input group.
    marginBottom: 18,
  },
  label: {
    // Text color.
    color: '#243B53',
    // Text size.
    fontSize: 14,
    // Text weight.
    fontWeight: '600',
    // Spacing below label.
    marginBottom: 8,
    letterSpacing: 0,
  },
  input: {
    // Size
    // Fixed input height.
    height: 52,
    // Shape
    // Rounded input corners.
    borderRadius: 14,
    // Border
    // Thin input outline.
    borderWidth: 1,
    borderColor: '#D9E2EC',
    // Background color.
    backgroundColor: '#F8FAFC',
    // Text color inside input.
    color: '#102A43',
    // Text size.
    fontSize: 16,
    // Internal left/right spacing.
    paddingHorizontal: 16,
    letterSpacing: 0,
  },
  passwordInputContainer: {
    // Size
    // Same height as normal input.
    height: 52,
    // Shape
    // Rounded password field corners.
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9E2EC',
    backgroundColor: '#F8FAFC',
    // Flexbox
    // Places TextInput and icon side by side.
    flexDirection: 'row',
    // Flexbox
    // Vertically centers input and icon.
    alignItems: 'center',
  },
  passwordInput: {
    // Flexbox
    // Takes remaining horizontal space before icon.
    flex: 1,
    // Size
    // Matches parent height.
    height: '100%',
    color: '#102A43',
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 8,
    letterSpacing: 0,
  },
  iconButton: {
    // Touch target width.
    width: 48,
    // Touch target height.
    height: 48,
    // Centers the icon.
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordToggleIcon: {
    // Image width.
    width: 22,
    // Image height.
    height: 22,
    // Opacity makes icon slightly softer.
    opacity: 0.72,
  },
  inputError: {
    // Error state border color.
    borderColor: '#D64545',
  },
  errorText: {
    // Error text color.
    color: '#D64545',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
    letterSpacing: 0,
  },
  loginButton: {
    // Button height.
    height: 54,
    // Rounded button corners.
    borderRadius: 16,
    // Primary blue button color.
    backgroundColor: '#005BAC',
    // Centers button text/spinner.
    alignItems: 'center',
    justifyContent: 'center',
    // Space above button.
    marginTop: 8,
  },
  loginButtonPressed: {
    // Visual feedback when button is pressed/loading.
    opacity: 0.82,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0,
  },
  infoCard: {
    // Light blue information card background.
    backgroundColor: '#EEF6FF',
    // Rounded corners.
    borderRadius: 14,
    // Flexbox
    // Places icon and text in one horizontal row.
    flexDirection: 'row',
    // Vertically centers icon and text.
    alignItems: 'center',
    // Internal left/right padding.
    paddingHorizontal: 16,
    // Internal top/bottom padding.
    paddingVertical: 14,
    // Space above info card.
    marginTop: 22,
    // Shadow color.
    shadowColor: '#005BAC',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  infoIconContainer: {
    // Icon container width.
    width: 32,
    // Icon container height.
    height: 32,
    // Centers icon horizontally.
    alignItems: 'center',
    // Centers icon vertically.
    justifyContent: 'center',
    // Space between icon and text.
    marginRight: 14,
  },
  infoIcon: {
    // Icon image width.
    width: 32,
    // Icon image height.
    height: 32,
  },
  infoText: {
    // Flexbox
    // Text takes remaining card width.
    flex: 1,
    // Text color.
    color: '#334155',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0,
  },
  poweredBy: {
    // NTPC blue text color.
    color: '#005BAC',
    // Text size.
    fontSize: 13,
    // Medium text weight.
    fontWeight: '600',
    // Centers text horizontally.
    textAlign: 'center',
    // Space above Powered by NTPC.
    marginTop: 16,
    letterSpacing: 0,
  },
});

export default styles;
