package finale.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

public class TaskDTO {
	
	
	@Positive(message = "Id must have positive value.")
    private Long id;
	
	@NotNull
	@Size(min = 1, max = 40)
	private String name;
	
	private String employee;
	
	@Min(value = 0)
	@Max(value = 20)
	private Integer points;	
	
	private SprintDTO sprint;
	
	private StateDTO state;

	public TaskDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmployee() {
		return employee;
	}

	public void setEmployee(String employee) {
		this.employee = employee;
	}

	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}

	public SprintDTO getSprint() {
		return sprint;
	}

	public void setSprint(SprintDTO sprint) {
		this.sprint = sprint;
	}

	public StateDTO getState() {
		return state;
	}

	public void setState(StateDTO state) {
		this.state = state;
	}
	
	

}
