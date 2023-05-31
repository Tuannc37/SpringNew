package example.book.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String price;
    private String image;
    private String publisher;
    private String totalPage;
    private String author;
    private String sale;
    private String numberBookSold;
    private LocalDate releaseDate;
    private Integer status = 0;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "discount_id")
    private Discount discount;

    @OneToMany(mappedBy = "book")
    @JsonBackReference
    private Set<CartDetail> cartDetails;

    public Book(Integer id, String code, String name, String description, String price, String image, String publisher, String totalPage, String author, String sale, String numberBookSold, LocalDate releaseDate, Integer status, Category category, Discount discount, Set<CartDetail> cartDetails) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.publisher = publisher;
        this.totalPage = totalPage;
        this.author = author;
        this.sale = sale;
        this.numberBookSold = numberBookSold;
        this.releaseDate = releaseDate;
        this.status = status;
        this.category = category;
        this.discount = discount;
        this.cartDetails = cartDetails;
    }

    public Book() {

    }

    public Integer getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getPrice() {
        return price;
    }

    public String getImage() {
        return image;
    }

    public String getPublisher() {
        return publisher;
    }

    public String getTotalPage() {
        return totalPage;
    }

    public String getAuthor() {
        return author;
    }

    public String getSale() {
        return sale;
    }

    public String getNumberBookSold() {
        return numberBookSold;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public Integer getStatus() {
        return status;
    }

    public Category getCategory() {
        return category;
    }

    public Discount getDiscount() {
        return discount;
    }

    public Set<CartDetail> getCartDetails() {
        return cartDetails;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public void setTotalPage(String totalPage) {
        this.totalPage = totalPage;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setSale(String sale) {
        this.sale = sale;
    }

    public void setNumberBookSold(String numberBookSold) {
        this.numberBookSold = numberBookSold;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setDiscount(Discount discount) {
        this.discount = discount;
    }

    public void setCartDetails(Set<CartDetail> cartDetails) {
        this.cartDetails = cartDetails;
    }
}
