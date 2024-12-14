import { showMessage } from "react-native-flash-message"

export function successMessage(message: any) {
    showMessage({
      message: message,
      type: 'success',
      statusBarHeight: 10,
      animated: true,
      duration: 2000,
      icon: 'success',
      position: 'top',
      autoHide: true,
    })
  }
  
  export function errorMessage(message: any) {
    showMessage({
      message: message,
      type: 'danger',
      statusBarHeight: 10,
      animated: true,
      duration: 2000,
      icon: 'danger',
      position: 'top',
      autoHide: true,
    })
  }