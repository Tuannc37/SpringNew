package example.book.service;


import example.book.model.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

public interface IUserService {

    AppUser findByName(String name);

    String existsByUserName(String username) throws MessagingException, UnsupportedEncodingException;

    void saveNewPassword(String password, String name);

    Page<AppUser> findAllUser(Pageable pageable);

    void save(AppUser appUser);

    void create(AppUser appUser);

    Optional<AppUser> findById(Integer id);

    AppUser findByIdUser(Integer idUser);

    void edit(AppUser appUser);

    void update(AppUser appUser);

    void deleteUser(int id);

    Boolean existsUsername(String username);

    Boolean existsEmail(String email);

    Integer countTotalUsers();
}
