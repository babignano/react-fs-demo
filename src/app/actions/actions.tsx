export const SignInSuccess = (user) => dispatch => {
    dispatch({
      type: 'SIGNIN_SUCCESS',
      payload: user
    })
}