import {Typography, AppBar, Toolbar, CssBaseline} from '@material-ui/core';
import Dropdown from './components/Dropdown';

import useStyles from './styles';



const App = () => {
    const classes = useStyles();
    return (
        <>
        <CssBaseline/>
            <AppBar className={classes.appBar} position="relative">
                <Toolbar className={classes.toolbar}>
                    <Typography color="textSecondary" variant="h6" component="div">
                        Designated Concrete
                    </Typography>
                </Toolbar>
            </AppBar>  
            <main>
                <div>
                    <Dropdown/>  
                </div>
            </main>
      </>
    );
}

export default App;
