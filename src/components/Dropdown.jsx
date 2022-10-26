import React from 'react';
import DataView from './DataView';
import {useState} from 'react';
import AsyncSelect from 'react-select/async';
import {Typography, Container, Grid, Paper} from '@material-ui/core';
import useStyles from './styles';
import * as APIService from '../api/api';

const Dropdown = () => {
    const classes = useStyles();
    const [selectedInputValue, setSelectedInputValue] = useState(null);
    const [selectedConcrete, setSelectedConcrete] = useState(null);
    const handleChange = async value => {
        setSelectedInputValue(value);
        const response = await APIService.getChartData(value);
        if(response.ok) {
          const data = await response.json();
          setSelectedConcrete({
            labels: data.cementContents.map((c) => c.label),
            datasets: [
              {
                data: data.cementContents.map((c) => c.value),
                barThickness: 16,
                backgroundColor: [
                  '#007AFF'
                ],
                xAxisID: 'x1'
              }
            ]
          });
        }
    }
    return ( 
      <>
      <Container>
        <Grid container className={classes.grid} justifyContent='space-around'  >
            <Grid item >
                <Paper variant="outlined" className={classes.paper} data-testid="concrete-select">
                    <Typography color="textSecondary" gutterBottom>
                        Designated Concrete Type
                    </Typography>
                    <form data-testid="concrete-select-form">
                      <AsyncSelect
                        name= "designatedConcrete"
                        labelId="selected-concrete"
                        id="select-concrete"
                        defaultOptions
                        value={selectedInputValue}
                        getOptionLabel = {e => e.DesignatedConcrete}
                        getOptionValue = {e => e.DesignatedConcrete}
                        loadOptions = {APIService.getOptions}
                        label="designatedConcrete"
                        onChange={handleChange}
                        isSearchable={false}
                      /> 
                    </form> 
                </Paper>
            </Grid>
        </Grid>
        <Grid container className={classes.data} justifyContent='space-around'>
          <Grid item >
            <Paper variant="outlined" className={classes.paper}>
            <Grid container>
              <Grid item><Typography color="textSecondary" variant="subtitle2">Size</Typography></Grid>
              <Grid item><Typography color="textSecondary" variant="subtitle2" className={classes.textPadding}> Min. Cement content (kg/m3)</Typography></Grid>
            </Grid>
            { selectedConcrete &&
              <DataView selectedConcrete={selectedConcrete}/>
            } 
            </Paper>
          </Grid>
        </Grid>
    </Container>
    </>
    );
};

export default Dropdown;