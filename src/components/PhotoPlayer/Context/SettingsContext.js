import React, {useContext, useReducer} from 'react';
import SettingsReducer from '../Reducers/SettingsReducer';

const SettingsContext = React.createContext({
	settings: [
		{id: 1, text: 'Size', value: 'Original'},
		{id: 2, text: 'Transition', value: 'Fade In'},
		{id: 3, text: 'Speed', value: 'Normal'}
	],
	currentSettings: {
		Size: 'Original',
		Transition: 'Fade In',
		Speed: 'Fast'
	}
});

const SettingsProvider = ({children}) => {
	const initialState = useContext(SettingsContext);
	const [state, dispatch] = useReducer(SettingsReducer, initialState);

	return (
		<SettingsContext.Provider value={{state, dispatch}}>
			{children}
		</SettingsContext.Provider>
	);
};

const useSettingsContext = () => useContext(SettingsContext);

export default SettingsProvider;
export {
	SettingsContext,
	SettingsProvider,
	useSettingsContext
};
