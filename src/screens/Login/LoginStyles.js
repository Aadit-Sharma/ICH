import {StyleSheet} from 'react-native';
console.log("LoginStyles loaded");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 28,
    shadowColor: '#102A43',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#005BAC',
    borderWidth: 3,
    borderColor: '#F9A826',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
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
    width: '100%',
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    color: '#243B53',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0,
  },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9E2EC',
    backgroundColor: '#F8FAFC',
    color: '#102A43',
    fontSize: 16,
    paddingHorizontal: 16,
    letterSpacing: 0,
  },
  passwordInputContainer: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9E2EC',
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    color: '#102A43',
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 8,
    letterSpacing: 0,
  },
  iconButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputError: {
    borderColor: '#D64545',
  },
  errorText: {
    color: '#D64545',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
    letterSpacing: 0,
  },
  loginButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#005BAC',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginButtonPressed: {
    opacity: 0.82,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0,
  },
  keyboardView: {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: 20,
  paddingBottom: 22,
},

passwordToggleIcon: {
  width: 22,
  height: 22,
  opacity: 0.72,
},

infoCard: {
  backgroundColor: "#EEF6FF",
  borderRadius: 14,

  flexDirection: "row",
  alignItems: "center",

  paddingHorizontal: 16,
  paddingVertical: 14,

  marginTop: 22,

  shadowColor: "#005BAC",
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.08,
  shadowRadius: 14,
  elevation: 4,
},

infoIconContainer: {
  width: 32,
  height: 32,

  alignItems: "center",
  justifyContent: "center",

  marginRight: 14,
},

infoIcon: {
  width: 32,
  height: 32,
},

infoText: {
  flex: 1,

  color: "#334155",

  fontSize: 14,
  fontWeight: "700",

  lineHeight: 20,
},

poweredBy: {
  color: "#005BAC",

  fontSize: 13,
  fontWeight: "600",

  textAlign: "center",

  marginTop: 16,
},
  eyeIcon: {
    width: 22,
    height: 22,
  },

  infoIcon: {
    width: 28,
    height: 28,
  },
});

export default styles;
