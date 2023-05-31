package example.book.repository;

import example.book.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface IBookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "select * from book join category on category.id = book.category_id" +
            " where (book.name like :name or price like :name or author like :name) and category.name like :category and book.status = 0 order by book.id desc ",
            countQuery = "select count(*) from book join category on category.id = book.category_id" +
                    " where (book.name like :name or price like :name or author like :name) and category.name like :category  and book.status = 0 order by book.id desc", nativeQuery = true)
    Page<Book> findAllBook(Pageable pageable, @Param("name") String name,
                           @Param("category") String category);

    @Modifying
    @Query(value = "update book set `status` = 1 where id =:id", nativeQuery = true)
    void deleteBook(@Param("id") Integer id);

    @Query("SELECT b FROM Book b WHERE b.name LIKE %:keyword% OR b.author LIKE %:keyword%")
    Page<Book> findByNameContainingOrAuthorContaining(@Param("keyword") String keyword, Pageable pageable);

    Page<Book> findAllByOrderByReleaseDateDesc(Pageable pageable);

    List<Book> findAllByOrderByNumberBookSoldDesc();

    Page<Book> findAllByOrderByNumberBookSoldDesc(Pageable pageable);

    @Query(value = "SELECT * FROM book WHERE CAST(price AS DECIMAL) <= :price", nativeQuery = true)
    Page<Book> findAllByPriceLessThanOrEqual(String price, Pageable pageable);

    @Query(value = "select * from book where `status` = 0 limit 6", nativeQuery = true)
    List<Book> findAllBooks();

    @Query(value = "select * from book where `status` = 0 limit 24", nativeQuery = true)
    List<Book> findAllBooksPreview();

    @Query(value ="select * from book where `status` =0 and category_id =:category or `name` like :name" ,nativeQuery = true)
    Page<Book> findAllCategory(Pageable pageable,
                               @Param("category") Integer category,
                               @Param("name") String name);
}
