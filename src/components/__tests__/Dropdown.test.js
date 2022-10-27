import React, { useState } from 'react';
import {render, waitFor, cleanup} from '@testing-library/react';
import Dropdown from '../Dropdown';
import '@testing-library/jest-dom';
import * as APIService from '../../api/api';
import selectEvent from 'react-select-event';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../api/api');

describe("Dropdown component", () => {
    beforeEach(()=> {
        jest.clearAllMocks();
        cleanup();
    });
    it('should have the placeholder in dropdown component', ()=>{
        const { getByText } = render(<Dropdown/>);
        const placeholder = getByText('Select...');

        expect(placeholder).toBeTruthy();
    });

    it('should have the component rendered', ()=>{
        const { queryByTestId } = render(<Dropdown/>);
        const selectConcrete = queryByTestId('concrete-select-form');
        expect(selectConcrete).toBeDefined();
        expect(selectConcrete).not.toBeNull();
    });

    it('should select option when populated with key', async  () => {
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
        const { getByLabelText, getByTestId} = render(<Dropdown/>);
        await waitFor(()=>{
            selectEvent.select(getByLabelText('Designated Concrete Type'), ["Mock"]);
            const form = getByTestId('concrete-select-form');
            expect(form).toHaveFormValues({designatedConcrete: "Mock" });
        });
    });

    it('should select option when key doesn\'t exist', async  () => {
        APIService.getOptions.mockResolvedValueOnce([
            {"value" : "mock"},
            { "value": "RC40/50"}]);
        const { getByLabelText, getByTestId} = render(<Dropdown/>);
        await waitFor(()=>{
            selectEvent.select(getByLabelText('Designated Concrete Type'), ["Mock"]);
            const form = getByTestId('concrete-select-form');
            expect(form).toHaveFormValues({designatedConcrete: "" });
        });
    });

    it('should render select when the response is empty', async  () => {
        APIService.getOptions.mockResolvedValueOnce([]);
        const { getByLabelText, getByTestId} = render(<Dropdown/>);
        await waitFor(()=>{
            selectEvent.select(getByLabelText('Designated Concrete Type'), ["mock"]);
            const form = getByTestId('concrete-select-form');
            expect(form).toHaveFormValues({designatedConcrete: "" });
        });
    });

    it('should render select when the response is null', async  () => {
        APIService.getOptions.mockResolvedValueOnce(null);
        const { getByLabelText, getByTestId} = render(<Dropdown/>);
        await waitFor(()=>{
            selectEvent.select(getByLabelText('Designated Concrete Type'), ["mock"]);
            const form = getByTestId('concrete-select-form');
            expect(form).toHaveFormValues({designatedConcrete: "" });
        });
    });
    
    it('should update the setSelectedInputValue be invoked on component render', ()=> {

        const setMockSelectedInputValue = jest.fn(() => ({"DesignatedConcrete":"Mock"}));
        const useStateMock = () => [useState, setMockSelectedInputValue];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        render(<Dropdown/>);
        expect(setMockSelectedInputValue).toHaveBeenCalled();
    });

});

