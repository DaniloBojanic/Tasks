package finale.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import finale.dto.TaskDTO;
import finale.model.Task;

@Component
public class TaskToTaskDto implements Converter<Task, TaskDTO>{
	
	@Autowired
	private StateToStateDto toStateDto;
	
	@Autowired
	private SprintToSprintDto toSprintDto;

	@Override
	public TaskDTO convert(Task task) {
		TaskDTO taskDTO = new TaskDTO();
		
		taskDTO.setId(task.getId());
		taskDTO.setPoints(task.getPoints());
		taskDTO.setName(task.getName());
		taskDTO.setEmployee(task.getEmployee());
		
		taskDTO.setState(toStateDto.convert(task.getState()));
		taskDTO.setSprint(toSprintDto.convert(task.getSprint()));
		
		return taskDTO;
	}
	
	public List<TaskDTO> convert(List<Task> tasks) {
		List<TaskDTO> tasksDTO = new ArrayList<>();
		
		for (Task task: tasks) {
			tasksDTO.add(convert(task));
		}
		
		return tasksDTO;
	}


}
