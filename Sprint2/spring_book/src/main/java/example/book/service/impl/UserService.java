package example.book.service.impl;

import example.book.model.AppRole;
import example.book.model.AppUser;
import example.book.model.UserRole;
import example.book.repository.UserRepository;
import example.book.repository.UserRoleRepository;
import example.book.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;


@Service
public class UserService implements IUserService {

    @Autowired
    UserRepository userRepository;


    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserRoleRepository userRoleRepository;


    @Override
    public AppUser findByName(String name) {
        return userRepository.findAppUserByName(name);
    }


    @Override
    public String existsByUserName(String username) throws MessagingException, UnsupportedEncodingException {
        String user = userRepository.existsByUserName(username);
        AppUser appUser = userRepository.findAppUserByName(username);
        if (user != null) {
            sendVerificationEmailForResetPassWord(username, appUser.getEmail());
        }
        return user;
    }

    @Override
    public void saveNewPassword(String password, String name) {
        userRepository.saveNewPassword(password, name);
    }


    public void sendVerificationEmailForResetPassWord(String userName, String email) throws MessagingException, UnsupportedEncodingException {
        String subject = "Hãy xác thực email của bạn";
        String mailContent = "";
        String confirmUrl = "http://localhost:4200/verify-reset-password/" + userName;


        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setFrom("tuannc1004@gmail.com","Book Store");
        helper.setTo(email);
        helper.setSubject(subject);
        mailContent = "<p sytle='color:red;'>Xin chào " + userName + " ,<p>" + "<p> Nhấn vào link sau để xác thực email của bạn:</p>" +
                "<h3><a href='" + confirmUrl + "'>Link Xác thực( nhấn vào đây)!</a></h3>" +
                "<p>Book Store</p>";
        helper.setText(mailContent, true);
        javaMailSender.send(message);
    }


    @Override
    public Page<AppUser> findAllUser(Pageable pageable) {
        return userRepository.findAll(pageable);
    }


    @Override
    public void save(AppUser appUser) {
        userRepository.save(appUser.getUsername(), appUser.getPassword(), appUser.getEmail());
    }


    @Override
    public void create(AppUser appUser) {

        userRepository.save(appUser);

        UserRole userRole = new UserRole();

        AppRole appRole = new AppRole();
        appRole.setId(1);

        userRole.setAppUser(appUser);
        userRole.setAppRole(appRole);
        userRole.setStatus(0);
        userRoleRepository.save(userRole);
    }

    @Override
    public Optional<AppUser> findById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public AppUser findByIdUser(Integer idUser) {
        return userRepository.findByIdUser(idUser);
    }


    @Override
    public void edit(AppUser appUser) {
        userRepository.edit(appUser.getUsername(), appUser.getPassword(), appUser.getEmail(), appUser.getId());
    }

    @Override
    public void update(AppUser appUser) {
        userRepository.save(appUser);
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteUser(id);
    }

    @Override
    public Boolean existsUsername(String username) {
        return username.equals(userRepository.existsUsername(username));
    }

    @Override
    public Boolean existsEmail(String email) {
        return email.equals(userRepository.existsEmail(email));
    }

    @Override
    public Integer countTotalUsers() {
        return userRepository.countTotalUsers();
    }

}
