package finale.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import finale.dto.SprintDTO;
import finale.model.Sprint;

@Component
public class SprintToSprintDto implements Converter<Sprint, SprintDTO>{
	
	@Override
	public SprintDTO convert(Sprint sprint) {
		SprintDTO sprintDTO = new SprintDTO();
		
		sprintDTO.setId(sprint.getId());
		sprintDTO.setName(sprint.getName());
		sprintDTO.setPoints(sprint.getPoints());
		
		return sprintDTO;
	}
	
	public List<SprintDTO> convert(List<Sprint> sprints) {
		List<SprintDTO> sprintsDTO = new ArrayList<>();
		
		for (Sprint sprint: sprints) {
			sprintsDTO.add(convert(sprint));
		}
		
		return sprintsDTO;
	}


}
