package finale.dto;

import javax.validation.constraints.Positive;

public class SprintDTO {
	
	
	@Positive(message = "Id must have positive value.")
    private Long id;
	
	private String name;
	
	private String points;

	public SprintDTO() {
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

	public String getPoints() {
		return points;
	}

	public void setPoints(String points) {
		this.points = points;
	}


	

}
