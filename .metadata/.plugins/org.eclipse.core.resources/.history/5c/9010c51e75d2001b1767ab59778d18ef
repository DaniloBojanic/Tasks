package finale.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import finale.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	Optional<User> findFirstByKorisnickoIme(String korisnickoIme);

    Optional<User> findFirstByKorisnickoImeAndLozinka(String korisnickoIme,String lozinka);

}
