import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  keyboardView: {
    flex: 1,
    paddingHorizontal: 16,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#162B40',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: '#6E7F91',
  },

  form: {
    width: '100%',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1565C0',
    marginTop: 8,
    marginBottom: 14,
  },

  fieldGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#24384D',
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D8E0E8',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#172B40',
    backgroundColor: '#FFFFFF',
  },

  inputError: {
    borderColor: '#E53935',
  },

  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 5,
  },

  registerButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },

  registerButtonPressed: {
    opacity: 0.8,
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  loginLink: {
    alignItems: 'center',
    marginTop: 22,
  },

  loginLinkText: {
    color: '#6E7F91',
    fontSize: 13,
  },

  loginLinkBold: {
    color: '#1565C0',
    fontWeight: '700',
  },
});

export default styles;