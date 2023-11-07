import { Snackbar } from 'react-native-paper';

export function showCustomSnackbar() {
  const hideSnackbar = Snackbar.show({
    text: 'This is a Snackbar at the top with a 30px margin.',
    duration: Snackbar.LENGTH_SHORT,
    action: {
      text: 'Dismiss',
      textColor: 'white',
      onPress: () => {
        hideSnackbar();
      },
    },
    style: { top: 30 },
  });
}
