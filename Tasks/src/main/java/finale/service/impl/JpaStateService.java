package finale.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import finale.model.State;
import finale.repository.StateRepository;
import finale.service.StateService;

@Service
public class JpaStateService implements StateService{
	

	@Autowired
	private StateRepository stateRepository;

	@Override
	public List<State> findAll() {
		return stateRepository.findAll();
	}

	@Override
	public State findOne(Long id) {
		return stateRepository.findOneById(id);
	}

	@Override
	public List<State> find(List<Long> ids) {
		return stateRepository.findByIdIn(ids);
	}

	@Override
	public Page<State> findAll(int pageNumber) {
		return stateRepository.findAll(PageRequest.of(pageNumber,2));
	}

	@Override
	public State save(State state) {
		return stateRepository.save(state);
	}

	@Override
	public State update(State state) {
		return stateRepository.save(state);
	}

	@Override
	public State delete(Long id) {
		Optional<State> state = stateRepository.findById(id);
		if(state.isPresent()) {
			stateRepository.deleteById(id);
			return state.get();
		}
		return null;
	}

}
