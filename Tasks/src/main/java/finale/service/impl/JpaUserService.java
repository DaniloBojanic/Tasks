package finale.service.impl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import finale.dto.UserPasswordChangeDto;
import finale.enumeration.UserRole;
import finale.model.User;
import finale.repository.UserRepository;
import finale.service.UserService;

@Service
public class JpaUserService implements UserService{
	@Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> one(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> all() {
        return userRepository.findAll();
    }

    @Override
    public Page<User> all(int pageNo) {
        return userRepository.findAll(PageRequest.of(pageNo,2));
    }

    @Override
    public void delete(Long id) {
    	userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findbyKorisnickoIme(String username) {
        return userRepository.findFirstByUsername(username);
    }

    @Override
    public boolean changePassword(Long id, UserPasswordChangeDto userPasswordChangeDto) {
        Optional<User> rezultat = userRepository.findById(id);

        if(!rezultat.isPresent()) {
            throw new EntityNotFoundException();
        }

        User user = rezultat.get();

        if(!user.getUsername().equals(userPasswordChangeDto.getUsername())
                || !user.getPassword().equals(userPasswordChangeDto.getPassword())){
            return false;
        }

        String password = userPasswordChangeDto.getPassword();
        if (!userPasswordChangeDto.getPassword().equals("")) {
            password = passwordEncoder.encode(userPasswordChangeDto.getPassword());
        }

        user.setPassword(password);

        userRepository.save(user);

        return true;
    }

	@Override
	public User save(User user) {
    	user.setRole(UserRole.USER);
    	return userRepository.save(user);
	}

}
