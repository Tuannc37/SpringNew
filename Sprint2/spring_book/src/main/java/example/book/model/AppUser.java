package example.book.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity

public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "VARCHAR(45)")
    private String username;

    @Column(columnDefinition = "VARCHAR(100)")
    private String password;

    @Column(columnDefinition = "VARCHAR(45)")
    private String email;

    @Column(columnDefinition = "DATE")
    private LocalDate creationDate;
    private String phone;
    private String address;
    private String fullName;
    private Integer status =0;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<CartDetail> cartDetails;

    @OneToMany(mappedBy = "appUser")
    @JsonIgnore
    private List<UserRole> userRoles;

    public AppUser() {
    }

    public AppUser(Integer id, String username, String password, String email, LocalDate creationDate, String phone, String address, String fullName, Integer status, Set<CartDetail> cartDetails, List<UserRole> userRoles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.creationDate = creationDate;
        this.phone = phone;
        this.address = address;
        this.fullName = fullName;
        this.status = status;
        this.cartDetails = cartDetails;
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

    public Set<CartDetail> getCartDetails() {
        return cartDetails;
    }

    public void setCartDetails(Set<CartDetail> cartDetails) {
        this.cartDetails = cartDetails;
    }

    public List<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRole> userRoles) {
        this.userRoles = userRoles;
    }
}
