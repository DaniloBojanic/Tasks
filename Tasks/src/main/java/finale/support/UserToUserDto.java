package finale.support;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import finale.dto.UserDTO;
import finale.model.User;

@Component
public class UserToUserDto implements Converter<User, UserDTO>{
	
	@Override
	public UserDTO convert(User source) {
		UserDTO target = new UserDTO();
		
		target.setId(source.getId());
		target.setUsername(source.getUsername());
		
		return target;
	}

}
