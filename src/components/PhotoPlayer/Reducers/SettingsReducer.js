const SettingsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_SIZE':
			return {
				...state,
				currentSettings: {...state.currentSettings, Size: action.value}
			};
		case 'SET_TRANSITION':
			return {
				...state,
				currentSettings: {...state.currentSettings, Transition: action.value}
			};
		case 'SET_SPEED':
			return {
				...state,
				currentSettings: {...state.currentSettings, Speed: action.value}
			};
		case 'SET_SONG':
			return {
				...state,
				song: action.value[0]
			};
		default:
			return state;
	}
};

export default SettingsReducer;
