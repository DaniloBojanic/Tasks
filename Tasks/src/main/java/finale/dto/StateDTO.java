package finale.dto;

import javax.validation.constraints.Positive;

public class StateDTO {
	
	
	@Positive(message = "Id must have positive value.")
    private Long id;
	
	private String name;

	public StateDTO() {
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
	
	


}
