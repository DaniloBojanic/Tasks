package finale.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import finale.model.Sprint;
import finale.repository.SprintRepository;
import finale.service.SprintService;

@Service
public class JpaSprintService implements SprintService{
	
	@Autowired
	private SprintRepository sprintRepository;

	@Override
	public List<Sprint> findAll() {
		return sprintRepository.findAll();
	}

	@Override
	public Sprint findOne(Long id) {
		return sprintRepository.findOneById(id);
	}

	@Override
	public List<Sprint> find(List<Long> ids) {
		return sprintRepository.findByIdIn(ids);
	}

	@Override
	public Page<Sprint> findAll(int pageNumber) {
		return sprintRepository.findAll(PageRequest.of(pageNumber,2));
	}

	@Override
	public Sprint save(Sprint sprint) {
		return sprintRepository.save(sprint);
	}

	@Override
	public Sprint update(Sprint sprint) {
		return sprintRepository.save(sprint);
	}

	@Override
	public Sprint delete(Long id) {
		Optional<Sprint> sprint = sprintRepository.findById(id);
		if(sprint.isPresent()) {
			sprintRepository.deleteById(id);
			return sprint.get();
		}
		return null;
	}

}
