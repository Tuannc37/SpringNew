package example.book.model;

import java.io.Serializable;
import java.util.List;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private Integer id;
    private final String jwttoken;
    private List<String> roles;
    private String username;

    public JwtResponse(Integer id,String jwttoken, List<String> roles, String username) {
        this.id = id;
        this.jwttoken = jwttoken;
        this.roles = roles;
        this.username = username;
    }

    public Integer getId() {
        return id;
    }

    public JwtResponse(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public List<String> getRoles() {
        return roles;
    }

    public String getToken() {
        return this.jwttoken;
    }

    public String getUsername() {
        return username;
    }
}
