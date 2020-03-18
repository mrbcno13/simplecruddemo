package developer.nikko.springbootcrud.springbootcrudapi.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import developer.nikko.springbootcrud.springbootcrudapi.model.Author;
import developer.nikko.springbootcrud.springbootcrudapi.model.Book;
import developer.nikko.springbootcrud.springbootcrudapi.service.CrudService;

@RestController
@RequestMapping("/api")
public class CrudController {

	@Autowired
	private CrudService<Book> bookService;

	@Autowired
	private CrudService<Author> authorService;

	@GetMapping("/book")
	public List<Book> get() {
		return bookService.get();
	}

	@PostMapping("/book")
	public Book save(@RequestParam (value = "authorId", required=true) Integer authorId, @RequestBody Book book) {
		Author author = authorService.get(authorId);
		book.setAuthor(author);
		bookService.save(book);
		return book;
	}

	@GetMapping("/book/{id}")
	public Book get(@PathVariable int id) {
		return bookService.get(id);
	}

	@DeleteMapping("/book/{id}")
	public String delete(@PathVariable int id) {
		bookService.delete(id);
		return "Book removed with id "+id;
	}

	@PutMapping("/book")
	public Book update(@RequestBody Book book) {
		bookService.save(book);
		return book;
	}

	@GetMapping("/author")
	public List<Author> getAuthor() {
		return authorService.get();
	}

	@PostMapping("/author")
	public Author saveAuthor(@RequestBody Author author) {
		authorService.save(author);
		return author;
	}

	@GetMapping("/author/{id}")
	public Author getAuthor(@PathVariable int id) {
		return authorService.get(id);
	}

	@DeleteMapping("/author/{id}")
	public String deleteAuthor(@PathVariable int id) {
		authorService.delete(id);
		return "Author removed with id "+id;
	}

	@PutMapping("/author")
	public Author updateAuthor(@RequestBody Author author) {
		authorService.save(author);
		return author;
	}

}
