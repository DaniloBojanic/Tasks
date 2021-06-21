package finale.service;

import java.util.List;

import org.springframework.data.domain.Page;

import finale.model.Sprint;

public interface SprintService {
	
List<Sprint> findAll();
	
	Sprint findOne(Long id);
	
	List<Sprint> find(List<Long> ids);
	
	Page<Sprint> findAll(int pageNumber);
	
	Sprint save (Sprint sprint);
	
	Sprint update (Sprint sprint);
	
	Sprint delete (Long id);

}
