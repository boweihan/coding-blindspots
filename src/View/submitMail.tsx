import React from 'react'
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


const submitMail = () => {

    return (
        <form  noValidate >
      <Card >
        <CardHeader title="Please Login" />
        <CardContent>
          <div>
            <TextField
            //   error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
            //   onChange={handleUsernameChange}
            //   onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary">
            {/* // className={classes.loginBtn}
            // onClick={handleLogin}
            // disabled={state.isButtonDisabled}> */}
            Submit
          </Button>
        </CardActions>
      </Card>
      </form>
    )
}

export default submitMail;