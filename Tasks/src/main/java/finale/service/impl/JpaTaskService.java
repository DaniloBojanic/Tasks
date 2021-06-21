package finale.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import finale.model.Task;
import finale.repository.TaskRepository;
import finale.service.TaskService;

@Service
public class JpaTaskService implements TaskService{
	

	@Autowired
	private TaskRepository taskRepository;

	@Override
	public List<Task> findAll() {
		return taskRepository.findAll();
	}

	@Override
	public Task findOne(Long id) {
		return taskRepository.findOneById(id);
	}

	@Override
	public List<Task> find(List<Long> ids) {
		return taskRepository.findByIdIn(ids);
	}

	@Override
	public Page<Task> findAll(int pageNumber) {
		return taskRepository.findAll(PageRequest.of(pageNumber,2));
	}

	@Override
	public Task save(Task task) {
		return taskRepository.save(task);
	}

	@Override
	public Task update(Task task) {
		return taskRepository.save(task);
	}

	@Override
	public Task delete(Long id) {
		Optional<Task> task = taskRepository.findById(id);
		if(task.isPresent()) {
			taskRepository.deleteById(id);
			return task.get();
		}
		return null;
	}

	@Override
	public Page<Task> search(String name, Long sprintId, int pageNo) {
		return taskRepository.search(name, sprintId, PageRequest.of(pageNo, 2));
	}


}
