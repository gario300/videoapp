import * as React from 'react';
import { Snackbar } from 'react-native-paper';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { changeAlertStatus } from '../../app/features/alert/alertChange';

const MyComponent = () => {
  const message = useSelector(state => state.alert.message)
  const dispatch = useDispatch()
  const onDismissSnackBar = () => dispatch(changeAlertStatus(null));

  return (
      <Snackbar
        visible={message}
        onDismiss={onDismissSnackBar}
        duration={2000}
      >
        {message}
      </Snackbar>
  );
};


export default MyComponent;
