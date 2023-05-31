package example.book.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import example.book.model.CartDetail;
import example.book.model.Customer;
import example.book.model.UserRole;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public class UserDto implements Validator {
    private Integer id;
//    @NotBlank(message = "Username không được để trống.")
    private String username;

//    @NotBlank(message = "Password không được để trống.")
//    @Size(min = 6, message = "Password phải có ít nhất 6 kí tự.")
    private String password;

//    @NotBlank(message = "Email không được để trống.")
//    @Email(message = "Email không đúng định dạng.")
    private String email;

    private LocalDate creationDate;
    private String phone;
    private String address;
    private String fullName;

    private Integer status =0;

    private CartDetail cartDetail;
    private Customer customer;

    private List<UserRole> userRoles;

    public UserDto() {
    }

    public UserDto(Integer id, String username, String password, String email, LocalDate creationDate, String phone, String address, String fullName, Integer status, CartDetail cartDetail, Customer customer, List<UserRole> userRoles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.creationDate = creationDate;
        this.phone = phone;
        this.address = address;
        this.fullName = fullName;
        this.status = status;
        this.cartDetail = cartDetail;
        this.customer = customer;
        this.userRoles = userRoles;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public CartDetail getCartDetail() {
        return cartDetail;
    }

    public void setCartDetail(CartDetail cartDetail) {
        this.cartDetail = cartDetail;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {

    }
}
