package finale.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import finale.model.Task;

@Repository
public interface TaskRepository  extends JpaRepository<Task, Long>{

	Task findOneById(Long id);

	List<Task> findByIdIn(List<Long> ids);
	
	@Query("SELECT t FROM Task t WHERE "
			+ "(:name IS NULL OR t.name like %:name%) AND "
			+ "(:sprintId IS NULL OR t.sprint.id = :sprintId)")
	Page<Task> search(@Param("name")String name,
			@Param("sprintId") Long sprintId, Pageable pageable);
}
