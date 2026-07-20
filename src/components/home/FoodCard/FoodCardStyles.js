import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  animatedContainer: {
    width: 168,
    marginRight: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 10,

    borderWidth: 1,

    borderColor: "#E2E8F0",

    shadowColor: "#102A43",

    shadowOffset: {
      width: 0,
      height: 12,
    },

    shadowOpacity: 0.16,

    shadowRadius: 24,

    elevation: 10,
  },

  image: {
    width: "100%",

    height: 100,

    borderRadius: 16,

    marginBottom: 10,
  },

  content: {
    minHeight: 92,
  },

  name: {
    color: "#102A43",

    fontSize: 15,

    fontWeight: "800",
  },

  metaRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 8,
  },

  price: {
    color: "#005BAC",

    fontSize: 14,

    fontWeight: "800",
  },

  rating: {
    flexDirection: "row",

    alignItems: "center",
  },

  ratingIcon: {
    width: 13,

    height: 13,
  },

  ratingText: {
    color: "#52606D",

    marginLeft: 4,

    fontSize: 12,

    fontWeight: "700",
  },

  addButton: {
    height: 34,

    borderRadius: 17,

    backgroundColor: "#F9A826",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 12,
  },

  addButtonText: {
    color: "#FFFFFF",

    fontSize: 13,

    fontWeight: "900",
  },
});

export default styles;