package finale.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import finale.dto.SprintDTO;
import finale.model.Sprint;
import finale.service.SprintService;
import finale.support.SprintToSprintDto;

@RestController
@RequestMapping(value = "/api/sprints", produces = MediaType.APPLICATION_JSON_VALUE)
public class SprintController {
	
	@Autowired
	private SprintService sprintService;
	
	@Autowired
	private SprintToSprintDto toSprintDto;
	
	//@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	@GetMapping
	public ResponseEntity<List<SprintDTO>> getAll () {
		
		List<Sprint> sprintovi = sprintService.findAll();
		
		return new ResponseEntity<>(toSprintDto.convert(sprintovi), HttpStatus.OK);
	}


}
