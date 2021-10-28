import React, { useReducer, useEffect } from 'react';
import RestClient from '../shared/rest';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: `${theme.spacing(0)} auto`,

    },
    loginBtn: {
      marginTop: theme.spacing(0),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff',
    },
    card: {
      marginTop: theme.spacing(10),
      width: 500
    },
    root: {
      "& .MuiFormLabel-root": {
        fontSize: '0.9rem',
        marginTop: '-8px'
      },
      "& .MuiFormLabel-root.Mui-focused": {
        color: "red",
        fontSize: '1.05rem'
      }
    }
  })
);

type State = {
  email: string
  username: string
  aboutme: string
  painpoints: string
  joinedDate: Date
  referralUrl: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  email: '',
  username: '',
  aboutme: '',
  painpoints: '',
  referralUrl: '',
  joinedDate: new Date(Date.now()),
  isButtonDisabled: true,
  helperText: '',
  isError: false
};


type Action = { type: 'submitEmail', payload: string }
  | { type: 'submitUsername', payload: string }
  | { type: 'submitAboutMe', payload: string }
  | { type: 'submitPainPoints', payload: string }
  | { type: 'submitReferralUrl', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'submitEmailSuccess', payload: string }
  | { type: 'submitEmailFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'submitEmail': 
      return {
        ...state,
        email: action.payload
      };
    case 'submitUsername': 
      return {
        ...state,
        username: action.payload
      };
    case 'submitAboutMe': 
      return {
        ...state,
        aboutme: action.payload
      };
    case 'submitPainPoints': 
      return {
        ...state,
        painpoints: action.payload
      };
    case 'submitReferralUrl': 
      return {
        ...state,
        referralUrl: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'submitEmailSuccess': 
     console.log(state);
     console.log(action);
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'submitEmailFailed': 
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

export const Waitlist = () => {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("inside src/view/waitlist.tsx");

  useEffect(() => {
    if (state.email.trim() && state.username.trim() && state.aboutme.trim() && state.referralUrl.trim ()) {
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
  }, [state.email, state.aboutme, state.username, state.referralUrl]);

  const handleSubmission = () => {
    var credentials= {
        email: state.email,
        username: state.username,
        aboutme: state.aboutme,
        referralUrl: state.referralUrl,
        joinedDate: state.joinedDate,
        painpoints: state.painpoints
    };
    RestClient.post(`/waitlistusers/`, credentials)
      .then((response) => { 
           console.log("response from django waitlist server: " + JSON.stringify(response))
            
            dispatch({
              type: 'submitEmailSuccess',
              payload: 'Submitted!'
            })
          
          })
      .catch(() => {
        console.log("failed" );
      dispatch({
        type: 'submitEmailFailed',
        payload: 'Submission Failed.'
      });
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleSubmission();
    }
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'submitEmail',
        payload: event.target.value
      });
    };
  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'submitUsername',
        payload: event.target.value
      });
    };
  const handleAboutMeChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'submitAboutMe',
        payload: event.target.value
      });
    };
  const handleReferralUrlChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'submitReferralUrl',
        payload: event.target.value
      });
    };
  const handlePainPointsChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'submitPainPoints',
        payload: event.target.value
      });
    };


    return (
        <form 
        className={classes.container} 
        noValidate autoComplete="off"
        >
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="We are developing a code review tool. Here is a sample. Enter email here if you want us to keep you updated."
        titleTypographyProps={{variant:'subtitle1' }}
        />
        <CardContent>
          <div>
            <TextField
              required
              className={classes.root}
              error={state.isError}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              required
              className={classes.root}
              error={state.isError}
              fullWidth
              id="username"
              type="username"
              label="Choose a username. We will try and reserve it when the site goes live.
              "
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
            required
            className={classes.root}
            multiline
            rows={2}
            rowsMax={4}
              error={state.isError}
              fullWidth
              id="aboutme"
              type="aboutme"
              label="Add information about yourself."
              placeholder="About Me"
              margin="normal"
              onChange={handleAboutMeChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              required
              fullWidth
              className={classes.root}
              error={state.isError}
              id="referralUrl"
              type="referralUrl"
              label="Which website did you join us from?"
              placeholder="Url/Website name."
              margin="normal"
              onChange={handleReferralUrlChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              fullWidth
              className={classes.root}
              error={state.isError}
              id="painpoints"
              type="painpoints"
              label="What more features would you like to see in current interview preparation sites?"
              placeholder="Painpoints"
              margin="normal"
              onChange={handlePainPointsChange}
              onKeyPress={handleKeyPress}
              helperText={state.helperText}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
          data-testid='button'
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleSubmission}
            disabled={state.isButtonDisabled}>
            Submit
          </Button>
        </CardActions>
      </Card>
      </form>
    )
}

