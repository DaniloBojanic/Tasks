package finale.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import finale.dto.UserPasswordChangeDto;
import finale.model.User;

public interface UserService {

    Optional<User> one(Long id);

    List<User> all();

    Page<User> all(int pageNo);

    User save(User user);

    void delete(Long id);

    Optional<User> findbyKorisnickoIme(String username);

	boolean changePassword(Long id, UserPasswordChangeDto userPasswordChangeDto);

}
