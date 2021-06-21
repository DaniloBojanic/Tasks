package finale.service;

import java.util.List;

import org.springframework.data.domain.Page;

import finale.model.State;

public interface StateService {
	
List<State> findAll();
	
	State findOne(Long id);
	
	List<State> find(List<Long> ids);
	
	Page<State> findAll(int pageNumber);
	
	State save (State state);
	
	State update (State state);
	
	State delete (Long id);

}
