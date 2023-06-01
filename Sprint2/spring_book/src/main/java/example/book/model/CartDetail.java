package example.book.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer quantity;
    private Integer status;

    @ManyToOne
//    @JsonBackReference("cart-book")
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne
    @JsonBackReference("book-cartDetail")
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private AppUser user;

    public CartDetail() {
    }

    public CartDetail(Integer id, Integer quantity, Integer status, Book book, AppUser user) {
        this.id = id;
        this.quantity = quantity;
        this.status = status;
        this.book = book;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }
}
