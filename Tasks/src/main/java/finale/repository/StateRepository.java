package finale.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import finale.model.State;

@Repository
public interface StateRepository extends JpaRepository<State, Long>{
	
	State findOneById(Long id);

	List<State> findByIdIn(List<Long> ids);

}
