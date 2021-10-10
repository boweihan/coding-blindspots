import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import RestClient from '../shared/rest';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

//state type

type State = {
  username: string
  password:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  console.log("action.type is " + action.type);
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword': 
      return {
        ...state,
        password: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'loginSuccess': 
      console.log("in loginSuccess");
     console.log(state);
     console.log(action);
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed': 
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError': 
      return {
        ...state,
        isError: action.payload
      };
  }
}




const Logout = () => {
  const classes = useStyles();

const [cookies, setCookie] = useCookies(["user"]);
function handleCookie() {
 console.log("about to set cookie");
  setCookie("user", "gowtham", {      path: "/"    });  
 console.log("successfully set cookie");
}


  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("inside src/view/logout.tsx");

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.username, state.password]);

  const handleLogout = () => {
    console.log("3 username is " + state.username);
    console.log("4 password is " + state.password);
    //cookies.set("user", "gowtham", { path: "/" }); // setting the cookie

    var credentials= {
        username: state.username,
        password: state.password
    };

    const cookies = new Cookies();
    //cookies.removeCookie('user');
    cookies.remove('user');
    console.log("deleted cookie user"); // Pacman

    //Uncomment this.
    //dispatch({
    //    type: 'loginFailed',
    //    payload: 'Login Failed'
    //  });
};

handleLogout();
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogout();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Please Login" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogout}
            disabled={state.isButtonDisabled}>
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Logout;
