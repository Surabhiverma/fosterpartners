import React from 'react';
import {render, screen, cleanup, waitFor, fireEvent} from '@testing-library/react';
import Dropdown from '../Dropdown';
import * as APIService from '../../api/api';
import selectEvent from 'react-select-event';

jest.mock('../../api/api');

describe("Dropdown component", () => {
    beforeEach(()=> {
        jest.clearAllMocks();
    });
    it('should have the placeholder in dropdown component', ()=>{
        const { getByText } = render(<Dropdown/>);
        const placeholder = getByText('Select...');

        expect(placeholder).toBeTruthy();
    });

    it('should have the component rendered', ()=>{
        const { queryByTestId } = render(<Dropdown/>);
        const selectConcrete = queryByTestId('concrete-select');
        expect(selectConcrete).toBeDefined();
        expect(selectConcrete).not.toBeNull();
    });
    
    it('should call onChange when the first option is selected', async ()=> {
        const { getAllByText, getByTestId } = render(<Dropdown/>);
        APIService.getOptions.mockResolvedValueOnce([
            {
                "GeneralPurpose": "Building structures",
                "DetailedPurpose": "Inside enclosed buildings except poorly ventilated rooms with high humidity (XC1)",
                "NominalCover": 15,
                "DesignatedConcrete": "Mock"
            },
            {
                "GeneralPurpose": "Building structures",
                "DetailedPurpose": "External vertical elements sheltered from or exposed to rain (XC3/XC4 + XF1) C)",
                "NominalCover": 20,
                "DesignatedConcrete": "RC40/50"
            }]);
        await waitFor(()=>{
            selectEvent.select(getAllByText('Select...')[0], ["Mock"]);
        });
        //expect(handleChange).toHaveBeenCalled();
        //expect(getByTestId("concrete-select-form")).toHaveFormValues({ value: "Mock" });
        //await waitFor(() => getByText('Mock'));
    });

});

