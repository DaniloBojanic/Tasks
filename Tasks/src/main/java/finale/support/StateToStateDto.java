package finale.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import finale.dto.StateDTO;
import finale.model.State;

@Component
public class StateToStateDto implements Converter<State, StateDTO> {
	
	@Override
	public StateDTO convert(State state) {
		StateDTO stateDTO = new StateDTO();
		
		stateDTO.setId(state.getId());
		stateDTO.setName(state.getName());
		
		return stateDTO;
	}
	
	public List<StateDTO> convert(List<State> states) {
		List<StateDTO> statesDTO = new ArrayList<>();
		
		for (State state: states) {
			statesDTO.add(convert(state));
		}
		
		return statesDTO;
	}

}
