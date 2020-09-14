import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
   container: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 10,
      // flexDirection: 'row', // conditionally styling in line
   },
   emailContainer: {
      marginBottom: 10,
   },
   emailLabel: {
      fontSize: 16,
   },
   email: {
      fontSize: 20,
   },
   phoneContainer: {
      marginBottom: 10,
   },
   phoneLabel: {
      fontSize: 16,
   },
   phone: {
      fontSize: 20,
   },
});